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

export const DEFAULT_FAVOURITE_BUTTON_SIZE = 28;

export interface FavouriteProps {
  iconSize?: number;
  display?: {
    containerStyle?: StyleProp<ViewStyle>;
  };
}

export function FavouriteButton({
  iconSize = DEFAULT_FAVOURITE_BUTTON_SIZE,
  display = {},
}: FavouriteProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        display.containerStyle,
        {
          height: iconSize * 2,
          width: iconSize * 2,
          borderRadius: iconSize,
        },
      ]}
    >
      <Image
        style={[
          styles.icon,
          {
            width: iconSize,
            height: iconSize,
          },
        ]}
        source={ASSETS.icons['white-heart']}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  icon: {
    padding: THEME.spacing.xs,
    opacity: 0.8,
  },
});
