/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { requireVerification } from 'containers/VerifiedComponent';
import * as withdrawActionCreators from 'actions/withdraw';
import { Modal } from 'components/Modal';

import { styles } from './styles.scss';

@connect(
  state => ({
    user: state.user,
    withdrawModal: state.withdrawModal,
  }),
  dispatch => bindActionCreators({ ...withdrawActionCreators }, dispatch)
)
@requireVerification({
  onCancel: props => props.cancel(),
  hint: '为了您的资金安全，验证邮件地址后才能申请提现。',
})
export class WithdrawModal extends Component {
  render() {
    let {
      withdrawModal: {
        step,
      },
    } = this.props;
    const { cancel } = this.props;

    step = step - 1;
    const steps = ['提现申请', '确认', '完成'];
    const stepsClassNames = new Array(steps.length).fill('');
    stepsClassNames[step] = 'active';
    return (
      <Modal
        containerClassName={`${styles}`}
        onClose={cancel}
      >
        <ol className="steps clearfix">
          {steps.map((text, i) => (
            <li className={stepsClassNames[i]} key={i}>{text}</li>
          ))}
        </ol>
        {[
          <Apply/>,
          <Confirm/>,
          <Result/>,
        ][step]}
      </Modal>
    );
  }
}

@reduxForm(
  {
    form: 'withdraw',
    fields: ['amount', 'alipayId'],
  },
  state => ({
    initialValues: state.withdrawModal.data,
    user: state.user,
    withdrawModal: state.withdrawModal,
  }),
  dispatch => bindActionCreators({ ...withdrawActionCreators }, dispatch)
)
class Apply extends Component {
  render() {
    const {
      user,
      fields: { amount, alipayId },
      handleSubmit,
      submitWithdrawApply,
      back,
    } = this.props;
    const balance = (user.commission || 0) - (user.totalWithdrawal || 0);
    return (
      <form id="withdraw" className="pure-form" onSubmit={handleSubmit(submitWithdrawApply)}>
        <div className="content apply-content">
          <div>
            <label htmlFor="amount">金额：</label>
            <div className="input-container amount">
              <input
                type="number"
                placeholder={`最高 ${balance.toFixed(2)}`}
                tabIndex="1"
                required
                max={balance}
                min="0.01"
                step="0.01"
                id="amount"
                {...amount}
              />
              <span className="currency-unit">元</span>
            </div>
          </div>
          <div>
            <label>方式：</label>
            {/* 目前只有支付宝一种方式 */}
            <div className="input-container">
              <image className="alipay"
                src={require('./images/alipay.png')}
                width="114" height="40"
              />
            </div>
            <label htmlFor="alipay-id">支付宝帐号：</label>
            <div className="input-container">
              <input
                type="text"
                tabIndex="2"
                required
                id="alipay-id"
                {...alipayId}
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className="pure-button" tabIndex="4" type="button" onClick={back}>
            取消
          </button>
          <button className="pure-button button-primary" type="submit" tabIndex="3">
            下一步
          </button>
        </div>
      </form>
    );
  }
}

@connect(
  state => ({
    withdrawModal: state.withdrawModal,
  }),
  dispatch => bindActionCreators({ ...withdrawActionCreators }, dispatch)
)
class Confirm extends Component {
  render() {
    const {
      withdrawModal: {
        data,
      },
      back,
      newWithdrawal,
    } = this.props;
    return (
      <div>
        <ul className="content confirm">
          <li>将从您的 LeanCloud Affiliate 账户提取 <strong>人民币 {data.amount} 元</strong>
          到支付宝账户<strong>（{data.alipayId}）</strong>。</li>
          <li>预计 3 - 7 个工作日到账。</li>
        </ul>
        <div className="buttons">
          <button className="pure-button" tabIndex="2" onClick={back}>
            返回修改
          </button>
          <button className="pure-button button-primary" tabIndex="1" onClick={newWithdrawal}>
            提交
          </button>
        </div>
      </div>
    );
  }
}


@connect(
  state => ({
    withdrawModal: state.withdrawModal,
  }),
  dispatch => bindActionCreators({ ...withdrawActionCreators }, dispatch)
)
class Result extends Component {
  restart = () => {
    this.props.back(2);
  };
  render() {
    const {
      withdrawModal: {
        withdrawal: {
          loading,
          error,
        },
      },
      finish,
    } = this.props;
    if (loading) {
      return (
        <div>
          <div className="content info">
            正在提交
          </div>
          <div className="buttons">
            <button disabled className="pure-button" tabIndex="2">
              返回修改
            </button>
            <button disabled className="pure-button button-primary" tabIndex="1">
              提交
            </button>
          </div>
        </div>
      );
    } else if (error) {
      return (
        <div>
          <div className="content info">
            {error.message}
          </div>
          <div className="buttons">
            <button className="pure-button button-primary" tabIndex="1" onClick={this.restart}>
              返回修改
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="content info">
          提现申请已受理，工作人员将立即处理。
        </div>
        <div className="buttons">
          <button className="pure-button button-primary" tabIndex="1" onClick={finish}>
            完成
          </button>
        </div>
      </div>
    );
  }
}
