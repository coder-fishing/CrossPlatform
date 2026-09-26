import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/Colors';

interface BottomButtonProps {
  label: string;
  onPress: () => void;
}

export function BottomButton({ label, onPress }: BottomButtonProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: 'center', backgroundColor: Colors.accent, justifyContent: 'center', minHeight: 72 },
  pressed: { backgroundColor: Colors.accentPressed },
  label: { color: Colors.text, fontSize: 18, fontWeight: '900', letterSpacing: 1 },
});
