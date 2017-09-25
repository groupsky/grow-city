import Map from './Map'

export default class Game {
  constructor (savedState) {
    savedState = savedState || {}

    this.state = {
      turn: savedState.turn || 0,
      population: savedState.population || 1,
      food: savedState.food || 0,
      gold: savedState.gold || 0,
    }
    this.map = new Map(savedState.map)
  }

  endTurn () {
    this.state.turn++
  }
}
