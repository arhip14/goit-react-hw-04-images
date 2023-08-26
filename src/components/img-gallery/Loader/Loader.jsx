import React from 'react';
import loaderStyles from './LoaderStyles';

const loader = () => (
  <div
    style={loaderStyles.loader}>
    <div
      style={loaderStyles.spinner}>

    </div>
  </div>
);

export default loader;
