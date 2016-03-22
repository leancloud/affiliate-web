import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { Home } from 'containers/Home';
import { Login } from 'containers/Login';
import { Logout } from 'containers/Logout';
import { Signup } from 'containers/Signup';
import { VerifyEmail } from 'containers/VerifyEmail';
import { Account } from 'containers/Account';
import { Settings } from 'containers/Settings';
import { ResetPassword } from 'containers/ResetPassword';
import { NotFound } from 'components/NotFound';
import { requireAuthentication } from 'containers/AuthenticatedComponent';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="signup" component={Signup} />
    <Route path="verify-email" component={VerifyEmail} />
    <Route path="account" component={requireAuthentication(Account)} />
    <Route path="settings" component={requireAuthentication(Settings)} />
    <Route path="reset-password" component={ResetPassword} />
    <Route path="*" component={NotFound} />
  </Route>
);
