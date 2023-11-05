import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/theme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/native';
import Reanimated, { SharedTransition } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigations/MainNavigator';

export function Listing() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          top: 63,
          left: 20,
          zIndex: 2,
        }}
        onPress={() => navigation.navigate('Home')}
      >
        <Image
          style={{
            width: 37,
            height: 37,
            padding: 10,
          }}
          source={require('../../assets/images/back-arrow.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          top: 59,
          right: 20,
          height: 49,
          width: 49,
          borderRadius: 30,
          backgroundColor: '#ffffff50',
          zIndex: 2,
        }}
      >
        <Image
          style={{
            width: 25,
            height: 25,
            padding: 10,
            opacity: 0.8,
          }}
          source={require('../../assets/images/white-heart.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Reanimated.Image
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: SCREEN_HEIGHT * 0.71,
          borderRadius: 40,
        }}
        source={require('../../assets/images/listing-item.jpg')}
        resizeMode="cover"
        sharedTransitionTag="item"
      />
      <Image
        style={{
          width: SCREEN_WIDTH - 4,
          height: 280,
          marginHorizontal: 2,
          position: 'absolute',
          bottom: -20,
        }}
        source={require('../../assets/images/listing-bottom.png')}
        resizeMode="contain"
      />
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
  text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: COLORS.body,
  },
});
