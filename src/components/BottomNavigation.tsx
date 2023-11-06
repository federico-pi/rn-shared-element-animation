import React from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';

export function BottomNavigation() {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <Image
      style={[styles.image, { width: windowWidth }]}
      source={require('../../assets/images/home-bottom.png')}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    bottom: 25,
  },
});
