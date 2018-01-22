import React from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames';

import styles from './Header.css';

import imgLogo from 'images/index_logo@2x.png';
import imgLogoCollapsed from 'images/com_logo@2x.png';

export default class Header extends React.Component {

  state = {
    headerTop: 0
  }

  render() {
    const { expandable, collapsed, title } = this.props;
    const { headerTop } = this.state;

    return (
      <header
        className={cx(
          styles.header,
          {
            [styles.expandable]: expandable,
            [styles.collapsed]: collapsed
          }
        )}
        style={{top: headerTop}}>

        <div>
          {
            title ? (
              <h1>{title}</h1>
            ) : (
              <div>
                <Link to='/posts'>{this.renderLogo()}</Link>
              </div>
            )
          }
          {
            !collapsed && (
              <Link to='/search'>
                <button className={styles.searchButton}>
                  <i className='fa fa-search'/> 我要找
                </button>
              </Link>
            )
          }
          {this.renderLeftButtons()}
          {this.renderTopRightButtons()}
        </div>
      </header>
    );
  }

  renderLogo() {
    const {collapsed} = this.props;

    if (collapsed) {
      return (
        <img className={styles.logoCollapsed} alt='噗比 PUPY Logo' src={imgLogoCollapsed}/>
      );
    }
    return (
      <img className={styles.logo} alt='噗比 PUPY Logo' src={imgLogo}/>
    );
  }

  renderLeftButtons() {
    const {backButton} = this.props;

    return (
      <div className='mobile-nav-buttons-left'>
        {
          backButton && (
            <button><i className='fa fa-chevron-left'/></button>
          )
        }
      </div>
    );
  }

  renderTopRightButtons() {
    const {closeButton, collapsed} = this.props;

    return (
      <div className='mobile-nav-buttons'>
        {
          closeButton ? (
            <button><i className='fa fa-times'/></button>
          ) : (
            <div>
              {
                collapsed && (
                  <Link to='/search'>
                    <button key='search' id='btn-nav-search'>
                      <i className='fa fa-search'/>
                    </button>
                  </Link>
                )
              }
              <button key='hamburger'>
                <i className='fa fa-bars'/>
              </button>
            </div>
          )
        }
      </div>
    );
  }
}
