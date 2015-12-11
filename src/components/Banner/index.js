import React from 'react';

/* component styles */
import styles from './styles';

export function Banner () {
  return (
    <section className={`${styles} fill-parent`}>
      <div className="container banner-wrapper">
          <h1>
            推荐好友使用 LeanCloud<br />
            获得<del>抵用券</del>现金奖励
          </h1>
          <p>
            被推荐人在 LeanCloud 第一年消费的 10%，<br />
            将会以现金方式奖励给推荐人。<br />
            还等什么？
          </p>
          <button className="">我要加入</button>
      </div>
    </section>
  );
}
