/* eslint react/prop-types:0 */
import React from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

export function requireAuthentication(Component) {

  @connect(state => state)
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.user.isAuthenticated) {
        const redirectAfterLogin = this.props.routing.path;
        this.props
          .dispatch(pushPath(`/login?next=${redirectAfterLogin}`));
      }
    }

    render() {
      return (
        <div>
         {this.props.user.isAuthenticated === true
           ? <Component {...this.props}/>
           : null
         }
         </div>
       );
    }
  }

  return AuthenticatedComponent;

}
