export default {
  farm: {
    class: 'building',
    cost: {
      production: 40,
      gold: 20,
    },
    effects: {
      'grass.food': { add: 3 },
      'plain.food': { add: 2 },
    },
    terrain: [ 'grass', 'plain' ],
  },
  mine: {
    class: 'building',
    cost: {
      production: 60,
      gold: 20,
    },
    effects: {
      'mountain.production': { add: 3 },
      'hill.production': { add: 2 },
    },
    terrain: [ 'hill', 'mountain' ],
  },
  road: {
    class: 'transport',
    cost: {
      production: 20,
      gold: 20,
    },
    effects: { gold: { add: 1 } },
    terrain: [ 'grass', 'plain', 'hill', 'mountain' ],
  },
  city: {
    class: ['building', 'transport'],
    effects: {
      gold: { set: 1 },
      food: { set: 2 },
      production: { set: 1 },
    },
    terrain: [ 'grass', 'plain', 'hill' ],
  },
  factory: {
    class: 'building',
    cost: {
      production: 500,
      gold: 1000,
    },
    areaEffects: {
      production: { mult: 1.5 },
    },
    terrain: [ 'grass', 'plain', 'hill' ],
  },
  granary: {
    class: 'building',
    cost: {
      production: 100,
      gold: 50,
    },
    areaEffects: {
      food: { mult: 1.5 },
    },
    terrain: [ 'grass', 'plain', 'hill' ],
  },
  market: {
    class: 'building',
    cost: {
      production: 250,
      gold: 500,
    },
    areaEffects: {
      gold: { mult: 1.5 },
    },
    terrain: [ 'grass', 'plain', 'hill' ],
  },
}
