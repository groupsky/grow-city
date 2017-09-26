<template>
  <div>
    <h1>Home
      <button @click="endTurn">End Turn</button>
    </h1>
    <p>Turn: {{gameState.turn}}</p>
    <div class="row">
      <div class="col-md-12">
        <c-res-bar></c-res-bar>
      </div>
      <div class="col-md-12">
        <c-pop-bar></c-pop-bar>
      </div>
      <div class="col-md-8">
        <c-map :map="map"></c-map>
      </div>
    </div>
  </div>
</template>

<script>
  import cMap from '../components/Map.vue'
  import cPopBar from '../components/PopulationBar.vue'
  import cResBar from '../components/ResourcesBar.vue'

  export default {
    name: 'home',
    inject: [ 'game' ],
    components: { cMap, cPopBar, cResBar },
    data () {
      return {
        gameState: this.game.state,
        map: this.game.map,
      }
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
