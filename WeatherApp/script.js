const API_KEY = "86fa142e93aa42ff98e63240251409";
const baseUrl = "http://api.weatherapi.com/v1";

document.getElementById("searchButton").addEventListener("click", () => {
  const cityName = document.getElementById("cityInput").value;
  if (cityName) {
    getWeather(cityName);
  } else {
    alert("Please enter a city name.");
  }
});

window.onload = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      await getWeatherByCoordinates(latitude, longitude);
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
};

async function getWeather(cityName) {
  const response = await fetch(
    `${baseUrl}/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
  );
  const data = await response.json();
  displayWeather(data);
  console.log(data);
}

async function getWeatherByCoordinates(lat, lon) {
  const response = await fetch(
    `${baseUrl}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`
  );
  const data = await response.json();
  displayWeather(data);
}

function displayWeather(data) {
  if (data.error) {
    alert(data.error.message);
    return;
  }

  document.getElementById(
    "location"
  ).textContent = `${data.location.name}, ${data.location.country}`;
  document.getElementById("temperature").textContent = `${Math.round(
    data.current.temp_c
  )} °C`;
  document.getElementById(
    "humidity"
  ).textContent = `${data.current.humidity} %`;
  document.getElementById(
    "windSpeed"
  ).textContent = `${data.current.wind_kph} km/h`;
  document.getElementById(
    "pressure"
  ).textContent = `${data.current.pressure_mb} mb`;
  document.getElementById(
    "feelsLike"
  ).textContent = `${data.current.feelslike_c} °C`;

  document.getElementById("description").textContent =
    data.current.condition.text;

  document.getElementById("weatherIcon").src = data.current.condition.icon;
  const condition = data.current.condition.text.toLowerCase();
  if (condition.includes("rain")) {
      document.body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
  } else if (condition.includes("cloud")) {
      document.body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
  } else {
      document.body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
  }
}
