import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import css from './ImageGallery.module.css';

export default function ImageGallery({ photos, getLargePhoto }) {
  return (
    <ul className={css.ImageGallery}>
      {photos.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          getLargePhoto={getLargePhoto}
        />
      ))}
    </ul>
  );
}
