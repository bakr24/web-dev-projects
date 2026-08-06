const apiKey = "fa394bd674a87d1a3df458ff20ccaedc";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(cityName) {
  if (cityName.trim() === "") {
    alert("Please enter a city name.");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  try {
    searchBtn.disabled = true;
    searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message);
  } finally {
    searchBtn.disabled = false;
    searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
  }
}
function updateUI(data) {
  city.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} km/h`;
  pressure.textContent = `${data.main.pressure} hPa`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  changeBackground(data.weather[0].main);
}
function changeBackground(weather) {
  switch (weather.toLowerCase()) {
    case "clear":
      document.body.style.background =
        "linear-gradient(135deg, #f6d365, #fda085)";
      break;
    case "clouds":
      document.body.style.background =
        "linear-gradient(135deg, #bdc3c7, #2c3e50)";
      break;
    case "rain":
    case "drizzle":
      document.body.style.background =
        "linear-gradient(135deg, #4facfe, #00c6fb)";
      break;
    case "thunderstorm":
      document.body.style.background =
        "linear-gradient(135deg, #232526, #414345)";
      break;
    case "snow":
      document.body.style.background =
        "linear-gradient(135deg, #e6dada, #274046)";
      break;
    case "mist":
    case "fog":
    case "haze":
      document.body.style.background =
        "linear-gradient(135deg, #757f9a, #d7dde8)";
      break;
    default:
      document.body.style.background =
        "linear-gradient(135deg, #4facfe, #00c6fb, #4f46e5)";
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(cityInput.value);
});
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather(cityInput.value);
  }
});

window.addEventListener("load", () => {
  getWeather("Lahore");
});
