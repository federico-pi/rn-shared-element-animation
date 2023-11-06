import { useIsFocused } from '@react-navigation/native';
import React, { ReactNode, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  children: ReactNode;
  onPress: VoidFunction;
  scaleDownValue?: number;
  onPressDelay?: number;
}

export function ScaleDownOnPress({
  children,
  onPress,
  scaleDownValue = 0.95,
  onPressDelay = 0,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(scale.value, {
          duration: 400,
          easing: Easing.out(Easing.quad),
        }),
      },
    ],
  }));

  const onPressIn = () => (scale.value = scaleDownValue);
  const onPressOut = () => {
    scale.value = 1;
    setTimeout(onPress, 450);
  };

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
}
