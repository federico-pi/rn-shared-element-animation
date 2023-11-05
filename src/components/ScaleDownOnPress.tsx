import React, { ReactNode } from 'react';
import { Pressable } from 'react-native';

import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  scaleDownValue?: number;
  onPress: () => void;
  children: ReactNode;
}

const animationConfig = {
  duration: 400,
  easing: Easing.out(Easing.quad),
};

/**
 * @param scaleDownValue: the value that you want to scale down by. Subtle scaling is better. Default is 0.95
 * Wrap a component in this and it will scale down on press.
 */
export function ScaleDownOnPress({ scaleDownValue = 0.95, ...props }: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(scale.value, animationConfig),
        },
      ],
    };
  });
  const handlePressIn = () => (scale.value = scaleDownValue);
  const handlePressOut = () => (scale.value = 1);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={() => setTimeout(handlePressOut, 100)}
      onPress={() => setTimeout(props.onPress, 100)}
    >
      <Reanimated.View style={animatedStyle}>{props.children}</Reanimated.View>
    </Pressable>
  );
}
