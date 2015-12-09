import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import AV from 'avoscloud-sdk';

import * as userActionCreators from 'actions/user';
import { actions as notifActionCreators } from 're-notif';
/* components */
import { LoginForm } from 'components/LoginForm';

const metaData = {
  title: '登录 - LeanAffiliate',
  description: '',
  meta: {
    charset: 'utf-8'
  },
};

@connect(
  state => {
    return {
      user: state.user,
    }
  },
  dispatch => bindActionCreators({...userActionCreators}, dispatch)
)
export class Login extends Component {

  render() {
    return (
      <section>
        <DocumentMeta {...metaData} />
        <LoginForm onSubmit={this.props.login} {...this.props}/>
      </section>
    );
  }
}
