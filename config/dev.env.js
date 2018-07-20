'use strict'
require('dotenv').config();
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GH_URL: JSON.stringify(process.env.VUE_APP_GH_URL),
  DW_DB_URL: JSON.stringify(process.env.VUE_APP_DW_DB_URL),
  DB_RW_TOKEN: JSON.stringify(process.env.VUE_APP_DW_DB_RW_TOKEN),
  DB_A_TOKEN: JSON.stringify(process.env.VUE_APP_DW_DB_A_TOKEN)
})
