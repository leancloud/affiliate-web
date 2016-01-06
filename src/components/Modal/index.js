import React from 'react';

/* component styles */
import { styles } from './styles.scss';

export function Modal(props) {
  return (
    <div className={`fill-parent ${styles}`}>
      <div className="mask" onClick={props.onClose}></div>
      <div className={`modal-container ${props.containerClassName}`}>
        {props.children}
      </div>
    </div>
  );
}
Modal.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.element.isRequired),
    React.PropTypes.element,
  ]),
  onClose: React.PropTypes.func,
  containerClassName: React.PropTypes.string,
};
