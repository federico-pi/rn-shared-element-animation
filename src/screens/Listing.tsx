import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FavouriteButton } from '../components/FavouriteButton';
import { NavigationProps, StackParamList } from '../navigations/MainNavigator';
import { ASSETS } from '../utils/assets';
import { AVAILABLE_ITEMS_MAP } from '../utils/listing';
import { THEME } from '../utils/theme';
import { OverlayInfoBox } from '../components/OverlayInfoBox';

export function Listing() {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const {
    params: { item },
  } = useRoute<RouteProp<StackParamList, 'Listing'>>();

  const [contentHeight, setContentHeight] = useState(windowWidth);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  const itemCollectionHeight = useMemo(() => {
    const assetSource = Image.resolveAssetSource(ASSETS.images.itemCollection);

    const imageRatio = assetSource.width / windowWidth;

    return assetSource.height / imageRatio;
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.actionsContainer,
          { width: windowWidth, top: insets.top + THEME.spacing.sm },
        ]}
        entering={FadeInDown.delay(200).duration(600)}
      >
        <TouchableOpacity
          onPress={navigation.goBack}
          hitSlop={{
            top: THEME.spacing.md,
            right: THEME.spacing.md,
            bottom: THEME.spacing.md,
            left: THEME.spacing.md,
          }}
        >
          <Image
            style={styles.backArrowImage}
            source={ASSETS.icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <FavouriteButton />
      </Animated.View>
      <Animated.Image
        style={[
          styles.sharedImage,
          {
            width: windowWidth,
            height: windowHeight - (insets.bottom + contentHeight),
          },
        ]}
        source={AVAILABLE_ITEMS_MAP[item].source}
        resizeMode="cover"
        sharedTransitionTag={item}
      />
      <View onLayout={onLayout} style={styles.content}>
        <Animated.Image
          style={{
            width: windowWidth - THEME.spacing.md * 2,
            height: itemCollectionHeight,
          }}
          entering={FadeInDown.delay(200).duration(600)}
          exiting={FadeInUp}
          source={ASSETS.images.itemCollection}
          resizeMode="contain"
        />
      </View>
      <StatusBar style="light" animated={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  actionsContainer: {
    paddingHorizontal: THEME.spacing.lg,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 2,
  },
  backArrowImage: {
    width: 28,
    height: 28,
  },
  sharedImage: {
    borderRadius: THEME.radius.xl,
  },
  text: {
    fontSize: 32,
    color: THEME.colors.body,
    fontWeight: 'bold',
  },
  content: {
    paddingTop: THEME.spacing.md * 2,
    paddingHorizontal: THEME.spacing.md,
  },
});
