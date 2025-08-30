import { Tabs } from 'expo-router';
import { TabBarIcon } from '~/components/TabBarIcon';
import { useTabBarStore } from '~/store/useTabBarStore';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  const hidden = useTabBarStore((s) => s.hidden);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(hidden ? 80 : 0, { duration: 200 }) }],
  }));

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
      }}
      tabBar={(props) => (
        <Animated.View style={animatedStyle}>
          <BottomTabBar {...props} />
        </Animated.View>
      )}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-square-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: (p) => <TabBarIcon name="meetup" {...p} />,
        }}
      />
    </Tabs>
  );
}
