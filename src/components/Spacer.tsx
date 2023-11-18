import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  height?: number;
  width?: number;
  fill?: boolean;
}

/* Returns an UI helper component for spacing width and height. */
export function Spacer({ height = 0, width = 0, fill = false }: Props) {
  if (!height && !width) {
    return null;
  }

  return (
    <View
      style={
        (fill && styles.fill) || {
          width,
          height,
        }
      }
    />
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
