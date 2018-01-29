import React from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {renderRoutes, matchRoutes} from "react-router-config";
import {trigger} from 'redial';

import routes from '../../routes';

import Header from './Header';
import FollowedPage from '../pages/FollowedPage';
import PostsPage from '../pages/PostsPage';
import PostPage from '../pages/PostPage';
import NewPostPage from '../pages/NewPostPage';
import UserPage from '../pages/UserPage';
import SettingsPage from '../pages/SettingsPage';
import NotificationsPage from '../pages/NotificationsPage';
import SearchPge from '../pages/SearchPage';
import FeedbackPage from '../pages/FeedbackPage';

import styles from './App.css';

@withRouter
export default class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    const {history, location} = this.props;
    if (history.action === 'PUSH') {
      const branch = matchRoutes(routes, location.pathname);
      branch.forEach(({match, route: {component}}) => {
        trigger('fetch', component, match);
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
