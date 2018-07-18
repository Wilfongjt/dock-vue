<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Data World</h2>
    <ul>
      <li>Data service: <a href="https://data.world" target="_blank">Data.World</a></li>
      <li>API: <a href="https://apidocs.data.world/api/datasets/createdataset" target="_blank">Data.World API Reference</a></li>
    </ul>
    <h2>Prerequisites</h2>
    <ul>
      <li>Get account: <a href="https://data.world" target="_blank">data.world</a></li>
    </ul>
    <h2>Notables</h2>
    <ul>
      <li>Framework: <a href="https://vuejs.org" target="_blank">Vuejs</a></li>
      <li>Environement variables: <a href="https://www.npmjs.com/package/dotenv" target="_blank">dotEnv</a> </li>
      <li>API calls: <a href="https://github.com/axios/axios" target="_blank">axios</a> </li>
      <li>Testing: <a href="https://babeljs.io/docs/en/babel-polyfill.html" target="_blank">balel-polyfill</a> </li>
      <li>Tests: <a href="https://mochajs.org" target="_blank">Mocha</a></li>
      <li>Container: <a href="https://www.docker.com" target="_blank">Docker</a></li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloDataWorld',
  data () {
    return {
      msg: 'Hello Data.World!',
      tableName: 'envnode'
    }
  },
  computed: {
    tableURL: function () {
      let turl = process.env.DW_DB_URL + '/' + this.tableName
      return turl
    },
    postCreateTableBody: function () {
      let tableDef = '{ "title": "%s", "description": "test data", "summary": "test data summary", "tags": [ "test"], "license": "PDDL", "visibility": "OPEN", "files": [ { "name": "seed.csv", "source": { "url": "https://raw.githubusercontent.com/Wilfongjt/source-data/master/data-world/seed.csv" }, "description": "more about test data", "labels": [ "raw data" ] } ] }'
        .replace('%s', this.tableName)
      return tableDef
    }
  },
  methods: {
    log (entry) {
      console.log(entry)
    },
    installData () {
      this.createTable()
    },
    getTableObjectCreate () {
      return {
        method: 'post',
        url: process.env.DW_DB_URL,
        data: JSON.parse(this.postCreateTableBody),
        headers: {
          Authorization: 'Bearer ' + process.env.DB_A_TOKEN
        }
      }
    },
    createTable () {
      return axios(this.getTableObjectCreate())
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
    uninstallData () {
      this.dropTable()
    },
    getTableObjectDelete () {
      return {
        method: 'delete',
        url: process.env.DW_DB_URL + '/' + this.tableName,
        headers: {
          Authorization: 'Bearer ' + process.env.DB_A_TOKEN
        }
      }
    },
    dropTable () {
      return axios(this.getTableObjectDelete())
        .then(function (response) {
          return 'table dropped'
        })
        .catch(function (error) {
          if (error.response.status === 404) {
            return 'table not found'
          }
        })
    }
  },
  mounted () {
    // this.installData()
    // this.installData(process.env.DW_DB_URL, process.env.DB_A_TOKEN)
    // this.uninstallData(this.tableURL, process.env.DB_A_TOKEN)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
