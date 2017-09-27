<style scoped lang="less">
  .pop:before, .pop:after {
    display: inline;
    font-size: 2em;
    font-style: normal;
  }

  .pop:nth-child(odd):before {
    content: "👨"
  }

  .pop:nth-child(even):before {
    content: "👩"
  }

  .pop-worker {
    color: #1e7e34;
  }

  .pop-worker:after {
    content: "🌾";
  }

  .pop-unemployed {
    color: #c82333;
  }

</style>

<template>
  <div>
    <i v-for="pop in population" class="pop" :class="'pop-'+pop.type"></i>
  </div>
</template>

<script>
  export default {
    name: 'populationBar',
    inject: [ 'game' ],
    data () {
      return {
        population: this.game.state.population
      }
    },
    computed: {}
  }
</script>
