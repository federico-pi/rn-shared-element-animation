import React, { ReactNode } from 'react';
import { Pressable } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  children: ReactNode;
  scaleDownValue?: number;
  onPress?: VoidFunction;
}

const DEFAULT_ANIMATION_DURATION = 250;

export function ScaleOnPress({
  children,
  onPress,
  scaleDownValue = 0.9,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(scale.value),
      },
    ],
  }));

  const onPressIn = () => (scale.value = scaleDownValue);
  const onPressOut = () => (scale.value = 1);

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => {
        scale.value = 1;
        setTimeout(() => onPress?.(), DEFAULT_ANIMATION_DURATION);
      }}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
}
