/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';

import * as userActionCreators from 'actions/user';
/* components */
import { LoginForm } from 'components/LoginForm';

import { styles } from './styles.scss';

const metaData = {
  title: '登录 - LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8',
  },
};

@connect(
  null,
  dispatch => bindActionCreators({ ...userActionCreators }, dispatch)
)
export class Login extends Component {

  render() {
    return (
      <section className={`${styles} fill-parent`}>
        <DocumentMeta {...metaData} />
        <LoginForm onSubmit={this.props.login} {...this.props}/>
        <Link to="/reset-password">忘记密码</Link>
      </section>
    );
  }
}
