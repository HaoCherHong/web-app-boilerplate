const path = require('path');

module.exports = {
  resolve: {
    modules: [
      path.resolve('./src/client'),
      path.resolve('./node_modules')
    ],
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
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
  ]
};
