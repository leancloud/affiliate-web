import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export function Modal (props) {
  return (
    <div className={`fill-parent ${styles}`}>
      <div className="mask" onClick={props.onClose}></div>
      <div className={`modal-container ${props.containerClassName}`}>
        {props.children}
      </div>
    </div>
  );
}
