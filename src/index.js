async function requestData(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},uk&APPID=1a9418b179e6ee395576bf21049a7c77`, { mode: 'cors' });
  console.log(await response.json());
}

document.querySelector('button').addEventListener('click', () => {
  const location = document.getElementById('location').value;
  requestData(location);
});
