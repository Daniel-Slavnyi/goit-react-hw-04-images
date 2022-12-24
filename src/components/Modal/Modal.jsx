import React from 'react';
import css from './Modal.module.css';

export default function Modal({ url }) {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={url} alt="num" />
      </div>
    </div>
  );
}
