import type { OpenWeatherResponse, WeatherData } from '../models/weather';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function getApiKey(): string {
  const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('Thiếu EXPO_PUBLIC_OPENWEATHER_API_KEY trong tệp .env.');
  }
  return apiKey;
}

function toWeatherData(data: OpenWeatherResponse): WeatherData {
  const condition = data.weather[0];
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    description: condition.description,
    conditionId: condition.id,
  };
}

async function requestWeather(query: string): Promise<WeatherData> {
  const response = await fetch(`${BASE_URL}?${query}&units=metric&lang=vi&appid=${getApiKey()}`);
  const data = (await response.json()) as OpenWeatherResponse & { message?: string };

  if (!response.ok) {
    throw new Error(data.message || 'Không thể tải dữ liệu thời tiết.');
  }

  return toWeatherData(data);
}

export function getWeatherByCity(city: string): Promise<WeatherData> {
  return requestWeather(`q=${encodeURIComponent(city)}`);
}

export function getWeatherByCoordinates(latitude: number, longitude: number): Promise<WeatherData> {
  return requestWeather(`lat=${latitude}&lon=${longitude}`);
}
