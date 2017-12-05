import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

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

export default class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          Header
        </header>
        <Switch>
          <Redirect from='/' to='/posts' exact/>
          <Route path='posts'>
            <Route path='/' component={PostsPage}/>
            <Route path='followed' component={FollowedPage}/>
            <Route path='new' component={NewPostPage}/>
            <Route path=':postId' component={PostPage}/>
          </Route>
          <Route path='users/:userId/posts' component={UserPage}/>
          <Route path='settings' component={SettingsPage}/>
          <Route path='notifications' component={NotificationsPage}/>
          <Route path='search' component={SearchPge}/>
          <Route path='feedback' component={FeedbackPage}/>
          {/* <Redirect from='/' to='posts/p/1'/> */}
        </Switch>
        <footer className='footer'>
          PUPY © 2015
        </footer>
      </div>
    );
  }
}
