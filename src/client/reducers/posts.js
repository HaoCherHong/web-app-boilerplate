export default function posts(state = [], action) {
  switch (action.type) {
    case 'listPosts':
      return action.payload.posts;
  }
  return state;
}