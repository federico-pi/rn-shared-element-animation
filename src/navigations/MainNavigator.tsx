import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { Home } from '../screens/Home';
import { Listing } from '../screens/Listing';
import { ItemKey } from '../utils/listing';

export type StackParamList = {
  Home: undefined;
  Listing: { itemKey: ItemKey };
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;

const Stack = createNativeStackNavigator();

export function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Listing"
        component={Listing}
        options={{ animation: 'fade' }}
      />
    </Stack.Navigator>
  );
}
