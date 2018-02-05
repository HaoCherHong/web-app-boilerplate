import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import styles from './PageList.css';

export default class PageList extends React.PureComponent {
  render() {
    const {pageCount, currentPage} = this.props;

    const pages = [];

    for(let p = 1; p <= pageCount; p++)
      pages.push(p);

    return (
      <div className={styles.container}>
        {
          pages.map((p)=>(
            <Link
              key={p}
              to={`?p=${p}`}
              className={classNames(styles.link, {
                [styles.active]: currentPage == p
              })}>
              {p}
            </Link>
          ))
        }
      </div>
    );
  }
}