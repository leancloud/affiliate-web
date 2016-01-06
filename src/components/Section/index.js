import React from 'react';

/* component styles */
import { styles } from './styles.scss';

export function Section (props) {
  return (
    <section className={`${styles} ${props.className || ''}`}>
      <h3>{props.title}</h3>
      {props.children}
    </section>
  );
}
