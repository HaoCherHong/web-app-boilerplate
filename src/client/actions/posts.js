import api from './api';

export const listPosts = () => dispatch => {
  api('/posts').then(posts => {
    dispatch({
      type: 'listPosts',
      payload: posts
    });
  });

  return {
    type: 'listPosts',
  };
};