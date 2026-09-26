import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BottomButton } from '../components/BottomButton';
import { CalculatorBrain } from '../constants/CalculatorBrain';
import { Colors } from '../constants/Colors';

export default function ResultScreen() {
  const { height = '170', weight = '60' } = useLocalSearchParams<{ height: string; weight: string }>();
  const calculator = new CalculatorBrain(Number(height), Number(weight));
  const result = calculator.getResult();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}><Text style={styles.title}>KẾT QUẢ CỦA BẠN</Text></View>
      <View style={styles.content}>
        <View style={styles.resultCard}>
          <Text style={[styles.status, result === 'NORMAL' && styles.normal]}>{result}</Text>
          <Text style={styles.bmi}>{calculator.calculateBMI()}</Text>
          <Text style={styles.interpretation}>{calculator.getInterpretation()}</Text>
        </View>
      </View>
      <BottomButton label="RE-CALCULATE" onPress={() => router.replace('/')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: Colors.background, flex: 1 },
  header: { paddingHorizontal: 24, paddingVertical: 18 },
  title: { color: Colors.text, fontSize: 25, fontWeight: '900' },
  content: { flex: 1, justifyContent: 'center', padding: 16 },
  resultCard: { alignItems: 'center', backgroundColor: Colors.card, borderRadius: 20, minHeight: 410, justifyContent: 'space-around', padding: 28 },
  status: { color: Colors.orange, fontSize: 22, fontWeight: '900' },
  normal: { color: Colors.success },
  bmi: { color: Colors.text, fontSize: 88, fontWeight: '900' },
  interpretation: { color: Colors.text, fontSize: 19, lineHeight: 29, textAlign: 'center' },
});
