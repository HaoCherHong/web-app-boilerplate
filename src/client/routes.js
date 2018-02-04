import App from './components/App';
import PostsPage from './components/pages/PostsPage';
import PostPage from './components/pages/PostPage';

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
        component: PostPage
      }
    ]
  }
];