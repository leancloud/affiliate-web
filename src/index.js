import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import { syncReduxAndRouter } from 'redux-simple-router';
import DevTools from './containers/DevTools';

import AV from 'avoscloud-sdk';
AV.initialize('bkaTfiY3Nc2jLJW7hXRmoFiK', 'FkooEOxbmkmSnlEvTjxPFEiy');
window.AV = AV;

const store = configureStore();
syncReduxAndRouter(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div className="fill-parent">
      <Router history={browserHistory}>
        {routes}
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
