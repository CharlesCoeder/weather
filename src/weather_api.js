async function requestData(lat, lon) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=1a9418b179e6ee395576bf21049a7c77`, { mode: 'cors' });
  const json = await response.json();
  return json;
}

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

const findWeather = async (location) => {
  const coords = location.properties;
  const { lat, lon } = coords;
  const response = await requestData(lat, lon);

  const { temp, humidity, feels_like: feelsLike } = response.main;
  const { sunrise, sunset } = getSunTimes(response);

  return {
    temp, humidity, feelsLike, sunrise, sunset,
  };
};

export default findWeather;
