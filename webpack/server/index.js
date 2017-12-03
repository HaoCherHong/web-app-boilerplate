const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const envConfig = require(process.env.NODE_ENV == 'production' ? './webpack.prod.js' : './webpack.dev.js');

module.exports = merge(commonConfig, envConfig);