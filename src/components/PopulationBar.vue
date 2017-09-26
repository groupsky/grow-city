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

  .pop-worker:after {
    content: "🌾"
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
