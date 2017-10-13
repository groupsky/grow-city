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
    <b-list-group flush v-if="tile.owned">
      <b-list-group-item
        v-for="improvement in availableImprovements"
        v-if="improvement.cost && !tile.improvements[improvement.key]">
        <b-container>
          <b-row>
            <b-col> {{improvement.key}}</b-col>
            <b-col>
              <c-res-bar :food="improvement.cost.food" :gold="improvement.cost.gold"
                         :production="improvement.cost.production"></c-res-bar>
            </b-col>
            <b-col>
              <b-btn :disabled="!canBuildImprovement(improvement)" @click="buyImprovement(improvement)">Buy</b-btn>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>
    <b-card-footer v-if="!tile.owned">
      <b-btn :disabled="!canBuy" @click="buyTile">
        Buy <c-res-bar :gold="buyCost"></c-res-bar>
      </b-btn>
    </b-card-footer>
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
      },
      availableImprovements () {
        return this.game.map.improvements(this.tile)
      },
      buyCost () {
        return this.game.tileBuyCost(this.tile)
      },
      canBuy () {
        return this.game.canBuy({gold: this.buyCost})
      },
    },
    methods: {
      toggleWorked () {
        this.game.toggleWorkedTile(this.tile)
      },
      canBuildImprovement (improvement) {
        return this.game.canBuildImprovement(this.tile, improvement)
      },
      buyImprovement (improvement) {
        this.game.buildImprovement(this.tile, improvement)
      },
      buyTile () {
        this.game.buyTile(this.tile)
      },
    },
  }
</script>
