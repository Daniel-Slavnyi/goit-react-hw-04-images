import React from 'react';
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
