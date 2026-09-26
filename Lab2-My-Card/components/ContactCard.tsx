import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type ContactCardProps = {
  icon: IoniconName;
  label: string;
  value: string;
  onPress?: () => void;
};

export function ContactCard({ icon, label, value, onPress }: ContactCardProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.iconBox}>
        <Ionicons color={colors.primary} name={icon} size={22} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        <Text numberOfLines={1} style={styles.value}>{value}</Text>
      </View>
      <Ionicons color="#A7B2C4" name="chevron-forward" size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    minHeight: 76,
    paddingHorizontal: 16,
  },
  cardPressed: { backgroundColor: '#F8FAFF', opacity: 0.8 },
  iconBox: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    marginRight: 14,
    width: 48,
  },
  copy: { flex: 1 },
  label: { color: colors.body, fontSize: 12, fontWeight: '600', marginBottom: 3 },
  value: { color: colors.title, fontSize: 15, fontWeight: '600' },
});
