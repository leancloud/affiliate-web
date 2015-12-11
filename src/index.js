import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';
import { Router, Redirect } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import { syncReduxAndRouter } from 'redux-simple-router';
import DevTools from './containers/DevTools';

import AV from 'avoscloud-sdk';
AV.initialize('bkaTfiY3Nc2jLJW7hXRmoFiK', 'FkooEOxbmkmSnlEvTjxPFEiy');
window.AV = AV;

const store = configureStore();
const history = createHistory();

syncReduxAndRouter(history, store);

ReactDOM.render(
  <Provider store={store}>
    <div className="fill-parent">
      <Router history={history}>
        <Redirect from="/" to="home" />
        {routes}
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
