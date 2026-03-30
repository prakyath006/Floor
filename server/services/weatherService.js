// ============================================================
// Floor — Live Weather & AQI API Service
// ============================================================
const axios = require("axios");

const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY;

// City coordinates for India's main metros
const CITY_COORDS = {
  Mumbai:    { lat: 19.0760, lon: 72.8777 },
  Delhi:     { lat: 28.6139, lon: 77.2090 },
  Bangalore: { lat: 12.9716, lon: 77.5946 },
  Chennai:   { lat: 13.0827, lon: 80.2707 },
  Hyderabad: { lat: 17.3850, lon: 78.4867 },
  Pune:      { lat: 18.5204, lon: 73.8567 },
  Kolkata:   { lat: 22.5726, lon: 88.3639 },
};

/**
 * Fetch live weather data from OpenWeatherMap for a given city.
 */
async function getWeatherData(city) {
  const coords = CITY_COORDS[city] || CITY_COORDS["Mumbai"];
  try {
    if (!OPENWEATHER_KEY || OPENWEATHER_KEY === "your_openweathermap_api_key") {
      // Return realistic mock data when no API key is set
      return getMockWeatherData(city);
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHER_KEY}&units=metric`;
    const res = await axios.get(url);
    const d = res.data;
    return {
      city,
      temperature: d.main.temp,
      feelsLike: d.main.feels_like,
      humidity: d.main.humidity,
      windSpeed: (d.wind.speed * 3.6).toFixed(1), // m/s → km/h
      rainfall: d.rain ? (d.rain["1h"] || 0) : 0,
      condition: d.weather[0].description,
      source: "OpenWeatherMap Live",
      timestamp: new Date(),
    };
  } catch (err) {
    console.error("Weather API error, using mock data:", err.message);
    return getMockWeatherData(city);
  }
}

/**
 * Fetch AQI data from OpenWeatherMap Air Pollution API.
 */
async function getAQIData(city) {
  const coords = CITY_COORDS[city] || CITY_COORDS["Delhi"];
  try {
    if (!OPENWEATHER_KEY || OPENWEATHER_KEY === "your_openweathermap_api_key") {
      return getMockAQIData(city);
    }
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHER_KEY}`;
    const res = await axios.get(url);
    const aqi = res.data.list[0].main.aqi; // 1=Good, 2=Fair, 3=Moderate, 4=Poor, 5=Very Poor
    const aqiScale = { 1: 25, 2: 75, 3: 150, 4: 250, 5: 400 };
    return {
      city,
      aqi: aqiScale[aqi] || 100,
      aqiCategory: ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi - 1],
      source: "OpenWeatherMap Air Pollution API",
      timestamp: new Date(),
    };
  } catch (err) {
    console.error("AQI API error, using mock data:", err.message);
    return getMockAQIData(city);
  }
}

/**
 * Check if current conditions breach any parametric trigger thresholds.
 */
function checkTriggers(weatherData, aqiData) {
  const triggered = [];

  if (weatherData.rainfall >= 64) {
    triggered.push({ type: "weather", name: "Heavy Rainfall", value: `${weatherData.rainfall}mm/hr`, threshold: ">64mm/hr", severity: "high" });
  }
  if (weatherData.temperature >= 45) {
    triggered.push({ type: "weather", name: "Extreme Heat", value: `${weatherData.temperature}°C`, threshold: ">45°C", severity: "high" });
  }
  if (weatherData.windSpeed >= 62) {
    triggered.push({ type: "weather", name: "Cyclone/Storm", value: `${weatherData.windSpeed}km/h`, threshold: ">62km/h", severity: "high" });
  }
  if (aqiData && aqiData.aqi >= 400) {
    triggered.push({ type: "environmental", name: "Hazardous AQI", value: `AQI ${aqiData.aqi}`, threshold: ">400 AQI", severity: "high" });
  }

  return triggered;
}

// --- Mock data fallbacks ---
function getMockWeatherData(city) {
  return {
    city,
    temperature: 32,
    feelsLike: 38,
    humidity: 72,
    windSpeed: 18,
    rainfall: 0,
    condition: "Partly cloudy",
    source: "Mock (add OPENWEATHER_API_KEY to use live data)",
    timestamp: new Date(),
  };
}

function getMockAQIData(city) {
  const cityAQI = { Delhi: 180, Mumbai: 95, Bangalore: 65, Chennai: 85, Hyderabad: 120, Pune: 90, Kolkata: 160 };
  return {
    city,
    aqi: cityAQI[city] || 100,
    aqiCategory: "Moderate",
    source: "Mock",
    timestamp: new Date(),
  };
}

module.exports = { getWeatherData, getAQIData, checkTriggers };
