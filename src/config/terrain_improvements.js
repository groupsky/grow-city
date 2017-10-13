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
      production: 150,
      gold: 250,
    },
    effects: {
      production: { mult: 2 },
    },
    terrain: [ 'grass', 'plain', 'hill' ],
  },
}