import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import PostList from '../../posts/PostList';
import Avatar from '../../Avatar';

import {listPosts} from 'actions/posts';
import {getUser} from 'actions/users';

import getPageFromSearch from 'utils/getPageFromSearch';

import styles from './UserPage.css';

@connect((state, {match: {params: {userId}}}) => {
  const paginationKey = `authorId=${userId}`;
  const pagination = state.postsPagination.get(paginationKey);
  return {
    pagination,
    posts: state.posts,
    user: state.users.get(userId)
  };
})
@provideHooks({
  fetch: ({dispatch, location: {search}, match: {params: {userId}}}) => {
    const currentPage = getPageFromSearch(search);
    return Promise.all([
      dispatch(getUser(userId)),
      dispatch(listPosts(currentPage, {
        getPageCount: true,
        authorId: userId
      }))
    ]);
  }
})
export default class UserPage extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    pagination: PropTypes.object,
    posts: PropTypes.object.isRequired,
    user: PropTypes.object
  }
  render() {
    const {posts, pagination, location: {search}} = this. props;
    const currentPage = getPageFromSearch(search);
    return (
      <div>
        {this.renderUser()}
        <PostList posts={posts} pagination={pagination} currentPage={currentPage}/>
      </div>
    );
  }

  renderUser() {
    const {user} = this.props;
    if (!user)
      return null;

    const introduction = user.get('introduction');

    return (
      <div className={styles.user}>
        <header className={styles.userHeader}>
          <Avatar portrait={user.get('portrait')} size={88}/>
          <div className={styles.userInformation}>
            <div className={styles.userName}>
              {user.get('name')}
            </div>
            <div className={styles.postCount}>
              {`${user.get('postCount')}則認養貼文`}
            </div>
          </div>
        </header>
        {
          introduction && (
            <p className={styles.introduction}>
              {introduction}
            </p>
          )
        }
      </div>
    );
  }
}