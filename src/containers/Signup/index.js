import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import AV from 'avoscloud-sdk';

import * as userActionCreators from 'actions/user';
import * as signupActionCreators from 'actions/signup';
import { actions as notifActionCreators } from 're-notif';
/* components */
import { Terms } from 'components/Terms';
import { SignupForm } from 'components/SignupForm';

const metaData = {
  title: '注册 - LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8'
  },
};

@connect(
  state => {
    return {
      user: state.user,
      sign: state.sign,
    }
  },
  dispatch => bindActionCreators({
    ...userActionCreators,
    ...signupActionCreators
  }, dispatch)
)
export class Signup extends Component {

  render() {
    let child;
    if (this.props.sign.termsAgreed) {
      child = (
        <SignupForm onSubmit={this.props.signup} {...this.props}/>
      );
    } else {
      child = (
        <div>
          <Terms />
          <button className="btn btn-default" onClick={this.props.agreeTerms} tabIndex="1">
            同意
          </button>
        </div>
      );
    }
    return (
      <section>
        <DocumentMeta {...metaData} />
        {child}
      </section>
    );
  }
}
