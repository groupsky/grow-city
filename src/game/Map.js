import config from '../config/map'

export default class Map {
  constructor (savedState) {
    savedState = savedState || {}
    this.tiles = savedState.tiles || this.generateMap(config.radius)
  }

  findTileById (tileId) {
    for (let r in this.tiles) {
      if (!this.tiles.hasOwnProperty(r)) continue
      const row = this.tiles[ r ]
      if (!row) continue
      for (let q in row) {
        if (!row.hasOwnProperty(q)) continue
        const tile = row[ q ]
        if (!tile) continue
        if (tile.id === tileId) {
          return tile
        }
      }
    }
  }

  generateMap (radius) {
    const tiles = [
      [
        null, null,

        { type: 'hill', forest: true },
        { type: 'hill', forest: true },
        { type: 'hill', forest: true },
        { type: 'hill', forest: true },
        { type: 'hill', forest: true, river: true },

        null, null,
      ],
      [
        null,
        { type: 'mountain' },
        { type: 'hill', features: { forest: true } },
        { type: 'hill', features: { forest: true } },
        { type: 'plain', features: { forest: true } },
        { type: 'hill', features: { forest: true } },
        { type: 'plain', features: { forest: true, river: true } },
        null,
      ],
      [
        null,
        { type: 'hill', features: { forest: true } },
        { type: 'plain', features: { forest: true } },
        { type: 'hill' },
        { type: 'plain', features: { forest: true } },
        { type: 'hill', features: { forest: true } },
        { type: 'plain' },
        { type: 'hill', features: { forest: true, river: true } },
        null,
      ],
      [
        { type: 'hill', features: { forest: true, river: true } },
        { type: 'plain', features: { forest: true, river: true } },
        { type: 'plain', features: { forest: true, river: true } },
        { type: 'plain', features: { river: true }, owned: true },
        { type: 'plain', features: { forest: true, river: true }, owned: true },
        { type: 'plain', features: { river: true } },
        { type: 'plain', features: { forest: true, river: true } },
        { type: 'plain', features: { river: true } },
      ],
      [
        { type: 'hill' },
        { type: 'plain', features: { forest: true } },
        { type: 'plain' },
        { type: 'grass', owned: true },
        { type: 'hill', improvements: { city: true }, owned: true },
        { type: 'grass', owned: true },
        { type: 'plain', features: { forest: true, river: true } },
        { type: 'plain', features: { forest: true } },
        { type: 'hill', features: { forest: true } },
      ],
      [
        { type: 'plain', features: { forest: true } },
        { type: 'plain' },
        { type: 'grass' },
        { type: 'grass', owned: true },
        { type: 'plain', owned: true },
        { type: 'grass', features: { river: true } },
        { type: 'plain' },
        { type: 'grass' },
      ],
      [
        null,
        { type: 'plain' },
        { type: 'hill' },
        { type: 'grass' },
        { type: 'mountain', features: { forest: true } },
        { type: 'plain', features: { river: true } },
        { type: 'mountain', features: { forest: true } },
        { type: 'plain' },
        null,
      ],
      [
        null,
        { type: 'mountain', features: { forest: true } },
        { type: 'mountain', features: { forest: true } },
        { type: 'mountain', features: { forest: true } },
        { type: 'mountain', features: { forest: true, river: true } },
        { type: 'mountain', features: { forest: true } },
        { type: 'mountain', features: { forest: true } },
        null,
      ],
      [
        null, null,
        { type: 'mountain', features: { forest: true } },
        { type: 'mountain', features: { forest: true } },
        { type: 'mountain', features: { forest: true } },
        { type: 'mountain', features: { forest: true, river: true } },
        { type: 'mountain', features: { forest: true } },
        null, null,
      ],
    ]
    let id = 1
    for (let r in tiles) {
      const row = tiles[ r ]
      for (let q in row) {
        const tile = row[ q ]
        if (!tile) continue
        if (!config.terrain[ tile.type ]) throw new Error(`Unknown terrain type ${tile.type}`)
        tile.features = tile.features || {}
        for (let key in tile.features) {
          if (!tile.features.hasOwnProperty(key)) continue
          if (!config.features[ key ]) throw new Error(`Unknown terrain feature ${key}`)
          const feature = config.features[ key ]
          if (!this.checkTerrainCompatible(tile.type, feature.terrain)) throw new Error(`Feature ${key} not allowed on terrain ${tile.type}`)
        }
        tile.improvements = tile.improvements || {}
        for (let key in tile.improvements) {
          if (!tile.improvements.hasOwnProperty(key)) continue
          if (!config.improvements[ key ]) throw new Error(`Unknown terrain improvement ${key}`)
          const improvement = config.improvements[ key ]
          if (!this.checkTerrainCompatible(tile.type, improvement.terrain)) throw new Error(`Improvement ${key} not allowed on terrain ${tile.type}`)
        }
        for (let key in config.improvements) {
          if (!config.improvements.hasOwnProperty(key)) continue
          if (!this.checkTerrainCompatible(tile.type, config.improvements[key].terrain)) continue
          tile.improvements[key] = tile.improvements[key] || false
        }
        tile.id = id++
        tile.worked = tile.worked || false
      }
    }
    return tiles
  }

  checkTerrainCompatible (terrain, allowed) {
    return !allowed || allowed.indexOf(terrain) !== -1
  }

  improvements (tile) {
    const res = []
    const disabledClasses = {}
    for (let key in tile.improvements || {}) {
      if (!tile.improvements.hasOwnProperty(key)) continue
      if (!tile.improvements[key]) continue
      if (!config.improvements[key]) continue
      if (!config.improvements[key].class) continue
      const classes = Array.isArray(config.improvements[key].class) ? config.improvements[key].class : [config.improvements[key].class]
      for (let i in classes) {
        if (!classes.hasOwnProperty(i)) continue
        disabledClasses[ classes[i] ] = true
      }
    }
    for (let key in config.improvements) {
      if (!config.improvements.hasOwnProperty(key)) continue
      const i = config.improvements[key]
      i.key = i.key || key
      if (disabledClasses[i.class]) continue
      if (tile && !this.checkTerrainCompatible(tile.type, i.terrain)) continue
      res.push(i)
    }
    return res
  }

  applyEffects (output, terrain, effects) {
    for (let effectKey in effects) {
      if (!effects.hasOwnProperty(effectKey)) continue
      const parts = effectKey.split('.')
      if (!parts[ 0 ] || parts.length < 1 || parts.length > 2 || parts.length === 2 && !parts[ 1 ]) {
        throw new Error(`Invalid effect key "${effectKey}"`)
      }
      if (parts.length === 2 && terrain !== parts[ 0 ]) continue
      const res = parts[ parts.length - 1 ]
      const effect = effects[ effectKey ]
      for (let op in effect) {
        if (!effect.hasOwnProperty(op)) continue
        switch (op) {
          case 'add':
            output[ res ] = (output[ res ] || 0) + effect[ op ]
            break
          case 'set':
            output[ res ] = effect[ op ]
            break
          case 'mult':
            output[ res ] = (output[ res ] || 0) * effect[ op ]
            break
          default:
            throw new Error(`Unknown effect op ${op}`)
        }
      }
    }
    return output
  }

  getTileProduction (tile) {
    const output = {}
    const terrainDef = config.terrain[ tile.type ]
    if (!terrainDef) throw new Error(`Unknown terrain ${tile.type}`)
    let key
    for (key in terrainDef) {
      if (!terrainDef.hasOwnProperty(key)) continue
      output[ key ] = (output[ key ] || 0) + terrainDef[ key ]
    }
    for (let feature in tile.features) {
      if (!tile.features.hasOwnProperty(feature)) continue
      if (!tile.features[ feature ]) continue
      const featureDef = config.features[ feature ]
      if (!featureDef) throw new Error(`Unknown terrain feature ${feature}`)
      this.applyEffects(output, tile.type, featureDef.effects)
    }
    for (let improvement in tile.improvements) {
      if (!tile.improvements.hasOwnProperty(improvement)) continue
      if (!tile.improvements[ improvement ]) continue
      const improvementDef = config.improvements[ improvement ]
      if (!improvementDef) throw new Error(`Unknown terrain improvement ${improvement}`)
      this.applyEffects(output, tile.type, improvementDef.effects)
    }
    return output
  }
}
