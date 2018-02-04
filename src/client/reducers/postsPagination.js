import querystring from 'querystring';
import {Map, Range, fromJS} from 'immutable';

export default function postsPagination(state = new Map(), action) {
  switch (action.type) {
    case 'listPosts':
    {
      const query = {...action.query};
      const {page} = query;
      delete query.page;
      const key = querystring.stringify(query);

      if(action.payload) {
        // Set current page
        state = state.mergeDeep(fromJS({
          [key]: {
            currentPage: page
          }
        }));

        // Setup page initials
        if (typeof action.payload.pageCount !== 'undefined') {
          state = state.mergeDeep(fromJS({
            [key]: {
              pages: Range(1, action.payload.pageCount + 1).reduce((map, p) => map.set(p.toString(), fromJS({
                entries: [],
                isLoading: false,
                isLoaded: false
              })), new Map())
            }
          }));
        }

        // Insert post entries
        state = state.mergeDeep(fromJS({
          [key]: {
            pages: {
              [page]: {
                entries: action.payload.posts.map(post => post._id),
                isLoading: false,
                isLoaded: true
              }
            }
          }
        }));

        return state;
      } else {
        // Set current page and set as loading
        return state.mergeDeep(fromJS({
          [key]: {
            currentPage: page,
            pages: {
              [page]: {
                isLoading: true,
                isLoaded: false
              }
            }
          }
        }));
      }
    }
  }
  return state;
}