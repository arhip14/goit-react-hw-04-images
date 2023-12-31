import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease',
        }}
        onClick={handleBackdropClick}
      >
        <div style={{
          maxWidth: '90%',
          maxHeight: '90%',
          animation: 'zoomIn 0.3s ease'
        }}>
          <img
            src={src}
            alt={alt}
            style={
              {
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }} />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
