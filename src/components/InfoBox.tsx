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
        {subText && <Text style={styles.text}>{subText}</Text>}
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
    gap: THEME.spacing.md,
  },
  image: {
    height: DEFAULT_IMAGE_SIZE,
    width: DEFAULT_IMAGE_SIZE,
    borderRadius: DEFAULT_IMAGE_SIZE / 2,
  },
  title: {
    fontSize: 23,
    lineHeight: 23,
    fontWeight: THEME.fontWeights.medium,
  },
  description: {
    fontSize: 25,
    lineHeight: 25,
    fontWeight: THEME.fontWeights.bold,
  },
  text: {
    fontSize: THEME.fontSizes.lg,
  },
});
