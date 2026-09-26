import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface IconContentProps {
  icon: string;
  label: string;
}

export function IconContent({ icon, label }: IconContentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 48 },
  label: { color: Colors.text, fontSize: 15, fontWeight: '800', marginTop: 7 },
});
