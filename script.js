// Configuration
const API_KEY = 'b6fd43b5998b141e378173020251212'; // Using weatherapi.com free API
const WEATHER_API_BASE = 'https://api.weatherapi.com/v1';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const currentWeather = document.getElementById('currentWeather');
const hourlyForecast = document.getElementById('hourlyForecast');
const forecast = document.getElementById('forecast');

// Event Listeners
searchBtn.addEventListener('click', () => searchWeather(searchInput.value));
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather(searchInput.value);
});
geoBtn.addEventListener('click', getGeolocation);

// Initialize with default city
window.addEventListener('load', () => {
    searchWeather('New York');
});

// Get user's geolocation
function getGeolocation() {
    if (navigator.geolocation) {
        showLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                searchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                showError('Unable to get your location. Please search manually.');
                showLoading(false);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

// Search weather by coordinates
async function searchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `${WEATHER_API_BASE}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=yes`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError('Error fetching weather data. Please try again.');
        console.error('Error:', error);
    } finally {
        showLoading(false);
    }
}

// Search weather by city name
async function searchWeather(city) {
    if (!city.trim()) {
        showError('Please enter a city name.');
        return;
    }

    showLoading(true);
    hideAllSections();
    hideError();

    try {
        const response = await fetch(
            `${WEATHER_API_BASE}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
        searchInput.value = '';
    } catch (error) {
        showError('City not found. Please try another search.');
        console.error('Error:', error);
    } finally {
        showLoading(false);
    }
}

// Display weather data
function displayWeather(data) {
    const current = data.current;
    const location = data.location;
    const forecast_days = data.forecast.forecastday;
    const hourly = forecast_days[0].hour;

    // Update current weather
    document.getElementById('cityName').textContent = `${location.name}, ${location.country}`;
    document.getElementById('date').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('temperature').textContent = `${Math.round(current.temp_c)}°C`;
    document.getElementById('weatherIcon').innerHTML = getWeatherIcon(current.condition.code, current.is_day);
    document.getElementById('weatherDescription').textContent = current.condition.text;
    
    document.getElementById('humidity').textContent = `${current.humidity}%`;
    document.getElementById('windSpeed').textContent = `${current.wind_kph.toFixed(1)} km/h`;
    document.getElementById('visibility').textContent = `${current.vis_km.toFixed(1)} km`;
    document.getElementById('pressure').textContent = `${current.pressure_mb.toFixed(0)} mb`;
    document.getElementById('feelsLike').textContent = `${Math.round(current.feelslike_c)}°C`;
    document.getElementById('uvIndex').textContent = `${Math.round(current.uv)}`;

    // Display hourly forecast
    displayHourlyForecast(hourly);

    // Display 7-day forecast
    displayForecast(forecast_days);

    // Show sections
    currentWeather.style.display = 'block';
    hourlyForecast.style.display = 'block';
    forecast.style.display = 'block';
}

// Display hourly forecast
function displayHourlyForecast(hourly) {
    const hourlyCards = document.getElementById('hourlyCards');
    hourlyCards.innerHTML = '';

    // Get next 12 hours
    const now = new Date();
    const currentHour = now.getHours();
    const hoursToShow = hourly.slice(currentHour, currentHour + 12);

    hoursToShow.forEach(hour => {
        const time = new Date(hour.time);
        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <div class="time">${time.getHours().toString().padStart(2, '0')}:00</div>
            <div class="icon">${getWeatherIcon(hour.condition.code, hour.is_day)}</div>
            <div class="temp">${Math.round(hour.temp_c)}°C</div>
            <div style="font-size: 0.8em; opacity: 0.9;">${hour.humidity}%</div>
        `;
        hourlyCards.appendChild(card);
    });
}

// Display 7-day forecast
function displayForecast(forecast_days) {
    const forecastCards = document.getElementById('forecastCards');
    forecastCards.innerHTML = '';

    forecast_days.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="day">${dayName}</div>
            <div class="icon">${getWeatherIcon(day.day.condition.code, 1)}</div>
            <div style="margin: 10px 0; font-size: 0.9em;">${day.day.condition.text}</div>
            <div class="temp-range">
                <span class="max">↑ ${Math.round(day.day.maxtemp_c)}°</span>
                <span class="min">↓ ${Math.round(day.day.mintemp_c)}°</span>
            </div>
            <div style="margin-top: 10px; font-size: 0.8em; opacity: 0.9;">
                💧 ${day.day.daily_chance_of_rain}%
            </div>
        `;
        forecastCards.appendChild(card);
    });
}

// Get weather icon based on condition code
function getWeatherIcon(code, is_day) {
    const iconMap = {
        // Clear
        1000: is_day ? '☀️' : '🌙',
        // Cloudy
        1003: is_day ? '⛅' : '☁️',
        1006: '☁️',
        1009: '☁️',
        // Rain
        1030: '🌫️',
        1063: '🌧️',
        1066: '❄️',
        1069: '🌧️',
        1072: '🌧️',
        1087: '⛈️',
        1114: '❄️',
        1117: '❄️',
        1135: '🌫️',
        1147: '🌫️',
        1150: '🌧️',
        1153: '🌧️',
        1168: '🌧️',
        1171: '🌧️',
        1180: '🌧️',
        1183: '🌧️',
        1186: '🌧️',
        1189: '🌧️',
        1192: '⛈️',
        1195: '⛈️',
        1198: '🌧️',
        1201: '🌧️',
        1204: '🌧️',
        1207: '🌧️',
        1210: '❄️',
        1213: '❄️',
        1216: '❄️',
        1219: '❄️',
        1222: '❄️',
        1225: '❄️',
        1237: '❄️',
        1240: '🌧️',
        1243: '🌧️',
        1246: '🌧️',
        1249: '❄️',
        1252: '❄️',
        1255: '❄️',
        1258: '❄️',
        1261: '❄️',
        1264: '❄️',
        1273: '⛈️',
        1276: '⛈️',
        1279: '⛈️',
        1282: '⛈️'
    };

    return iconMap[code] || '🌤️';
}

// UI Helper Functions
function showLoading(show) {
    loading.style.display = show ? 'flex' : 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function hideAllSections() {
    currentWeather.style.display = 'none';
    hourlyForecast.style.display = 'none';
    forecast.style.display = 'none';
}