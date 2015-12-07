import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import AV from 'avoscloud-sdk';

import * as actionCreators from 'actions/user';

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
  state => state.items,
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Login extends Component {
  handleSubmit(authData) {
    this.props.login(authData);
  }

  render() {
    return (
      <section>
        <DocumentMeta {...metaData} />
        <LoginForm onSubmit={this.handleSubmit.bind(this)} {...this.props}/>
      </section>
    );
  }
}
