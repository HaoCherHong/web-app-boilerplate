const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const babelOptions = JSON.parse(fs.readFileSync(path.resolve('./.babelrc'), 'utf8'));

const packageJson = require('../../package.json');

const extractCSS = new ExtractTextPlugin({
  filename: 'public/[name].bundle.css',
  allChunks: true
});

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  extractCSS
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJSPlugin());
}

module.exports = {
  resolve: {
    modules: [
      path.resolve('./'),
      path.resolve('./src/client'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  entry: {
    serverSideRender: './src/serverSideRender.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./build/'),
    library: '',
    libraryTarget: 'commonjs'
  },
  externals:
    Object.keys(packageJson.dependencies)
      .concat(Object.keys(packageJson.devDependencies))
      .map(key => new RegExp(`^${key}`)),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: babelOptions,
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        })
      }
    ]
  },
  plugins
};
