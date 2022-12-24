import React from 'react';
import css from './Searchbar.module.css';

export default function Searchbar({ onRequestForImg, onSubmit }) {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onRequestForImg}
        />
      </form>
    </header>
  );
}
