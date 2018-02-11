import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import PostList from '../../posts/PostList';
import querystring from 'querystring';

import {listPosts} from 'actions/posts';

import styles from './PostsPage.css';

function parsePageFromSearch(search) {
  return parseInt(querystring.parse(search.slice(1)).p) || 1;
}

function getPaginationKey(search) {
  const query = querystring.parse(search.slice(1));
  delete query.p;
  return querystring.stringify(query);
}

@connect((state, ownProps) => {
  const paginationKey = getPaginationKey(ownProps.location.search);
  const pagination = state.postsPagination.get(paginationKey);
  return {
    pagination,
    posts: state.posts
  };
})
@provideHooks({
  fetch: ({dispatch, location: {search}}) => {
    const currentPage = parsePageFromSearch(search);
    return dispatch(listPosts(currentPage, true));
  }
})
export default class PostsPage extends React.Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const {posts, pagination, location: {search}} = this.props;
    const currentPage = parsePageFromSearch(search);

    return (
      <div>
        <PostList posts={posts} pagination={pagination} currentPage={currentPage}/>
        <footer className={styles.footer}>
          PUPY © 2015
        </footer>
      </div>
    );
  }
}