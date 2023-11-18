import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BottomNavigator } from '../../navigation/BottomNavigator.placeholder';
import { LISTING_MAP } from '../../utils/listing';
import { THEME } from '../../utils/theme';
import { SearchBar } from '../SearchBar.placeholder';

import { ListingCard } from '../ListingCard';
import { Spacer } from '../Spacer';
import { UserProfile } from '../UserProfile.placeholder';

export function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <UserProfile />
        <Spacer height={THEME.spacing.xl} />
        <SearchBar />
        <View style={styles.listContainer}>
          {LISTING_MAP.map((listing) => (
            <ListingCard key={listing.key} listing={listing} />
          ))}
        </View>
        <BottomNavigator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: THEME.spacing.md,
  },
  listContainer: {
    marginVertical: THEME.spacing.md * 2,
    flex: 1,
    zIndex: 1,
  },
});
