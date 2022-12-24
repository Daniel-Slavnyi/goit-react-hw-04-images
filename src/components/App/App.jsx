// import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import React, { Component } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import fecthPhotos from '../services/api';
import css from './App.module.css';

export default class App extends Component {
  state = {
    photos: [],
    requestForImg: '',
    visibleBtn: false,
    numberOfPage: 1,
    urlOfLargePhoto: '',
    visibleModal: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate(_, prevState) {
    const { requestForImg, numberOfPage } = this.state;

    if (numberOfPage !== prevState.numberOfPage) {
      fecthPhotos(requestForImg, numberOfPage).then(hits => {
        this.setState(prevState => {
          return {
            photos: [...prevState.photos, ...hits],
          };
        });
      });
    }
  }

  componentWillUnmount() {
    console.log('delete');
    window.removeEventListener('keydown', this.onKeyDown);

    this.setState({ urlOfLargePhoto: '' });
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.togleModal();
    }
  };

  onRequestForImg = e => {
    this.setState({ requestForImg: e.target.value.trim() });
  };

  onSubmit = e => {
    e.preventDefault();

    const { requestForImg } = this.state;
    if (!requestForImg) {
      return;
    }

    fecthPhotos(requestForImg).then(hits => {
      this.setState({ photos: hits, visibleBtn: true });
    });
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        numberOfPage: prevState.numberOfPage + 1,
      };
    });
  };

  togleModal = () => {
    this.setState(prevState => {
      return {
        visibleModal: !prevState.visibleModal,
      };
    });
  };

  getLargePhoto = e => {
    this.setState({ urlOfLargePhoto: e.currentTarget.dataset.largurl });
    this.togleModal();
  };

  render() {
    const { photos, visibleBtn, visibleModal } = this.state;

    return (
      <div className={css.App}>
        <Searchbar
          onRequestForImg={this.onRequestForImg}
          onSubmit={this.onSubmit}
        />
        <ImageGallery photos={photos} getLargePhoto={this.getLargePhoto} />
        {visibleBtn && <Button loadMore={this.loadMore} />}
        {visibleModal && <Modal url={this.state.urlOfLargePhoto} />}
      </div>
    );
  }
}
