import React from 'react';

import cities from 'cities';

import styles from './SearchPage.css';

export default class SearchPage extends React.Component {
  state = {
    form: {
      kind: '',
      gender: '',
      age: '',
      city: '',
      district: '',
      ligated: ''
    }
  }

  render() {
    const {form: {kind, gender, age, city, district, ligated}} = this.state;

    return (
      <div>
        <div className={styles.container1}>
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
              <option>0個月～3個月</option>
              <option>3個月～6個月</option>
              <option>6個月～8個月</option>
              <option>8個月～1歲</option>
              <option>1歲～2歲</option>
              <option>2歲～4歲</option>
              <option>4歲～6歲</option>
              <option>6歲～8歲</option>
              <option>8歲～10歲</option>
              <option>10歲～12歲</option>
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
              <option value={true}>未結紮</option>
              <option value={false}>已結紮</option>
            </select>
          </div>
          <button className={styles.filterButton}>尋找毛小孩</button>
        </div>
        <div className={styles.container2}>
          <h2 className={styles.title}>我要搜尋</h2>
          <div className={styles.searchWrapper}>
            <input className={styles.searchInput} id='search' type='text' placeholder='搜尋' />
            <button className={styles.searchButton}><i className='fas fa-search'/></button>
          </div>
        </div>
      </div>
    );
  }

  handleFormChange = e => {
    e.preventDefault();
    const form = {
      ...this.state.form,
      [e.target.name]: e.target.value
    };

    this.setState({form});
  }
}
