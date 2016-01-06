/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

/* components */
import { Banner } from 'components/Banner';

const metaData = {
  title: 'LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8',
  },
};

@connect(state => state)
export class Home extends Component {
  render() {
    return (
      <section className="fill-parent">
        <DocumentMeta {...metaData} />
        <Banner isLoggedin={this.props.user.isAuthenticated}/>
      </section>
    );
  }
}
