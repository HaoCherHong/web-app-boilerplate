import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import relativizeTime from 'utils/relativizeTime';
import {getMonth, getYear} from 'utils/convertAge';

import Avatar from '../../Avatar';
import Gallery from '../../posts/Gallery';
import PageList from '../../posts/PageList';
import querystring from 'querystring';

import {listPosts} from 'actions/posts';

import styles from './PostsPage.css';

function parsePageFromSearch(search) {
  return querystring.parse(search.slice(1)).p || 1;
}

function getPaginationKey(search) {
  const query = querystring.parse(search.slice(1));
  delete query.p;
  return querystring.stringify(query);
}

@connect((state, ownProps) => {
  const page = parsePageFromSearch(ownProps.location.search).toString();
  const paginationKey = getPaginationKey(ownProps.location.search);
  const paginationQuery = state.postsPagination.get(paginationKey);
  const pagination = paginationQuery && paginationQuery.get('pages').get(page);
  return {
    currentPage: paginationQuery && paginationQuery.get('currentPage'),
    pageCount: paginationQuery && paginationQuery.get('pages').count(),
    isLoading: pagination && pagination.get('isLoading'),
    posts: pagination && pagination.get('entries').map(postId => state.posts.get(postId))
  };
})
@provideHooks({
  fetch: ({dispatch, location: {search}}) => {
    const page = parsePageFromSearch(search);
    return dispatch(listPosts(page, true));
  }
})
export default class PostsPage extends React.Component {
  render() {
    const {posts, pageCount, location: {search}} = this.props;
    const currentPage = parsePageFromSearch(search);

    if (!posts)
      return null;

    return (
      <div>
        {posts.map(this.renderPost)}
        <PageList pageCount={pageCount} currentPage={currentPage}/>
        <footer className={styles.footer}>
          PUPY © 2015
        </footer>
      </div>
    );
  }

  renderPost = (post, index) => {
    const author = post.get('author');
    return (
      <Link key={index} className={styles.post} to={`/posts/${post.get('_id')}`}>
        <header className={styles.header}>
          <div className={styles.headerAvatar}>
            <Avatar portrait={author.get('portrait')} size={40}/>
          </div>
          <div className={styles.headerName}>
            {author.get('name')}
          </div>
          <div className={styles.headerTime}>
            {relativizeTime(post.get('createdAt'))}
          </div>
        </header>
        <Gallery post={post}/>
        <div className={styles.information}>
          <header className={styles.title}>{post.get('title')}</header>
          <div className={styles.properties}>
            <div className={styles.property}>{this.renderGender(post.get('gender'))}</div>
            <div className={styles.property}>{this.renderAge(post.get('age'))}</div>
            <div className={styles.property}>{this.renderLocation(post.get('location'))}</div>
            <div className={styles.property}>
              <i className='fas fa-paw'/>
              {post.get('introduction')}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  renderGender = gender => {
    const text = gender === 'boy' ? '男生' : '女生';
    const className = gender === 'boy' ? 'fas fa-male' : 'fas fa-female';
    return (
      <span>
        <i className={className}/>
        {text}
      </span>
    );
  }

  renderAge = age => {
    const year = getYear(age);
    const month = getMonth(age);
    return (
      <span>
        <i className='fas fa-birthday-cake'/>
        {(year ? year + '歲' : '') + (month ? month + '個月' : '')}
      </span>
    );
  }

  renderLocation = location => {
    return (
      <span>
        <i className='fas fa-map-marker-alt'/>
        {location.city + location.district}
      </span>
    );
  }
}