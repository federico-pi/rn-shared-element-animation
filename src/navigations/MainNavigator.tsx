import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { Home } from '../screens/Home';
import { Listing } from '../screens/Listing';

const Stack = createNativeStackNavigator();

type StackParamList = {
  Home: undefined;
  Listing: undefined;
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;

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
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}
