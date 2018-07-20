<template>
  <div id="app">
    <lb-nav></lb-nav>
    <hello-data-world></hello-data-world>
    <cl-load></cl-load>
  </div>
</template>

<script>
import lbNav from './components/lbNav'
import helloDataWorld from './components/HelloDataWorld'
import clLoad from './components/clLoad'

export default {
  name: 'app',
  components: {
    lbNav,
    helloDataWorld,
    clLoad
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
