/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import { Modal } from 'components/Modal';
import { Link } from 'react-router';

/* components */

import { styles } from './styles.scss';

export class RealNameHintModal extends Component {
  render() {
    return (

      <Modal
        containerClassName={`${styles}`}
        onClose={this.props.onClose}
      >
        <div className="content">
          <h3>请先补充身份信息</h3>
          <div className="hint">{ this.props.hint || '' }</div>
          <Link to="/settings" className="pure-button button-primary">设置</Link>
        </div>
      </Modal>
    );
  }
}
