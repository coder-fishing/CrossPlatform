import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomButton } from './components/BottomButton';
import { IconContent } from './components/IconContent';
import { ReusableCard } from './components/ReusableCard';
import { RoundIconButton } from './components/RoundIconButton';
import { CalculatorBrain } from './constants/CalculatorBrain';
import { Colors } from './constants/Colors';

type Gender = 'male' | 'female';

export default function App() {
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState(22);
  const [showResult, setShowResult] = useState(false);

  const calculator = new CalculatorBrain(height, weight);

  const resetCalculator = () => {
    setGender('male');
    setHeight(170);
    setWeight(60);
    setAge(22);
    setShowResult(false);
  };

  if (showResult) {
    const result = calculator.getResult();

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.header}><Text style={styles.title}>KẾT QUẢ CỦA BẠN</Text></View>
        <View style={styles.resultContent}>
          <ReusableCard style={styles.resultCard}>
            <Text style={[styles.status, result === 'NORMAL' && styles.normal]}>{result}</Text>
            <Text style={styles.bmi}>{calculator.calculateBMI()}</Text>
            <Text style={styles.interpretation}>{calculator.getInterpretation()}</Text>
          </ReusableCard>
        </View>
        <BottomButton label="RE-CALCULATE" onPress={resetCalculator} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.header}><Text style={styles.title}>BMI CALCULATOR</Text></View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.genderRow}>
          <ReusableCard isSelected={gender === 'male'} onPress={() => setGender('male')} style={styles.genderCard}>
            <IconContent icon="♂" label="NAM" />
          </ReusableCard>
          <ReusableCard isSelected={gender === 'female'} onPress={() => setGender('female')} style={styles.genderCard}>
            <IconContent icon="♀" label="NỮ" />
          </ReusableCard>
        </View>

        <ReusableCard style={styles.heightCard}>
          <Text style={styles.cardLabel}>CHIỀU CAO</Text>
          <Text style={styles.measurement}>{height}<Text style={styles.unit}> cm</Text></Text>
          <View style={styles.stepper}>
            <RoundIconButton label="−" onPress={() => setHeight((value) => Math.max(120, value - 1))} />
            <RoundIconButton label="+" onPress={() => setHeight((value) => Math.min(220, value + 1))} />
          </View>
        </ReusableCard>

        <View style={styles.valueRow}>
          <ValueCard label="CÂN NẶNG" unit="kg" value={weight} onDecrease={() => setWeight((value) => Math.max(1, value - 1))} onIncrease={() => setWeight((value) => value + 1)} />
          <ValueCard label="TUỔI" value={age} onDecrease={() => setAge((value) => Math.max(1, value - 1))} onIncrease={() => setAge((value) => value + 1)} />
        </View>
      </ScrollView>
      <BottomButton label="CALCULATE" onPress={() => setShowResult(true)} />
    </SafeAreaView>
  );
}

function ValueCard({ label, value, unit, onDecrease, onIncrease }: { label: string; value: number; unit?: string; onDecrease: () => void; onIncrease: () => void }) {
  return (
    <ReusableCard style={styles.valueCard}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.measurement}>{value}{unit && <Text style={styles.unit}> {unit}</Text>}</Text>
      <View style={styles.stepper}>
        <RoundIconButton label="−" onPress={onDecrease} />
        <RoundIconButton label="+" onPress={onIncrease} />
      </View>
    </ReusableCard>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: Colors.background, flex: 1 },
  header: { paddingHorizontal: 24, paddingVertical: 18 },
  title: { color: Colors.text, fontSize: 23, fontWeight: '900', letterSpacing: 1 },
  content: { gap: 16, padding: 16, paddingBottom: 24 },
  genderRow: { flexDirection: 'row', gap: 16 },
  genderCard: { flex: 1, minHeight: 142 },
  heightCard: { alignItems: 'center' },
  cardLabel: { color: Colors.mutedText, fontSize: 14, fontWeight: '700' },
  measurement: { color: Colors.text, fontSize: 44, fontWeight: '900', marginVertical: 8 },
  unit: { color: Colors.mutedText, fontSize: 17, fontWeight: '700' },
  stepper: { flexDirection: 'row', gap: 14 },
  valueRow: { flexDirection: 'row', gap: 16 },
  valueCard: { alignItems: 'center', flex: 1 },
  resultContent: { flex: 1, justifyContent: 'center', padding: 16 },
  resultCard: { alignItems: 'center', minHeight: 400, justifyContent: 'space-around', padding: 28 },
  status: { color: Colors.orange, fontSize: 22, fontWeight: '900' },
  normal: { color: Colors.success },
  bmi: { color: Colors.text, fontSize: 88, fontWeight: '900' },
  interpretation: { color: Colors.text, fontSize: 19, lineHeight: 29, textAlign: 'center' },
});
