import api from './api';
import querystring from 'querystring';

import {omit, omitBy, isUndefined} from 'lodash';

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

export const listPosts = (page = 1, options = {}) => dispatch => {
  const query = {
    page,
    ...options
  };

  const paginationKey = omitBy(omit(query, ['getPageCount']), isUndefined);

  dispatch({
    type: 'listPosts',
    query: paginationKey
  });

  const url = `/posts?${querystring.stringify(query)}`;

  return api(url).then(posts => {
    dispatch({
      type: 'listPosts',
      payload: posts,
      query: paginationKey
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