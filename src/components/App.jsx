import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './img-gallery/SearchBar/SearchBar';
import ImageGallery from './img-gallery/ImageGallery/ImagGallery';
import Button from './img-gallery/Button/Button';
import Loader from './img-gallery/Loader/Loader';
import Modal from './img-gallery/Modal/Modal';
import '../index.css';
import axios from 'axios';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === '') return;

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            q: searchQuery,
            page,
            key: '38252879-889a9619e4dc8706c4a00f455',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
          },
        });

        const data = response.data;

        if (data.hits.length === 0) {
          toast.error('No image found', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: undefined,
          });
        } else {
          setImages((prevImages) => [...prevImages, ...data.hits]);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }

      setIsLoading(false);
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleImageClick = (webformatURL) => {
    setSelectedImage(webformatURL);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleSearchSubmit = (query) => {
    if (query.trim() === '') {
      toast.warn('Please enter a search keyword', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    setImages([]);
    setSearchQuery(query);
    setPage(1);
  };

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  const handleSearchKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      handleSearchSubmit(evt.target.value);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Image Finder App</h1>
      <Searchbar onSubmit={handleSearchSubmit} onKeyDown={handleSearchKeyDown} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMoreClick} isVisible={!isLoading} />
      )}
      {isLoading && <Loader />}
      {selectedImage && (
        <Modal
          src={selectedImage}
          alt="SelectedImg"
          onClose={closeModal}
          onBackdropClick={handleBackdropClick}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
