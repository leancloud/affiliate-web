import React from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'

export function requireAuthentication(Component) {

  @connect(state => state)
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.user.isAuthenticated) {
        let redirectAfterLogin = this.props.routing.path;
        this.props
          .dispatch(updatePath(`/login?next=${redirectAfterLogin}`));
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
       )
    }
  }

  return AuthenticatedComponent;

}
