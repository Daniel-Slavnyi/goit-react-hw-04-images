// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
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
    isLoader: false,
  };

  componentDidUpdate(_, prevState) {
    const { requestForImg, numberOfPage } = this.state;
    if (numberOfPage !== prevState.numberOfPage) {
      this.setState({ isLoader: true });

      fecthPhotos(requestForImg, numberOfPage)
        .then(hits => {
          this.setState(prevState => {
            return {
              photos: [...prevState.photos, ...hits],
            };
          });
        })
        .finally(() => {
          this.setState({ isLoader: false });
        });
    }
  }

  onRequestForImg = e => {
    this.setState({ requestForImg: e.target.value.trim() });
  };

  onSubmit = e => {
    e.preventDefault();

    const { requestForImg } = this.state;
    if (!requestForImg) {
      toast('Please, select image title');
      return;
    }

    fecthPhotos(requestForImg).then(hits => {
      if (hits.length === 0) {
        toast('There is nothing to search(');
        this.setState({ requestForImg: '' });
        return;
      }
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
    const { photos, visibleBtn, visibleModal, isLoader, requestForImg } =
      this.state;

    return (
      <div className={css.App}>
        <ToastContainer autoClose={3000} theme="dark" />
        <Searchbar
          value={requestForImg}
          onRequestForImg={this.onRequestForImg}
          onSubmit={this.onSubmit}
        />
        <ImageGallery photos={photos} getLargePhoto={this.getLargePhoto} />
        {visibleBtn && <Button loadMore={this.loadMore} />}
        {visibleModal && (
          <Modal
            url={this.state.urlOfLargePhoto}
            togleModal={this.togleModal}
          />
        )}
        {isLoader && (
          <ColorRing
            visible={true}
            height="50"
            width="50"
            ariaLabel="blocks-loading"
            wrapperClass={css.Loader}
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
      </div>
    );
  }
}
