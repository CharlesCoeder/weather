const temperatureDiv = document.querySelector('.temperature');
const humidityDiv = document.querySelector('.humidityData');
const sunriseDiv = document.querySelector('.sunriseData');
const sunsetDiv = document.querySelector('.sunsetData');
const feelsLikeDiv = document.querySelector('.feelsLikeData');
const cityDiv = document.querySelector('.city');
const stateDiv = document.querySelector('.state');

let currentUnit = 'F';
let localData;

const toCelsius = (fahrenheit) => {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return Math.round(celsius);
};

const toFahrenheit = (celsius) => {
  const fahrenheit = ((celsius * 9) / 5 + 32);
  return Math.round(fahrenheit);
};

const changeMeasurements = () => {
  if (currentUnit === 'F') {
    currentUnit = 'C';
    localData.temp = toCelsius(localData.temp);
    localData.feelsLike = toCelsius(localData.feelsLike);
  } else if (currentUnit === 'C') {
    currentUnit = 'F';
    localData.temp = toFahrenheit(localData.temp);
    localData.feelsLike = toFahrenheit(localData.feelsLike);
  }
};

const updateLocalData = (weatherData) => {
  localData = weatherData;
  if (currentUnit === 'C') {
    localData.temp = toCelsius(localData.temp);
    localData.feelsLike = toCelsius(localData.feelsLike);
  }
};

const displayWeather = () => {
  temperatureDiv.textContent = `${localData.temp}°${currentUnit}`;
  sunriseDiv.textContent = localData.sunrise;
  sunsetDiv.textContent = localData.sunset;
  humidityDiv.textContent = `${localData.humidity}%`;
  feelsLikeDiv.textContent = `${localData.feelsLike}°${currentUnit}`;
  cityDiv.textContent = localData.city;
  stateDiv.textContent = localData.state;
};

const updateWeather = (weatherData) => {
  updateLocalData(weatherData);
  displayWeather();
};

const toggleBtn = document.querySelector('.toggleInput');
toggleBtn.addEventListener('click', () => {
  changeMeasurements();
  displayWeather();
});

export default updateWeather;
