import {Map, List, fromJS} from 'immutable';

export default function comments(state = new Map(), action) {
  if (!action.payload)
    return state;

  switch (action.type) {
    case 'getComments':
    {
      if (action.payload) {
        return state.set(action.postId, new Map({
          entries: fromJS(action.payload),
          isLoading: false,
          isLoaded: true
        }));
      } else {
        return state.set(action.postId, new Map({
          entries: new List(),
          isLoading: true,
          isLoaded: false
        }));
      }
    }
  }
  return state;
}