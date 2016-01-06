import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
  dispatch => bindActionCreators({...accountActionCreators}, dispatch)
)
export class AccountSummary extends Component {
  render() {
    const user = AV.User.new(this.props.user, { parse: true});
    let updateTime = user.get('commissionUpdatedAt');
    updateTime = (updateTime && updateTime.toLocaleString)
      ? updateTime.toLocaleString()
      : '未知';

    let monthStartTime = new Date();
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

    return (
      <section className={`${styles}`}>
        <div className="container">
          <div className="details"
            title={`更新时间：${updateTime}`}>
            <div>
              <div className="label">账户余额：</div>
              <strong>
                {((user.get('commission') || 0) - (user.get('totalWithdrawal') || 0)).toFixed(2)}
              </strong> 元
            </div>
          </div>
          <div className="details">
            <div>
              <div className="label">您本月还可以提现：</div>
              <strong>{timesLeft}</strong> 次
              <span className="info">（每月 1 日刷新）</span>
            </div>
          </div>
          <div>
            <div>
              <button className="pure-button button-primary"
                      disabled={!timesLeft}
                      onClick={this.props.startWithdraw}>
                提现
              </button>
            </div>
          </div>
        </div>
        {
          this.props.withdrawModal.step ? <WithdrawModal/> : ''
        }
      </section>
    );
  }
}
