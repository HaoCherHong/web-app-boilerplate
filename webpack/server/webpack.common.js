const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: './src/server/index.js',
  plugins: [
  ],
  output: {
    filename: 'index.js',
    path: path.resolve('./build')
  },
  externals: [nodeExternals()]
};