import App from './components/App';
import PostsPage from './components/pages/PostsPage';

export default [
  {
    component:  App,
    routes: [
      {
        path: '/posts',
        component: PostsPage
      }
    ]
  }
];