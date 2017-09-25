<style lang="less">
  .map-row {
    display: flex;
    height: 48px;
    margin: 0 auto;
  }

  .tile {
    width: 64px;
    height: 48px;
    flex-basis: 64px;
    flex-grow: 1;
  }
</style>

<template>
  <div class="map">
    <template v-for="(row, r) in map.tiles">
      <div class="map-row" :style="rowWidth(row)">
        <template v-for="(tile, q) in row">
          <c-tile class="tile" v-if="tile" :tile="tile"></c-tile>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
  import cTile from './Tile.vue'
  export default {
    name: 'map',
    components: { cTile },
    props: {
      map: {
        required: true
      }
    },
    methods: {
      rowWidth(row) {
        let cnt = 0
        for (let q in row) {
          if (row[q]) cnt++
        }
        return {
          width: (cnt*64)+"px",
        }
      },
      spacerStyles(r) {
        const half = r&1
        const cnt = (r-6)/2
        return {
          "flex-basis": (cnt*128 + half * 64)+"px"
        }
      }
    }
  }
</script>
