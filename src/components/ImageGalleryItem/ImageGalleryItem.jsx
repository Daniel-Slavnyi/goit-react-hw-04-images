import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  url,
  tags,
  largeImageURL,
  getLargePhoto,
}) {
  return (
    <li
      className={css.ImageGalleryItem}
      data-largurl={largeImageURL}
      onClick={getLargePhoto}
    >
      <img className={css.ImageGalleryItemImage} src={url} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired,
  getLargePhoto: PropTypes.func.isRequired,
};
