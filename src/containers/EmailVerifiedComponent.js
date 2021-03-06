/* eslint react/prop-types:0 */
import React from 'react';
import { connect } from 'react-redux';
import { VerifyEmailModal } from 'containers/VerifyEmailModal';

export function requireEmailVerification(options = {}) {

  return Component => {

    @connect(state => state)
    class VerifiedComponent extends React.Component {
      render() {
        let child;
        if (this.props.user.emailVerified === true) {
          child = <Component {...this.props}/>;
        } else {
          child = (
            <VerifyEmailModal
              hint={options.hint}
              onClose={() => options.onCancel(this.props)}
            />);
        }
        return (
          <div>
           { child }
           </div>
         );
      }
    }

    return VerifiedComponent;
  };
}
