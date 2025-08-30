// components/AnimatedHeaderWrapper.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  // 👇 children is a render-prop function
  // gets scrollHandler + headerHeight
  children: (scrollHandler: any, headerHeight: number) => React.ReactNode;
  headerHeight?: number;
};

export default function AnimatedHeaderWrapper({
  title = 'Home',
  leftIcon = 'person-circle-outline',
  rightIcon = 'notifications-outline',
  onLeftPress,
  onRightPress,
  children,
  headerHeight = 64,
}: Props) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const lastScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      'worklet';
      const y = event.contentOffset.y;
      const dy = y - lastScrollY.value;

      if (y <= 0) {
        translateY.value = withTiming(0, { duration: 200 });
        opacity.value = withTiming(1, { duration: 200 });
      } else if (event.contentSize.height - event.layoutMeasurement.height - y <= 0) {
        // bottom
        translateY.value = withTiming(0, { duration: 200 });
        opacity.value = withTiming(1, { duration: 200 });
      } else {
        if (dy > 5) {
          // scroll down → hide
          translateY.value = withTiming(-headerHeight, { duration: 200 });
          opacity.value = withTiming(0, { duration: 200 });
        } else if (dy < -5) {
          // scroll up → show
          translateY.value = withTiming(0, { duration: 200 });
          opacity.value = withTiming(1, { duration: 200 });
        }
      }

      lastScrollY.value = y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={{ flex: 1 }}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }, headerStyle]}>
        <TouchableOpacity onPress={onLeftPress} style={styles.iconBtn}>
          <Ionicons name={leftIcon} size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={onRightPress} style={styles.iconBtn}>
          <Ionicons name={rightIcon} size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Child scrollable (FlatList / ScrollView / etc.) */}
      {children(scrollHandler, headerHeight)}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#070708',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  iconBtn: {
    padding: 8,
  },
});
