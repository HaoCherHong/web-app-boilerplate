import React from 'react';
import classNames from 'classnames';

import styles from './Gallery.css';

export default class Gallery extends React.Component {
  state = {
    currentIndex: 0
  };

  render() {
    const {post} = this.props;
    const {currentIndex} = this.state;

    return (
      <div className={styles.gallery}>
        <img className={styles.image} src={'/images/pictures/' + post.photos[currentIndex]}/>
        {
          post.photos.length >= 2 && (
            <div className={styles.navigate}>
              <div className={classNames(styles.left, styles.sideArea)} onClick={this.handlePreviousClick}/>
              <div className={classNames(styles.right, styles.sideArea)} onClick={this.handleNextClick}/>
            </div>
          )
        }
        {
          post.adopted && <div className="adopted" title="已被認養"/>
        }
      </div>
    );
  }

  handleNextClick = e => {
    e.preventDefault();

    const {post} = this.props;
    const {currentIndex} = this.state;

    this.setState({
      currentIndex: (currentIndex + 1) % post.photos.length
    });
  }

  handlePreviousClick = e => {
    e.preventDefault();

    const {post} = this.props;
    const {currentIndex} = this.state;

    this.setState({
      currentIndex: currentIndex == 0 ? post.photos.length - 1 : currentIndex - 1
    });
  }
}