<template>
  <div>
    <h1>Home
      <button @click="endTurn">End Turn</button>
    </h1>
    <p>Turn: {{gameState.turn}}</p>
    <div class="row">
      <div class="col-md-6">
        <c-map :map="game.map"></c-map>
      </div>
    </div>
  </div>
</template>

<script>
  import cMap from '../components/Map.vue'

  export default {
    name: 'home',
    inject: [ 'game' ],
    components: { cMap },
    data () {
      return { gameState: this.game.state }
    },
    methods: {
      endTurn() {
        this.game.endTurn()
      }
    }
  }
</script>

<style scoped>
</style>
