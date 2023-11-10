import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { ProfileSection } from '../components/ProfileSection';
import { AVAILABLE_ITEMS_MAP } from '../utils/listing';
import { THEME } from '../utils/theme';

import { ItemCardAnimated } from '../components/ItemCard/ItemCardAnimated';

export function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProfileSection />
        <View style={styles.listContainer}>
          {AVAILABLE_ITEMS_MAP.map((item) => (
            <ItemCardAnimated key={item.key} item={item} />
          ))}
        </View>
        <BottomNavigation />
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
    marginVertical: THEME.spacing.xl,
    flex: 1,
    zIndex: 1,
  },
});
