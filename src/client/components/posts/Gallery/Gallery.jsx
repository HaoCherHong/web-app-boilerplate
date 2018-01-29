import React from 'react';

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
				<img src={'/images/pictures/' + post.photos[currentIndex]} style={{width: '100%'}}/>
				{
					post.photos.length >= 2 && (
						<div className="navigate">
							<div className="left side-area" onClick={this.handlePreviousClick}/>
							<div className="right side-area" onClick={this.handleNextClick}/>
						</div>
					)
				}
				{
					post.adopted && <div className="adopted" title="已被認養"/>
				}
			</div>
		)
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