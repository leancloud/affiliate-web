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
  static contextTypes = {
    router: React.PropTypes.object,
  }
  componentWillMount() {
    AV.User.logOut();
    this.props.logout();
    console.log(this.context)
    this.context.router.goBack();
  }
  render() {
    return (<div></div>);
  }
}
