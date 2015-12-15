import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { PromoteLink } from 'containers/PromoteLink';
import { ReferredUsers } from 'containers/ReferredUsers';
// import { Withdrawals } from 'containers/Withdrawals';

let PromoteLink = ReferredUsers;
let Withdrawals = ReferredUsers;

import styles from './styles';

export const AccountDetails = connect()(
  () => (
    <section className={`${styles} container`}>
      <div style={{flex: 2, marginRight: '30px'}}>
        <PromoteLink/>
        <ReferredUsers/>
      </div>
      <div style={{flex: 3}}>
        <Withdrawals/>
      </div>
    </section>
  )
);
