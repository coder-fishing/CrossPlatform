import { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Question {
  text: string;
  answer: boolean;
}

const questions: Question[] = [
  { text: 'Việt Nam có thủ đô là Hà Nội.', answer: true },
  { text: 'Mặt Trời quay quanh Trái Đất.', answer: false },
  { text: 'React Native có thể xây dựng ứng dụng Android và iOS.', answer: true },
  { text: 'Số 9 là một số nguyên tố.', answer: false },
  { text: 'TypeScript hỗ trợ kiểm tra kiểu dữ liệu.', answer: true },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scoreKeeper, setScoreKeeper] = useState<boolean[]>([]);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScoreKeeper([]);
  };

  const checkAnswer = (userAnswer: boolean) => {
    const isCorrect = userAnswer === questions[currentIndex].answer;
    const nextScores = [...scoreKeeper, isCorrect];

    if (currentIndex === questions.length - 1) {
      const correctCount = nextScores.filter(Boolean).length;
      setScoreKeeper(nextScores);
      Alert.alert(
        'Hoàn thành!',
        `Bạn trả lời đúng ${correctCount}/${questions.length} câu.`,
        [{ text: 'Chơi lại', onPress: resetQuiz }],
      );
      return;
    }

    setScoreKeeper(nextScores);
    setCurrentIndex((index) => index + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.progressArea}>
          <Text style={styles.progress}>
            Câu {currentIndex + 1} / {questions.length}
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((currentIndex + 1) / questions.length) * 100}%` }]} />
          </View>
        </View>

        <View style={styles.questionArea}>
          <Text style={styles.question}>{questions[currentIndex].text}</Text>
        </View>

        <View style={styles.answersArea}>
          <Pressable
            accessibilityLabel="Đúng"
            accessibilityRole="button"
            onPress={() => checkAnswer(true)}
            style={({ pressed }) => [styles.answerButton, styles.trueButton, pressed && styles.buttonPressed]}
          >
            <Ionicons name="checkmark-circle-outline" color="#FFFFFF" size={30} />
            <Text style={styles.answerText}>ĐÚNG</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Sai"
            accessibilityRole="button"
            onPress={() => checkAnswer(false)}
            style={({ pressed }) => [styles.answerButton, styles.falseButton, pressed && styles.buttonPressed]}
          >
            <Ionicons name="close-circle-outline" color="#FFFFFF" size={30} />
            <Text style={styles.answerText}>SAI</Text>
          </Pressable>
        </View>

        <View style={styles.scoreRow}>
          {scoreKeeper.map((isCorrect, index) => (
            <Ionicons
              color={isCorrect ? '#2EAD62' : '#E34747'}
              key={index}
              name={isCorrect ? 'checkmark-circle' : 'close-circle'}
              size={28}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#171B2C' },
  container: { flex: 1, padding: 24 },
  progressArea: { flex: 1, justifyContent: 'center' },
  progress: { color: '#C7CBE0', fontSize: 15, fontWeight: '700' },
  progressTrack: { backgroundColor: '#343A53', borderRadius: 8, height: 8, marginTop: 10, overflow: 'hidden' },
  progressFill: { backgroundColor: '#7967E8', height: '100%' },
  questionArea: { alignItems: 'center', flex: 5, justifyContent: 'center' },
  question: { color: '#FFFFFF', fontSize: 29, fontWeight: '700', lineHeight: 40, textAlign: 'center' },
  answersArea: { flex: 2, gap: 14, justifyContent: 'center' },
  answerButton: { alignItems: 'center', borderRadius: 16, flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 10 },
  trueButton: { backgroundColor: '#2EAD62' },
  falseButton: { backgroundColor: '#E34747' },
  buttonPressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  answerText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  scoreRow: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 8, minHeight: 54, paddingTop: 14 },
});
