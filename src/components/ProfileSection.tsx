import React, { useMemo } from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { THEME } from '../utils/theme';
import { ASSETS } from '../utils/assets';

export function ProfileSection() {
  const { width: windowWidth } = useWindowDimensions();

  const imageHeight = useMemo(() => {
    const assetSource = Image.resolveAssetSource(ASSETS.images.profileSection);

    const imageRatio = assetSource.width / windowWidth;

    return assetSource.height / imageRatio;
  }, []);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInUp.delay(100).duration(500)}
    >
      <Image
        style={{
          width: windowWidth - THEME.spacing.md * 2,
          height: imageHeight,
        }}
        source={ASSETS.images.profileSection}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
