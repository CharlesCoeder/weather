import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

const autoCompleteBox = (() => {
  const autocomplete = new GeocoderAutocomplete(
    document.getElementById('autocomplete'),
    '359043dc8f784a048f7a50e8c6d1bb91',
    { type: 'city', skipIcons: true },
  );
  document.querySelector('.geoapify-autocomplete-input').placeholder = 'Enter a city or zipcode';

  return { autocomplete };
})();

export default autoCompleteBox;
