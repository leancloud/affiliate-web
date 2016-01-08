/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import * as request from 'superagent';
import DocumentMeta from 'react-document-meta';

import { styles } from './styles.scss';

const metaData = {
  title: '验证邮箱 - LeanCloud Affiliate',
  description: '',
  meta: {
    charset: 'utf-8',
  },
};

export class VerifyEmail extends Component {
  componentDidMount() {
    const token = this.props.location.query.token;
    request
      .get(`https://leancloud.cn/1/verifyEmail/${token}`)
      .end((error, res) => {
        this.setState({
          error: error && error.response.body.error,
          res,
        });
      });
  }

  render() {
    let content;
    if (this.state) {
      const {
        error,
        res,
      } = this.state;
      if (error) {
        content = <span>邮箱验证失败：{error}</span>;
      } else if (res) {
        content = <span>邮箱验证成功</span>;
      }
    } else {
      content = <span>正在验证</span>;
    }
    return (
      <section className={`${styles} fill-parent`}>
        <DocumentMeta {...metaData} />
        {content}
      </section>
    );
  }
}
