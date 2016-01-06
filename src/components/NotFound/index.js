import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export function NotFound () {
  return (
    <div className={`fill-parent ${styles}`}>
      您所访问的页面不存在
      <div className="morse">{'·--· ·- --· ·    -· --- -    ··-· --- ··- -· -··'}</div>
    </div>
  );
}
