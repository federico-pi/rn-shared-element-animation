import React from 'react';
import { Image, StyleSheet } from 'react-native';

export function ProfileSection() {
  return (
    <Image
      style={styles.image}
      source={require('../../assets/images/home-top.png')}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    height: 260,
    top: 45,
    marginHorizontal: 3,
  },
});
