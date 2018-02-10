import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import cx from 'classnames';

import styles from './Header.css';

import imgLogo from 'images/index_logo@2x.png';
import imgLogoCollapsed from 'images/com_logo@2x.png';

const MAX_Y_OFFSET = 290;
const	HEADER_HEIGHT = 62;

const getExpandable = location => (
  /^\/posts\/?$/.test(location.pathname)
);

const getCollapsed = (collapsed, expandable) => {
  if (expandable) {
    if (!collapsed && window.pageYOffset >= MAX_Y_OFFSET)
      collapsed = true;
    else if (collapsed && window.pageYOffset < MAX_Y_OFFSET)
      collapsed = false;
  } else
    collapsed = true;
  return collapsed;
};

@withRouter
export default class Header extends React.Component {

  lastScrollY = 0;
  scrollDownDistance = 0;

  constructor(props) {
    super(props);
    const expandable = getExpandable(props.location);
    this.state = {
      headerTop: 0,
      expandable,
      collapsed: !expandable,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    this.lastScrollY = window.pageYOffset;
    this.scrollDownDistance = 0;
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props;
    if (location !== prevProps.location) {
      this.handleRouteChange();
    }
  }

  render() {
    const { title } = this.props;
    const { headerTop, expandable, collapsed } = this.state;

    return (
      <header className={cx(styles.wrapper, {[styles.expandable]: expandable})}>
        <div
          className={cx(styles.header, {
            [styles.collapsed]: collapsed
          })}
          style={{top: headerTop}}>
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
                <button className={cx(styles.searchButton, styles.fadeIn)}>
                  <i className='fas fa-search'/> 我要找
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
    const {collapsed} = this.state;

    if (collapsed) {
      return (
        <img className={cx(styles.logoCollapsed, styles.fadeIn)} alt='噗比 PUPY Logo' src={imgLogoCollapsed}/>
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
            <button><i className='fas fa-chevron-left'/></button>
          )
        }
      </div>
    );
  }

  renderTopRightButtons() {
    const {closeButton, collapsed} = this.state;

    return (
      <div className={styles.navigationButtons}>
        {
          closeButton ? (
            <button><i className='fas fa-times'/></button>
          ) : (
            <div>
              <Link to='/search'>
                <button className={
                  cx(styles.navigationButton, {
                    [styles.fadeIn]: collapsed,
                    [styles.fadeOut]: !collapsed,
                  })
                }>
                  <i className='fas fa-search'/>
                </button>
              </Link>
              <button className={styles.navigationButton}>
                <i className='fas fa-bars'/>
              </button>
            </div>
          )
        }
      </div>
    );
  }

  handleRouteChange() {
    const {location} = this.props;
    //Set expandable
    const expandable = getExpandable(location);
    if(this.state.expandable != expandable)
      this.setState({
        expandable
      });
    //Set collapsed
    const collapsed = getCollapsed(this.state.collapsed, expandable);
    if(this.state.collapsed != collapsed)
      this.setState({
        collapsed
      });
  }

  handleScroll = () => {
    const {location} = this.props;

    //Set expandable
    const expandable = getExpandable(location);
    if(this.state.expandable !== expandable)
      this.setState({
        expandable
      });

    //Set collapsed
    const collapsed = getCollapsed(this.state.collapsed, expandable);
    if(this.state.collapsed !== collapsed)
      this.setState({
        collapsed
      });

    // Hide / Show header by scrolling
    if (this.state.collapsed) {
      if (window.pageYOffset > this.lastScrollY) {
        //Scrolling down
        if (this.lastScrollY)
          this.scrollDownDistance += (window.pageYOffset - this.lastScrollY);
        if (this.scrollDownDistance > 0) {
          this.setState({
            headerTop: Math.max(-HEADER_HEIGHT, this.state.headerTop - (window.pageYOffset - this.lastScrollY))
          });
        }
      } else {
        //Scrolling up
        this.setState({
          headerTop: Math.min(0, Math.max(-HEADER_HEIGHT, parseInt(this.state.headerTop)) + (this.lastScrollY - window.pageYOffset))
        });
        this.scrollDownDistance = 0;
      }
      this.lastScrollY = window.pageYOffset;
    }
  }
}
