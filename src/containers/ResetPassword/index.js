/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import * as userActionCreators from 'actions/user';
/* components */
import { ResetPasswordForm } from 'components/ResetPasswordForm';

import { styles } from './styles.scss';

const metaData = {
  title: '忘记密码 - LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8',
  },
};

@connect(
  null,
  dispatch => bindActionCreators({ ...userActionCreators }, dispatch)
)
export class ResetPassword extends Component {

  render() {
    return (
      <section className={`${styles} fill-parent`}>
        <DocumentMeta {...metaData} />
        <ResetPasswordForm onSubmit={this.props.resetPassword}/>
      </section>
    );
  }
}
