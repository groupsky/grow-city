<style lang="less">
  @tiles-per-row: 9;

  .map {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    list-style-type: none;
    background: #111;
  }

  .tile {
    position: relative;
    visibility: hidden;
    outline: 1px solid transparent; /* fix for jagged edges in FF on hover transition */
  }

  .tile::after {
    content: '';
    display: block;
    padding-bottom: 86.602%; /* =  100 / tan(60) * 1.5 */
  }

  .tile-in {
    position: absolute;
    width: 96%;
    padding-bottom: 96% / sin(60deg); /* =  width / sin(60) */
    margin: 0 2%;
    overflow: hidden;
    visibility: hidden;
    outline: 1px solid transparent; /* fix for jagged edges in FF on hover transition */
    -webkit-transform: rotate3d(0, 0, 1, -60deg) skewY(30deg);
    -ms-transform: rotate3d(0, 0, 1, -60deg) skewY(30deg);
    transform: rotate3d(0, 0, 1, -60deg) skewY(30deg);
  }

  .map {
    padding: 2% 2% 4%;
  }

  .tile-inside {
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: absolute;
    visibility: visible;
    outline: 1px solid transparent; /* fix for jagged edges in FF on hover transition */
    -webkit-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
    -ms-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
    transform: skewY(-30deg) rotate3d(0,0,1,60deg);
  }

  .tile {
    width: 100% / @tiles-per-row; /* = 100 / 9 */
  }

  @tile-nth-child-n: 2 * @tiles-per-row - 1;
  @tile-nth-child-o: @tiles-per-row + 1;
  .tile:nth-child(@{tile-nth-child-n}n+@{tile-nth-child-o}) { /* first hexagon of even rows */
    margin-left: 50% / @tiles-per-row; /* = width of .hex / 2  to indent even rows */
  }
</style>

<template>
  <ul class="map">
    <template v-for="row in map.tiles">
      <template v-for="tile in row">
        <li class="tile">
          <div class="tile-in">
            <div class="tile-inside">
              <c-tile v-if="tile" :tile="tile" @clicked="toggleWorked(tile)"></c-tile>
            </div>
          </div>
        </li>
      </template>
    </template>
  </ul>
</template>

<script>
  import cTile from './Tile.vue'
  export default {
    name: 'map',
    inject: ['game'],
    components: { cTile },
    props: {
      map: {
        required: true
      }
    },
    methods: {
      toggleWorked(tile) {
        this.game.toggleWorkedTile(tile)
      }
    }
  }
</script>
