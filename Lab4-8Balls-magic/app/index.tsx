import { useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const ballImages = [
  require('../assets/images/ball1.png'),
  require('../assets/images/ball2.png'),
  require('../assets/images/ball3.png'),
  require('../assets/images/ball4.png'),
  require('../assets/images/ball5.png'),
] as const;

const answers = [
  'Chắc chắn rồi!',
  'Dấu hiệu rất tốt.',
  'Có thể lắm đấy.',
  'Hãy thử lại sau.',
  'Chưa thể trả lời.',
] as const;

export default function Magic8Ball() {
  const [ballIndex, setBallIndex] = useState(0);
  const [answer, setAnswer] = useState('Hãy đặt một câu hỏi');

  const changeBall = () => {
    setBallIndex((currentIndex) => {
      const offset = Math.floor(Math.random() * (ballImages.length - 1)) + 1;
      return (currentIndex + offset) % ballImages.length;
    });

    setAnswer(answers[Math.floor(Math.random() * answers.length)]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>MAGIC 8 BALL</Text>
        <Text style={styles.subtitle}>Nghĩ về một câu hỏi, rồi nhấn nút.</Text>

        <View style={styles.card}>
          <Image source={ballImages[ballIndex]} style={styles.ballImage} />
          <Text style={styles.answer}>{answer}</Text>
        </View>

        <Pressable onPress={changeBall} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>ĐỔI MAGIC BALL</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F1EEFF' },
  container: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: 24 },
  title: { color: '#30205E', fontSize: 30, fontWeight: '900', letterSpacing: 1.5 },
  subtitle: { color: '#6B6382', fontSize: 16, marginTop: 8, textAlign: 'center' },
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    elevation: 5,
    marginVertical: 30,
    padding: 20,
    shadowColor: '#2C1B59',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    width: '100%',
  },
  ballImage: { height: 230, resizeMode: 'contain', width: 230 },
  answer: { color: '#2F215A', fontSize: 20, fontWeight: '800', marginTop: 14, textAlign: 'center' },
  button: { backgroundColor: '#5A3ED1', borderRadius: 14, paddingHorizontal: 30, paddingVertical: 16 },
  buttonPressed: { backgroundColor: '#4229AD', transform: [{ scale: 0.97 }] },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
