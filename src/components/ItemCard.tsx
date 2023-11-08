import React, { useCallback, useState } from 'react';
import {
  ImageStyle,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { FavouriteButton } from '../components/FavouriteButton';
import { OverlayInfoBox } from '../components/OverlayInfoBox';
import { ScaleOnPress } from '../components/ScaleOnPress';
import { AVAILABLE_ITEMS_MAP, AvailableItems } from '../utils/listing';
import { THEME } from '../utils/theme';

export interface ItemCardProps {
  item: AvailableItems;
  onPress?: VoidFunction;
  display?: {
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
  };
}

export function ItemCard({ item, onPress, display = {} }: ItemCardProps) {
  const [imageDimension, setImageDimension] = useState<{
    height: number;
    width: number;
  }>();

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setImageDimension({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  }, []);

  return (
    <View
      onLayout={onLayout}
      style={[styles.container, display.containerStyle]}
    >
      <ScaleOnPress onPress={onPress}>
        <FavouriteButton
          display={{ containerStyle: styles.favouriteButtonWrapper }}
        />
        <Animated.Image
          style={[styles.sharedImage, imageDimension, display.imageStyle]}
          source={AVAILABLE_ITEMS_MAP[item].source}
          resizeMode="cover"
          sharedTransitionTag={item}
        />
        <OverlayInfoBox {...AVAILABLE_ITEMS_MAP[item].currentBid} />
      </ScaleOnPress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  favouriteButtonWrapper: {
    position: 'absolute',
    top: THEME.spacing.lg,
    right: THEME.spacing.lg,
  },
  sharedImage: {
    borderRadius: THEME.radius.xl,
  },
});
