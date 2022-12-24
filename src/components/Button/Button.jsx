import React from 'react';
import css from './Button.module.css';

export default function Button({ loadMore }) {
  return (
    <button type="button" className={css.Button} onClick={loadMore}>
      More
    </button>
  );
}
