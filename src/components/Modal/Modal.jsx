import React from 'react';
import { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.togleModal();
    }
  };

  render() {
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.url} alt="num" />
        </div>
      </div>
    );
  }
}
