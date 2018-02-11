import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import relativizeTime from 'utils/relativizeTime';
import {getMonth, getYear} from 'utils/convertAge';

import Avatar from '../../Avatar';
import Gallery from '../Gallery';
import PageList from '../PageList';

import styles from './PostList.css';

export default class PostList extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    pagination: PropTypes.object,
    posts: PropTypes.object.isRequired
  }

  render() {
    const {pagination, currentPage} = this.props;

    const pageCount = pagination ? pagination.get('pages').count() : 0;

    if (!pagination)
      return null;

    return (
      <div>
        {
          pagination
            .get('pages')
            .get(currentPage.toString())
            .get('entries')
            .map(this.renderPost)
        }
        <PageList pageCount={pageCount} currentPage={currentPage}/>
        <footer className={styles.footer}>
          PUPY © 2015
        </footer>
      </div>
    );
  }

  renderPost = postId => {
    const {posts} = this.props;
    const post = posts.get(postId);
    const author = post.get('author');
    return (
      <div className={styles.post} key={postId}>
        <Link className={styles.authorLink} to={`/users/${author.get('_id')}`}>
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
        </Link>
        <Link to={`/posts/${post.get('_id')}`}>
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
      </div>
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
        {location.get('city') + location.get('district')}
      </span>
    );
  }
}