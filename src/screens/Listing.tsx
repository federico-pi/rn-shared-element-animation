import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Countdown } from '../components/Countdown';
import { FavouriteButton } from '../components/FavouriteButton';
import { InfoBox } from '../components/InfoBox';
import { NavigationProps, StackParamList } from '../navigations/MainNavigator';
import {
  DEFAULT_ENTERING_ANIMATION_DELAY,
  DEFAULT_ENTERING_ANIMATION_DURATION,
} from '../utils/animation';
import { ASSETS } from '../utils/assets';
import { AVAILABLE_ITEMS_MAP } from '../utils/listing';
import { THEME } from '../utils/theme';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export function Listing() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>();
  const {
    params: { itemKey },
  } = useRoute<RouteProp<StackParamList, 'Listing'>>();

  const item = useMemo(
    () => AVAILABLE_ITEMS_MAP.find((item) => item.key === itemKey)!,
    [itemKey]
  );

  const contentHeight = useMemo(
    () => getContentHeight(insets.bottom),
    [insets.bottom]
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.actionsContainer,
          { top: insets.top + THEME.spacing.sm },
        ]}
        entering={FadeInUp.delay(DEFAULT_ENTERING_ANIMATION_DELAY).duration(
          DEFAULT_ENTERING_ANIMATION_DURATION
        )}
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
            height: windowHeight - contentHeight,
          },
        ]}
        source={item.source}
        resizeMode="cover"
        sharedTransitionTag={itemKey}
      />
      <AnimatedBlurView
        intensity={10}
        entering={FadeInDown.delay(DEFAULT_ENTERING_ANIMATION_DELAY).duration(
          DEFAULT_ENTERING_ANIMATION_DURATION
        )}
      >
        <View style={styles.countdownContainer}>
          <Text style={styles.remainingTime}>{'Remaining Time'}</Text>
          <Countdown style={styles.countdown} targetDate={item.expiryDate} />
        </View>
      </AnimatedBlurView>
      <Animated.View
        style={[styles.content, { height: contentHeight }]}
        entering={FadeInDown.delay(DEFAULT_ENTERING_ANIMATION_DELAY).duration(
          DEFAULT_ENTERING_ANIMATION_DURATION
        )}
      >
        <InfoBox
          {...item.bid}
          display={{ containerStyle: styles.infoBoxContainer }}
        />
        <Button title="Collect item" style={styles.button} />
      </Animated.View>
      <StatusBar style="light" animated={true} />
    </View>
  );
}

const INFO_BOX_HEIGHT = 65;
const BUTTON_HEIGHT = 70;
const CONTENT_VERTICAL_SPACING = 30;

const getContentHeight = (insetBottom: number) =>
  INFO_BOX_HEIGHT + BUTTON_HEIGHT + insetBottom + CONTENT_VERTICAL_SPACING * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  actionsContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: THEME.spacing.lg,
    flexDirection: 'row',
    zIndex: 1,
  },
  backArrowImage: {
    width: 28,
    height: 28,
  },
  sharedImage: {
    borderRadius: THEME.radius.xl,
  },
  content: {
    paddingHorizontal: THEME.spacing.md,
  },
  countdownContainer: {
    position: 'absolute',
    width: '91%',
    alignSelf: 'center',
    paddingHorizontal: THEME.spacing.xl,
    paddingVertical: THEME.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    minHeight: 70,
    zIndex: 1,
    bottom: THEME.spacing.xl,
  },
  remainingTime: {
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.xl,
  },
  countdown: {
    fontSize: THEME.fontSizes.xl,
    lineHeight: THEME.fontSizes.xl,
    fontWeight: THEME.fontWeights.semi_bold,
  },
  infoBoxContainer: {
    height: INFO_BOX_HEIGHT,
    justifyContent: 'space-between',
    marginVertical: CONTENT_VERTICAL_SPACING,
  },
  button: {
    height: BUTTON_HEIGHT,
    bottom: 4,
  },
});
