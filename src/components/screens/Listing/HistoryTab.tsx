import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { THEME } from '../../../utils/theme';

export interface HistoryTabProps {
  history: unknown[];
}

export function HistoryTab({ history }: HistoryTabProps) {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown}
      exiting={FadeOutDown}
    >
      {!history.length && <Text style={styles.text}>{'No history yet'}</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.spacing.xs / 2,
  },
  text: {
    color: THEME.colors.gray,
    fontSize: THEME.font_sizes.md,
  },
});
