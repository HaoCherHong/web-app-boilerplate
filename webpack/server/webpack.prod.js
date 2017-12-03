const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

const babelOptions = JSON.parse(fs.readFileSync(path.resolve('./.babelrc'), "utf8"));

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      }
    ],
  },
  plugins: [
    // new UglifyJSPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/server/public',
        to: './public'
      }
    ])
  ]
});