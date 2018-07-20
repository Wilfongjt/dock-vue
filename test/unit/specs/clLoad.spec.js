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
    vm.tables = [
      {id: 0, name: 'seed', source: 'github link', description: 'data.world'}
    ]
  })

  it('should set a github url environment variable VUE_APP_GH_URL', () => {
    assert.notEqual(process.env.GH_URL, undefined)
  })
  it('should set a db url environment variable VUE_APP_DW_DB_URL', () => {
    assert.notEqual(process.env.DW_DB_URL, undefined)
  })
  it('should set an environment variable VUE_APP_DW_DB_RW_TOKEN', () => {
    assert.notEqual(process.env.DB_RW_TOKEN, undefined)
  })
  it('should set an environment variable VUE_APP_DW_DB_A_TOKEN', () => {
    assert.notEqual(process.env.DB_A_TOKEN, undefined)
  })

  it('should render correct create-ified json', () => {
    let tblObj = {id: 0, name: 'seed', source: 'github link', description: 'data.world'}
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

    let actual = vm.getTableBody(tblObj)

    assert.deepEqual(expected, actual)
  })

  it('should render correct post-able json', () => {
    let tblObj = {
      id: 0,
      name: 'seed',
      source: 'github link',
      description: 'data.world'
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
    expected = {
      method: 'post',
      url: process.env.DW_DB_URL,
      data: expected,
      headers: {
        Authorization: 'Bearer ' + process.env.DB_A_TOKEN
      }
    }

    let actual = vm.getTableObjectCreate(tblObj)
    // expect(jObj).to.deep.equal(bodyObj)
    assert.deepEqual(expected, actual)
  })
  it('should render correct delete-able json', () => {
    let tblObj = {
      id: 0,
      name: 'seed',
      source: 'github link',
      description: 'data.world'
    }
    let expected = {
      method: 'delete',
      url: process.env.DW_DB_URL + '/' + tblObj.name,
      headers: {
        Authorization: 'Bearer ' + process.env.DB_A_TOKEN
      }
    }

    let actual = vm.getTableObjectDelete(tblObj)

    assert.deepEqual(expected, actual)
  })
  it('should render select-able json', () => {
    let expected = {}
    let actual = vm.getAllObjectSelect()
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
    vm.tables = [
      {id: 0, name: 'seed', source: 'github link', description: 'data.world'}
    ]
  })
  // Output: ✓ assertion success
  it('should create a table in data.world', async () => {
    const result = await vm.createTable() // returns response rather than promise
    expect(result).to.equal('table created')
  })
  it('should select data from a data.world table', async () => {
    // const result = await vm.dropTable() // returns response rather than promise
    // expect(result).to.equal('table dropped')

    let expected = {}
    let actual = vm.getAll()
    assert.deepEqual(expected, actual)
  })
  it('should drop a table from data.world', async () => {
    const result = await vm.dropTable() // returns response rather than promise
    expect(result).to.equal('table dropped')
  })
})
