import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const diamondImage = require('./images/dimonde.png');

/** The I Am Rich screen, using the local diamond asset. */
export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#ff7900" />
      <ExpoStatusBar style="dark" />

      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>I Am Rich</Text>
      </View>

      <View style={styles.content}>
        <Image
          accessibilityLabel="Viên kim cương"
          resizeMode="contain"
          source={diamondImage}
          style={styles.diamond}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff7ff',
  },
  appBar: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7900',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  appBarTitle: {
    color: '#171717',
    fontSize: 18,
    fontWeight: '400',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  diamond: {
    width: '100%',
    maxWidth: 330,
    height: 220,
  },
});
