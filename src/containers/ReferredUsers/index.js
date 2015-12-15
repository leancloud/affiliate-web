import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Section } from 'components/Section';
/* component styles */
import styles from './styles';

export const ReferredUsers = connect(
  status => ({
    user: status.user,
    account: status.account,
  }),
  dispatch => bindActionCreators({}, dispatch)
)((props) => {
  const {
    user,
    account,
  } = props;
  const buttonState = account.copyed ? 'success' : 'secondary';
  const buttonText = account.copyed ? '✓ 已复制' : '复制';
  const link = `https://leancloud.cn/?source=${user.promoteCode}`;
  return (
    <Section title="推荐链接"
             onSubmit={e => e.preventDefault()}>
      <form className={`${styles} pure-form clearfix`}>
        您的推荐链接是：
        <input type="url" readOnly value={link} id='link'/>
        <button className={`button-${buttonState} pure-button`}>
          {buttonText}
        </button>
      </form>
    </Section>
  );
});
