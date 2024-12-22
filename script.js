const apiKey = 'b10957c9ab93ac6da7c48705ee81057d';

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city').value;
  if (city === '') {
    alert('Please enter a city name');
    return;
  }
  fetchWeatherData(city);
});

function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('City not found');
        return;
      }
      updateWeatherInfo(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Unable to retrieve data');
    });
}

function updateWeatherInfo(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  document.getElementById('city-name').textContent = `City: ${cityName}`;
  document.getElementById('temperature').textContent = `Temperature: ${temperature} °C`;
  document.getElementById('weather-description').textContent = `Weather: ${weatherDescription}`;
  document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
  document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;
}
