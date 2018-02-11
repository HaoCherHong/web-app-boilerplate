import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import PostList from '../../posts/PostList';

import {listPosts} from 'actions/posts';

import getPageFromSearch from 'utils/getPageFromSearch';

import styles from './PostsPage.css';

@connect((state) => {
  const pagination = state.postsPagination.get('');
  return {
    pagination,
    posts: state.posts
  };
})
@provideHooks({
  fetch: ({dispatch, location: {search}}) => {
    const currentPage = getPageFromSearch(search);
    return dispatch(listPosts(currentPage, {getPageCount: true}));
  }
})
export default class PostsPage extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    pagination: PropTypes.object
  }

  render() {
    const {posts, pagination, location: {search}} = this.props;
    const currentPage = getPageFromSearch(search);

    return (
      <div className={styles.container}>
        <PostList posts={posts} pagination={pagination} currentPage={currentPage}/>
      </div>
    );
  }
}