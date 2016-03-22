/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { styles } from './styles.scss';
import { Terms as T } from 'components/Terms';

const metaData = {
  title: '用户推荐服务协议 - LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8',
  },
};

export class Terms extends Component {

  render() {
    return (
      <section className={`${styles} fill-parent`}>
        <DocumentMeta {...metaData} />
        <div className="container">
          <T/>
        </div>
      </section>
    );
  }
}
