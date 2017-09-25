import config from '../config/map'

export default class Map {
  constructor (savedState) {
    savedState = savedState || {}
    this.tiles = savedState.tiles || this.generateMap(config.radius)
  }

  generateMap (radius) {
    return [
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
        { type: 'hill', forest: true },
        { type: 'hill', forest: true },
        { type: 'plain', forest: true },
        { type: 'hill', forest: true },
        { type: 'plain', forest: true, river: true },
        null,
      ],
      [
        null,
        { type: 'hill', forest: true },
        { type: 'plain', forest: true },
        { type: 'hill' },
        { type: 'plain', forest: true },
        { type: 'hill', forest: true },
        { type: 'plain' },
        { type: 'hill', forest: true, river: true },
        null,
      ],
      [
        { type: 'hill', forest: true, river: true },
        { type: 'plain', forest: true, river: true },
        { type: 'plain', forest: true, river: true },
        { type: 'plain', river: true, owned: true },
        { type: 'plain', forest: true, river: true, owned: true },
        { type: 'plain', river: true },
        { type: 'plain', forest: true, river: true },
        { type: 'plain', river: true },
      ],
      [
        { type: 'hill' },
        { type: 'plain', forest: true },
        { type: 'plain' },
        { type: 'grass', worked: true, owned: true },
        { type: 'hill', city: true, owned: true },
        { type: 'grass', owned: true },
        { type: 'plain', forest: true, river: true },
        { type: 'plain', forest: true },
        { type: 'hill', forest: true },
      ],
      [
        { type: 'plain', forest: true },
        { type: 'plain' },
        { type: 'grass' },
        { type: 'grass', owned: true },
        { type: 'plain', factory: true, owned: true },
        { type: 'grass', river: true },
        { type: 'plain' },
        { type: 'grass' },
      ],
      [
        null,
        { type: 'plain' },
        { type: 'hill' },
        { type: 'grass' },
        { type: 'mountain', forest: true },
        { type: 'plain', river: true },
        { type: 'mountain', forest: true },
        { type: 'plain' },
        null,
      ],
      [
        null,
        { type: 'mountain', forest: true },
        { type: 'mountain', forest: true },
        { type: 'mountain', forest: true },
        { type: 'mountain', forest: true, river: true },
        { type: 'mountain', forest: true },
        { type: 'mountain', forest: true },
        null,
      ],
      [
        null, null,
        { type: 'mountain', forest: true },
        { type: 'mountain', forest: true },
        { type: 'mountain', forest: true },
        { type: 'mountain', forest: true, river: true },
        { type: 'mountain', forest: true },
        null, null,
      ],
    ]
  }
}
