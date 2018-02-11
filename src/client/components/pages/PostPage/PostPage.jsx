import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {provideHooks} from 'redial';
import classNames from 'classnames';

import {getPost} from 'actions/posts';

import Avatar from '../../Avatar';
import Gallery from '../../posts/Gallery';

import relativizeTime from 'utils/relativizeTime';
import {getMonth, getYear} from 'utils/convertAge';

import styles from './PostPage.css';

@connect((state, {match: {params: {postId}}}) => ({
  post: state.posts.get(postId)
}))
@provideHooks({
  fetch: ({state, dispatch, match: {params: {postId}}}) => {
    const post = state.posts.get(postId);
    if (!post) {
      return dispatch(getPost(postId));
    }
  }
})
export default class PostPage extends React.Component {
  render() {
    const {post} = this.props;

    if(!post)
      return null;

    return (
      <div className={styles.container}>
        <div>
          {this.renderHeader(post)}
          <Gallery post={post}/>
          <div className={styles.information}>
            {this.renderSmallProperties(post)}
            {this.renderProperty('自我介紹', post.get('introduction'), 'fas fa-paw')}
            {post.get('notice') && this.renderProperty('認養須知', post.get('notice'), 'far fa-hand-point-right')}
          </div>
        </div>
        {this.renderCommandBar(post)}
      </div>
    );
  }

  renderHeader(post) {
    const author = post.get('author');
    return (
      <Link className={styles.header} to={`/users/${author.get('_id')}`}>
        <div className={styles.headerAvatar}>
          <Avatar portrait={author.get('portrait')} size={40}/>
        </div>
        <div className={styles.headerName}>
          {author.get('name')}
        </div>
        <div className={styles.headerTime}>
          {relativizeTime(post.get('createdAt'))}
        </div>
      </Link>
    );
  }

  renderProperty(name, value, icon) {
    return (
      <div className={styles.properties}>
        <header className={styles.propertyHeader}>
          <i className={icon}/>
          {' '}
          <span>{name}</span>
        </header>
        <span>
          {value}
        </span>
      </div>
    );
  }

  renderSmallProperties(post) {
    const age = post.get('age');
    const gender = post.get('gender');
    const location = post.get('location');

    const birthdayYear = getYear(age);
    const birthdayMonth = getMonth(age);

    return (
      <div className={styles.properties}>
        <header className={styles.title}>{post.get('title')}</header>
        <div>
          <div className={styles.smallProperty}>
            <i className={classNames(styles.propertyIcon, 'fas', {
              'fa-male': gender === 'boy',
              'fa-female': gender === 'girl'
            })}/>
            {gender === 'boy' ? '男生' : '女生'}
          </div>
          <div className={styles.smallProperty}>
            <i className={classNames(styles.propertyIcon, 'fas', 'fa-map-marker-alt')}/>
            {location.get('city') + location.get('district')}
          </div>
          <div className={styles.smallProperty}>
            <i className={classNames(styles.propertyIcon, 'fas', 'fa-birthday-cake')}/>
            {(birthdayYear ? birthdayYear + '歲' : '') + (birthdayMonth ? birthdayMonth + '個月' : '')}
          </div>
          <div className={styles.smallProperty}>
            <i className={classNames(styles.propertyIcon, 'fas', 'fa-user-md')}/>
            {post.get('ligated') ? '已結紮' : '未結紮'}
          </div>
        </div>
      </div>

    );
  }

  renderCommandBar(post) {
    return (
      <div className={styles.commandBarWrapper}>
        <div className={styles.commandBar}>
          <div className={styles.interactionCount}>
            <Link to={`/posts/${post.get('_id')}/comments`}>
              {post.get('followersCount')}人追蹤、{post.get('commentCount')}則留言
            </Link>
          </div>
          <button className={classNames(styles.commandButton, styles.followButton)}/>
          <Link to={`/posts/${post.get('_id')}/comments`}>
            <button className={classNames(styles.commandButton, styles.commentButton)}/>
          </Link>
        </div>
      </div>
    );
  }
}