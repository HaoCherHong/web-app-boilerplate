import App from './components/App';
import PostsPage from './components/pages/PostsPage';
import PostPage from './components/pages/PostPage';
import CommentPage from './components/pages/CommentPage';

export default [
  {
    component:  App,
    routes: [
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
      }
    ]
  }
];