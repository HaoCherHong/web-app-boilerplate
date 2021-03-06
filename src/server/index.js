import express from 'express';
import config from '../../config';
import path from 'path';

import api from './api';
import render from './render';

const server = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const clientWebpackConfig = require('../../webpack/client');

  const compiler = webpack(clientWebpackConfig);

  server.use(devMiddleware(compiler, {
    noInfo: false,
    publicPath: '/build/'
  }));

  server.use(hotMiddleware(compiler));
}

server.use('/api', api);

server.use(express.static(path.resolve(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  server.use(express.static(path.resolve(__dirname, '../../build/public')));
  server.use('*', render);
} else {
  // TODO: SSR
}

server.listen(config.port, config.host, () => {
  console.log('Server listening on %s:%d', config.host, config.port);
});

export default server;