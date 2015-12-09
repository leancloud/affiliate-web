import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { persistState } from 'redux-devtools';

import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const logger = createLogger({ collapsed: true });

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware(),
  logger
);

const finalCreateStore = compose(
  createStoreWithMiddleware,
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
