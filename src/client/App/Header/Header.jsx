import React from 'react';

import style from './Header.css';

export default class Header extends React.Component {

  render() {
    return (
      <header
        className={'header' + (expandable ? ' expandable' : '') + (collapsed ? ' collapsed' : '')}
        style={{top: headerTop}}>
        <div className='container'>
          {
            title ? (
              <h1>{title}</h1>
            ) : (
              <div className='logo-block'>
                <Link to='/'>
                  {
                    collapsed
                      ? <img className='header-logo-mobile' alt='噗比 PUPY Logo' src='/images/com_logo@2x.png'/>
                      :	 <img className='header-logo' alt='噗比 PUPY Logo' src='/images/index_logo@2x.png'/>
                  }
                </Link>
              </div>
            )
          }
          {/* Mobile filter */}
          {
            !collapsed && (
              <button className='btn-mobile-search' onClick={openFilter}>
                <i className='fa fa-search'/>
              我要找
              </button>
            )
          }
          {/* Left buttons */}
          <div className='mobile-nav-buttons-left'>
            {
              backButton && (
                <button onClick={() => { browserHistory.goBack() ;}}><i className='fa fa-chevron-left'/></button>
              )
            }
          </div>

          {/* Top-Right buttons */}
          <div className='mobile-nav-buttons'>
            {
              (()=>{
            if(closeButton)
              return <button onClick={()=>{browserHistory.goBack()}}><i className="fa fa-times"/></button>;

              return [
                collapsed && (
                  <button key="search" id="btn-nav-search" onClick={openFilter}>
                    <i className="fa fa-search"/>
                  </button>
                ), (
                  <button key="hamburger">
                    <i className="fa fa-bars" onClick={()=>{
                      dispatch(openSideMenu());
                    }}/>
                  </button>
                )
              ];

          })()
            }
          </div>
        </div>
      </header>
    );
  }
}
