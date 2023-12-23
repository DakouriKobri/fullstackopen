// NPM Packages
import { useEffect, useState } from 'react';

// Local Files
import weatherService from '../service/weather';

function Weather({ lat, lon }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    weatherService.getWeather(lat, lon).then((data) => {
      setWeatherData(data);
    });
  }, [lat, lon]);

  if (!weatherData) return;

  const { main, name, weather, wind } = weatherData;
  const temperature = main.temp;
  const windSpeed = wind.speed;
  const { description, icon } = weather[0];

  return (
    <div>
      <h3>Weather in {name}</h3>
      <div>Temperature: {temperature}&deg; Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <div>Wind: {windSpeed} m/s</div>
    </div>
  );
}
export default Weather;
