import { combineReducers } from 'redux';
import comments from './comments';
import posts from './posts';
import postsPagination from './postsPagination';
import users from './users';

export default combineReducers({
  comments,
  posts,
  postsPagination,
  users
});
