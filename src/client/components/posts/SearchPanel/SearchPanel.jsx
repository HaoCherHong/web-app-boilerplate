import React from 'react';
import {withRouter} from 'react-router-dom';
import querystring from 'querystring';
import {omitBy, isEmpty} from 'lodash';

import cities from 'cities';

import styles from './SearchPanel.css';

@withRouter
export default class SearchPanel extends React.Component {
  state = {
    filter: {
      kind: '',
      gender: '',
      age: '',
      city: '',
      district: '',
      ligated: ''
    },
    searchText: ''
  }

  render() {
    const {searchText, filter: {kind, gender, age, city, district, ligated}} = this.state;

    return (
      <div>
        <form name='filter' className={styles.filterForm} onSubmit={this.handleFormSubmit}>
          <h2 className={styles.title}>我要尋找</h2>
          <div className={styles.filters}>
            <select className={styles.filter} name='kind' value={kind} onChange={this.handleFormChange}>
              <option value=''>類型</option>
              <option value='cat'>小貓</option>
              <option value='dog'>小狗</option>
              <option value='other'>其他</option>
            </select>
            <select className={styles.filter} name='gender' value={gender} onChange={this.handleFormChange}>
              <option value=''>性別</option>
              <option value='girl'>女生</option>
              <option value='boy'>男生</option>
            </select>
            <select className={styles.filter} name='age' value={age} onChange={this.handleFormChange}>
              <option value=''>年紀</option>
              <option value='0-3'>0個月～3個月</option>
              <option value='3-6'>3個月～6個月</option>
              <option value='6-8'>6個月～8個月</option>
              <option value='8-12'>8個月～1歲</option>
              <option value='12-24'>1歲～2歲</option>
              <option value='24-48'>2歲～4歲</option>
              <option value='48-72'>4歲～6歲</option>
              <option value='72-96'>6歲～8歲</option>
              <option value='96-120'>8歲～10歲</option>
              <option value='120-144'>10歲～12歲</option>
            </select>
            <select className={styles.filter} name='city' value={city} onChange={this.handleFormChange}>
              <option value=''>縣市</option>
              {
                Object.keys(cities).map((city, index) => <option key={index}>{city}</option>)
              }
            </select>
            <select className={styles.filter} name='district' value={district} onChange={this.handleFormChange}>
              <option>區域</option>
              {
                cities[city] && cities[city].map((district, index) => <option key={index}>{district}</option>)
              }
            </select>
            <select className={styles.filter} name='ligated' value={ligated} onChange={this.handleFormChange}>
              <option value=''>結紮</option>
              <option value={false}>未結紮</option>
              <option value={true}>已結紮</option>
            </select>
          </div>
          <button className={styles.filterButton}>尋找毛小孩</button>
        </form>
        <form name='search' className={styles.searchForm} onSubmit={this.handleFormSubmit}>
          <h2 className={styles.title}>我要搜尋</h2>
          <div className={styles.searchWrapper}>
            <input className={styles.searchInput} name='searchText' type='text' placeholder='搜尋' value={searchText} onChange={this.handleFormChange}/>
            <button className={styles.searchButton}><i className='fas fa-search'/></button>
          </div>
        </form>
      </div>
    );
  }

  handleFormChange = e => {
    e.preventDefault();
    if (e.target.name === 'searchText') {
      this.setState({
        searchText: e.target.value
      });
    } else {
      this.setState({
        filter: {
          ...this.state.filter,
          [e.target.name]: e.target.value
        }
      });
    }
  }

  handleFormSubmit = e => {
    const {history} = this.props;
    const {searchText} = this.state;

    e.preventDefault();
    if (e.target.name === 'filter') {

      const filter = {...this.state.filter};
      if (filter.age) {
        filter['age[from]'] = filter.age.split('-')[0];
        filter['age[to]'] = filter.age.split('-')[1];
        delete filter.age;
      }
      const query = (querystring.stringify(omitBy(filter, isEmpty)));
      if (query)
        history.push('/search?' +query);

    } else if (e.target.name === 'search') {
      if (searchText)
        history.push('/search?searchText=' + encodeURIComponent(searchText));
    }
  }
}
