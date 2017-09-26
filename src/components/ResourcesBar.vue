<style scoped lang="less">
  .negative {
    color: #c82333;
    text-shadow: 0 0 0 #fff;
  }

  .icon:before {
    display: inline;
  }

  .icon-food:before {
    content: "🍲";
    color: limegreen;
    text-shadow: 0 0 0 #000;
  }

  .icon-gold:before {
    content: "💰";
    color: gold;
    text-shadow: 0 0 0 #000;
  }

  .icon-production:before {
    content: "🔨";
    color: saddlebrown;
    text-shadow: 0 0 0 #000;
  }
</style>

<template>
  <ul class="list-inline">
    <li class="list-inline-item food">
      <i class="icon icon-food"></i> {{gameState.food}}
      <sup :class="gameState.foodIncome < 0 && 'negative'">{{gameState.foodIncome | sign}}</sup>
    </li>
    <li class="list-inline-item gold">
      <i class="icon icon-gold"></i> {{gameState.gold}}
      <sup :class="gameState.goldIncome < 0 && 'negative'">{{gameState.goldIncome | sign}}</sup>
    </li>
    <li class="list-inline-item production">
      <i class="icon icon-production"></i> {{gameState.production}}
      <sup :class="gameState.productionIncome < 0 && 'negative'">{{gameState.productionIncome | sign}}</sup>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'resourcesBar',
    inject: [ 'game' ],
    data() {
      return {
        gameState: this.game.state,
      }
    },
    filters: {
      sign (value) {
        if (value === 0) return '='
        if (value > 0) return '+' + value
        return value
      }
    }
  }
</script>
