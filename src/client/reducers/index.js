import { combineReducers } from 'redux';
import comments from './comments';
import posts from './posts';
import postsPagination from './postsPagination';

export default combineReducers({
  comments,
  posts,
  postsPagination
});
