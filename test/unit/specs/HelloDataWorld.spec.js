import 'babel-polyfill'
import Vue from 'vue'
import HelloDataWorld from '@/components/HelloDataWorld'

// import axios from 'axios'

describe('HelloDataWorld.vue data', () => {
  const Constructor = Vue.extend(HelloDataWorld)
  const vm = new Constructor().$mount()
  before(function () {
    vm.tableName = 'env-node-test'
    console.log('before set tableName: ' + vm.tableName)
  })
  // Create Table Tests
  it('should render correct table name', () => {
    expect(vm.tableName).to.equal('env-node-test')
  })
  it('should render correct table url', () => {
    expect(vm.tableURL).to.equal('https://api.data.world/v0/datasets/wilfongjt/env-node-test')
  })
  it('should render correct json', () => {
    let jObj = vm.postCreateTableBody
    expect(jObj).to.contain(vm.tableName)
  })
  it('should render method post', () => {
    let val = vm.getTableObjectCreate()
    expect(val.method).to.equal('post')
  })
  it('should render correctly constructed json', () => {
    let val = vm.getTableObjectCreate()
    expect(val.url).to.equal(process.env.DW_DB_URL)
  })
})
/*
describe('sample tests:', function() {
  const Constructor = Vue.extend(HelloDataWorld)
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
describe('HelloDataWorld.vue API Create Table', () => {
  const Constructor = Vue.extend(HelloDataWorld)
  const vm = new Constructor().$mount()
  // Create Table Tests
  before(function () {
    console.log('before')
    vm.tableName = 'env-node-create-test'
    console.log('tableName: ' + vm.tableName)
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
  const Constructor = Vue.extend(HelloDataWorld)
  const vm = new Constructor().$mount()
  before(function () {
    vm.tableName = 'create-drop-test'
    console.log('before tableName: ' + vm.tableName)
  })
  // Output: ✓ assertion success
  it('create table', async () => {
    const result = await vm.createTable() // returns response rather than promise
    expect(result).to.equal('table created')
  })
  it('drop table', async () => {
    const result = await vm.dropTable() // returns response rather than promise
    expect(result).to.equal('table dropped')
  })
  /*
   // Output: AssertionError: expected 'promise resolved' to equal 'i fail'
   it('failing assertion', async () => {
     const result = await resolvingPromise;
     expect(result).to.equal('i fail');
   });
  */
  /*
   //Output: Error: promise rejected
   it('promise rejects', async () => {
     const result = await rejectingPromise;
     expect(result).to.equal('promise resolved');
   });
  */
  /*
   This style is just as safe as the '.then(done,done)' style,
   but it's much easier to read since there is no chaining and nesting
   of then callbacks.
  */
})
