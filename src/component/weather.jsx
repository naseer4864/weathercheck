import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ searchType, searchTerm }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      let url = '';
      if (searchType === 'city') {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`;
      } else if (searchType === 'state') {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm},us&appid=${apiKey}&units=metric`;
      } else if (searchType === 'zip') {
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${searchTerm},us&appid=${apiKey}&units=metric`;
      }

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);

        
        const lat = response.data.coord.lat;
        const lon = response.data.coord.lon;
        const tzUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const tzResponse = await axios.get(tzUrl);
        const tzOffset = tzResponse.data.timezone;
        const localDateTime = new Date(Date.now() + tzOffset * 1000);
        setDateTime(localDateTime);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherData();
  }, [searchType, searchTerm, apiKey]);

  if (!weatherData || !dateTime) {
    return <div>Loading...</div>;
  }

  return (
    <div className='weather'>
      <h2>{searchTerm.toUpperCase()} Current Weather</h2>
      <p>Date and Time : {dateTime.toLocaleString()}</p>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <p>Weather Condition: {weatherData.weather[0].main}</p>
    </div>
  );
};

export default Weather;