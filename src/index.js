import autoCompleteBox from './autocomplete';
import findWeather from './weather_api';
import showWeather from './DOM';

const { autocomplete } = autoCompleteBox;
autocomplete.on('select', async (location) => {
  const weatherData = await findWeather(location);
  showWeather(weatherData);
});
