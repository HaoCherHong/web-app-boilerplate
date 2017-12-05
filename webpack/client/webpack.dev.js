const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const babelOptions = JSON.parse(fs.readFileSync(path.resolve('./.babelrc'), 'utf8'));

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
