import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import routes from './routes';

import configureStore from './configureStore';

const store = configureStore();

function render(routes) {
  const AppCore = React.createElement(Provider, {store},
    React.createElement(BrowserRouter, null, renderRoutes(routes))
  );

  if (process.env.NODE_ENV === 'development') {
    const AppContainer = require('react-hot-loader').AppContainer;
    ReactDOM.render(React.createElement(AppContainer, null, AppCore), document.getElementById('react-root'));
  } else {
    ReactDOM.render(AppCore, document.getElementById('react-root'));
  }
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    const routes = require('./routes').default;
    render(routes);
  });
}

render(routes);