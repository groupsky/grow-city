<style scoped lang="less">
</style>

<template>
  <b-card no-body>
    <h4 slot="header">
      {{tile.type}}
      <small v-for="(available, feature, index) in tile.features"
             v-if="available"><!-- eat whitespace
        -->
        <template v-if="index > 0">,</template>
        {{feature}}<!-- eat whitespace
      --></small>

      <button class="btn btn-sm float-right"
              :class="['btn'+(tile.worked?'':'-outline')+'-'+(canToggleWorked?'primary':'secondary'), canToggleWorked?'':'disabled']"
              :disabled="!canToggleWorked"
              type="button"
              @click="toggleWorked">
        🌾
      </button>
    </h4>
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
        required: true,
      }
    },
    components: { cResBar },
    computed: {
      production () {
        return this.game.map.getTileProduction(this.tile)
      },
      canToggleWorked () {
        return this.tile.worked || this.game.canWorkOnTile(this.tile)
      }
    },
    methods: {
      toggleWorked () {
        this.game.toggleWorkedTile(this.tile)
      },
    },
  }
</script>
