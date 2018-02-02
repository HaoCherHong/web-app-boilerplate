import { combineReducers } from 'redux';
import posts from './posts';
import postsPagination from './postsPagination';

export default combineReducers({
  posts,
  postsPagination
});
