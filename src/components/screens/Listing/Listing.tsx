import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProps, StackParamList } from '../../../types/navigation';
import {
  DEFAULT_ENTERING_ANIMATION_DELAY,
  DEFAULT_ENTERING_ANIMATION_DURATION,
} from '../../../utils/animation';
import { ASSETS } from '../../../utils/assets';
import { LISTING_MAP } from '../../../utils/listing';
import { IS_ANDROID } from '../../../utils/native';
import { THEME } from '../../../utils/theme';
import { Button } from '../../Button';
import { Countdown } from '../../Countdown';
import { FavouriteButton } from '../../FavouriteButton';
import { InfoBox } from '../../InfoBox';
import { ListingTabs } from './ListingTabs';

const DEFAULT_IMAGE_OFFSET = THEME.radius.xl;

export function Listing() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>();
  const {
    params: { listingKey },
  } = useRoute<RouteProp<StackParamList, 'Listing'>>();

  const [isExtended, setIsExtended] = useState(false);

  const listing = useMemo(
    () => LISTING_MAP.find((listing) => listing.key === listingKey)!,
    [listingKey]
  );

  const mainOwner = listing.owners[0];
  const highestBidder = listing.bidders[0];
  const extendedOffset = windowHeight / 2.5;

  const contentHeight = useMemo(
    () => getContentHeight(insets.bottom),
    [insets.bottom, extendedOffset]
  );

  const imageOffset = useSharedValue<number>(DEFAULT_IMAGE_OFFSET);

  const pan = useMemo(
    () =>
      Gesture.Fling()
        .numberOfPointers(1)
        .direction(isExtended ? Directions.DOWN : Directions.UP)
        .runOnJS(true)
        .onStart(() => {
          imageOffset.value = isExtended
            ? DEFAULT_IMAGE_OFFSET
            : extendedOffset;
          setIsExtended((prevState) => !prevState);
        }),
    [isExtended]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    marginTop: withTiming(-imageOffset.value, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);

    return () => {
      StatusBar.setBarStyle('dark-content', true);
    };
  }, []);

  return (
    <GestureDetector gesture={pan}>
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
              source={ASSETS.icons['back-arrow']}
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
            animatedStyle,
          ]}
          source={listing.imageSource}
          resizeMode="cover"
          sharedTransitionTag={listing.key}
        />
        <Animated.View
          entering={FadeInDown.delay(DEFAULT_ENTERING_ANIMATION_DELAY).duration(
            DEFAULT_ENTERING_ANIMATION_DURATION
          )}
        >
          <View style={styles.countdownContainer}>
            <Text style={styles.remainingTime}>{'Remaining Time'}</Text>
            <Countdown
              style={styles.countdown}
              targetDate={listing.expiresAt}
            />
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.contentContainer,
            { height: contentHeight + (isExtended ? extendedOffset : 0) },
          ]}
          entering={FadeInDown.delay(DEFAULT_ENTERING_ANIMATION_DELAY).duration(
            DEFAULT_ENTERING_ANIMATION_DURATION
          )}
        >
          <View style={styles.content}>
            <InfoBox
              title={listing.name}
              description={`${highestBidder.amount} ${highestBidder.currency}`}
              image={mainOwner.pictureImageSource}
              imageLabel={mainOwner.fullName}
              subText="Current bid"
              display={{ containerStyle: styles.infoBoxContainer }}
            />
            <Text style={styles.text}>{listing.description}</Text>
            <ListingTabs listing={listing} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Collect item"
              style={[styles.button, { marginBottom: insets.bottom }]}
            />
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const INFO_BOX_HEIGHT = 60;
const BUTTON_HEIGHT = 70;
const CONTENT_VERTICAL_SPACING = 30;

const getContentHeight = (insetBottom: number) =>
  insetBottom +
  INFO_BOX_HEIGHT +
  BUTTON_HEIGHT +
  CONTENT_VERTICAL_SPACING * 2 -
  DEFAULT_IMAGE_OFFSET;

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
    zIndex: 2,
  },
  backArrowImage: {
    width: 26,
    height: 26,
  },
  sharedImage: {
    borderRadius: THEME.radius.xl,
  },
  infoBoxContainer: {
    height: INFO_BOX_HEIGHT,
    justifyContent: 'space-between',
    marginVertical: CONTENT_VERTICAL_SPACING,
  },
  remainingTime: {
    color: THEME.colors.gray_dark,
    fontWeight: THEME.font_weights.medium,
    letterSpacing: 0.1,
    fontSize: THEME.font_sizes.lg,
    lineHeight: THEME.font_sizes.xl,
  },
  countdownContainer: {
    position: 'absolute',
    width: '91%',
    paddingHorizontal: THEME.spacing.xl,
    paddingVertical: THEME.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 32,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    minHeight: 70,
    zIndex: 1,
    bottom: THEME.spacing.xl,
  },
  countdown: {
    fontSize: THEME.font_sizes.xl - 1,
    lineHeight: THEME.font_sizes.xl - 1,
    fontWeight: THEME.font_weights.semi_bold,
    color: THEME.colors.off_black,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: THEME.spacing.md,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: THEME.font_sizes.md,
    lineHeight: THEME.font_sizes.xl,
    marginBottom: THEME.spacing.xl,
  },
  buttonWrapper: {
    paddingTop: THEME.spacing.lg,
    paddingBottom: IS_ANDROID ? THEME.spacing.xs : undefined,
    backgroundColor: THEME.colors.white,
    zIndex: 2,
  },
  button: {
    height: BUTTON_HEIGHT,
    bottom: 4,
  },
});
