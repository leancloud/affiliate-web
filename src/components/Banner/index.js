import React from 'react';
import { Link } from 'react-router';

/* component styles */
import styles from './styles';

export function Banner (props) {
  return (
    <section className={`${styles} fill-parent`}>
      <div className="container banner-wrapper">
          <h1>
            <span className="title1">推荐好友使用 LeanCloud</span><br />
            <span className="title2">获得<del>抵用券</del>现金奖励</span>
          </h1>
          <p>
            被推荐人在 LeanCloud 第一年消费的 <strong>10%</strong>，<br />
            将会以 <strong>现金方式</strong> 奖励给推荐人。<br />
            { props.isLoggedin ? '' : '还等什么？' }
          </p>
          { props.isLoggedin
            ? <Link to="/account" className="signup-button pure-button button-primary">查看我的账户</Link>
            : <Link to="/signup" className="signup-button pure-button button-primary">我要加入</Link>
          }
      </div>
    </section>
  );
}
