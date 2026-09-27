import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { WeatherData } from './models/weather';
import { getCurrentCoordinates } from './services/locationService';
import { getWeatherByCity, getWeatherByCoordinates } from './services/weatherService';

function weatherSymbol(conditionId: number): string {
  if (conditionId >= 200 && conditionId < 300) return '⛈️';
  if (conditionId >= 300 && conditionId < 600) return '🌧️';
  if (conditionId >= 600 && conditionId < 700) return '❄️';
  if (conditionId === 800) return '☀️';
  if (conditionId > 800) return '☁️';
  return '🌫️';
}

export default function App() {
  const [cityQuery, setCityQuery] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Đang lấy vị trí của bạn...');

  const loadWeather = async (request: () => Promise<WeatherData>) => {
    try {
      setLoading(true);
      setMessage('Đang tải thời tiết...');
      setWeather(await request());
      setMessage('');
    } catch (error) {
      setWeather(null);
      setMessage(error instanceof Error ? error.message : 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentLocation = () => {
    loadWeather(async () => {
      const { latitude, longitude } = await getCurrentCoordinates();
      return getWeatherByCoordinates(latitude, longitude);
    });
  };

  const searchCity = () => {
    const city = cityQuery.trim();
    if (!city) {
      setMessage('Hãy nhập tên thành phố để tìm kiếm.');
      return;
    }
    loadWeather(() => getWeatherByCity(city));
  };

  useEffect(() => {
    loadCurrentLocation();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.title}>THỜI TIẾT</Text>
        <Text style={styles.subtitle}>Dự báo hiện tại ở bất kỳ nơi đâu</Text>

        <View style={styles.searchRow}>
          <TextInput
            onChangeText={setCityQuery}
            onSubmitEditing={searchCity}
            placeholder="Nhập tên thành phố"
            placeholderTextColor="#9BA4C7"
            returnKeyType="search"
            style={styles.input}
            value={cityQuery}
          />
          <Pressable accessibilityLabel="Tìm thời tiết" onPress={searchCity} style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}>
            <Text style={styles.searchText}>TÌM</Text>
          </Pressable>
        </View>

        <Pressable accessibilityLabel="Lấy thời tiết tại vị trí hiện tại" onPress={loadCurrentLocation} style={({ pressed }) => [styles.locationButton, pressed && styles.pressed]}>
          <Text style={styles.locationText}>⌖  DÙNG VỊ TRÍ HIỆN TẠI</Text>
        </Pressable>

        <View style={styles.weatherCard}>
          {loading ? (
            <View style={styles.centered}><ActivityIndicator color="#FFFFFF" size="large" /><Text style={styles.message}>{message}</Text></View>
          ) : weather ? (
            <>
              <Text style={styles.city}>{weather.city}, {weather.country}</Text>
              <Text style={styles.icon}>{weatherSymbol(weather.conditionId)}</Text>
              <Text style={styles.temperature}>{weather.temperature}°</Text>
              <Text style={styles.description}>{weather.description}</Text>
              <View style={styles.details}>
                <Text style={styles.detailText}>Cảm giác: {weather.feelsLike}°</Text>
                <Text style={styles.detailText}>Độ ẩm: {weather.humidity}%</Text>
              </View>
            </>
          ) : (
            <View style={styles.centered}><Text style={styles.error}>{message}</Text></View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#11142A', flex: 1 },
  container: { flex: 1, padding: 24 },
  title: { color: '#FFFFFF', fontSize: 31, fontWeight: '900', letterSpacing: 1.5, marginTop: 12 },
  subtitle: { color: '#B7BFDB', fontSize: 16, marginTop: 6 },
  searchRow: { flexDirection: 'row', gap: 10, marginTop: 28 },
  input: { backgroundColor: '#242944', borderRadius: 14, color: '#FFFFFF', flex: 1, fontSize: 16, paddingHorizontal: 16, paddingVertical: 14 },
  searchButton: { alignItems: 'center', backgroundColor: '#FF5A87', borderRadius: 14, justifyContent: 'center', paddingHorizontal: 16 },
  searchText: { color: '#FFFFFF', fontWeight: '900' },
  locationButton: { alignItems: 'center', marginTop: 18, padding: 10 },
  locationText: { color: '#8FDBFF', fontSize: 14, fontWeight: '800' },
  weatherCard: { alignItems: 'center', backgroundColor: '#242944', borderRadius: 28, flex: 1, justifyContent: 'center', marginVertical: 22, padding: 24 },
  centered: { alignItems: 'center', gap: 16 },
  message: { color: '#CED5F0', fontSize: 16, textAlign: 'center' },
  error: { color: '#FFB2C6', fontSize: 16, lineHeight: 24, textAlign: 'center' },
  city: { color: '#FFFFFF', fontSize: 23, fontWeight: '800', textAlign: 'center' },
  icon: { fontSize: 80, marginTop: 22 },
  temperature: { color: '#FFFFFF', fontSize: 90, fontWeight: '900', lineHeight: 106 },
  description: { color: '#CED5F0', fontSize: 20, textTransform: 'capitalize' },
  details: { flexDirection: 'row', gap: 20, marginTop: 26 },
  detailText: { color: '#B7BFDB', fontSize: 15, fontWeight: '700' },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
});
