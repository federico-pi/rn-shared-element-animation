import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Listing,
  ListingLayoutValues,
  ListingTab,
} from '../../../types/listing';
import { THEME } from '../../../utils/theme';
import { BidsTab } from './BidsTab';
import { DetailsTab } from './DetailsTab';
import { HistoryTab } from './HistoryTab';
import { OwnersTab } from './OwnersTab';

export interface ListingTabsProps {
  listing: Listing;
}

export function ListingTabs({ listing }: ListingTabsProps) {
  const tabs: { [key in ListingTab]: JSX.Element } = useMemo(
    () => ({
      [ListingTab.OWNERS]: <OwnersTab owners={listing.owners} />,
      [ListingTab.BIDS]: <BidsTab bidders={listing.bidders} />,
      [ListingTab.DETAILS]: (
        <DetailsTab listedAt={listing.listedAt} tags={listing.tags} />
      ),
      [ListingTab.HISTORY]: <HistoryTab history={listing.history} />,
    }),
    [listing.key]
  );

  const reducer = useCallback(
    (state: ListingLayoutValues[], action: ListingLayoutValues) => [
      ...state,
      action,
    ],
    []
  );

  const [layout, dispatch] = useReducer(reducer, []);
  const [activeTab, setActiveTab] = useState(ListingTab.OWNERS);

  const onLayout = useCallback(
    (event: LayoutChangeEvent, tab: ListingTab) => {
      if (layout.length === Object.values(ListingTab).length) {
        return;
      }

      dispatch({
        tab,
        x: event.nativeEvent.layout.x - THEME.spacing.lg / 2,
        width: event.nativeEvent.layout.width + THEME.spacing.lg,
      });
    },
    [layout.length]
  );

  const activeLayout = useDerivedValue(() => {
    if (layout.length !== Object.values(ListingTab).length) {
      return { index: 0, x: 0, width: 0 };
    }

    return layout.find(({ tab }) => tab === activeTab);
  }, [activeTab, layout]);

  const animatedIndicatorStyles = useAnimatedStyle(() => ({
    left: withSpring(activeLayout.value?.x || 0, { damping: 30 }),
    width: withSpring(activeLayout.value?.width || 0, { damping: 30 }),
  }));

  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={[styles.animatedIndicator, animatedIndicatorStyles]}
        />
        {Object.values(ListingTab).map((tab, index) => {
          const color = useSharedValue(0);

          const animatedText = useDerivedValue(() => {
            return interpolateColor(
              color.value,
              [0, 1],
              [THEME.colors.off_black, THEME.colors.white]
            );
          });

          const animatedTextStyles = useAnimatedStyle(() => ({
            color: withTiming(animatedText.value, {
              easing: Easing.inOut(Easing.ease),
            }),
          }));

          useEffect(() => {
            color.value = tab === activeTab ? 1 : 0;
          }, [activeTab]);

          return (
            <Pressable
              key={`${tab}-${index}`}
              onLayout={(event) => onLayout(event, tab)}
              onPress={() => setActiveTab(tab)}
            >
              <Animated.Text style={[styles.text, animatedTextStyles]}>
                {tab}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.tabsContainer}>{tabs[activeTab]}</View>
    </>
  );
}

export const TAB_HEIGHT = 55;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: TAB_HEIGHT,
    borderRadius: TAB_HEIGHT / 2,
    backgroundColor: THEME.colors.gray_light,
    paddingHorizontal: THEME.spacing.lg / 2,
  },
  animatedIndicator: {
    position: 'absolute',
    height: TAB_HEIGHT,
    backgroundColor: THEME.colors.off_black,
    borderRadius: TAB_HEIGHT / 2,
  },
  text: {
    padding: THEME.spacing.lg / 2,
    fontSize: THEME.font_sizes.md + 1,
    fontWeight: THEME.font_weights.semi_bold,
  },
  tabsContainer: {
    flex: 1,
    paddingTop: THEME.spacing.xl,
  },
});
