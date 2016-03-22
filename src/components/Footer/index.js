import React from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export function Footer() {
  return (
    <footer className={`${styles}`}>
      <ul className="container">
        <li>美味书签（北京）信息技术有限公司</li>
        <li><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备12025059号-8</a></li>
        <li>京公网安备11010802014772号</li>
        <li>经营性许可证编号：京ICP证130300号</li>
        <Link to="/terms">用户协议</Link>
      </ul>
    </footer>
  );
}
