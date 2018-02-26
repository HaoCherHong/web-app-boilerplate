import React from 'react';
import {connect} from 'react-redux';
import querystring from 'querystring';
import {provideHooks} from 'redial';
import {pick, omit, omitBy, isEmpty} from 'lodash';

import {listPosts} from 'actions/posts';

import SearchPanel from 'components/posts/SearchPanel';
import PostList from 'components/posts/PostList';

import getPageFromSearch from 'utils/getPageFromSearch';

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

    return (
      <div className={styles.container}>
        {
          pagination ? (
            <PostList posts={posts} pagination={pagination} currentPage={currentPage}/>
          ) : (
            <SearchPanel/>
          )
        }
      </div>
    );
  }
}
