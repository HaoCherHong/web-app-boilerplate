import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function configureStore(initialState) {
  let store;

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(reducers, initialState, composeEnhancers(
      applyMiddleware(thunk),
    ));
  } else {
    store = createStore(reducers, applyMiddleware(thunk));
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}