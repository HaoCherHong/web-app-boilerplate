import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import relativizeTime from '../../../utils/relativizeTime';
import {getMonth, getYear} from '../../../utils/convertAge';

import Avatar from '../../Avatar';
import Gallery from '../../posts/Gallery';
import PageList from '../../posts/PageList';
import querystring from 'querystring';

import {listPosts} from '../../../actions/posts';

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
    dispatch(listPosts(page, true));
  }
})
export default class PostsPage extends React.Component {
  render() {
    const {posts, pageCount, location: {search}} = this.props;
    const currentPage = parsePageFromSearch(search);

    if (!posts)
      return null;

    return (
      <div className={styles.postsPage}>
        {posts.map(this.renderPost)}
        <PageList pageCount={pageCount} currentPage={currentPage}/>
        <footer className={styles.footer}>
          PUPY © 2015
        </footer>
      </div>
    );
  }

  renderPost = (post, index) => {
    return (
      <Link key={index} className={styles.post} to={`/posts/${post._id}`}>
        <header className={styles.header}>
          <div className={styles.headerAvatar}>
            <Avatar portrait={post.author.portrait} size={40}/>
          </div>
          <div className={styles.headerName}>
            {post.author.name}
          </div>
          <div className={styles.headerTime}>
            {relativizeTime(post.createdAt)}
          </div>
        </header>
        <Gallery post={post}/>
        <div className={styles.information}>
          <header className={styles.title}>{post.title}</header>
          <div className={styles.properties}>
            <div className={styles.property}>{this.renderGender(post.gender)}</div>
            <div className={styles.property}>{this.renderAge(post.age)}</div>
            <div className={styles.property}>{this.renderLocation(post.location)}</div>
            <div className={styles.property}>
              <i className='fa fa-paw'/>
              {post.introduction}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  renderGender = gender => {
    const text = gender === 'boy' ? '男生' : '女生';
    const className = gender === 'boy' ? 'fa fa-male' : 'fa fa-female';
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
        <i className='fa fa-birthday-cake'/>
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