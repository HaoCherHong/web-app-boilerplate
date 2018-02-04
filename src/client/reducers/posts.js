import {Map} from 'immutable';

export default function posts(state = new Map(), action) {
  switch (action.type) {
    case 'listPosts':
      return action.payload.posts.reduce((map, post) => {
        map[post._id] = post;
        return map.set(post._id, post);
      }, state);
  }
  return state;
}