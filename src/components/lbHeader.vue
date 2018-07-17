<template>
  <div id="lb-header">

    <!-- Header -->
    <header class="masthead">
      <div class="container">
        <div class="intro-text">
        <div class="intro-lead-in">{{greeting}}</div>
          <div class="intro-heading text-uppercase">{{salutation}}</div>
          <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">{{more}}</a>
        </div>
      </div>
    </header>
  </div>
</template>

<script>

export default {
  name: 'lb-header',
  data () {
    return {
      greeting: 'Welcome to Lyttle Bit!',
      salutation: 'We like building things',
      more: 'Tell Me More'
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
