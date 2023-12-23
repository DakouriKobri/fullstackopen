// NPM Packages
import axios from 'axios';

const weatherKey = import.meta.env.VITE_OPEN_WEATHER_KEY;

function getWeather(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`;
  const request = axios.get(weatherUrl);
  return request.then((response) => response.data);
}

export default { getWeather };
