import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as accountActionCreators from 'actions/account';

/* components */

import styles from './styles';

@connect(
  state => ({
    user: state.user,
    account: state.account,
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
    return (
      <section className={`${styles}`}>
        <div className="container">
          <div className="details"
            title={`更新时间：${updateTime}`}>
            <div>
              <div className="label">账户余额：</div>
              <strong>{(user.get('commission') || 0).toFixed(2)}</strong> 元
            </div>
          </div>
          <div className="details">
            <div>
              <div className="label">您本月还可以取现：</div>
              <strong>1</strong> 次
              <span className="info">（每月 1 日刷新）</span>
            </div>
          </div>
          <div>
            <div>
              <button className="pure-button button-primary"
                      onClick={this.props.startWithdraw}>
                提现
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
