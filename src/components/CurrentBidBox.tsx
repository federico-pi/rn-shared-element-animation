import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';

export function CurrentBidBox() {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <Animated.View style={[styles.container, { width: windowWidth }]}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{'Blossom'}</Text>
          <Text style={styles.value}>{'40.2 ETH'}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>{'Robert A.'}</Text>
          <Text>{'Current bid'}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
  },
  content: {
    position: 'absolute',
    bottom: 8,
    width: '80%',
    backgroundColor: '#ffffff99',
    borderRadius: 25,
    alignSelf: 'center',
    padding: 20,
    gap: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '500',
  },
  value: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
  },
});
