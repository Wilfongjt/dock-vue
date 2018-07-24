import 'babel-polyfill'
import Vue from 'vue'
import clLoad from '@/components/clLoad'
import assert from 'assert'
// import axios from 'axios'

describe('clLoad.vue data', () => {
  const Constructor = Vue.extend(clLoad)
  const vm = new Constructor().$mount()
  before(function () {
    // vm.tableName = 'env-node-test'
    // console.log('before set tableName: ' + vm.tableName)
    // vm.sql.url = 'https://api.data.world/v0/sql/wilfongjt/'
    /*
    vm.tables = [
      {id: 0, name: 'seed', source: 'github link', description: 'data.world'}
    ]
    */
  })

  it('should set a github url environment variable VUE_APP_GH_URL', () => {
    // console.log('process.env.GH_URL: ' + process.env.GH_URL)
    assert.notEqual(process.env.GH_URL, undefined)
  })
  it('should set a db url environment variable VUE_APP_DW_DB_URL', () => {
    // console.log('process.env.DW_DB_URL: ' + process.env.DW_DB_URL)
    assert.notEqual(process.env.DW_DB_URL, undefined)
  })
  it('should set an environment variable VUE_APP_DW_DB_RW_TOKEN', () => {
    assert.notEqual(process.env.DB_RW_TOKEN, undefined)
  })
  it('should set an environment variable VUE_APP_DW_DB_A_TOKEN', () => {
    assert.notEqual(process.env.DB_A_TOKEN, undefined)
  })

  it('should render correct create-ified json', () => {
    // let tblObj = {id: 0, name: 'seed', source: 'github link', description: 'data.world'}
    let tblObj = {id: 0,
      name: 'seed',
      source: {
        label: 'github',
        url: process.env.GH_URL
      },
      description: 'data.world',
      destination: {
        label: 'data.world',
        url: process.env.DW_DB_URL
      }
    }

    let expected = {
      title: tblObj.name,
      description: 'test data',
      summary: 'test data summary',
      tags: ['test'],
      license: 'PDDL',
      visibility: 'OPEN',
      files: [
        {
          name: 'seed.csv',
          source: { url: process.env.GH_URL + tblObj.name + '.csv' },
          description: tblObj.description,
          labels: ['raw data']
        }
      ]
    }
    // console.log('expected: ' + JSON.stringify(expected))
    let actual = vm.getTableBody(tblObj)
    // console.log('actual: ' + JSON.stringify(actual))
    assert.deepEqual(expected, actual)
  })

  it('should render correct post-able json', () => {
    // console.log('post-able: 1')
    let tblObj = {id: 0,
      name: 'seed',
      source: {
        label: 'github',
        url: process.env.GH_URL
      },
      description: 'data.world',
      destination: {
        label: 'data.world',
        url: process.env.DW_DB_URL
      }
    }
    // console.log('post-able: 2')
    let expected = {
      title: tblObj.name,
      description: 'test data',
      summary: 'test data summary',
      tags: ['test'],
      license: 'PDDL',
      visibility: 'OPEN',
      files: [
        {
          name: 'seed.csv',
          source: { url: process.env.GH_URL + tblObj.name + '.csv' },
          description: tblObj.description,
          labels: ['raw data']
        }
      ]
    }
    // console.log('post-able: 3')
    expected = {
      method: 'post',
      url: process.env.DW_DB_URL,
      data: expected,
      headers: {
        Authorization: 'Bearer ' + process.env.DB_A_TOKEN
      }
    }
    // console.log('post-able: 4')
    // console.log('expected: ' + JSON.stringify(expected))
    let actual = vm.getTableObjectCreate(tblObj)
    // expect(jObj).to.deep.equal(bodyObj)
    // console.log('post-able 5: ' + JSON.stringify(actual))
    assert.deepEqual(expected, actual)
  })
  it('should render correct delete-able json', () => {
    let tblObj = {id: 0,
      name: 'seed',
      source: {
        label: 'github',
        url: process.env.GH_URL
      },
      description: 'data.world',
      destination: {
        label: 'data.world',
        url: process.env.DW_DB_URL
      }
    }
    let expected = {
      method: 'delete',
      url: process.env.DW_DB_URL + tblObj.name,
      headers: {
        Authorization: 'Bearer ' + process.env.DB_A_TOKEN
      }
    }
    let actual = vm.getTableObjectDelete(tblObj)
    assert.deepEqual(expected, actual)
  })
  it('should render select-able json', () => {
    let tblObj = vm.tables[0] // seed table
    let expected = {
      method: 'post',
      url: vm.sql.url + tblObj.name + '?includeTableSchema=false',
      data: encodeURI('query=SELECT fld1, fld2 FROM ' + tblObj.name + ' LIMIT 2'),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + process.env.DB_RW_TOKEN
      }
    }
    // expected['data-urlencode'] = 'query=SELECT fld1, fld2 FROM ' + tblObj.name + ' LIMIT 2'
    // console.log('expected: ' + JSON.stringify(expected))
    vm.sql.statement = 'query=SELECT fld1, fld2 FROM ' + tblObj.name + ' LIMIT 2'
    let actual = vm.getObjectSelect(tblObj)
    assert.deepEqual(expected, actual)
  })
})

/*
describe('sample tests:', function() {
  const Constructor = Vue.extend(clLoad)
  const vm = new Constructor().$mount()
  it('callback', function(done) {
    http.get('http://www.example.com', function(res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
*/
/*
describe('clLoad.vue API Create Table', () => {
  const Constructor = Vue.extend(clLoad)
  const vm = new Constructor().$mount()
  // Create Table Tests
  before(function () {
    // vm.tableName = 'env-node-test'
    // console.log('before set tableName: ' + vm.tableName)
    vm.tables = [
      {id: 0, name: 'seed', source: 'github link', description: 'data.world'}
    ]
  })

  it('resolves', (done) => {
    resolvingPromise.then( (result) => {
      expect(result).to.equal('promise resolved');
    }).finally(done);
  })

  it('callback create table', function (done) {
    let tblObj = vm.getTableObjectCreate()
    axios(tblObj)
      .then(function (response) {
        done()
        // expect(response.statusCode).to.equal(200)
      })
      .catch(function (error) {
        // expect(error.response.status).to.equal(200)
        done(error)
      })
  })
})
*/

describe('create-drop-table', () => {
  const Constructor = Vue.extend(clLoad)
  const vm = new Constructor().$mount()
  before(function () {
    // vm.sql.url = 'https://api.data.world/v0/sql/wilfongjt/'
    /*
    vm.tables = [
      {id: 0, name: 'seed', source: 'github link', description: 'data.world'}
    ]
    */
    // console.log('tables: ')
    // console.log(JSON.stringify(vm.tables))
    vm.tableIdx = 0
  })
  it('should create a table in data.world', async () => {
    // response reports data errors not a completed load
    // another call needed to test if table is ready
    // https://apidocs.data.world/api/datasets/getdataset
    const result = await vm.createTable() // returns response rather than promise
    expect(result).to.equal('ok')
  })

  it('should select data from a data.world table', async () => {
    // console.log('test start select')
    let expected =
    [
      {
        'fld1': 'A',
        'fld2': 1
      },
      {
        'fld1': 'B',
        'fld2': 2
      }
    ]
    let actualSelect = await vm.getSample()
    // console.log('test actualSelect: ' + JSON.stringify(actualSelect.data))
    assert.deepEqual(expected, actualSelect.data)
  })
  /*
  it('should drop a table from data.world', async () => {
    // drops might be causing "Couldn't find schema information for wilfongjt/seed"
    // const result = await vm.dropTable() // returns response rather than promise
    // expect(result).to.equal('table dropped')
  })
  */
})
/*
describe('select-from-table', () => {
  const Constructor = Vue.extend(clLoad)
  const vm = new Constructor().$mount()
  before(async () => {
    vm.sql.url = 'https://api.data.world/v0/sql/wilfongjt/'
    vm.tables = [
      {id: 0, name: 'seed', source: 'github link', description: 'data.world'}
    ]
    console.log(await vm.createTable())
    console.log('before select')
  })

  after(async () => {
    // console.log(await vm.dropTable())
    console.log('after select')
  })

  it('should select data from a data.world table', async () => {
    console.log('start select')
    let expected =
    [
      {
        'fld1': 'A',
        'fld2': 1
      },
      {
        'fld1': 'B',
        'fld2': 2
      }
    ]
    let actualSelect = await vm.getSample()
    console.log('returned: ' + JSON.stringify(actualSelect))
    assert.deepEqual(expected, actualSelect.data)
  })
})
*/
