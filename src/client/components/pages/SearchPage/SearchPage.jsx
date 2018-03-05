import React from 'react';
import {connect} from 'react-redux';
import querystring from 'querystring';
import {provideHooks} from 'redial';
import {pick, omit, omitBy, isEmpty} from 'lodash';

import {listPosts} from 'actions/posts';

import SearchPanel from 'components/posts/SearchPanel';
import PostList from 'components/posts/PostList';

import getPageFromSearch from 'utils/getPageFromSearch';
import {getAgeString} from 'utils/convertAge';

import styles from './SearchPage.css';

function getQueryBySearch(search) {
  let query = querystring.parse(search.slice(1));
  query = pick(query, ['p', 'searchText', 'kind', 'gender', 'age[from]', 'age[to]', 'city', 'district', 'ligated']);
  query = omitBy(query, isEmpty);
  return query;
}

@provideHooks({
  fetch: ({dispatch, location: {search}}) => {
    const query = getQueryBySearch(search);
    if (isEmpty(query))
      return;
    if (query.searchText) {
      return dispatch(listPosts(query.p || 1, {
        searchText: query.searchText
      }));
    } else {
      return dispatch(listPosts(query.p || 1, {
        ...query
      }));
    }
  }
})
@connect((state, {location: {search}}) => {
  const paginationKey = querystring.stringify(omit(getQueryBySearch(search), 'p'));
  const pagination = paginationKey !== '' && state.postsPagination.get(paginationKey);
  return {
    pagination,
    posts: state.posts
  };
})
export default class SearchPage extends React.Component {
  render() {
    const {posts, pagination, location: {search}} = this.props;
    const currentPage = getPageFromSearch(search);

    if (!pagination)
      return <SearchPanel/>;

    return (
      <div className={styles.container}>
        {this.renderKeywords()}

        <PostList posts={posts} pagination={pagination} currentPage={currentPage}/>
      </div>
    );
  }

  renderKeywords()
  {
    const {location: {search}} = this.props;
    const query = getQueryBySearch(search);
    const keywords = [];

    if (query.searchText) {
      keywords.concat(query.searchText.split(' '));
    } else {
      for (let key in query) {
        switch (key) {
          case 'kind':
            keywords.push({
              dog: '小狗',
              cat: '小貓',
              other: '其他'
            }[query[key]]);
            break;
          case 'gender':
            keywords.push({
              girl: '女生',
              boy: '男生'
            }[query[key]]);
            break;
          case 'ligated':
            keywords.push({
              true: '已結紮',
              false: '未結紮'
            }[query[key]]);
            break;
          case 'city':
          case 'district':
            keywords.push(query[key]);
            break;
        }
      }
      if (query['age[from]'] && query['age[to]']) {
        const from = getAgeString(query['age[from]']);
        const to = getAgeString(query['age[to]']);
        keywords.push(from + '~' + to);
      }
    }

    return (
      <p className={styles.keywords}>
        {`你尋找的毛小孩：${keywords.join('、')}`}
      </p>
    );
  }
}
