import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BidderProfile, Listing, OwnerProfile } from '../types/listing';
import { THEME } from '../utils/theme';

interface AnimatedIndicatorValues {
  tab: Tabs;
  x: number;
  width: number;
}

export enum Tabs {
  OWNERS = 'Owners',
  BIDS = 'Bids',
  DETAILS = 'Details',
  HISTORY = 'History',
}

export interface ProfileProps {
  image?: ImageSourcePropType;
  title: string;
  subTitle?: string;
  text?: string;
}

export function Profile({ image, title, subTitle, text }: ProfileProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: THEME.spacing.md,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: THEME.spacing.sm,
        }}
      >
        {image && (
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
            }}
            source={image}
          />
        )}
        <View>
          {title && <Text style={{}}>{title}</Text>}
          {subTitle && <Text style={{}}>{subTitle}</Text>}
        </View>
      </View>
      {text && <Text style={{}}>{text}</Text>}
    </View>
  );
}

export interface OwnersTabProps {
  owners: OwnerProfile[];
}

function OwnersTab({ owners }: OwnersTabProps) {
  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={owners}
        renderItem={({ item }) => (
          <Profile
            image={item.pictureImageSource}
            title={item.fullName}
            subTitle={`${item.editions} editions`}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ width: '100%', height: THEME.spacing.sm }} />
        )}
      />
    </Animated.View>
  );
}

export interface BidsTabProps {
  bidders: BidderProfile[];
}

function BidsTab({ bidders }: BidsTabProps) {
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
    >
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={bidders}
        renderItem={({ item }) => (
          <Profile
            image={item.pictureImageSource}
            title={item.fullName}
            text={`${item.amount} ${item.currency}`}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ width: '100%', height: THEME.spacing.sm }} />
        )}
      />
    </Animated.View>
  );
}

export interface DetailsTabProps {
  tags: string[];
  listedAt: Date;
}

function DetailsTab({ tags, listedAt }: DetailsTabProps) {
  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
      <Text>{tags.join(', #')}</Text>
      <Text>{`Post: ${listedAt.toISOString()}`}</Text>
    </Animated.View>
  );
}

export interface HistoryTabProps {
  history: unknown[];
}

function HistoryTab({ history }: HistoryTabProps) {
  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
      {!history.length && <Text>No history yet</Text>}
    </Animated.View>
  );
}

export interface ListingTabsProps {
  listing: Listing;
}

export function ListingTabs({ listing }: ListingTabsProps) {
  const tabs: { [key in Tabs]: JSX.Element } = useMemo(
    () => ({
      [Tabs.OWNERS]: <OwnersTab owners={listing.owners} />,
      [Tabs.BIDS]: <BidsTab bidders={listing.bidders} />,
      [Tabs.DETAILS]: (
        <DetailsTab listedAt={listing.listedAt} tags={listing.tags} />
      ),
      [Tabs.HISTORY]: <HistoryTab history={listing.history} />,
    }),
    [listing.key]
  );

  const reducer = (
    state: AnimatedIndicatorValues[],
    action: AnimatedIndicatorValues
  ) => [...state, action];

  const [layout, dispatch] = useReducer(reducer, []);
  const [activeTab, setActiveTab] = useState(Tabs.OWNERS);

  const onLayout = useCallback(
    (event: LayoutChangeEvent, tab: Tabs) => {
      if (layout.length === Object.values(Tabs).length) {
        return;
      }

      dispatch({
        tab,
        x: event.nativeEvent.layout.x - THEME.spacing.xl / 2,
        width: event.nativeEvent.layout.width + THEME.spacing.xl,
      });
    },
    [layout.length]
  );

  const activeLayout = useDerivedValue(() => {
    if (layout.length !== Object.values(Tabs).length) {
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
        {Object.values(Tabs).map((tab, index) => {
          console.log('render');
          const color = useSharedValue(0);

          const animatedText = useDerivedValue(() => {
            return interpolateColor(
              color.value,
              [0, 1],
              [THEME.colors.primary, THEME.colors.white]
            );
          });

          const animatedTextStyles = useAnimatedStyle(() => ({
            color: withTiming(animatedText.value, {
              easing: Easing.inOut(Easing.ease),
            }),
          }));

          useEffect(() => {
            if (tab === activeTab) {
              color.value = 1;
            } else {
              color.value = 0;
            }
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
      <View style={{ flex: 1, paddingTop: THEME.spacing.lg }}>
        {tabs[activeTab]}
      </View>
    </>
  );
}

const TABS_HEIGHT = 55;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: TABS_HEIGHT,
    borderRadius: TABS_HEIGHT / 2,
    backgroundColor: THEME.colors.secondary,
    paddingHorizontal: THEME.spacing.xl / 2,
  },
  animatedIndicator: {
    position: 'absolute',
    height: TABS_HEIGHT,
    backgroundColor: THEME.colors.primary,
    borderRadius: TABS_HEIGHT / 2,
  },
  text: {
    padding: THEME.spacing.xl / 2,
    fontSize: THEME.fontSizes.md + 1,
    fontWeight: THEME.fontWeights.semi_bold,
  },
});
