import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export function ItemCollection() {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <Animated.Image
      style={[styles.image, { width: windowWidth - 4 }]}
      entering={FadeInDown.delay(400)}
      exiting={FadeInUp}
      source={require('../../assets/images/listing-bottom.png')}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 280,
    marginHorizontal: 2,
    position: 'absolute',
    bottom: -20,
  },
});
