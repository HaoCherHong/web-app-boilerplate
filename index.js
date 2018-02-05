if (process.env.NODE_ENV === 'development') {
  require('babel-register');
  require('./src/server');
  // Compile Server-Side Rendering library
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/serverSideRender');
  const compiler = webpack(webpackConfig);
  compiler.watch({}, (err, stats) => {
    if (err)
      console.error(err);
  });
} else {
  require('./build');
}
