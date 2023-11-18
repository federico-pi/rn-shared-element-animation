import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { THEME } from '../utils/theme';

export interface UserCardProps {
  title: string;
  subTitle?: string;
  image?: ImageSourcePropType;
  text?: string;
}

export function UserCard({ title, subTitle, image, text }: UserCardProps) {
  return (
    <View style={styles.row}>
      <View style={styles.row}>
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.titleWrapper}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        </View>
      </View>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}

const IMAGE_SIZE = 42;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },
  titleWrapper: {
    gap: 4,
  },
  title: {
    fontSize: THEME.font_sizes.md + 1,
  },
  subTitle: {
    fontSize: THEME.font_sizes.sm + 1,
    color: THEME.colors.gray,
  },
  text: {
    fontSize: THEME.font_sizes.xl,
    fontWeight: THEME.font_weights.bold,
  },
});
