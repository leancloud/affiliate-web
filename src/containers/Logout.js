import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import AV from 'avoscloud-sdk';

import * as userActionCreators from 'actions/user';

@connect(
  state => state,
  dispatch => bindActionCreators({...userActionCreators}, dispatch)
)
export class Logout extends Component {
  componentWillMount() {
    AV.User.logOut();
    this.props.logout();
    this.props.history.goBack();
  }
  render() {
    return (<div></div>);
  }
}
