import React, { useState } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  useAnimatedStyle, 
  withTiming,
} from 'react-native-reanimated';
import { View, Text, Pressable } from '@/tw';
import { Animated } from '@/tw/animated';
import { 
  HomeIcon as HomeOutline,
  BookOpenIcon as BookOutline,
  SparklesIcon as SparklesOutline,
  ChatBubbleBottomCenterTextIcon as ChatOutline,
  UserIcon as UserOutline
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeSolid,
  BookOpenIcon as BookSolid,
  SparklesIcon as SparklesSolid,
  ChatBubbleBottomCenterTextIcon as ChatSolid,
  UserIcon as UserSolid
} from 'react-native-heroicons/solid';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [tabBarWidth, setTabBarWidth] = useState(0);
  
  const tabWidth = tabBarWidth > 0 ? tabBarWidth / state.routes.length : 0;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          translateX: withTiming(state.index * tabWidth, {
            duration: 250,
          }) 
        }
      ],
    };
  });

  return (
    <View 
      className="flex-row bg-white border-t border-border px-2"
      style={{ paddingBottom: Math.max(insets.bottom, 16), paddingTop: 16 }}
      onLayout={(e) => setTabBarWidth(e.nativeEvent.layout.width - 16)} // minus px-2 (8px each side)
    >
      {/* Sliding Circle Background */}
      {tabWidth > 0 && (
        <Animated.View 
          className="absolute top-4 h-12 justify-center items-center"
          style={[animatedStyle, { width: tabWidth, left: 8 }]} // left 8 to account for px-2
        >
          <View className="w-12 h-12 rounded-full bg-primary" />
        </Animated.View>
      )}

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let IconComponent = isFocused ? HomeSolid : HomeOutline;
        if (route.name === 'learn') IconComponent = isFocused ? BookSolid : BookOutline;
        if (route.name === 'ai-teacher') IconComponent = isFocused ? SparklesSolid : SparklesOutline;
        if (route.name === 'chat') IconComponent = isFocused ? ChatSolid : ChatOutline;
        if (route.name === 'profile') IconComponent = isFocused ? UserSolid : UserOutline;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center h-12"
          >
            <View className="items-center justify-center h-12 z-10">
              <IconComponent 
                size={24} 
                color={isFocused ? "#FFFFFF" : "#9CA3AF"} 
              />
              {!isFocused && (
                <Text className="text-[10px] text-muted font-bold mt-1">
                  {label as string}
                </Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
