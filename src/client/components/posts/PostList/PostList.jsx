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
    posts: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired
  }

  render() {
    const {posts, pagination, currentPage} = this.props;

    const pageCount = pagination.get('pages').count();

    if (!posts)
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
      </div>
    );
  }

  renderPost = postId => {
    const {posts} = this.props;
    const post = posts.get(postId);
    const author = post.get('author');
    return (
      <Link key={postId} className={styles.post} to={`/posts/${post.get('_id')}`}>
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
        {location.get('city') + location.get('district')}
      </span>
    );
  }
}