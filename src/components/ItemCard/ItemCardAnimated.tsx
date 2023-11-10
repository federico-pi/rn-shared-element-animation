import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { runOnJS, withTiming } from 'react-native-reanimated';
import { ItemCard, ItemCardProps } from './ItemCard';

import { useNavigation } from '@react-navigation/native';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { NavigationProps } from '../../navigations/MainNavigator';

const SCALE_ANIMATION_VALUE = 0.925;
const ON_PRESS_SWIPE_HITSLOP = 25;
const SWIPE_THRESHOLD = 100;
const SNAP_BACK_DURATION = 300;

export function ItemCardAnimated({ item }: ItemCardProps) {
  const navigation = useNavigation<NavigationProps>();
  const { width: windowWidth } = useWindowDimensions();

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  const _onBegin = () => {
    'worklet';
    scale.value = withSpring(SCALE_ANIMATION_VALUE);
  };

  const _onChange = (
    event: GestureUpdateEvent<
      PanGestureHandlerEventPayload & PanGestureChangeEventPayload
    >
  ) => {
    'worklet';
    translateX.value = event.translationX;
    translateY.value = event.translationY;

    if (Math.abs(event.translationX) < SWIPE_THRESHOLD) {
      rotateZ.value = event.translationX / 450;
    }
  };

  const _onFinalize = (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => {
    if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
      scale.value = withSpring(1);
      translateX.value = withSpring(
        event.translationX > 0 ? windowWidth : -windowWidth
      );
      translateY.value = withSpring(150);
      rotateZ.value = withSpring(0);
      return;
    }

    scale.value = withTiming(1, { duration: SNAP_BACK_DURATION });
    translateX.value = withTiming(0, { duration: SNAP_BACK_DURATION });
    translateY.value = withTiming(0, { duration: SNAP_BACK_DURATION });
    rotateZ.value = withTiming(0, { duration: SNAP_BACK_DURATION });

    if (
      Math.abs(event.translationX) < ON_PRESS_SWIPE_HITSLOP &&
      Math.abs(event.translationY) < ON_PRESS_SWIPE_HITSLOP
    ) {
      setTimeout(
        () => navigation.navigate('Listing', { itemKey: item.key }),
        SNAP_BACK_DURATION
      );
    }
  };

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .maxPointers(1)
        .onBegin(_onBegin)
        .onChange(_onChange)
        .onFinalize((event) => runOnJS(_onFinalize)(event)),
    []
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotateZ.value}rad` },
      ],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <ItemCard item={item} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
