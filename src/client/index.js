import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './components/App';

let store;
if (process.env.NODE_ENV === 'development') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk),
  ));
} else {
  store = createStore(reducers, applyMiddleware(thunk));
}

const AppCore = React.createElement(Provider, {store},
  React.createElement(Router, null,
    React.createElement(Route, {
      path: '/',
      component: App
    })
  )
);

const render = () => {
  if (process.env.NODE_ENV === 'development') {
    const AppContainer = require('react-hot-loader').AppContainer;
    ReactDOM.render(React.createElement(AppContainer, null, AppCore), document.getElementById('react-root'));
  } else {
    ReactDOM.render(AppCore, document.getElementById('react-root'));
  }
};

render();

if (module.hot) {
  module.hot.accept();
}
