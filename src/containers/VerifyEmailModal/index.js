/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'components/Modal';

import * as userActionCreators from 'actions/user';

/* components */

import { styles } from './styles.scss';

@connect(
  state => ({
    user: state.user,
  }),
  dispatch => bindActionCreators({ ...userActionCreators }, dispatch)
)
export class VerifyEmailModal extends Component {
  render() {
    return (
      <Modal
        containerClassName={`${styles}`}
        onClose={this.props.onClose}
      >
        <div className="content">
          <h3>请先验证邮件地址（{this.props.user.email}）</h3>
          <div className="hint">{ this.props.hint || '' }</div>
          <button className="pure-button button-primary"
            onClick={this.props.requestEmailVerify}
          >
            重新发送验证邮件
          </button>
          <a
            className="refresh"
            href="#"
            onClick={this.props.updateUser}
          >
            已完成验证
          </a>
        </div>
      </Modal>
    );
  }
}
