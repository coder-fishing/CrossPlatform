import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

/**
 * A small, self-contained React Native version of the classic I Am Rich lab.
 * The gem is drawn with native Views so the starter project has no external
 * image or icon dependency.
 */
function Diamond() {
  return (
    <View accessibilityLabel="Biểu tượng kim cương" style={styles.diamondShadow}>
      <View style={styles.diamond}>
        <View style={styles.facetTop} />
        <View style={styles.facetLeft} />
        <View style={styles.facetRight} />
        <View style={styles.facetBottom} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <ExpoStatusBar style="light" />

      <View style={styles.content}>
        <Text style={styles.title}>I Am Rich</Text>
        <Text style={styles.subtitle}>Simply priceless.</Text>
        <Diamond />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#101827',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  subtitle: {
    color: '#B6C2D9',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 72,
  },
  diamondShadow: {
    width: 190,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#64D9FF',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 16,
  },
  diamond: {
    width: 136,
    height: 136,
    backgroundColor: '#39BEEB',
    borderWidth: 3,
    borderColor: '#B9F6FF',
    borderRadius: 12,
    transform: [{ rotate: '45deg' }],
    overflow: 'hidden',
  },
  facetTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 42,
    backgroundColor: '#A9F1FF',
  },
  facetLeft: {
    position: 'absolute',
    left: 0,
    top: 42,
    bottom: 0,
    width: 52,
    backgroundColor: '#0C8FCB',
  },
  facetRight: {
    position: 'absolute',
    right: 0,
    top: 42,
    bottom: 0,
    width: 52,
    backgroundColor: '#6DDEFA',
  },
  facetBottom: {
    position: 'absolute',
    bottom: 0,
    left: 52,
    right: 52,
    height: 94,
    backgroundColor: '#25AEDD',
  },
});
