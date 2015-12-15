import React from 'react';

/* component styles */
import styles from './styles';

export function Section (props) {
  return (
    <section className={`${styles}`}>
      <h3>{props.title}</h3>
      {props.children}
    </section>
  );
}
