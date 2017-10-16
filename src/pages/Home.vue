<template>
  <div>
    <b-navbar togglebale="sm" class="navbar-toggleable-sm" type="inverse" variant="info">

      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-navbar-brand>Plovdiv [{{gameState.population.length}}]</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-nav is-nav-bar>
          <b-nav-item href>
            Pop: <strong>{{cityPopulation}}</strong>
          </b-nav-item>
          <b-nav-item>
            Turn: <strong>{{gameState.turn}}</strong>
          </b-nav-item>
        </b-nav>

        <b-nav is-nav-bar>
          <b-nav-item>
            <c-pop-bar></c-pop-bar>
          </b-nav-item>
        </b-nav>

        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item>
            <c-res-bar :gold="gameState.gold" :goldIncome="gameState.goldIncome"
                       :food="gameState.food" :foodIncome="gameState.foodIncome"
                       :production="gameState.production" :productionIncome="gameState.productionIncome"></c-res-bar>
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <c-map :map="map" @select="onSelectTile" :selected="selectedTile"></c-map>
        </div>
        <div class="col-md-4">
          <c-tile-detail v-if="selectedTile" :tile="selectedTile"></c-tile-detail>
        </div>
      </div>
    </div>

    <b-navbar class="fixed-bottom" type="inverse" variant="info">
      <b-nav is-nav-bar class="ml-auto">
        <b-nav-form>
          <b-button variant="outline-primary" type="button" @click="endTurn">End Turn</b-button>
        </b-nav-form>
      </b-nav>
    </b-navbar>
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
    computed: {
      cityPopulation() {
        return Math.pow(2, this.game.state.population.length - 1) * 10000
      }
    },
    methods: {
      endTurn() {
        this.game.endTurn()
      },
      onSelectTile(tile) {
        this.selectedTile = tile
      }
    },
    mounted() {
      var vm = this
      window.addEventListener('keydown', function (ev) {
        console.log(ev)
        switch (ev.keyCode) {
          // ENTER
          case 13:
            vm.endTurn()
            ev.preventDefault()
            return true
          // SPACE
          case 32:
            if (!vm.selectedTile) return
            vm.game.toggleWorkedTile(vm.selectedTile)
            return true
        }
      })
    }
  }
</script>

<style scoped>
</style>
