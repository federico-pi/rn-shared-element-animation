import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '../utils/assets';
import { THEME } from '../utils/theme';

export interface FavouriteProps {
  display?: {
    containerStyle?: StyleProp<ViewStyle>;
  };
}

export function FavouriteButton({ display = {} }: FavouriteProps) {
  return (
    <TouchableOpacity style={[styles.container, display.containerStyle]}>
      <Image
        style={styles.icon}
        source={ASSETS.icons['white-heart']}
        resizeMode="contain"
      />
    </TouchableOpacity>
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
    zIndex: 1,
  },
  icon: {
    width: 25,
    height: 25,
    padding: THEME.spacing.xs,
    opacity: 0.8,
  },
});
