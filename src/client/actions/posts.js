import api from './api';

export const getPost = (postId) => dispatch => {
  dispatch({
    type: 'getPost'
  });

  return api(`/posts/${postId}`).then(post => {
    dispatch({
      type: 'getPost',
      payload: post
    });
  });
};

export const listPosts = (page = 1, getPageCount = false) => dispatch => {
  dispatch({
    type: 'listPosts',
    query: {
      page
    }
  });

  return api(`/posts?page=${page}${getPageCount ? '&getPageCount=1' : ''}`).then(posts => {
    dispatch({
      type: 'listPosts',
      payload: posts,
      query: {
        page
      }
    });
  });
};

export const getComments = postId => dispatch => {
  dispatch({
    type: 'getComments',
    postId
  });

  return api(`/posts/${postId}/comments`).then(comments => {
    dispatch({
      type: 'getComments',
      payload: comments,
      postId
    });
  });
};