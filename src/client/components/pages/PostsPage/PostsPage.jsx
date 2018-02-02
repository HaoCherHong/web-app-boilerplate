import React from 'react';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import relativizeTime from '../../../utils/relativizeTime';
import {getMonth, getYear} from '../../../utils/convertAge';

import Avatar from '../../Avatar';
import Gallery from '../../posts/Gallery';
import PageList from '../../posts/PageList';

import {listPosts} from '../../../actions/posts';

import styles from './PostsPage.css';

@connect(state => ({
  posts: state.posts,
  postsPagination: state.postsPagination
}))
@provideHooks({
  fetch: ({dispatch}) => {
    dispatch(listPosts(1, true));
  }
})
export default class PostsPage extends React.Component {
  render() {
    const {posts, postsPagination} = this.props;

    return (
      <div className={styles.postsPage}>
        {posts.map(this.renderPost)}
        <PageList pageCount={postsPagination} currentPage={1}/>
      </div>
    );
  }

  renderPost = (post, index) => {
    return (
      <div key={index} className={styles.post}>
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
    const year = getYear(age);
    const month = getMonth(age);
    return (
      <span>
        <i className="fa fa-birthday-cake"/>
        {(year ? year + '歲' : '') + (month ? month + '個月' : '')}
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