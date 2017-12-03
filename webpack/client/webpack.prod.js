const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

const babelOptions = JSON.parse(fs.readFileSync(path.resolve('./.babelrc'), "utf8"));

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: babelOptions,
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin()
  ]
});