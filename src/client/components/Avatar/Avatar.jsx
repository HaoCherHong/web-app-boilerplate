import React from 'react';
import classNames from 'classnames';

import styles from './Avatar.css';

export default class Avatar extends React.Component {
  render() {
    const size = this.props.size || '100%';
    const portrait = this.props.portrait;
    const notification = this.props.notification;
    const src = portrait && !portrait.pupy ? (portrait.base64ImageData || ('/images/user_portraits/' + portrait.filename)) : '#';

    return (
      <div className="portrait" style={{width: size, height: size}}>
        {
          portrait ? (
            portrait.pupy ? (
              <div className={classNames(styles.default, {
                [styles.dog]: portrait.icon === 'dog',
                [styles.cat]: portrait.icon === 'cat'
              })} style={{'backgroundColor': portrait.color }}/>
            ) : (
              <img alt="Portrait" className={styles.image} src={src}/>
            )
          ) : (
            notification ? (
              <div className={classNames(styles.default, styles.notification)}/>
            ) : (
              <div className={classNames(styles.default, styles.guest)}/>
            )
          )
        }
      </div>
    );
  }
}