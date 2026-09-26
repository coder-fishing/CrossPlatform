import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/Colors';

interface RoundIconButtonProps {
  label: '+' | '−';
  onPress: () => void;
}

export function RoundIconButton({ label, onPress }: RoundIconButtonProps) {
  return (
    <Pressable accessibilityLabel={label === '+' ? 'Tăng giá trị' : 'Giảm giá trị'} onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: 'center', backgroundColor: Colors.roundButton, borderRadius: 23, height: 46, justifyContent: 'center', width: 46 },
  pressed: { backgroundColor: Colors.accent, transform: [{ scale: 0.94 }] },
  label: { color: Colors.text, fontSize: 26, fontWeight: '700', lineHeight: 29 },
});
