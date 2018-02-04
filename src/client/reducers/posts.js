import {Map} from 'immutable';

export default function posts(state = new Map(), action) {
  if (!action.payload)
    return state;

  switch (action.type) {
    case 'listPosts':
      return action.payload.posts.reduce((map, post) => {
        map[post._id] = post;
        return map.set(post._id, post);
      }, state);
    case 'getPost':
      return state.set(action.payload._id, action.payload);
  }
  return state;
}