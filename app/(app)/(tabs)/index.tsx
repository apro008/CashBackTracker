// app/(tabs)/index.tsx
import React, { useCallback, useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import AnimatedHeader from '~/components/AnimatedHeader';

const AnimatedFlatList = Animated.FlatList;

export const HUGE_DATA = Array.from({ length: 2000 }).map((_, i) => ({
  id: i.toString(),
  title: `Item #${i + 1}`,
}));

export default function Home() {
  const renderItem = useCallback(({ item }: any) => {
    return <Text style={styles.item}>{item.title}</Text>;
  }, []);

  const keyExtractor = useCallback((item: any, index: number) => String(item?.id ?? index), []);

  return (
    <AnimatedHeader
      title="Reddit-style Header"
      leftIcon="menu"
      rightIcon="notifications-outline"
      onLeftPress={() => console.log('Menu pressed')}
      onRightPress={() => console.log('Notifications pressed')}>
      {(scrollHandler: any, headerHeight: any) => (
        <AnimatedFlatList
          data={HUGE_DATA}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: headerHeight }}
        />
      )}
    </AnimatedHeader>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
