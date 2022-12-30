import { useState, useEffect } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import fecthPhotos from 'components/services/api';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import css from './ImageGallery.module.css';
import Button from 'components/Button/Button';

export default function ImageGallery({
  getLargePhoto,
  requestForImg,
  loadMore,
  numberOfPage,
  togleLoader,
}) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (requestForImg) {
      togleLoader();
      fecthPhotos(requestForImg)
        .then(hits => {
          if (hits.length === 0) {
            toast('There is nothing to search(');
            return;
          }
          setPhotos(hits);
          console.log(photos);
        })
        .finally(() => {
          togleLoader();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestForImg]);

  useEffect(() => {
    if (numberOfPage && numberOfPage !== 1) {
      console.log('number', numberOfPage);
      togleLoader();
      fecthPhotos(requestForImg, numberOfPage)
        .then(hits => {
          setPhotos(s => [...s, ...hits]);
        })
        .finally(() => {
          togleLoader();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfPage]);

  return (
    <>
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
      {photos.length > 13 && <Button loadMore={loadMore} />}
    </>
  );
}

ImageGallery.propTypes = {
  getLargePhoto: PropTypes.func.isRequired,
  requestForImg: PropTypes.string.isRequired,
  numberOfPage: PropTypes.number,
  togleLoader: PropTypes.func.isRequired,
};
