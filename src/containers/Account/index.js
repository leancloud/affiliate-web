import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import { AccountSummary } from '../AccountSummary';
import { AccountDetails } from '../AccountDetails';

const metaData = {
  title: '账户 - LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8'
  },
};

export const Account = connect()(
  () => (
    <section>
      <DocumentMeta {...metaData} />
      <AccountSummary/>
      <AccountDetails/>
    </section>
  )
);
