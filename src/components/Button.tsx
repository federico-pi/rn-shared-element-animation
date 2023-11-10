import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { THEME } from '../utils/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.radius.xl,
    padding: THEME.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.md,
    fontWeight: THEME.fontWeights.bold,
  },
});
