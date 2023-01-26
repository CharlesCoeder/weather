import autoCompleteBox from './autocomplete';
import findWeather from './weather_api';
import showWeather from './DOM';

const loader = document.querySelector('.loader');
const info = document.querySelector('.info');
const searchBox = document.getElementById('autocomplete');

function hideWhileLoading() {
  loader.classList.remove('hidden');
  info.classList.add('hidden');
  searchBox.classList.add('hidden');
}

function showAfterLoading() {
  loader.classList.add('hidden');
  info.classList.remove('hidden');
  searchBox.classList.remove('hidden');
}

fetch('https://api.geoapify.com/v2/place-details?id=512ba5677a898f5dc059e1cbe957df064140f00101f901ff29030000000000c00208&features=details,details.names&apiKey=359043dc8f784a048f7a50e8c6d1bb91', { mode: 'cors' })
  .then((response) => response.json())
  .then(async (response) => {
    const location = response.features[0];
    const initialData = await findWeather(location);
    showWeather(initialData);
    showAfterLoading();
  });

const { autocomplete } = autoCompleteBox;
autocomplete.on('select', async (location) => {
  hideWhileLoading();
  const weatherData = await findWeather(location);
  autocomplete.setValue('');
  showAfterLoading();
  showWeather(weatherData);
});
