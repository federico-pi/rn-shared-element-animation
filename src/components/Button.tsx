import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { THEME } from '../utils/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  display?: {
    containerStyle?: StyleProp<ViewStyle>;
  };
}

export function Button({ title, style, display = {}, ...rest }: ButtonProps) {
  return (
    <View style={display.containerStyle}>
      <TouchableOpacity style={[styles.button, style]} {...rest}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
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
