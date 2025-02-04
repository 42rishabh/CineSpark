import { StyleSheet, Image, TouchableOpacity, Text, View, ScrollView, useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('../../assets/images/header.jpg')}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Recently Viewed</ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed!')}>
          <Text style={styles.buttonText}>View More</Text>
        </TouchableOpacity>
      </ThemedView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieContainer}>
        <View style={styles.movieBox}>
          <Image source={require('../../assets/images/movie1.png')} style={styles.moviePoster} />

          <View style={styles.likesContainer}>
            <Text
              style={[
                styles.likeText,
                { color: colorScheme === 'light' ? '#ffffff' : '#000000' }, // Conditional color
              ]}
            >
              👍 <Text style={styles.likeNumber}>58.2</Text> likes
            </Text>
          </View>
        </View>
        <View style={styles.movieBox}>
          <Image source={require('../../assets/images/movie1.png')} style={styles.moviePoster} />

          <View style={styles.watch}>
            <IconSymbol name="eye" size={18} color="#FFFFFF" />
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={[
                styles.likeText,
                { color: colorScheme === 'light' ? '#ffffff' : '#000000' },
              ]}
            >
              👍 <Text style={styles.likeNumber}>58.2</Text> likes
            </Text>
          </View>
        </View>
        <View style={styles.movieBox}>
          <Image source={require('../../assets/images/movie1.png')} style={styles.moviePoster} />

          <View style={styles.likesContainer}>
            <Text
              style={[
                styles.likeText,
                { color: colorScheme === 'light' ? '#ffffff' : '#000000' },
              ]}
            >
              👍 <Text style={styles.likeNumber}>58.2</Text> likes
            </Text>
          </View>
        </View>
        <View style={styles.movieBox}>
          <Image source={require('../../assets/images/movie1.png')} style={styles.moviePoster} />

          <View style={styles.likesContainer}>
            <Text
              style={[
                styles.likeText,
                { color: colorScheme === 'light' ? '#ffffff' : '#000000' },
              ]}
            >
              👍 <Text style={styles.likeNumber}>58.2</Text> likes
            </Text>
          </View>
        </View>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    width: '100%',
    height: 135,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  },
  button: {
    backgroundColor: '#0C3B2E',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  movieContainer: {
    flexDirection: 'row',
    margin: 0,
  },
  movieBox: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#6ACF6544',
  },
  moviePoster: {
    width: 150,  // Adjust this based on how wide you want the posters
    height: 200,
    resizeMode: 'cover', // Can switch to 'contain' if you prefer
  },

  likesContainer: {
    margin: 3,
    padding: 3,
  },
  likeText: {
    fontSize: 14,
  },
  likeNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  watch: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#00000099',
    padding: 5,
    borderRadius: 20,
  },
});