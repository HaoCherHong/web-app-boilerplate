import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import routes from './routes';

function configureStore(initialState) {
  let store;

  if (process.env.NODE_ENV === 'development') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(reducers, initialState, composeEnhancers(
      applyMiddleware(thunk),
    ));
  } else {
    store = createStore(reducers, applyMiddleware(thunk));
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

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