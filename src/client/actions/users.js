import api from './api';

export const getUser = userId => dispatch => {
  dispatch({
    type: 'getUser'
  });

  return api(`/users/${userId}`).then(user => {
    dispatch({
      type: 'getUser',
      payload: user
    });
  });
};