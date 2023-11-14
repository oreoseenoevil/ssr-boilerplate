import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, type }) => {
  return (
    <button type={type} className={styles.button}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button'
};

export default Button;
