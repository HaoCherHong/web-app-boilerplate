import React from 'react';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import {getPost} from '../../../actions/posts';

import Avatar from '../../Avatar';
import Gallery from '../../posts/Gallery';

import relativizeTime from '../../../utils/relativizeTime';
import {getMonth, getYear} from '../../../utils/convertAge';

import styles from './PostPage.css';

@connect((state, {match: {params: {postId}}}) => ({
  post: state.posts.get(postId)
}))
@provideHooks({
  fetch: ({state, dispatch, match: {params: {postId}}}) => {
    const post = state.posts.get(postId);
    if (!post) {
      dispatch(getPost(postId));
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
        <div className={styles.post}>
          {this.renderHeader(post)}
          <Gallery post={post}/>
          <div className={styles.information}>
            {this.renderSmallProperties(post)}
            {this.renderProperty('自我介紹', post.introduction, 'fa fa-paw')}
            {post.notice && this.renderProperty('認養須知', post.notice, 'far fa-hand-point-right')}
          </div>
        </div>
      </div>
    );
  }

  renderHeader(post) {
    return (
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
    const birthdayYear = getYear(post.age);
    const birthdayMonth = getMonth(post.age);

    return (
      <div className={styles.properties}>
        <header className={styles.title}>{post.title}</header>
        <div>
          <div className={styles.smallProperty}>
            <i className={`${styles.propertyIcon} ${post.gender === 'boy' ? 'fa fa-male' : 'fa fa-female'}`}/>
            {post.gender === 'boy' ? '男生' : '女生'}
          </div>
          <div className={styles.smallProperty}>
            <i className={`${styles.propertyIcon} fas fa-map-marker-alt`}/>
            {post.location.city + post.location.district}
          </div>
          <div className={styles.smallProperty}>
            <i className={`${styles.propertyIcon} fa fa-birthday-cake`}/>
            {(birthdayYear ? birthdayYear + '歲' : '') + (birthdayMonth ? birthdayMonth + '個月' : '')}
          </div>
          <div className={styles.smallProperty}>
            <i className={`${styles.propertyIcon} fa fa-user-md`}/>
            {post.ligated ? '已結紮' : '未結紮'}
          </div>
        </div>
      </div>
    );
  }
}