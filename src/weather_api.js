async function requestData(lat, lon) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=1a9418b179e6ee395576bf21049a7c77`, { mode: 'cors' });
  const json = await response.json();
  return json;
}

// get sunrise & sunset times and format them
const getSunTimes = (response) => {
  const { timezone } = response;
  let { sunrise, sunset } = response.sys;
  const localSunrise = new Date((sunrise + timezone) * 1000);
  const localSunset = new Date((sunset + timezone) * 1000);

  const sunriseHr = localSunrise.getUTCHours().toString();
  // subtract 12 hrs from sunset for AM/PM format
  const sunsetHr = (localSunset.getUTCHours() - 12).toString();
  let sunriseMin = localSunrise.getUTCMinutes();
  let sunsetMin = localSunset.getUTCMinutes();

  // if mins is less than 10, add a leading 0 so it looks like 12:01 instead of 12:1
  sunriseMin = sunriseMin < 10 ? `0${sunriseMin}` : sunriseMin.toString();
  sunsetMin = sunsetMin < 10 ? `0${sunsetMin}` : sunsetMin.toString();

  sunrise = `${sunriseHr}:${sunriseMin} AM`;
  sunset = `${sunsetHr}:${sunsetMin} PM`;

  return { sunrise, sunset };
};

const getCityStateString = (location) => {
  const data = location.properties;
  const { city } = data;
  let state;

  // if in US get state; otherwise get country
  if (data.country_code === 'us') {
    state = data.state;
  } else {
    state = data.country;
  }

  return { city, state };
};

const findWeather = async (location) => {
  // fetch weather API data
  const coords = location.properties;
  const { lat, lon } = coords;
  const response = await requestData(lat, lon);

  // extract temp, humidity, feelsLike and round to nearest integer
  let { temp, humidity, feels_like: feelsLike } = response.main;
  temp = Math.round(temp);
  humidity = Math.round(humidity);
  feelsLike = Math.round(feelsLike);

  // extract sunrise and sunset times
  const { sunrise, sunset } = getSunTimes(response);

  // get name of city and state
  const { city, state } = getCityStateString(location);

  return {
    temp, humidity, feelsLike, sunrise, sunset, city, state,
  };
};

export default findWeather;
