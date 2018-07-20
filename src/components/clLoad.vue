<template>
  <div id="cl-load">
    <!-- Contact -->
    <section id="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">Load Data</h2>
            <h3 class="section-subheading text-muted">{{ msg }}</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <form id="contactForm" name="sentMessage" novalidate>
              <div class="row">
                <!-- div class="col-md-6">
                  <div class="form-group">
                    <input class="form-control" id="name" type="text" placeholder="Your Name *" required data-validation-required-message="Please enter your name.">
                    <p class="help-block text-danger"></p>
                  </div>
                  <div class="form-group">
                    <input class="form-control" id="email" type="email" placeholder="Your Email *" required data-validation-required-message="Please enter your email address.">
                    <p class="help-block text-danger"></p>
                  </div>
                  <div class="form-group">
                    <input class="form-control" id="phone" type="tel" placeholder="Your Phone *" required data-validation-required-message="Please enter your phone number.">
                    <p class="help-block text-danger"></p>
                  </div>
                </div -->
                <!-- div class="col-md-6">
                  <div class="form-group">
                    <textarea class="form-control" id="message" placeholder="Your Message *" required data-validation-required-message="Please enter a message."></textarea>
                    <p class="help-block text-danger"></p>
                  </div>
                </div -->
                <div class="clearfix"></div>
                <div class="col-lg-12 text-center">
                  <div id="success"></div>
                  <div class="col-lg-12 text-center">
                    <table align="center">
                      <caption>Tables</caption>
                      <th>id</th>
                      <th>name</th>
                      <th>source</th>
                      <th>description</th>
                      <th>load</th>

                      <tr v-for="dataset in tables" :key="dataset.id">
                        <td>{{dataset.id}}</td>
                        <td>{{dataset.name}}</td>
                        <td><a href=''>{{dataset.source}}</a></td>
                        <td><a href=''>{{dataset.description}}</a></td>
                        <td><button id="sendMessageButton" class="btn btn-primary btn-xl text-uppercase" type="submit">Move Data</button></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'cl-load',
  data () {
    return {
      msg: 'Move data from Github to data.world',
      // tableName: 'envnode',
      dataUrl: process.env.DW_DB_URL,
      githubUrl: process.env.GH_URL,
      // githubUrl: 'https://raw.githubusercontent.com/Wilfongjt/source-data/master/data-world/',
      tableIdx: 0, // ref to tables, reset to move though tables
      tables: []
      //  {id: 0, name: 'ad_drains', source: 'github link', description: 'data.world'}
    }
  },
  methods: {
    getTableBody: function (tableObj) {
      // console.log('getTableBody 1')
      let loadObj =
      {
        title: tableObj.name,
        description: 'test data',
        summary: 'test data summary',
        tags: ['test'],
        license: 'PDDL',
        visibility: 'OPEN',
        files: [
          {
            name: tableObj.name + '.csv',
            source: { url: this.githubUrl + tableObj.name + '.csv' },
            description: tableObj.description,
            labels: ['raw data']
          }
        ]
      }
      // console.log('getTableBody out')
      return loadObj
    },
    getTableObjectCreate (tableObj) {
      // console.log('getTableObjectCreate 1')
      let tObj = {
        method: 'post',
        url: this.dataUrl,
        data: this.getTableBody(tableObj),
        headers: {
          Authorization: 'Bearer ' + process.env.DB_A_TOKEN
        }
      }
      // console.log('getTableObjectCreate out')
      return tObj
    },
    createTable () {
      // console.log('createTable 1: ' + this.tableIdx)
      // console.log('createTable 2: ' + JSON.stringify(this.tables[this.tableIdx]))
      // console.log(JSON.stringify(this.getTableObjectCreate(this.tables[this.tableIdx])))
      return axios(this.getTableObjectCreate(this.tables[this.tableIdx]))
        .then(function (response) {
          return 'table created'
        })
        .catch(function (error) {
          switch (error.response.status) {
            case 400:
              return 'existing table'
              // break
            default:
              console.log(console.error(error.response.status + ': ' + error.response.data.message))
          }
          return 'unknown error'
        })
    },
    getTableObjectDelete (tableObj) {
      return {
        method: 'delete',
        url: this.dataUrl + '/' + tableObj.name,
        headers: {
          Authorization: 'Bearer ' + process.env.DB_A_TOKEN
        }
      }
    },
    dropTable () {
      return axios(this.getTableObjectDelete(this.tables[this.tableIdx]))
        .then(function (response) {
          return 'table dropped'
        })
        .catch(function (error) {
          if (error.response.status === 404) {
            return 'table not found'
          }
        })
    },
    getAllObjectSelect () {
      return {}
    },
    getAll () {
      return {}
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
