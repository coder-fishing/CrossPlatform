import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';

interface ReusableCardProps {
  children: ReactNode;
  isSelected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ReusableCard({ children, isSelected = false, onPress, style }: ReusableCardProps) {
  const cardStyle = [styles.card, isSelected && styles.selected, style];

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [cardStyle, pressed && styles.pressed]}>
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.card, borderRadius: 18, padding: 18 },
  selected: { backgroundColor: Colors.selectedCard, borderColor: Colors.accent, borderWidth: 2 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
});
