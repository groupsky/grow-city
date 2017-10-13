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
    <li v-if="hasFood" class="list-inline-item food">
      <i class="icon icon-food"></i> {{food}}
      <sup v-if="hasFoodIncome" :class="foodIncome < 0 && 'negative'">{{foodIncome | sign}}</sup>
    </li>
    <li v-if="hasGold" class="list-inline-item gold">
      <i class="icon icon-gold"></i> {{gold}}
      <sup v-if="hasGoldIncome" :class="goldIncome < 0 && 'negative'">{{goldIncome | sign}}</sup>
    </li>
    <li v-if="hasProduction" class="list-inline-item production">
      <i class="icon icon-production"></i> {{production}}
      <sup v-if="hasProductionIncome" :class="productionIncome < 0 && 'negative'">{{productionIncome | sign}}</sup>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'resourcesBar',
    props: {
      food: {},
      foodIncome: {},
      gold: {},
      goldIncome: {},
      production: {},
      productionIncome: {},
    },
    filters: {
      sign (value) {
        if (value === 0) return '='
        if (value > 0) return '+' + value
        return value
      }
    },
    computed: {
      hasFood () {
        return this.food !== undefined
      },
      hasGold () {
        return this.gold !== undefined
      },
      hasProduction () {
        return this.production !== undefined
      },
      hasFoodIncome () {
        return this.foodIncome !== undefined
      },
      hasGoldIncome () {
        return this.goldIncome !== undefined
      },
      hasProductionIncome () {
        return this.productionIncome !== undefined
      }
    }
  }
</script>
