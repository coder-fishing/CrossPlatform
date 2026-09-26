import { useState } from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface Story {
  storyTitle: string;
  choice1: string;
  choice2?: string;
  nextStory1: number;
  nextStory2?: number;
}

class StoryBrain {
  private _storyNumber = 0;

  private readonly _storyData: Story[] = [
    {
      storyTitle:
        'Xe của bạn bị xẹp lốp trên con đường vắng. Một người lạ dừng lại và đề nghị giúp đỡ.',
      choice1: 'Nhận lời đi cùng người lạ.',
      choice2: 'Tự mình đi bộ tìm sự giúp đỡ.',
      nextStory1: 1,
      nextStory2: 2,
    },
    {
      storyTitle:
        'Người lạ đưa bạn đến một ngôi nhà gỗ ấm áp. Họ mời bạn ở lại qua đêm vì trời đã tối.',
      choice1: 'Ở lại ngôi nhà gỗ.',
      choice2: 'Cảm ơn và tiếp tục tìm thị trấn gần nhất.',
      nextStory1: 3,
      nextStory2: 4,
    },
    {
      storyTitle:
        'Sau một lúc đi bộ, bạn tìm thấy một chiếc điện thoại công cộng vẫn hoạt động bên đường.',
      choice1: 'Gọi cứu hộ và chờ họ đến.',
      choice2: 'Gọi cho người bạn thân sống gần đó.',
      nextStory1: 4,
      nextStory2: 3,
    },
    {
      storyTitle:
        'Bạn đã lựa chọn đúng. Một người bạn đáng tin cậy đến đón và đưa bạn về nhà an toàn.',
      choice1: 'Bắt đầu lại',
      nextStory1: 0,
    },
    {
      storyTitle:
        'Bạn tìm được sự trợ giúp đúng lúc. Chiếc xe được sửa xong trước khi trời mưa lớn.',
      choice1: 'Bắt đầu lại',
      nextStory1: 0,
    },
  ];

  getStory(): Story {
    return this._storyData[this._storyNumber];
  }

  chooseStory(choice: 1 | 2): void {
    const story = this.getStory();
    const nextStory = choice === 1 ? story.nextStory1 : story.nextStory2;

    if (nextStory !== undefined) {
      this._storyNumber = nextStory;
    }
  }

  getStoryNumber(): number {
    return this._storyNumber;
  }
}

export default function App() {
  const [storyBrain] = useState(() => new StoryBrain());
  const [storyNumber, setStoryNumber] = useState(0);
  const story = storyBrain.getStory();

  const makeChoice = (choice: 1 | 2) => {
    storyBrain.chooseStory(choice);
    setStoryNumber(storyBrain.getStoryNumber());
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('./assets/background.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.storyCard}>
              <Text style={styles.chapter}>DESTINY STORY · {storyNumber + 1}</Text>
              <Text style={styles.storyText}>{story.storyTitle}</Text>
            </View>

            <View style={styles.choices}>
              <Pressable
                accessibilityLabel={story.choice1}
                accessibilityRole="button"
                onPress={() => makeChoice(1)}
                style={({ pressed }) => [styles.choiceButton, styles.firstChoice, pressed && styles.pressed]}
              >
                <Text style={styles.choiceText}>{story.choice1}</Text>
              </Pressable>

              {story.choice2 && (
                <Pressable
                  accessibilityLabel={story.choice2}
                  accessibilityRole="button"
                  onPress={() => makeChoice(2)}
                  style={({ pressed }) => [styles.choiceButton, styles.secondChoice, pressed && styles.pressed]}
                >
                  <Text style={styles.choiceText}>{story.choice2}</Text>
                </Pressable>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { backgroundColor: 'rgba(14, 18, 36, 0.72)', flex: 1 },
  safeArea: { flex: 1 },
  container: { flex: 1, justifyContent: 'space-between', padding: 24 },
  storyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
    borderRadius: 24,
    marginTop: 44,
    padding: 24,
  },
  chapter: { color: '#6552B8', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  storyText: { color: '#222033', fontSize: 25, fontWeight: '700', lineHeight: 36, marginTop: 16 },
  choices: { gap: 14, marginBottom: 28 },
  choiceButton: { borderRadius: 16, minHeight: 78, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  firstChoice: { backgroundColor: '#D94B57' },
  secondChoice: { backgroundColor: '#3867D6' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  choiceText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', lineHeight: 23, textAlign: 'center' },
});
