import api from './api';

export const getPost = (postId) => dispatch => {
  api(`/posts/${postId}`).then(post => {
    dispatch({
      type: 'getPost',
      payload: post
    });
  });

  return {
    type: 'getPost'
  };
};

export const listPosts = (page = 1, getPageCount = false) => dispatch => {
  api(`/posts?page=${page}${getPageCount ? '&getPageCount=1' : ''}`).then(posts => {
    dispatch({
      type: 'listPosts',
      payload: posts,
      query: {
        page
      }
    });
  });

  return {
    type: 'listPosts',
    query: {
      page
    }
  };
};