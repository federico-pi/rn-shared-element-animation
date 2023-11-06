import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

export interface FavouriteProps {
  display?: {
    containerStyle?: ViewStyle;
  };
}

export function FavouriteButton({ display = {} }: FavouriteProps) {
  return (
    <TouchableOpacity style={[styles.container, display.containerStyle]}>
      <Image
        style={styles.icon}
        source={require('../../assets/images/white-heart.png')}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 49,
    width: 49,
    borderRadius: 30,
    backgroundColor: '#ffffff50',
  },
  icon: {
    width: 25,
    height: 25,
    padding: 10,
    opacity: 0.8,
  },
});
