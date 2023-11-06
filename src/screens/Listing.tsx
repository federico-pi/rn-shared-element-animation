import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { FavouriteButton } from '../components/FavouriteButton';
import { ItemCollection } from '../components/ItemCollection';
import { NavigationProps } from '../navigations/MainNavigator';
import { COLORS } from '../theme/theme';

export function Listing() {
  const navigation = useNavigation<NavigationProps>();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.iconsContainer, { width: windowWidth }]}
        entering={FadeInUp.delay(400)}
      >
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            style={styles.backArrowImage}
            source={require('../../assets/images/back-arrow.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <FavouriteButton />
      </Animated.View>
      <Animated.Image
        style={[styles.sharedImage, { height: windowHeight * 0.71 }]}
        source={require('../../assets/images/listing-item.jpg')}
        resizeMode="cover"
        sharedTransitionTag="item"
      />
      <ItemCollection />
      <StatusBar style="light" animated={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  iconsContainer: {
    paddingLeft: 12,
    paddingRight: 16,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    top: 60,
    zIndex: 2,
  },
  backArrowImage: {
    width: 37,
    height: 37,
  },
  sharedImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    borderRadius: 40,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: COLORS.body,
  },
});
