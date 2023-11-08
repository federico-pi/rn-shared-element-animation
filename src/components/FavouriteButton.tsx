import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ASSETS } from '../utils/assets';
import { AVAILABLE_ITEMS_MAP } from '../utils/listing';

export interface FavouriteProps {
  display?: {
    containerStyle?: StyleProp<ViewStyle>;
  };
}

export function FavouriteButton({ display = {} }: FavouriteProps) {
  return (
    <View style={[styles.container, display.containerStyle]}>
      <Image
        style={styles.icon}
        source={ASSETS.icons.whiteHeart}
        resizeMode="contain"
      />
    </View>
  );
}

const FAVOURITE_BUTTON_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    height: FAVOURITE_BUTTON_SIZE,
    width: FAVOURITE_BUTTON_SIZE,
    borderRadius: FAVOURITE_BUTTON_SIZE / 2,
    zIndex: Object.keys(AVAILABLE_ITEMS_MAP).length + 1,
    overflow: 'hidden',
  },
  icon: {
    width: 25,
    height: 25,
    padding: 10,
    opacity: 0.8,
  },
});
