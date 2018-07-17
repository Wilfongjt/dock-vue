<template>
  <div id="lb-services">
    <!-- Services -->
    <section id="services">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">{{title}}</h2>
            <h3 class="section-subheading text-muted">We would love to help you with your next project.</h3>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fa fa-circle fa-stack-2x text-primary"></i>
              <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">iOS</h4>
            <p class="text-muted">iOS made the list of things we're interested in. Apps, frameworks, infrastructure and deployemnt are just a few of the things we have experience with.</p>
          </div>
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fa fa-circle fa-stack-2x text-primary"></i>
              <i class="fa fa-laptop fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Site Development</h4>
            <p class="text-muted">So javascript is awesome. Vue.js, hot reloading, docker, the cloud. We love it all.</p>
          </div>
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fa fa-circle fa-stack-2x text-primary"></i>
              <i class="fa fa-lock fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Site Operations</h4>
            <p class="text-muted">For whatever reason we enjoy website deployment, operations and managing uptime.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  'name': 'lb-services',
  'title': 'Services',
  'description': 'We would love to help you with your next project.',
  'services': []
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
