import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

const render = () => {
  if(process.env.NODE_ENV === 'development') {
    const AppContainer = require('react-hot-loader').AppContainer;
  
    ReactDOM.render(
      React.createElement(AppContainer,null,
        React.createElement(App)
      ), document.getElementById('react-root')
    );
  } else {
    ReactDOM.render(React.createElement(App), document.getElementById('react-root'));
  }
}

render();

if(module.hot) {
  module.hot.accept();
}