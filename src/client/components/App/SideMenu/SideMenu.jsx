import React from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

import styles from './SideMenu.css';

const menuWidth = 300;

export default class SideMenu extends React.PureComponent
{
  lastTouchX = 0;

  state = {
    right: -menuWidth,
    isSliding: false
  };

  componentDidMount() {
    document.body.addEventListener('touchstart', this.handleTouchStart);
    document.body.addEventListener('touchmove', this.handleTouchMove);
    document.body.addEventListener('touchend', this.handleTouchEnd);
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchstart', this.handleTouchStart);
    document.body.removeEventListener('touchmove', this.handleTouchMove);
    document.body.removeEventListener('touchend', this.handleTouchEnd);
  }

  render() {
    const {right, isSliding} = this.state;
    const isOpen = -right < menuWidth / 2;

    const bodyStyle = {
      right
    };

    const backgroundStyle = {
      opacity: (1 - -right / menuWidth) * 0.5,
      pointerEvents: isOpen ? 'all' : 'none'
    };

    return (
      <div>
        <div
          className={
            classnames(styles.background, {
              [styles.isSliding]: isSliding
            })}
          style={backgroundStyle}
          onClick={this.handleBackgroundClick}
        />
        <div
          className={classnames(styles.body, {
            [styles.isSliding]: isSliding
          })} style={bodyStyle}
        />
      </div>
    );
  }

  renderLoggedInUserMenu() {

  }

  renderFacebookLoginButton() {
  }

  open = () => {
    this.setState({
      right: 0
    });
  }

  handleBackgroundClick = e => {
    this.setState({
      right: -menuWidth
    });
  }

  handleTouchStart = e => {
    const {right} = this.state;
    const isOpen = -right < menuWidth / 2;

    if (isOpen || e.touches[0].clientX >= window.innerWidth * 0.9) {
      this.lastTouchX = e.touches[0].clientX;

      this.setState({
        isSliding: true
      });
    }
  }

  handleTouchMove = e => {
    const {isSliding} = this.state;

    if (isSliding) {
      const slideDistance = e.touches[0].clientX - this.lastTouchX;
      this.lastTouchX = e.touches[0].clientX;
      this.setState({
        right: Math.min(0, Math.max(this.state.right - slideDistance, -menuWidth))
      });
    }
  }

  handleTouchEnd = e => {
    const {isSliding} = this.state;
    if (isSliding) {
      const {right} = this.state;
      this.setState({
        right: -right > menuWidth / 2 ? -menuWidth : 0,
        isSliding: false
      });
    }
  }
}