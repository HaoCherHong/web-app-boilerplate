import React from 'react';
import classNames from 'classnames';

import styles from './Avatar.css';

export default class Avatar extends React.Component {
  render() {
    const size = this.props.size || '100%';
    const portrait = this.props.portrait;
    const notification = this.props.notification;

    const pupy = portrait && portrait.get('pupy');
    const base64ImageData = portrait && portrait.get('base64ImageData');
    const filename = portrait && portrait.get('filename');
    const icon = portrait && portrait.get('icon');
    const color = portrait && portrait.get('color');

    const src = portrait && !pupy ? (base64ImageData || ('/images/user_portraits/' + filename)) : '#';

    return (
      <div className="portrait" style={{width: size, height: size}}>
        {
          portrait ? (
            pupy ? (
              <div className={classNames(styles.default, {
                [styles.dog]: icon === 'dog',
                [styles.cat]: icon === 'cat'
              })} style={{'backgroundColor': color }}/>
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