import React, { useMemo } from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { THEME } from '../utils/theme';
import { ASSETS } from '../utils/assets';

export function BottomNavigation() {
  const { width: windowWidth } = useWindowDimensions();

  const imageHeight = useMemo(() => {
    const assetSource = Image.resolveAssetSource(
      ASSETS.images.bottomNavigation
    );

    const imageRatio = assetSource.width / windowWidth;

    return assetSource.height / imageRatio;
  }, []);

  return (
    <Image
      style={{
        width: windowWidth - THEME.spacing.md * 2,
        height: imageHeight,
      }}
      source={ASSETS.images.bottomNavigation}
      resizeMode="contain"
    />
  );
}
