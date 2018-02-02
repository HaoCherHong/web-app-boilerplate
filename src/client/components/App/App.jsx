import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {renderRoutes, matchRoutes} from "react-router-config";
import {trigger} from 'redial';

import routes from '../../routes';

import Header from './Header';

import styles from './App.css';

@withRouter
@connect()
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
    const {history, location, dispatch} = this.props;
    // TODO: fetch only when PUSH
    // if (history.action === 'PUSH') {
    if (true) {
      const branch = matchRoutes(routes, location.pathname);
      branch.forEach(({match, route: {component}}) => {
        trigger('fetch', component, {
          ...match,
          dispatch
        });
      });
    }
  }

  render() {
    const {route} = this.props;
    return (
      <div>
        <Header/>
        {renderRoutes(route.routes)}
        <footer className={styles.footer}>
          PUPY © 2015
        </footer>
      </div>
    );
  }
}
