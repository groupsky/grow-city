export default {
  farm: {
    cost: {
      production: 10,
      gold: 10,
    },
    effects: {
      'grass.food': { add: 3 },
      'plain.food': { add: 2 },
    },
    terrain: [ 'grass', 'plain' ],
  },
  mine: {
    cost: {
      production: 30,
      gold: 10,
    },
    effects: {
      'mountain.production': { add: 3 },
      'hill.production': { add: 2 },
    },
    terrain: [ 'hill', 'mountain' ],
  },
  road: {
    cost: {
      production: 15,
      gold: 20,
    },
    effects: { gold: { add: 1 } },
    terrain: [ 'grass', 'plain', 'hill', 'mountain' ],
  },
  city: {
    effects: {
      gold: { set: 1 },
      food: { set: 2 },
      production: { set: 1 },
    },
    terrain: [ 'grass', 'plain', 'hill' ],
  },
  factory: {
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
