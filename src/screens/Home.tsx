import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { BottomNavigation } from '../components/BottomNavigation';
import { CurrentBidBox } from '../components/CurrentBidBox';
import { FavouriteButton } from '../components/FavouriteButton';
import { ProfileSection } from '../components/ProfileSection';
import { ScaleDownOnPress } from '../components/ScaleDownOnPress';
import { NavigationProps } from '../navigations/MainNavigator';
import { COLORS } from '../theme/theme';

export function Home() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <ProfileSection />
        <ScaleDownOnPress
          onPress={() => navigation.navigate('Listing')}
          scaleDownValue={0.9}
        >
          <FavouriteButton
            display={{ containerStyle: styles.favouriteButtonWrapper }}
          />
          <Animated.Image
            style={styles.sharedImage}
            source={require('../../assets/images/listing-item.jpg')}
            resizeMethod="resize"
            resizeMode="cover"
            sharedTransitionTag="item"
          />
          <CurrentBidBox />
        </ScaleDownOnPress>
      <BottomNavigation />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  favouriteButtonWrapper: {
    position: 'absolute',
    top: 20,
    right: 38,
    zIndex: 2,
  },
  sharedImage: {
    width: 'auto',
    marginHorizontal: 18,
    height: 425,
    borderRadius: 40,
  },
});
