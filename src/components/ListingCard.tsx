import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  FadeInDown,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LayoutChangeEvent } from 'react-native';
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
import { FavouriteButton } from '../components/FavouriteButton';
import { InfoBox } from '../components/InfoBox';
import { Listing } from '../types/listing';
import { NavigationProps } from '../types/navigation';
import {
  DEFAULT_ENTERING_ANIMATION_DELAY,
  DEFAULT_ENTERING_ANIMATION_DURATION,
} from '../utils/animation';
import { THEME } from '../utils/theme';

const SCALE_ANIMATION_VALUE = 0.915;
const ON_PRESS_SWIPE_HITSLOP = 25;
const SWIPE_THRESHOLD = 100;
const SNAP_BACK_DURATION = 300;

export interface ItemCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ItemCardProps) {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProps>();
  const { width: windowWidth } = useWindowDimensions();

  const [imageDimension, setImageDimension] = useState<{
    height: number;
    width: number;
  }>();

  const mainOwner = listing.owners[0];
  const highestBid = listing.bidders[0];

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setImageDimension({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  }, []);

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
      rotateZ.value = event.translationX / 400;
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
        () => navigation.navigate('Listing', { listingKey: listing.key }),
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
      <Animated.View
        onLayout={onLayout}
        style={[styles.container, animatedStyle]}
      >
        <FavouriteButton
          iconSize={32}
          display={{ containerStyle: styles.favouriteButtonWrapper }}
        />
        <Animated.Image
          style={[styles.sharedImage, imageDimension]}
          source={listing.imageSource}
          resizeMode="cover"
          sharedTransitionTag={listing.key}
        />
        {isFocused && (
          <Animated.View
            entering={FadeInDown.delay(
              DEFAULT_ENTERING_ANIMATION_DELAY
            ).duration(DEFAULT_ENTERING_ANIMATION_DURATION)}
          >
            <InfoBox
              title={listing.name}
              description={`${highestBid.amount} ${highestBid.currency}`}
              image={mainOwner.pictureImageSource}
              imageLabel={mainOwner.fullName}
              subText="Current bid"
              display={{ containerStyle: styles.infoBoxContainer }}
            />
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  favouriteButtonWrapper: {
    position: 'absolute',
    top: THEME.spacing.lg,
    right: THEME.spacing.lg,
  },
  sharedImage: {
    borderRadius: THEME.radius.xl,
  },
  infoBoxContainer: {
    position: 'absolute',
    bottom: THEME.spacing.lg,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 30,
    padding: THEME.spacing.lg,
    gap: THEME.spacing.xs / 2,
    overflow: 'hidden',
    zIndex: 1,
  },
});
