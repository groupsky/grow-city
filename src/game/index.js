import Map from './Map'
import config from '../config/general'

const { pow } = Math

export default class Game {
  constructor (savedState) {
    savedState = savedState || {}

    this.state = {
      turn: savedState.turn || 0,
      population: [
        { type: 'unemployed' },
      ],
      food: savedState.food || 0,
      foodIncome: savedState.foodIncome || 0,
      gold: savedState.gold || 0,
      goldIncome: savedState.goldIncome || 0,
      production: savedState.production || 0,
      productionIncome: savedState.productionIncome || 0,
    }
    this.map = new Map(savedState.map)

    this.updateIncome()
  }

  endTurn () {
    this.updateIncome()
    this.state.turn++
    this.state.gold += this.state.goldIncome
    this.state.food += this.state.foodIncome
    this.state.production += this.state.productionIncome
    if (this.state.food >= config.foodToGrow * pow(config.foodToGrowExp, this.state.population.length)) {
      this.addPopulation()
      this.state.food = 0
    } else if (this.state.food < 0) {
      this.removePopulation()
      this.state.food = 0
    }
    this.updateIncome()
  }

  addPopulation () {
    this.state.population.push({
      type: 'unemployed',
    })
  }

  removePopulation () {
    const pop = this.state.population.pop()
    if (pop.tileId) {
      const tile = this.map.findTileById(pop.tileId)
      if (tile) this.toggleWorkedTile(tile)
    }
  }

  sortPopulation () {
    this.state.population.sort(populationCompare)
  }

  findPopulationByTile (tileId) {
    for (let i in this.state.population) {
      const pop = this.state.population[ i ]
      if (pop.tileId === tileId) {
        return pop
      }
    }
    return null
  }

  findPopulationByType (type) {
    for (let i in this.state.population) {
      const pop = this.state.population[ i ]
      if (pop.type === type) {
        return pop
      }
    }
    return null
  }

  canWorkOnTile (tile) {
    if (!tile.owned) return false
    if (tile.improvements.city) return false
    if (!this.findPopulationByType('unemployed')) return false
    return true
  }

  toggleWorkedTile (tile) {
    if (!tile.owned) return
    if (tile.improvements.city) return
    if (tile.worked) {
      const pop = this.findPopulationByTile(tile.id)
      if (pop) {
        pop.type = 'unemployed'
        pop.tileId = null
        this.sortPopulation()
      }
      tile.worked = false
    } else {
      const pop = this.findPopulationByType('unemployed')
      if (!pop) return
      pop.type = 'worker'
      pop.tileId = tile.id
      this.sortPopulation()
      tile.worked = true
    }
    this.updateIncome()
  }

  updateIncome () {
    this.state.foodIncome = 0
    this.state.goldIncome = 0
    this.state.productionIncome = 0
    this.state.foodIncome -= this.state.population.length * config.foodPerPop
    for (let r in this.map.tiles) {
      if (!this.map.tiles.hasOwnProperty(r)) continue
      const row = this.map.tiles[ r ]
      for (let c in row) {
        if (!row.hasOwnProperty(c)) continue
        const tile = row[ c ]
        if (!tile) continue
        if (tile.worked || tile.improvements.city) {
          const prod = this.map.getTileProduction(tile)
          this.state.foodIncome += prod.food || 0
          this.state.goldIncome += prod.gold || 0
          this.state.productionIncome += prod.production || 0
        }
      }
    }
  }
}

function populationWeight (pop) {
  let weight = 0
  switch (pop.type) {
    case 'worker':
      weight += 10
      break
    case 'unemployed':
      weight += 1
      break
  }
  return weight
}

function populationCompare (a, b) {
  return populationWeight(b) - populationWeight(a)
}
