import api from './api';

export const listPosts = (page = 1, getPageCount = false) => dispatch => {
  api(`/posts?page=${page}${getPageCount ? '&getPageCount=1' : ''}`).then(posts => {
    dispatch({
      type: 'listPosts',
      payload: posts
    });
  });

  return {
    type: 'listPosts',
  };
};