import React, { useMemo } from 'react';
import { Image, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { THEME } from '../utils/theme';
import { ASSETS } from '../utils/assets';

export function ItemCollection() {
  const { width: windowWidth } = useWindowDimensions();

  const imageHeight = useMemo(() => {
    const assetSource = Image.resolveAssetSource(ASSETS.images.itemCollection);

    const imageRatio = assetSource.width / windowWidth;

    return assetSource.height / imageRatio;
  }, []);

  return (
    <Animated.Image
      style={{ width: windowWidth - THEME.spacing.md * 2, height: imageHeight }}
      entering={FadeInDown.delay(400)}
      exiting={FadeInUp}
      source={ASSETS.images.itemCollection}
      resizeMode="contain"
    />
  );
}
