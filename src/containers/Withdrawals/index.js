import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as accountActionCreators from 'actions/account';

import { Griddle } from 'components/Griddle';
import { Section } from 'components/Section';
/* component styles */
import { styles } from './styles.scss';

const STATES = {
  init: '处理中',
  success: '完成',
  fail: '失败'
};

const columnMeta = [
  {
    columnName: 'time',
    order: 1,
    cssClassName: 'time',
    customComponent: (props) => (
      <div id={props.rowData.id}>
        <div className="id info">#{props.rowData.id}</div>
        <div>{props.data.toLocaleString('zh-CN', { hour12: false})}</div>
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
    order: 4,
    cssClassName: 'amount',
    customComponent: (props) => (
      <span><span className="figure">{props.data.toFixed(2)}</span> 元</span>
    )
  },{
    columnName: 'alipayId',
    order: 3,
    cssClassName: 'payment',
    customComponent: (props) => (
      <span className="info">支付宝<br/>{props.data}</span>
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
  static contextTypes = {
    location: React.PropTypes.object,
  }
  componentDidMount () {
    this.props.fetchWithdrawals();
  }
  render () {
    let {
      withdrawals,
    } = this.props;
    let withdrawals2show = withdrawals.map(withdrawal => ({
      id: withdrawal.objectId.slice(-7).toUpperCase(),
      amount: withdrawal.amount,
      time: new Date(withdrawal.createdAt),
      state: withdrawal.state,
      alipayId: withdrawal.alipayId,
      note: withdrawal.note
    }));
    if (withdrawals2show === 0) {
      return (
        <Section title="提现记录" className={`${styles}`}>
          <div className="empty">
            <image src={require('./images/empty.png')}/>
            没有提现记录
          </div>
        </Section>
      );
    } else {
      let withdrawalsInProcess = withdrawals2show.filter(
        withdrawal => withdrawal.state === 'init'
      );
      let withdrawalsRecords = withdrawals2show.filter(
        withdrawal => withdrawal.state !== 'init'
      );
      const rowMetadata = {
        bodyCssClassName: (rowData) =>
          ('#' + rowData.id === this.context.location.hash ? 'active' : '')
      };
      return (
        <div>
          { withdrawalsInProcess.length > 0 && (
            <Section title="处理中的提现" className={`${styles}`}>
              <Griddle results={withdrawalsInProcess}
                       columnMetadata={columnMeta}
                       rowMetadata={rowMetadata}
                       columns={['time', 'state', 'amount', 'alipayId']}
                       resultsPerPage="100"/>
            </Section>
          )}
          { withdrawalsRecords.length > 0 && (
            <Section title="历史提现" className={`${styles}`}>
              <Griddle results={withdrawalsRecords}
                       columnMetadata={columnMeta}
                       rowMetadata={rowMetadata}
                       columns={['time', 'state', 'amount', 'alipayId']}
                       resultsPerPage="100"/>
            </Section>
          )}
        </div>
      );
    }
  }
};
