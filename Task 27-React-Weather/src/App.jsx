import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchWeather() {
  if (!city.trim()) {
    setError("Please enter a city name.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    if (!apiKey) {
      throw new Error("API key is missing.");
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key.");
      }

      if (response.status === 404) {
        throw new Error("City not found.");
      }

      throw new Error(data.message || "Something went wrong.");
    }

    setWeather(data);
  } catch (error) {
    setWeather(null);
    setError(error.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="app">
      <div className="container">
        <header className="header">
          <h1>Weather Dashboard</h1>
          <p>Check the current weather anywhere in the world</p>
        </header>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={searchWeather}
        />

        {loading && <Loading />}

        {error && <p className="error">{error}</p>}

        {weather && !loading && (
          <WeatherCard weather={weather} />
        )}
      </div>
    </main>
  );
}

export default App;