import React, { useMemo } from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { ASSETS } from '../utils/assets';
import { THEME } from '../utils/theme';

/**
 * @todo implement real component
 * @returns design placeholder
 */
export function ProfileSection() {
  const { width: windowWidth } = useWindowDimensions();

  const imageHeight = useMemo(() => {
    const assetSource = Image.resolveAssetSource(ASSETS.images.profileSection);

    const imageRatio = assetSource.width / windowWidth;

    return assetSource.height / imageRatio;
  }, []);

  return (
    <Image
      style={{
        width: windowWidth - THEME.spacing.md * 2,
        height: imageHeight,
      }}
      source={ASSETS.images.profileSection}
      resizeMode="contain"
    />
  );
}
