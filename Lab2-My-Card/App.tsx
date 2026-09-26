import { Ionicons } from '@expo/vector-icons';
import { Image, ImageSourcePropType, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { ContactCard } from './components/ContactCard';
import { colors } from './constants/theme';

const avatar: ImageSourcePropType = require('./assets/images/avatar.jpg');

const openLink = (url: string): void => {
  void Linking.openURL(url);
};

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
          <Image accessibilityLabel="Ảnh đại diện Phạm Như Quốc Triều" source={avatar} style={styles.avatar} />
          <Text style={styles.name}>Phạm Như Quốc Triều</Text>
          <Text style={styles.role}>Full Stack Developer</Text>
          <View style={styles.badge}>
            <Ionicons color={colors.primary} name="location" size={15} />
            <Text style={styles.badgeText}>Đà Nẵng, Việt Nam</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Liên hệ</Text>
        <ContactCard icon="mail-outline" label="Email" value="phamnhuquoctrieu307@gmail.com" onPress={() => openLink('mailto:phamnhuquoctrieu307@gmail.com')} />
        <ContactCard icon="call-outline" label="Điện thoại" value="+84 797 526 054" onPress={() => openLink('tel:+8479726054')} />
        <ContactCard icon="location-outline" label="Địa chỉ" value="Ngũ Hành Sơn, Đà Nẵng" onPress={() => openLink('https://maps.google.com/?q=District+1+Ho+Chi+Minh+City')} />

        <Text style={styles.sectionTitle}>Kết nối</Text>
        <ContactCard icon="logo-github" label="GitHub" value="https://github.com/coder-fishing" onPress={() => openLink('https://github.com/coder-fishing/')} />
        <ContactCard icon="logo-linkedin" label="LinkedIn" value="https://www.linkedin.com/in/quoc-trieu" onPress={() => openLink('https://www.linkedin.com/in/qu%E1%BB%91c-tri%E1%BB%81u-ph%E1%BA%A1m-nh%C6%B0-618842360/')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  profile: { alignItems: 'center', marginBottom: 30, paddingTop: 18 },
  avatar: { borderColor: colors.surface, borderRadius: 72, borderWidth: 4, height: 144, marginBottom: 16, width: 144 },
  name: { color: colors.title, fontSize: 27, fontWeight: '800' },
  role: { color: colors.primary, fontSize: 16, fontWeight: '600', marginTop: 5 },
  badge: { alignItems: 'center', flexDirection: 'row', marginTop: 12 },
  badgeText: { color: colors.body, fontSize: 14, marginLeft: 4 },
  sectionTitle: { color: colors.title, fontSize: 17, fontWeight: '800', marginBottom: 12, marginTop: 8 },
});
