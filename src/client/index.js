import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import {fromJS} from 'immutable';

import routes from './routes';

import configureStore from './configureStore';

const initialState = Object.keys(window.$STATE).reduce((acc, key) => {
  acc[key] = fromJS(window.$STATE[key]);
  return acc;
}, {});
delete window.$STATE;

const store = configureStore(initialState);

function render(routes) {
  const AppCore = React.createElement(Provider, {store},
    React.createElement(BrowserRouter, null, renderRoutes(routes))
  );

  if (process.env.NODE_ENV === 'development') {
    const AppContainer = require('react-hot-loader').AppContainer;
    ReactDOM.hydrate(React.createElement(AppContainer, null, AppCore), document.getElementById('react-root'));
  } else {
    ReactDOM.hydrate(AppCore, document.getElementById('react-root'));
  }
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    const routes = require('./routes').default;
    render(routes);
  });
}

render(routes);