import React, { useState} from 'react';
import PropTypes from 'prop-types';
import searchbarStyles from './ SearchbarStyles';


const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(query);
  };

  const handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      handleSubmit(evt);
    }
  };


  return (
    <header style={searchbarStyles.searchbar}>
      <form style={searchbarStyles.form} onSubmit={handleSubmit}>
        <button type='submit' style={searchbarStyles.button}>
          <span style={searchbarStyles.buttonLabel}>
            Search
          </span>
        </button>
        <input
          style={searchbarStyles.input}
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        >
        </input>
      </form>
    </header>
  );
};



Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


export default Searchbar;
