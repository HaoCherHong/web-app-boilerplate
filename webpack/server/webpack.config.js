const fs = require('fs');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const babelOptions = JSON.parse(fs.readFileSync(path.resolve('./.babelrc'), 'utf8'));

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: './src/server/index.js',
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
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/server/public',
        to: './public'
      }
    ])
  ],
  output: {
    filename: 'index.js',
    path: path.resolve('./build')
  },
  externals: [nodeExternals()]
};
