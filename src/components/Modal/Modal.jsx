import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ url, togleModal }) {
  const onKeyDown = e => {
    if (e.code === 'Escape') {
      togleModal();
    }
  };

  const closeByBAckDrop = e => {
    if (e.target === e.currentTarget) {
      togleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.Overlay} onClick={closeByBAckDrop}>
      <div className={css.Modal}>
        <img src={url} alt="num" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  togleModal: PropTypes.func.isRequired,
};
