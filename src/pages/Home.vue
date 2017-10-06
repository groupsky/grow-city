<template>
  <div class="container-fluid">
    <h1>Home
      <button @click="endTurn">End Turn</button>
    </h1>
    <p>Turn: {{gameState.turn}}</p>
    <div class="row">
      <div class="col-md-12">
        <c-res-bar :gold="gameState.gold" :goldIncome="gameState.goldIncome"
                   :food="gameState.food" :foodIncome="gameState.foodIncome"
                   :production="gameState.production" :productionIncome="gameState.productionIncome"></c-res-bar>
      </div>
      <div class="col-md-12">
        <c-pop-bar></c-pop-bar>
      </div>
      <div class="col-md-8">
        <c-map :map="map" @select="onSelectTile" :selected="selectedTile"></c-map>
      </div>
      <div class="col-md-4">
        <c-tile-detail v-if="selectedTile" :tile="selectedTile"></c-tile-detail>
      </div>
    </div>
  </div>
</template>

<script>
  import cMap from '../components/Map.vue'
  import cPopBar from '../components/PopulationBar.vue'
  import cResBar from '../components/ResourcesBar.vue'
  import cTileDetail from '../components/TileDetail.vue'

  export default {
    name: 'home',
    inject: [ 'game' ],
    components: { cMap, cPopBar, cResBar, cTileDetail },
    data () {
      return {
        gameState: this.game.state,
        map: this.game.map,
        selectedTile: false,
      }
    },
    methods: {
      endTurn() {
        this.game.endTurn()
      },
      onSelectTile(tile) {
        this.selectedTile = tile
      }
    }
  }
</script>

<style scoped>
</style>
