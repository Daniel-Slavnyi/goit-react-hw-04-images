import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner';
import Modal from 'components/Modal/Modal';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import css from './App.module.css';

export default class App extends Component {
  state = {
    requestForImg: '',
    visibleBtn: false,
    numberOfPage: null,
    urlOfLargePhoto: '',
    visibleModal: false,
    isLoader: false,
  };

  togleLoader = () => {
    this.setState(prevState => {
      return { isLoader: !prevState.isLoader };
    });
  };

  clearInput = () => {
    this.setState({ requestForImg: '' });
  };

  onSubmit = value => {
    this.setState({ requestForImg: value, numberOfPage: 1 });
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
    const {
      urlOfLargePhoto,
      visibleModal,
      isLoader,
      requestForImg,
      numberOfPage,
    } = this.state;

    return (
      <div className={css.App}>
        <ToastContainer autoClose={3000} theme="dark" />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          getLargePhoto={this.getLargePhoto}
          requestForImg={requestForImg}
          loadMore={this.loadMore}
          numberOfPage={numberOfPage}
          togleLoader={this.togleLoader}
        />

        {visibleModal && (
          <Modal url={urlOfLargePhoto} togleModal={this.togleModal} />
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
