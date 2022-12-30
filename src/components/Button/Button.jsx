import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ loadMore }) {
  return (
    <button
      type="button"
      className={css.Button}
      onClick={() => {
        loadMore(s => s + 1);
      }}
    >
      More
    </button>
  );
}
