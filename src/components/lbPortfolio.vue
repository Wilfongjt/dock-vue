<template>
  <div id="lb-portfolio">
    <!-- Portfolio Grid -->
    <section class="bg-light" id="portfolio">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase"  v-once>{{portfolio.title}}</h2>
            <h3 class="section-subheading text-muted">{{portfolio.description}}</h3>
          </div>
        </div>
        <div class="row">
          <!-- div v-for="project in portfolio.projects" class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" v-bind:href="projects.link">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fa fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" v-bind:src="project.image" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>{{project.title}}</h4>
              <p class="text-muted">Illustration</p>
            </div>
          </div -->
        </div>

      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'lb-portfolio',
  data () {
    return {
      'portfolio': {
        'title': 'Portfolio',
        'description': 'Lorem ipsum dolor sit amet consectetur.',
        'projects': [
          {'title': 'Threads', 'description': 'Illustration', 'link': '#portfolioModal1', 'image': 'static/assets/portfolio/01-thumbnail.jpg'},
          {'title': 'Explore', 'description': 'Graphic Design', 'link': '#portfolioModal2', 'image': 'static/assets/portfolio/02-thumbnail.jpg'},
          {'title': 'Finish', 'description': 'Identity', 'link': '#portfolioModal3', 'image': 'static/assets/portfolio/03-thumbnail.jpg'},
          {'title': 'Lines', 'description': 'Branding', 'link': '#portfolioModal4', 'image': 'static/assets/portfolio/04-thumbnail.jpg'},
          {'title': 'Southwest', 'description': 'Website Design', 'link': '#portfolioModal5', 'image': 'static/assets/portfolio/05-thumbnail.jpg'},
          {'title': 'Window', 'description': 'Photography', 'link': '#portfolioModal6', 'image': 'static/assets/portfolio/06-thumbnail.jpg'}
        ]
      }
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
