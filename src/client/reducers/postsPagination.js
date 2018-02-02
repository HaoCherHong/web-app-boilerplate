export default function postsPagination(state = 1, action) {
  switch (action.type) {
    case 'listPosts':
      return typeof action.payload.pageCount !== 'undefined' ? action.payload.pageCount : state;
  }
  return state;
}