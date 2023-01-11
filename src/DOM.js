const temperatureDiv = document.querySelector('.temperature');
const humidityDiv = document.querySelector('.humidity');
const sunriseDiv = document.querySelector('.sunrise');
const sunsetDiv = document.querySelector('.sunset');
const feelsLikeDiv = document.querySelector('.feelsLike');

const showWeather = (weatherData) => {
  const {
    temp, humidity, feelsLike, sunrise, sunset,
  } = weatherData;

  temperatureDiv.textContent = temp;
  sunriseDiv.textContent = sunrise;
  sunsetDiv.textContent = sunset;
  humidityDiv.textContent = humidity;
  feelsLikeDiv.textContent = feelsLike;
};

export default showWeather;
