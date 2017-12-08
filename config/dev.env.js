var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3000/api"',
  GRAPHQL_URL: '"http://localhost:3000/graphql"',
  CMS_ACCESS_TOKEN: '"4cHmu6ilsIM5jecEubL6gAtt"',
  DEFAULT_LANGUAGE: '"en"',
  SPLASH_DURATION: 2000,
})
