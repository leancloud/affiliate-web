/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AV from 'leancloud-storage';

import * as accountActionCreators from 'actions/account';
import { WithdrawModal } from '../WithdrawModal';

/* components */

import { styles } from './styles.scss';

const MAX_WITHDRAW_TIMES = 5;

@connect(
  state => ({
    user: state.user,
    withdrawals: state.account.withdrawals,
    withdrawModal: state.withdrawModal,
  }),
  dispatch => bindActionCreators({ ...accountActionCreators }, dispatch)
)
export class AccountSummary extends Component {
  render() {
    const user = AV.User.new(this.props.user, { parse: true });
    let updateTime = user.get('commissionUpdatedAt');
    updateTime = (updateTime && updateTime.toLocaleString)
      ? updateTime.toLocaleString()
      : '未知';

    const monthStartTime = new Date();
    monthStartTime.setDate(1);
    monthStartTime.setHours(0);
    monthStartTime.setMinutes(0);
    monthStartTime.setSeconds(0);
    monthStartTime.setMilliseconds(0);
    const withdrawalsThisMonth = this.props.withdrawals.filter(withdrawal =>
      new Date(withdrawal.createdAt) >= monthStartTime
      && withdrawal.state !== 'fail'
    );
    const timesLeft = Math.max(0, MAX_WITHDRAW_TIMES - withdrawalsThisMonth.length);
    const balance = (user.get('commission') || 0) - (user.get('totalWithdrawal') || 0);

    const balanceSection = (
      <div className="details" title={`更新时间：${updateTime}`}>
        <div>
          <div className="label">可提现金额：</div>
          <strong>
            {balance.toFixed(2)}
          </strong> 元
        </div>
      </div>
    );
    const timesLeftSection = (
      <div className="details">
        <div>
          <div className="label">您本月还可以提现：</div>
          <strong>{timesLeft}</strong> 次
          <span className="info">（每月 1 日刷新）</span>
        </div>
      </div>
    );
    const operationsSection = (
      <div>
        <div>
          <button
            className="pure-button button-primary"
            disabled={!timesLeft}
            onClick={this.props.startWithdraw}
          >
            提现
          </button>
        </div>
      </div>
    );
    const guideSection = (
      <div className="guide">
        <div>
          <img src={require('./images/step1.png')} width="209" />
          <img src={require('./images/step2.png')} width="209" />
          <img src={require('./images/step3.png')} width="209" />
        </div>
      </div>
    );

    let container;
    if (balance > 0) {
      container = (
        <div className="container">
          {balanceSection}
          {timesLeftSection}
          {operationsSection}
        </div>
      );
    } else {
      container = (
        <div className="container">
          {balanceSection}
          {guideSection}
        </div>
      );
    }
    return (
      <section className={`${styles}`}>
        {container}
        {
          this.props.withdrawModal.step ? <WithdrawModal/> : ''
        }
      </section>
    );
  }
}
