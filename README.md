# 🌤️ Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from a public weather API. Get current conditions, hourly forecasts, and 7-day weather predictions for any city in the world.

## ✨ Features

- 🌍 **Search by City** - Find weather for any location worldwide
- 📍 **Geolocation** - Get weather for your current location
- 🌡️ **Current Weather** - Real-time temperature, humidity, wind speed, and more
- ⏰ **Hourly Forecast** - View weather for the next 12 hours
- 📅 **7-Day Forecast** - Plan ahead with extended weather predictions
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🚀 **Fast & Efficient** - Optimized API calls and data caching

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, and flexbox
- **JavaScript (ES6+)** - Async/await, fetch API, DOM manipulation
- **WeatherAPI.com** - Free weather data API
- **Font Awesome** - Icons for weather conditions

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Zhouge-coder/weather-dashboard.git
cd weather-dashboard
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# Or simply drag index.html to your browser
```

## 📖 Usage

1. **Search by City**: Type a city name in the search box and press Enter or click the search button
2. **Use Geolocation**: Click the location button to get weather for your current location
3. **View Details**: Scroll to see:
   - Current weather conditions
   - 12-hour hourly forecast
   - 7-day extended forecast
   - Detailed weather metrics (humidity, wind, pressure, UV index, etc.)

## 🌐 API Reference

This project uses the **WeatherAPI.com** API (Free tier):

- **Base URL**: `https://api.weatherapi.com/v1`
- **Endpoints Used**:
  - `/forecast.json` - Get forecast data
- **Key Features**:
  - Free tier: 1 million calls/month
  - No credit card required
  - Includes current weather, hourly, and 14-day forecast
  - Air quality data support

**Note**: Replace the API key in `script.js` with your own from [weatherapi.com](https://www.weatherapi.com/)

## 📊 Data Displayed

### Current Weather
- Temperature (Celsius)
- Weather condition & description
- "Feels like" temperature
- Humidity percentage
- Wind speed
- Visibility distance
- Atmospheric pressure
- UV index

### Hourly Forecast
- Hourly temperatures
- Weather icons
- Humidity levels

### 7-Day Forecast
- Daily weather conditions
- High/low temperatures
- Chance of precipitation

## 🎨 Customization

### Change Colors
Edit the color values in `style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Temperature Units
Modify the API call in `script.js` to use Fahrenheit:
```javascript
// Change from temp_c to temp_f in the API response
```

### Add More Data Points
Extend the `displayWeather()` function to display additional weather parameters available from the API.

## 🔑 Get Your Own API Key

1. Visit [weatherapi.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Copy your API key
4. Replace the `API_KEY` variable in `script.js`

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🌟 Project Structure

```
weather-dashboard/
├── index.html       # HTML structure
├── style.css        # Styling and responsive design
├── script.js        # Weather API integration and logic
└── README.md        # Project documentation
```

## 🚀 Future Enhancements

- [ ] Weather alerts and severe weather warnings
- [ ] Multiple city comparison
- [ ] Temperature unit toggle (Celsius/Fahrenheit)
- [ ] Dark/Light theme toggle
- [ ] Weather history charts
- [ ] Air quality index display
- [ ] Pollen count information
- [ ] Save favorite cities
- [ ] Weather notifications
- [ ] Sunrise/sunset times

## 🐛 Troubleshooting

### "City not found" error
- Make sure the city name is spelled correctly
- Try using the full city name with country code
- Example: "London, UK" instead of just "London"

### Geolocation not working
- Check that your browser has location permission
- Ensure you're using HTTPS (required for geolocation)
- Try in a different browser

### API rate limit reached
- WeatherAPI.com free tier allows 1 million calls/month
- Wait a moment before making another request
- Consider upgrading your API plan

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) - Weather data provider
- [Font Awesome](https://fontawesome.com/) - Icon library
- Icon emojis for weather conditions

## 📞 Support

If you encounter any issues or have suggestions, please create an issue on GitHub.

## 🔗 Links

- [WeatherAPI Documentation](https://www.weatherapi.com/docs/)
- [Font Awesome Icons](https://fontawesome.com/)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs - Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

---

**Made with ❤️ by Weather Dashboard Team**