function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <div className="weather-main">
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.sys.country}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
      </div>

      <div className="temperature">
        {Math.round(weather.main.temp)}°C
      </div>

      <p className="condition">
        {weather.weather[0].description}
      </p>

      <div className="weather-details">
        <div className="detail">
          <span>Feels Like</span>
          <strong>{Math.round(weather.main.feels_like)}°C</strong>
        </div>

        <div className="detail">
          <span>Humidity</span>
          <strong>{weather.main.humidity}%</strong>
        </div>

        <div className="detail">
          <span>Wind</span>
          <strong>{weather.wind.speed} m/s</strong>
        </div>

        <div className="detail">
          <span>Pressure</span>
          <strong>{weather.main.pressure} hPa</strong>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;