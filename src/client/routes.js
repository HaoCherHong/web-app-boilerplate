import React from 'react';
import {Redirect} from 'react-router-dom';

import App from './components/App';
import PostsPage from './components/pages/PostsPage';
import PostPage from './components/pages/PostPage';
import CommentPage from './components/pages/CommentPage';
import UserPage from './components/pages/UserPage';
import SearchPage from './components/pages/SearchPage';

export default [
  {
    component:  App,
    routes: [
      {
        path: '/',
        exact: true,
        component: () => React.createElement(Redirect, {to: '/posts'})
      },
      {
        path: '/posts',
        component: PostsPage,
        exact: true
      },
      {
        path: '/posts/:postId',
        component: PostPage,
        exact: true
      },
      {
        path: '/posts/:postId/comments',
        component: CommentPage,
        exact: true
      },
      {
        path: '/users/:userId',
        component: UserPage,
        exact: true
      },
      {
        path: '/search',
        component: SearchPage,
        exact: true
      }
    ]
  }
];