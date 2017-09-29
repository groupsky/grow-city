<style scoped lang="less">
</style>

<template>
  <b-card no-body>
    <h4 slot="header">{{tile.type}} <sup>{{tile.id}}</sup></h4>
    <b-card-body>
      <c-res-bar :food="production.food"
                 :gold="production.gold"
                 :production="production.production"></c-res-bar>
    </b-card-body>
  </b-card>
</template>

<script>
  import cResBar from './ResourcesBar.vue'

  export default {
    name: 'tileDetail',
    inject: [ 'game' ],
    props: {
      tile: {
        required: true
      }
    },
    components: { cResBar },
    computed: {
      production () {
        return this.game.map.getTileProduction(this.tile)
      }
    }
  }
</script>
