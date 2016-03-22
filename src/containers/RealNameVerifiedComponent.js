/* eslint react/prop-types:0 */
import React from 'react';
import { connect } from 'react-redux';
import { RealNameHintModal } from 'containers/RealNameHintModal';

export function requireRealNameVerification(options = {}) {

  return Component => {

    @connect(state => state)
    class RealNameVerifiedComponent extends React.Component {
      render() {
        let child;
        if (this.props.user.maskedIDNumber && this.props.user.maskedRealName) {
          child = <Component {...this.props}/>;
        } else {
          child = (
            <RealNameHintModal
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

    return RealNameVerifiedComponent;
  };
}
