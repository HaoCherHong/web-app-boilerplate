import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import App from './App';

const router = React.createElement(Router, null, React.createElement(Route, {
  path: '/',
  component: App
}));

const render = () => {
  if (process.env.NODE_ENV === 'development') {
    const AppContainer = require('react-hot-loader').AppContainer;

    ReactDOM.render(React.createElement(AppContainer, null, router), document.getElementById('react-root'));
  } else {
    ReactDOM.render(router, document.getElementById('react-root')
    );
  }
};

render();

if (module.hot) {
  module.hot.accept();
}
