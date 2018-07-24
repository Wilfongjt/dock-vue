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
                    <div>msg: {{ msg }}</div>
                    <!-- div>GH_URL {{ process.env.GH_URL }}</div -->
                    <!-- div>source: {{ source }}</div>
                    <div>source: {{JSON.stringify(source)}}</div>
                    <span v-if="tables.length===0">Tables are not configured.</span>
                    <div>tables[0]({{ JSON.stringify(tables[0]) }})</div -->
                    <table align="center">
                      <caption>Tables</caption>
                      <!-- th>id</th>
                      <th>name</th>
                      <th>source</th>
                      <th>description</th>
                      <th>load</th -->

                      <tr v-for="dataset in tables" :key="dataset.id">
                        <td>{{dataset.id}}</td>
                        <td>{{dataset.name}}</td>

                        <td><a v-bind:href='dataset.source.site' target='_blank'>{{dataset.source.label}}</a></td>
                        <td><a v-bind:href='dataset.destination.site' target='_blank'>{{dataset.destination.label}}</a></td>
                        <td><button id="sendMessageButton" class="btn btn-primary btn-xl text-uppercase" type="submit">Move Data</button></td>
                        <!-- td>{{JSON.stringify(dataset)}}</td -->
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
      /* source: { // source.url
        url: 'https://raw.githubusercontent.com/Wilfongjt/source-data/master/data-world/'
      },
      destination: {
        url: 'https://api.data.world/v0/datasets/wilfongjt/'
      },
      */
      sql: { // this.sql.url
        url: 'https://api.data.world/v0/sql/wilfongjt/',
        statement: 'x'
      },
      tableIdx: 0, // ref to tables, reset to move though tables
      tables: [
        {id: 0,
          name: 'seed',
          source: {
            label: 'github',
            site: 'https://github.com/Wilfongjt/source-data/',
            url: 'https://raw.githubusercontent.com/Wilfongjt/source-data/master/data-world/'
            // url: process.env.GH_URL || 'https://raw.githubusercontent.com/Wilfongjt/source-data/master/data-world/'
          },
          description: 'data.world',
          destination: {
            label: 'data.world',
            site: 'https://data.world/',
            url: 'https://api.data.world/v0/datasets/wilfongjt/'
            // url: process.env.DW_DB_URL || 'https://api.data.world/v0/datasets/wilfongjt/'
          }
        },
        {id: 1,
          name: 'ad_drains',
          source: {
            label: 'github',
            site: 'https://github.com/Wilfongjt/source-data/',
            url: 'https://raw.githubusercontent.com/Wilfongjt/source-data/master/data-world/'
            // url: process.env.GH_URL || 'https://raw.githubusercontent.com/Wilfongjt/source-data/master/data-world/'
          },
          description: 'data.world',
          destination: {
            label: 'data.world',
            site: 'https://data.world/',
            url: 'https://api.data.world/v0/datasets/wilfongjt/'
            // url: process.env.DW_DB_URL || 'https://api.data.world/v0/datasets/wilfongjt/'
          }
        }
      ]
    }
  },
  methods: {
    /*
    getTables: function () {
      let tables =
      // console.log('tables: ' + JSON.stringify(tables))
      return tables
    },
    */
    getTableBody: function (tableObj) {
      // console.log('getTableBody 1: ' + JSON.stringify(tableObj))
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
            source: {
              url: tableObj.source.url + tableObj.name + '.csv'
            },
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
        url: tableObj.destination.url,
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
      // console.log('createTable: ' + JSON.stringify(this.getTableObjectCreate(this.tables[this.tableIdx])))
      return axios(this.getTableObjectCreate(this.tables[this.tableIdx]))
        .then(function (response) {
          return 'ok'
        })
        .catch(function (error) {
          switch (error.response.status) {
            case 400: // table exists
              return 'ok'
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
        url: tableObj.destination.url + tableObj.name,
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
    getObjectSelect (tableObj) {
      /*
        curl --request POST \
          --url 'https://api.data.world/v0/sql/wilfongjt/seed?includeTableSchema=true' \
          --header 'authorization: Bearer <Token>' \
          --header 'content-type: application/x-www-form-urlencoded' \
          --data 'query=SELECT * FROM seed LIMIT 2'

        curl --request POST \
            --url 'https://api.data.world/v0/sql/wilfongjt/seed?includeTableSchema=true' \
            --header 'authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OndpbGZvbmdqdCIsImlzcyI6ImFnZW50OndpbGZvbmdqdDo6NDk5OGU1YTUtY2FmNC00MzZhLWE2MzQtMTMzNDYwYTU5ZjJkIiwiaWF0IjoxNTMwMzgxNTU3LCJyb2xlIjpbInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWV9.ZhUZRbs7cj7ABcJF3IFgtQtPq5WYnCn9YyfWARtt37QAw10S7P2xqan1U1w3vAXMu3oWG6OhzHQVhtzaiSaXqw' \
            --header 'content-type: application/x-www-form-urlencoded' \
            --data 'query=SELECT * FROM seed LIMIT 2'

      */

      let jsonObj = {
        method: 'post',
        url: this.sql.url + tableObj.name + '?includeTableSchema=false',
        data: encodeURI(this.sql.statement),
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + process.env.DB_RW_TOKEN
        }
      }
      // console.log('getObjectSelect: ' + JSON.stringify(jsonObj))
      return jsonObj
    },
    getSample () {
      this.sql.statement = 'query=SELECT fld1, fld2 FROM %s LIMIT 2'
        .replace('%s', this.tables[this.tableIdx].name)
      // console.log('sql.statement: ' + this.sql.statement)
      // return this.getObjecSelect(this.tables[0])
      // console.log('request: ' + JSON.stringify(this.getObjectSelect(this.tables[this.tableIdx])))
      return axios(this.getObjectSelect(this.tables[this.tableIdx]))
        .then(function (response) {
          // console.log('returned data')
          return response
        })
        .catch(function (error) {
          // console.log('---------')
          // console.log('returned error ')
          console.log(JSON.stringify(error.request))

          if (error.response.status === 400) {
            return {status: 400, error: 'malformed query object', msg: error.request.responseText}
          }
          if (error.response.status === 404) {
            return {status: 404, error: 'resultset not found'}
          }
          return {status: error.response.status, error: error.response.data}
        })
    }
  },
  mounted () {
    console.log('process.env.GH_URL: ' + process.env.GH_URL)
    console.log('process.env.DW_DB_URL: ' + process.env.DW_DB_URL)
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
