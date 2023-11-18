import React, { memo, useMemo } from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { ASSETS } from '../utils/assets';
import { THEME } from '../utils/theme';

const BOTTOM_NAVIGATION_IMAGE_SOURCE =
  ASSETS.images.placeholders['bottom-navigator'];

/**
 * @todo implement real component
 * @returns placeholder
 */
export const BottomNavigator = memo(() => {
  const { width: windowWidth } = useWindowDimensions();

  const imageHeight = useMemo(() => {
    const assetSource = Image.resolveAssetSource(
      BOTTOM_NAVIGATION_IMAGE_SOURCE
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
      source={BOTTOM_NAVIGATION_IMAGE_SOURCE}
      resizeMode="contain"
    />
  );
});
