import React from 'react';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import relativizeTime from '../../../utils/relativizeTime';

import Gallery from '../../posts/Gallery';

import styles from './PostsPage.css';

@connect(state => ({
  posts: state.posts
}))
@provideHooks({
  fetch: locals => {
    console.log(locals);
  }
})
export default class PostsPage extends React.Component {
  render() {
    const {posts} = this.props;

    return (
      <div className={styles.postsPage}>
        {posts.map(this.renderPost)}
      </div>
    );
  }

  renderPost = (post, index) => {
    return (
      <div key={index} className={styles.post}>
        <header className={styles.header}>
          <div className={styles.headerAvatar}>
            <img className={styles.avatar}/>
          </div>
          <div className={styles.headerName}>
            {post.userName}
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
              <i className="fa fa-paw"/>
              {post.introduction}
            </div>
          </div>
        </div>
      </div>
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
    return (
      <span>
        <i className="fa fa-birthday-cake"/>
        {(age.year ? age.year + '歲' : '') + (age.month ? age.month + '個月' : '')}
      </span>
    );
  }

  renderLocation = location => {
    return (
      <span>
        <i className="fa fa-map-marker"/>
        {location.city + location.district}
      </span>
    );
  }
}