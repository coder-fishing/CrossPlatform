import { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const diceImages = [
  require('./assets/images/dice-1.png'),
  require('./assets/images/dice-2.png'),
  require('./assets/images/dice-3.png'),
  require('./assets/images/dice-4.png'),
  require('./assets/images/dice-5.png'),
  require('./assets/images/dice-6.png'),
] as const;

const rollOneDie = () => Math.floor(Math.random() * 6) + 1;

export default function App() {
  const [diceValues, setDiceValues] = useState([1, 1, 1]);

  const total = diceValues.reduce((sum, value) => sum + value, 0);
  const result = total === 3 || total === 18 ? 'HAHA' : total > 10 ? 'BIG' : total < 10 ? 'SMALL' : 'EQUAL';

  const rollDice = () => {
    setDiceValues([rollOneDie(), rollOneDie(), rollOneDie()]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>3 XÚC XẮC</Text>
        <Text style={styles.subtitle}>Lắc để xem kết quả BIG hay SMALL</Text>

        <View style={styles.diceContainer}>
          <View style={styles.diceRow}>
            {diceValues.map((value, index) => (
              <Image
                accessibilityLabel={`Xúc xắc ${index + 1}, mặt số ${value}`}
                key={`${index}-${value}`}
                source={diceImages[value - 1]}
                style={styles.diceImage}
              />
            ))}
          </View>
          <Text style={styles.total}>Tổng điểm: {total}</Text>
          <Text style={[styles.result, result === 'HAHA' && styles.haha]}>{result}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Lắc ba xúc xắc"
          onPress={rollDice}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>LẮC XÚC XẮC</Text>
        </Pressable>
        <Text style={styles.rule}>3 hoặc 18: HAHA · Trên 10: BIG · Dưới 10: SMALL</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EEF2FF' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#1E2A5A',
    fontSize: 31,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#667085',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  diceContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    elevation: 4,
    marginVertical: 38,
    padding: 24,
    shadowColor: '#1E2A5A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
  },
  diceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  diceImage: {
    height: 88,
    marginHorizontal: 4,
    resizeMode: 'contain',
    width: 88,
  },
  total: {
    color: '#1E2A5A',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 24,
  },
  result: {
    color: '#4059D9',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 8,
  },
  haha: { color: '#E04848' },
  button: {
    backgroundColor: '#4059D9',
    borderRadius: 14,
    minWidth: 220,
    paddingHorizontal: 26,
    paddingVertical: 16,
  },
  buttonPressed: {
    backgroundColor: '#2E45BF',
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  rule: {
    color: '#667085',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 18,
    textAlign: 'center',
  },
});
