import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from '../ImageGallery/ImagGallery';

const ImageGalleryItem = ({ webformatURL, onImageClick }) => (
  <img
    src={webformatURL}
    alt=""
    style={{
      width: '250px',
      height: 'auto',
      cursor: 'pointer',
    }} 
  onClick={onImageClick}/> 
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  omImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
