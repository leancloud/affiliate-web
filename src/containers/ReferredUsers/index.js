import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as accountActionCreators from 'actions/account';

import { Griddle } from 'components/Griddle';
import { Section } from 'components/Section';
/* component styles */
import { styles } from './styles.scss';

const columnMeta = [
  {
    columnName: 'userName',
    order: 1,
    cssClassName: 'name',
    customComponent: (props) => (
      <div>
        <div>{props.data}</div>
        <div className="info">{props.rowData.registerAt.toLocaleDateString()} 加入</div>
      </div>
    )
  },{
    columnName: 'totalPayment',
    order: 2,
    cssClassName: 'payment',
    customComponent: (props) => (
      props.data
        ? <span><span className="amount">{props.data.toFixed(2)}</span> 元</span>
        : <span>暂无消费</span>
    )
  },
];

@connect(
  status => ({
    referredUsers: status.account.referredUsers,
  }),
  dispatch => bindActionCreators({
    ...accountActionCreators,
  }, dispatch)
)
export class ReferredUsers extends Component {
  componentDidMount () {
    this.props.fetchReferredUsers();
  }
  render () {
    const {
      referredUsers,
    } = this.props;
    let users = referredUsers.map(user => ({
      userName: user.userName,
      registerAt: new Date(user.registerAt.iso),
      totalPayment: user.totalPayment,
    }));
    if (users.length > 0) {
      return (
        <Section title="朋友们" className={`${styles}`}>
          <Griddle results={users}
                   columnMetadata={columnMeta}
                   pagerClassName="pager"/>
        </Section>
      );
    } else {
      return (
        <Section title="朋友们" className={`${styles}`}>
          <div className="no-user">
            您在 LeanCloud 推荐联盟的收益与你的朋友们在 LeanCloud 的活动息息相关。看看哪些朋友对您的小金库做出了贡献吧。
            <image src={require('./images/no_user.png')}/>
            暂时还没有人出现在这里，不过他们好像发现了了不起的东西。
          </div>
        </Section>
      );
    }
  }
};
