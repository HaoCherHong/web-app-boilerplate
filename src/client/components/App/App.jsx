import React from 'react';
import { Route, Redirect, Switch, IndexRoute, withRouter } from 'react-router-dom';

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
    const {history} = this.props;
    if (history.action === 'PUSH')
      console.log("ROUTE CHANGED");
  }

  render() {
    return (
      <div>
        <Header/>
        <PostsPage/>
        {/* <Switch>
          <Redirect from='/' to='/posts' exact/>
          <Route path='posts'>
            <IndexRoute component={PostsPage}/>
            <Route path='followed' component={FollowedPage}/>
            <Route path='new' component={NewPostPage}/>
            <Route path=':postId' component={PostPage}/>
          </Route>
          <Route path='users/:userId/posts' component={UserPage}/>
          <Route path='settings' component={SettingsPage}/>
          <Route path='notifications' component={NotificationsPage}/>
          <Route path='search' component={SearchPge}/>
          <Route path='feedback' component={FeedbackPage}/>
        </Switch> */}
        <footer className={styles.footer}>
          PUPY © 2015
        </footer>
      </div>
    );
  }
}
