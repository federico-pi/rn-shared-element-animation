import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FavouriteButton } from '../../components/FavouriteButton';
import { InfoBox } from '../../components/InfoBox';
import {
  DEFAULT_ENTERING_ANIMATION_DELAY,
  DEFAULT_ENTERING_ANIMATION_DURATION,
} from '../../utils/animation';
import { AvailableItem } from '../../utils/listing';
import { THEME } from '../../utils/theme';

export interface ItemCardProps {
  item: AvailableItem;
}

export function ItemCard({ item }: ItemCardProps) {
  const isFocused = useIsFocused();

  const [imageDimension, setImageDimension] = useState<{
    height: number;
    width: number;
  }>();

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setImageDimension({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  }, []);

  return (
    <View onLayout={onLayout} style={styles.container}>
      <FavouriteButton
        display={{ containerStyle: styles.favouriteButtonWrapper }}
      />
      <Animated.Image
        style={[styles.sharedImage, imageDimension]}
        source={item.source}
        resizeMode="cover"
        sharedTransitionTag={item.key}
      />
      {isFocused && (
        <Animated.View
          entering={FadeInDown.delay(DEFAULT_ENTERING_ANIMATION_DELAY).duration(
            DEFAULT_ENTERING_ANIMATION_DURATION
          )}
        >
          <InfoBox
            {...item.bid}
            display={{ containerStyle: styles.infoBoxContainer }}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
    gap: 7,
    overflow: 'hidden',
    zIndex: 1,
  },
});
