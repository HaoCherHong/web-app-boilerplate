import React from 'react';
import {connect} from 'react-redux';
import {renderRoutes, matchRoutes} from "react-router-config";
import {trigger} from 'redial';

import routes from 'routes';

import Header from './Header';

import styles from './App.css';

const getHeaderExpandable = location => (
  /^\/posts\/?$/.test(location.pathname)
);

@connect(state => ({state}))
export default class App extends React.Component {
  componentDidMount() {
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    const {history, location, dispatch, state} = this.props;
    if (history.action === 'PUSH') {
      if (getHeaderExpandable(location))
        window.scrollTo(0, 290);
      else
        window.scrollTo(0, 0);

      const branch = matchRoutes(routes, location.pathname);
      branch.forEach(({match, route: {component}}) => {
        trigger('fetch', component, {
          location,
          history,
          dispatch,
          match,
          state
        });
      });
    }
  }

  render() {
    const {route: {routes}} = this.props;
    return (
      <div>
        <Header/>
        <div className={styles.container}>
          {renderRoutes(routes)}
        </div>
      </div>
    );
  }
}
