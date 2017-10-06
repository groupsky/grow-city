<style scoped="true" lang="less">
  .tile-container {
    width: 100%;
    height: 100%;
  }

  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .background {
    background: rgba(0, 0, 0, 0.25);
  }

  .fog {
    background: rgba(0, 0, 0, 0.4);
  }

  .owned .fog {
    visibility: hidden;
  }

  .type-plain {
    background: rgba(85, 120, 85, 1);
    fill: rgba(85, 120, 85, 1);
  }

  .type-hill {
    background: rgba(85, 140, 35, 1);
    fill: rgba(85, 140, 35, 1);
  }

  .type-mountain {
    background: rgba(125, 100, 95, 1);
    fill: rgba(125, 100, 95, 1);
  }

  .type-grass {
    background: green;
    fill: green;
  }

  .features {

  }

  .features > *:before {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    font-size: 24px;
    margin-top: -16px;
    font-weight: normal;
    text-shadow: 0 0 0 black;
  }

  .feature-river:before {
    content: "♒";
    color: #13e;
  }

  .features > .feature-forest:before {
    content: "🌲";
    color: transparent;
    text-shadow: 24px 12px 0 #292, 24px 12px 0 black,
    20px -16px 0 #292, 20px -16px 0 black,
    -14px 22px 0 #292, -14px 22px 0 black,
    -26px -10px 0 #292, -26px -10px 0 black;
  }

  .worked {
    display: table-cell;
    text-align: center;
  }

  .worked:before {
    content: "👷";
    color: #ccc;
    font-weight: normal;
    text-shadow: 0 0 0 black;
  }

  .improvement:before {
    position: absolute;
    font-size: 24px;
    top: 50%;
    width: 100%;
    text-align: center;
    margin-top: -24px;
    font-weight: normal;
    text-shadow: 0 0 1px black;
  }

  .improvement-city:before {
    content: "🏙";
    font-size: 36px;
    margin-top: -42px;
    color: #cc5;
  }

  .improvement-factory:before {
    content: "🏭";
    color: #787;
  }

  .highlight {
    animation: tile-highlight 0.45s infinite linear alternate;
  }

  @keyframes tile-highlight {
    from {
      background-color: rgba(255, 255, 255, 0.0);
    }
    to {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

</style>

<template>
  <div class="tile-container" :class="{owned: tile.owned, selected: selected}" @click="handleClick">
    <div class="layer background" :class="'type-'+tile.type"></div>
    <div class="layer features">
      <div v-for="(available, feature) in tile.features"
           v-if="available"
           class="feature"
           :class="'feature-'+feature"></div>
    </div>
    <div class="layer improvements">
      <div v-for="(available, improvement) in tile.improvements"
           v-if="available"
           class="improvement"
           :class="'improvement-'+improvement"></div>
    </div>
    <div class="layer worked" v-if="tile.worked"></div>
    <div class="layer fog"></div>
    <div v-if="selected" class="layer highlight"></div>
  </div>
</template>

<script>
  export default {
    name: 'tile',
    props: {
      tile: {
        required: true,
      },
      selected: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      handleClick() {
        this.$emit('clicked')
      }
    }
  }
</script>
