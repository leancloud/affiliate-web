import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as accountActionCreators from 'actions/account';

import { Griddle } from 'components/Griddle';
import { Section } from 'components/Section';
/* component styles */
import styles from './styles';

const STATES = {
  init: '处理中',
  success: '成功',
  fail: '失败'
};

const columnMeta = [
  {
    columnName: 'time',
    order: 1,
    cssClassName: 'time',
    customComponent: (props) => (
      <div>
        <div>{props.data.toLocaleDateString()}</div>
        <div>{props.data.toLocaleTimeString(undefined, { hour12: false })}</div>
      </div>
    )
  },{
    columnName: 'state',
    order: 2,
    cssClassName: 'state',
    customComponent: (props) => props.data && (
      <div>
        <div className={props.data}>{STATES[props.data]}</div>
        {props.rowData.note && <div className="note">{props.rowData.note}</div>}
      </div>
    )
  },{
    columnName: 'amount',
    order: 3,
    cssClassName: 'amount',
    customComponent: (props) => (
      <span><span className="figure">{props.data.toFixed(2)}</span> 元</span>
    )
  },{
    columnName: 'alipayId',
    order: 4,
    cssClassName: 'payment',
    customComponent: (props) => (
      <span className="info">支付宝({props.data})</span>
    )
  },
];

@connect(
  status => ({
    withdrawals: status.account.withdrawals,
  }),
  dispatch => bindActionCreators({
    ...accountActionCreators,
  }, dispatch)
)
export class Withdrawals extends Component {
  componentDidMount () {
    this.props.fetchWithdrawals();
  }
  render () {
    let {
      withdrawals,
    } = this.props;
    let withdrawals2show = withdrawals.map(withdrawal => ({
      amount: withdrawal.amount,
      time: new Date(withdrawal.createdAt),
      state: withdrawal.state,
      alipayId: withdrawal.alipayId,
      note: withdrawal.note
    }));
    if (withdrawals2show.length > 0) {
      return (
        <Section title="提现记录" className={`${styles}`}>
          <Griddle results={withdrawals2show}
                   columnMetadata={columnMeta}
                   columns={['time', 'state', 'amount', 'alipayId']}
                   resultsPerPage="100"/>
        </Section>
      );
    } else {
      return (
        <Section title="提现记录" className={`${styles}`}>
          <div className="empty">
            <image src={require('./images/empty.png')}/>
            没有提现记录
          </div>
        </Section>
      );
    }
  }
};
