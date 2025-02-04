import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useRef, useState } from 'react';

const HEADER_HEIGHT = 135;
const SCREEN_WIDTH = Dimensions.get('window').width; // Get screen width dynamically

// Sample images (Replace with dynamic image URLs)
const IMAGE_LIST = [
  require('@/assets/images/header.jpg'),
  require('@/assets/images/header.jpg'),
  require('@/assets/images/header.jpg'),
];

type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  // Reference for the horizontal ScrollView
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;

      if (nextIndex >= IMAGE_LIST.length) {
        // When reaching the last image, reset back to the first smoothly
        scrollViewRef.current?.scrollTo({ x: 0, animated: false }); // Instantly move to start
        nextIndex = 0; // Reset index
      } else {
        // Normal forward scroll
        scrollViewRef.current?.scrollTo({ 
          x: nextIndex * SCREEN_WIDTH, 
          animated: true 
        });
      }

      setCurrentIndex(nextIndex);
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* HEADER ICONS CONTAINER BELOW IOS NAVBAR */}
      <View style={styles.headerIconsContainer}>
        <View style={styles.headerIcons}>
          {/* LOGO */}
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />

          {/* ICONS */}
          <View style={styles.iconRow}>
            <TouchableOpacity>
              <Icon name="eye" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ThemedView style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          scrollIndicatorInsets={{ bottom }}
          contentContainerStyle={{ paddingBottom: bottom }}
        >
          {/* HEADER SECTION WITH AUTO-SCROLLING IMAGES */}
          <Animated.View
            style={[
              styles.header,
              { backgroundColor: headerBackgroundColor[colorScheme] },
              headerAnimatedStyle,
            ]}
          >
            {/* HORIZONTAL IMAGE SCROLLING WITH AUTO ROTATION */}
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled // Ensures smooth swiping effect
              showsHorizontalScrollIndicator={false}
              style={styles.imageScrollView}
              scrollEventThrottle={16}
            >
              {IMAGE_LIST.map((image, index) => (
                <View key={index} style={{ width: SCREEN_WIDTH }}>
                  <Image source={image} style={styles.headerImage} />
                </View>
              ))}
            </ScrollView>
          </Animated.View>

          {/* CONTENT */}
          <ThemedView style={styles.content}>{children}</ThemedView>
        </Animated.ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
  },
  headerIconsContainer: {
    backgroundColor: '#000000',
    paddingVertical: 0,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 15,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
  },
  imageScrollView: {
    width: '100%',
  },
  headerImage: {
    width: SCREEN_WIDTH, // Full width
    height: HEADER_HEIGHT,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 18,
    gap: 16,
    overflow: 'hidden',
  },
});