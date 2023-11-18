import { BlurView } from 'expo-blur';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { THEME } from '../utils/theme';

export interface InfoBoxProps {
  title: string;
  description: string;
  image?: ImageSourcePropType;
  imageLabel?: string;
  subText?: string;
  display?: {
    containerStyle?: StyleProp<ViewStyle>;
  };
}

export function InfoBox({
  title,
  description,
  image,
  imageLabel,
  subText,
  display = {},
}: InfoBoxProps) {
  return (
    <BlurView style={display.containerStyle} intensity={10}>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.rowContainer}>
          {image && <Image style={styles.image} source={image} />}
          {imageLabel && <Text style={styles.text}>{imageLabel}</Text>}
        </View>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>
    </BlurView>
  );
}

const DEFAULT_IMAGE_SIZE = 25;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  image: {
    height: DEFAULT_IMAGE_SIZE,
    width: DEFAULT_IMAGE_SIZE,
    borderRadius: DEFAULT_IMAGE_SIZE / 2,
  },
  title: {
    color: THEME.colors.primary,
    fontSize: 23,
    lineHeight: 23,
    fontWeight: THEME.font_weights.semi_bold,
    letterSpacing: 0.5,
  },
  description: {
    color: THEME.colors.primary,
    fontSize: 26,
    lineHeight: 26,
    fontWeight: THEME.font_weights.bold,
    letterSpacing: 0.25,
  },
  text: {
    fontSize: THEME.font_sizes.lg + 1,
  },
  subText: {
    fontSize: THEME.font_sizes.md,
    color: THEME.colors.gray,
    fontWeight: THEME.font_weights.medium,
  },
});
