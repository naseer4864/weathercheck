import React, { useState } from 'react';
import Weather from '../component/weather';
import logo from "../asset/logo.png"

const WeatherApp = () => {
  const [searchType, setSearchType] = useState('city');
  const [searchTerm, setSearchTerm] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();

    const inputValue = event.target.elements.search.value;
    if (isNaN(inputValue)) {
      setSearchType('city');
    } else if (inputValue.length === 5) {
      setSearchType('zip');
    } else {
      setSearchType('state');
    }
    setSearchTerm(inputValue);

    event.target.elements.search.value = '';
  };



  return (
    <div className="weatherapp-container">
      <div className="navbar">
        <img src={logo} alt="" />
        <h2>WEATHER</h2>
      </div>
      <div className='weather-app'>
        <h1>Weather Check</h1>
        <form onSubmit={handleSubmit}>
        
            <input type="text" name="search" placeholder='Enter city, state, or zip:'/>
        
          <button type="submit">Get Weather</button>
        </form>
        {searchTerm && (
          <Weather searchType={searchType} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
}

export default WeatherApp;