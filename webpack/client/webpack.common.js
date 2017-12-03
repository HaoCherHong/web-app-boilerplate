const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  entry: {
    app: './src/client/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./build/public/build/'),
    publicPath: '/build/'
  },
  module: {
    rules: [
    ]
  },
  plugins: [
  ]
};