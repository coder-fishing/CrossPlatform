import { useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const ballImages = [
  require('./assets/images/ball1.png'),
  require('./assets/images/ball2.png'),
  require('./assets/images/ball3.png'),
  require('./assets/images/ball4.png'),
  require('./assets/images/ball5.png'),
] as const;

export default function App() {
  const [ballIndex, setBallIndex] = useState(0);

  // Hàm lắc để chọn ngẫu nhiên một hình ảnh quả cầu chứa câu trả lời
  const handleAskQuestion = () => {
    const randomIndex = Math.floor(Math.random() * ballImages.length);
    setBallIndex(randomIndex);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>MAGIC 8 BALL</Text>
        <Text style={styles.subtitle}>Nghĩ về một câu hỏi trước khi nhấn nút.</Text>

        <View style={styles.ballCard}>
          <Image
            accessibilityLabel={`Magic Ball hình ${ballIndex + 1}`}
            source={ballImages[ballIndex]}
            style={styles.ballImage}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Hỏi Magic 8 Ball"
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleAskQuestion}
        >
          <Text style={styles.buttonText}>HỎI MAGIC BALL</Text>
        </Pressable>
        
        <Text style={styles.hint}>Mỗi lượt sẽ hiển thị ngẫu nhiên một quả cầu mang câu trả lời.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EDE9FE' },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#33206B',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  subtitle: {
    color: '#655B82',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  ballCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    elevation: 5,
    justifyContent: 'center',
    marginVertical: 30,
    padding: 24,
    shadowColor: '#2C1B59',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    width: '100%',
  },
  ballImage: { 
    height: 260, 
    resizeMode: 'contain', 
    width: 260 
  },
  button: {
    backgroundColor: '#5B3FD4',
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  buttonPressed: { 
    backgroundColor: '#452AB5', 
    transform: [{ scale: 0.97 }] 
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '800' 
  },
  hint: {
    color: '#6B6382',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 16,
    textAlign: 'center',
  },
});