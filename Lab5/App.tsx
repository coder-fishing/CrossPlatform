import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

const notes = [
  { name: 'Đồ', color: '#F44336', sound: require('./assets/sounds/note1.wav') },
  { name: 'Rê', color: '#FF9800', sound: require('./assets/sounds/note2.wav') },
  { name: 'Mi', color: '#FFEB3B', sound: require('./assets/sounds/note3.wav') },
  { name: 'Fa', color: '#4CAF50', sound: require('./assets/sounds/note4.wav') },
  { name: 'Sol', color: '#00BCD4', sound: require('./assets/sounds/note5.wav') },
  { name: 'La', color: '#3F51B5', sound: require('./assets/sounds/note6.wav') },
  { name: 'Si', color: '#9C27B0', sound: require('./assets/sounds/note7.wav') },
] as const;

type Note = (typeof notes)[number];

function XylophoneKey({ note, onPlayed }: { note: Note; onPlayed: (name: string) => void }) {
  const player = useAudioPlayer(note.sound);

  const playSound = async () => {
    await player.seekTo(0);
    player.play();
    onPlayed(note.name);
  };

  return (
    <Pressable
      accessibilityLabel={`Phát nốt ${note.name}`}
      accessibilityRole="button"
      onPress={playSound}
      style={({ pressed }) => [styles.key, { backgroundColor: note.color }, pressed && styles.keyPressed]}
    >
      <Text style={styles.keyText}>{note.name}</Text>
    </Pressable>
  );
}

export default function App() {
  const [lastNote, setLastNote] = useState('—');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>XYLOPHONE</Text>
        <Text style={styles.subtitle}>Chạm vào mỗi thanh để phát nốt nhạc</Text>
        <Text style={styles.nowPlaying}>Đang phát: {lastNote}</Text>
      </View>

      <View style={styles.keys}>
        {notes.map((note) => (
          <XylophoneKey key={note.name} note={note} onPlayed={setLastNote} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#171622' },
  header: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 20 },
  title: { color: '#FFFFFF', fontSize: 30, fontWeight: '900', letterSpacing: 2 },
  subtitle: { color: '#C4C1D3', fontSize: 15, marginTop: 7, textAlign: 'center' },
  nowPlaying: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginTop: 12 },
  keys: { flex: 1, gap: 8, paddingBottom: 18, paddingHorizontal: 20 },
  key: {
    alignItems: 'center',
    borderRadius: 14,
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  keyPressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  keyText: { color: '#FFFFFF', fontSize: 25, fontWeight: '900' },
});
