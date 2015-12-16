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
      <div className="side">
        <PromoteLink/>
        <ReferredUsers/>
      </div>
      <div className="content">
        <Withdrawals/>
      </div>
    </section>
  )
);
