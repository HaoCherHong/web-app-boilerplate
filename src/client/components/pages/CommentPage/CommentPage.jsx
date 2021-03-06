import React from 'react';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';
import classNames from 'classnames';

import relativizeTime from 'utils/relativizeTime';
import {getComments} from 'actions/posts';

import Avatar from '../../Avatar';

import replyIcon from 'images/reply@2x.png';
import styles from './CommentPage.css';

@connect((state, {match: {params: {postId}}}) => {
  const pagination = state.comments.get(postId);
  return {
    comments: pagination && pagination.get('entries'),
    isLoaded: pagination && pagination.get('isLoaded'),
    isLoading: pagination && pagination.get('isLoading')
  };
})
@provideHooks({
  fetch: ({state, dispatch, match: {params: {postId}}}) => {
    const pagination = state.comments.get(postId);
    if(!pagination || !pagination.get('isLoaded') && !pagination.get('isLoading')) {
      return dispatch(getComments(postId));
    }
  }
})
export default class CommentPage extends React.Component {
  render() {
    const {comments} = this.props;

    if (!comments)
      return null;

    return (
      <div className={styles.container}>
        {comments.map(this.renderComment)}
        {this.renderCommentBar()}
      </div>
    );
  }

  renderComment = (comment, index) => {
    const user = comment.get('user');
    return (
      <div key={index} className={styles.comment}>
        <div className={styles.avatar}>
          <Avatar portrait={user.get('portrait')} size={50}/>
        </div>
        <div className={styles.information}>
          <header className={styles.userName}>
            {user.get('name')}
          </header>
          <div>
            {comment.get('whisper') && <i title='悄悄話' className='fas fa-eye-slash'/>}
            <span>{comment.get('body')}</span>
            <span className={styles.time}>{relativizeTime(comment.get('createdAt'))}</span>
          </div>
          <div>
            {comment.get('replies').map(this.renderReply)}
          </div>
        </div>
      </div>
    );
  }

  renderReply = (reply, index) => {
    return (
      <div key={index} className={styles.reply}>
        <img alt='回覆' className={styles.replyIcon} src={replyIcon}/>
        <div className={styles.replyBody}>
          {
            reply.get('whisper') && <i title='悄悄話' className='far fa-eye-slash'/>
          }
          <span>{reply.get('body')}</span>
          <span className={styles.time}>{relativizeTime(reply.get('createdAt'))}</span>
        </div>
      </div>
    );
  }

  renderCommentBar() {
    const isLoggedIn = false;
    return (
      <div className={styles.commentBarWrapper}>
        <form className={styles.commentBar}>
          <input className={styles.commentBarInput} type='text' placeholder={isLoggedIn ? '留言...' : '登入後才能留言'}/>
          <label className={styles.commentBarWhisper}>
            <i className='fas fa-eye'/>
            <input className={styles.commentBarCheckBox} type='checkbox'/>
          </label>
          <button className={styles.commentBarButton} type='submit'>發送</button>
        </form>
      </div>
    );
  }
}