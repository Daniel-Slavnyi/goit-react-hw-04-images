import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    requestForImg: '',
  };

  handleChangeInput = e => {
    this.setState({ requestForImg: e.target.value.trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { requestForImg } = this.state;

    if (!requestForImg) {
      toast('Please, select image title');
      return;
    }

    this.props.onSubmit(requestForImg);
  };

  render() {
    const { requestForImg } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeInput}
            value={requestForImg}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
