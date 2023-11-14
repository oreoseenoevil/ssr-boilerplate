const { merge } = require('webpack-merge');
const common = require('./webpack/webpack.common');

let envConfig;
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    envConfig = require('./webpack/webpack.prod');
    break;

  case 'dev':
  case 'development':
  default:
    envConfig = require('./webpack/webpack.dev');
}

module.exports = merge(common, envConfig);
