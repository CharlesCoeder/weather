import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

async function requestData(lat, lon) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=1a9418b179e6ee395576bf21049a7c77`, { mode: 'cors' });
  const json = await response.json();
  return json;
}

const autocomplete = new GeocoderAutocomplete(
  document.getElementById('autocomplete'),
  '359043dc8f784a048f7a50e8c6d1bb91',
  { type: 'city', skipIcons: true },
);
document.querySelector('.geoapify-autocomplete-input').placeholder = 'Enter a city or zipcode';

const temperatureDiv = document.querySelector('.tempNumber');
autocomplete.on('select', async (location) => {
  const coords = location.properties;
  const { lat, lon } = coords;
  const response = await requestData(lat, lon);
  temperatureDiv.textContent = response.main.temp;
});
