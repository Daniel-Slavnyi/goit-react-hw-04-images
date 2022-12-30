import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner';
import Modal from 'components/Modal/Modal';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import css from './App.module.css';

export default function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [requestForImg, setRequestForImg] = useState('');
  const [numberOfPage, setNumberOfPage] = useState(null);
  const [urlOfLargePhoto, setUrlOfLargePhoto] = useState('');

  const togleLoader = () => {
    setIsLoader(s => !s);
  };

  const loadMore = () => {
    setNumberOfPage(s => s + 1);
  };

  const togleModal = () => {
    setVisibleModal(s => !s);
  };

  const onSubmit = value => {
    setRequestForImg(value);
    setNumberOfPage(1);
  };

  const getLargePhoto = e => {
    setUrlOfLargePhoto(e.currentTarget.dataset.largurl);
    togleModal();
  };

  return (
    <div className={css.App}>
      <ToastContainer autoClose={3000} theme="dark" />
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery
        getLargePhoto={getLargePhoto}
        requestForImg={requestForImg}
        loadMore={loadMore}
        numberOfPage={numberOfPage}
        togleLoader={togleLoader}
      />

      {visibleModal && <Modal url={urlOfLargePhoto} togleModal={togleModal} />}
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
