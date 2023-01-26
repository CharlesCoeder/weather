const temperatureDiv = document.querySelector('.temperature');
const humidityDiv = document.querySelector('.humidityData');
const sunriseDiv = document.querySelector('.sunriseData');
const sunsetDiv = document.querySelector('.sunsetData');
const feelsLikeDiv = document.querySelector('.feelsLikeData');
const cityDiv = document.querySelector('.city');
const stateDiv = document.querySelector('.state');

const showWeather = (weatherData) => {
  const {
    temp, humidity, feelsLike, sunrise, sunset, city, state,
  } = weatherData;

  temperatureDiv.textContent = temp;
  sunriseDiv.textContent = sunrise;
  sunsetDiv.textContent = sunset;
  humidityDiv.textContent = humidity;
  feelsLikeDiv.textContent = feelsLike;
  cityDiv.textContent = city;
  stateDiv.textContent = state;
};

export default showWeather;
