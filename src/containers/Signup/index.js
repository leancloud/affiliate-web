/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import * as userActionCreators from 'actions/user';
import * as signupActionCreators from 'actions/signup';
/* components */
import { Terms } from 'components/Terms';
import { SignupForm } from 'components/SignupForm';

import { styles } from './styles.scss';

const metaData = {
  title: '注册 - LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8',
  },
};

@connect(
  state => ({
    user: state.user,
    sign: state.sign,
  }),
  dispatch => bindActionCreators({
    ...userActionCreators,
    ...signupActionCreators,
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
        <div className="container terms-wrapper">
          <Terms />
          <button className="pure-button button-primary" onClick={this.props.agreeTerms} tabIndex="1">
            同意
          </button>
        </div>
      );
    }
    return (
      <section className={`${styles} fill-parent`}>
        <DocumentMeta {...metaData} />
        {child}
      </section>
    );
  }
}
