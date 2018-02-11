import {Map, fromJS} from 'immutable';

export default function users(state = new Map(), action) {
  if (!action.payload)
    return state;

  switch (action.type) {
    case 'getUser':
      return state.set(action.payload._id, fromJS(action.payload));
  }
  return state;
}