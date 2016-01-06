import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import { AccountSummary } from '../AccountSummary';
import { AccountDetails } from '../AccountDetails';

const metaData = {
  title: '账户 - LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8',
  },
};

@connect()
export class Account extends Component {
  static propTypes = {
    location: React.PropTypes.object,
  }

  static childContextTypes = {
    location: React.PropTypes.object,
  }

  getChildContext() {
    return { location: this.props.location };
  }

  render() {
    return (
      <section>
        <DocumentMeta {...metaData} />
        <AccountSummary/>
        <AccountDetails/>
      </section>
    );
  }
}
