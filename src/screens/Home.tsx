import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigations/MainNavigator';
import { SCREEN_WIDTH } from '../utils/native';
import Reanimated, {
  SharedTransition,
  withSpring,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { ScaleDownOnPress } from '../components/ScaleDownOnPress';

export function Home() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 'auto',
          height: 280,
          top: 50,
          marginHorizontal: 3,
        }}
        source={require('../../assets/images/home-top.png')}
        resizeMode="contain"
      />
      <ScaleDownOnPress
        onPress={() => navigation.navigate('Listing')}
        scaleDownValue={0.85}
      >
        <View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              top: 20,
              right: 38,
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
                opacity: 0.8
              }}
              source={require('../../assets/images/white-heart.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Reanimated.Image
            style={{
              width: 'auto',
              marginHorizontal: 18,
              height: 410,
              borderRadius: 40,
            }}
            source={require('../../assets/images/listing-item.jpg')}
            resizeMethod="resize"
            resizeMode="cover"
            sharedTransitionTag="item"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              width: SCREEN_WIDTH,
            }}
          >
            <View
              style={{
                position: 'absolute',
                bottom: 8,
                width: '80%',
                backgroundColor: '#ffffff80',
                borderRadius: 25,
                alignSelf: 'center',
                padding: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{ fontSize: 18, lineHeight: 20, fontWeight: '500' }}
                >
                  Awakening
                </Text>
                <Text
                  style={{ fontSize: 20, lineHeight: 20, fontWeight: '700' }}
                >
                  40.2 ETH
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text>Robert A.</Text>
                <Text>Current bid</Text>
              </View>
            </View>
          </View>
        </View>
      </ScaleDownOnPress>
      <Image
        style={{ width: SCREEN_WIDTH, bottom: 25 }}
        source={require('../../assets/images/home-bottom.png')}
        resizeMode="contain"
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: COLORS.body,
  },
});
