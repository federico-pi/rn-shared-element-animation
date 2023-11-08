import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { ItemCard } from '../components/ItemCard';
import { ProfileSection } from '../components/ProfileSection';
import { NavigationProps } from '../navigations/MainNavigator';
import { AVAILABLE_ITEMS_MAP, AvailableItems } from '../utils/listing';
import { THEME } from '../utils/theme';

export function Home() {
  const navigation = useNavigation<NavigationProps>();

  const onItemPress = (item: AvailableItems) => {
    navigation.navigate('Listing', { item: item });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProfileSection />
        <View style={styles.listContainer}>
          {(Object.keys(AVAILABLE_ITEMS_MAP) as AvailableItems[]).map(
            (item, index) => (
              <ItemCard
                key={`${item}${index}`}
                item={item}
                onPress={() => onItemPress(item)}
                display={{
                  containerStyle: {
                    position: 'absolute',
                    zIndex: index,
                  },
                }}
              />
            )
          )}
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
    flex: 1,
    justifyContent: 'center',
    paddingVertical: THEME.spacing.xl,
  },
});
