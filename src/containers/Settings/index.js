/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* components */
import { Section } from 'components/Section';
import { ChangePasswordForm } from 'components/ChangePasswordForm';
import { UpdateInfoForm } from 'components/UpdateInfoForm';

import * as userActionCreators from 'actions/user';

import { styles } from './styles.scss';

const metaData = {
  title: '设置 - LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8',
  },
};

@connect(
  state => state,
  dispatch => bindActionCreators({ ...userActionCreators }, dispatch)
)
export class Settings extends Component {
  render() {
    const {
      maskedRealName, maskedIDNumber,
    } = this.props.user;
    return (
      <section className={`${styles} fill-parent`}>
        <DocumentMeta {...metaData} />
        <Section title="修改密码">
          <ChangePasswordForm onSubmit={this.props.changePassword}/>
        </Section>
        <Section title="更新身份信息">
          <UpdateInfoForm
            onSubmit={this.props.updateInfo}
            user={{ maskedRealName, maskedIDNumber }}
          />
        </Section>
      </section>
    );
  }
}
