import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import fecthPhotos from 'components/services/api';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    photos: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { requestForImg, numberOfPage, togleLoader } = this.props;
    if (
      this.props.requestForImg !== prevProps.requestForImg &&
      this.props.requestForImg
    ) {
      togleLoader();
      fecthPhotos(requestForImg)
        .then(hits => {
          if (hits.length === 0) {
            toast('There is nothing to search(');
            return;
          }
          this.setState({ photos: hits });
        })
        .finally(() => {
          togleLoader();
        });
    }

    if (
      this.props.numberOfPage !== prevProps.numberOfPage &&
      this.props.numberOfPage !== 1
    ) {
      togleLoader();
      fecthPhotos(requestForImg, numberOfPage)
        .then(hits => {
          this.setState(prevState => {
            return {
              photos: [...prevState.photos, ...hits],
            };
          });
        })
        .finally(() => {
          togleLoader();
        });
    }
  }

  render() {
    return (
      <>
        <ul className={css.ImageGallery}>
          {this.state.photos.map(
            ({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                alt={tags}
                largeImageURL={largeImageURL}
                getLargePhoto={this.props.getLargePhoto}
              />
            )
          )}
        </ul>
        {this.state.photos.length > 0 && (
          <Button loadMore={this.props.loadMore} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  getLargePhoto: PropTypes.func.isRequired,
  requestForImg: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  numberOfPage: PropTypes.number,
  togleLoader: PropTypes.func.isRequired,
};
