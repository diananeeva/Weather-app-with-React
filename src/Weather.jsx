import React, { useState } from 'react';
import axios from 'axios';

function Weather(){
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = '890aa1463436e6d7ad563a58f55201a4';

    const getWeather = async () => {
        try {
          setError('');
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
          );
          setWeatherData(response.data);
        } catch (err) {
          setError('City not found. Please try again.');
          setWeatherData(null);
        }
      };

      const handleSearch = (e)=>{
        e.preventDefault();
        if(city){
            getWeather();
        }
      }
      
      return (
        <div className="weather-app">
          <h1>Weather App</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Get Weather</button>
          </form>
          {error && <p className="error">{error}</p>}
          {weatherData && (
            <div className="weather-info">
              <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
          )}
        </div>
      );
     
}
export default Weather;