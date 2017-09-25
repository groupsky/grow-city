<style scoped="true" lang="less">
  .tile {
    display: inline-block;
    /*border: 1px solid darkcyan;*/
    position: relative;
    box-sizing: border-box;
  }

  svg {
    position: absolute;
    width: 64px;
    height: 72px;
    left: 0;
    top: -16px;
  }

  .svg-tile {
    stroke: transparent;
    fill: transparent;
    z-index: -100;
  }

  .type {
    display: block;
    text-align: center;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    z-index: 10;
  }

  .type-plain {
    fill: lightgray;
  }
  .type-hill {
    fill: darkgray;
  }
  .type-mountain {
    fill: black;
  }
  .type-grass {
    fill: green;
  }
</style>

<template>
  <div class="tile">
    <svg width="64" height="72" viewBox="0 0 64 72"
         xmlns="http://www.w3.org/2000/svg">
      <polygon class="svg-tile" :class="backgroundClass" points="0,48 32,72 64,48 64,24 32,0 0,24"/>
    </svg>
    <span class="type">{{tile.type}}</span>
  </div>
</template>

<script>
    export default {
      name: 'tile',
      props: {
        tile: {
          required: true
        }
      },
      computed: {
        backgroundClass() {
          return 'type-'+this.tile.type
        }
      }
    }
</script>
