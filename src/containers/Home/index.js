import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { Banner } from 'components/Banner';

const metaData = {
  title: 'LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8'
  },
};

export class Home extends Component {
  render() {
    return (
      <section className="fill-parent">
        <DocumentMeta {...metaData} />
        <Banner />
      </section>
    );
  }
}
