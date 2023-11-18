import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home } from '../components/screens/Home';
import { Listing } from '../components/screens/Listing/Listing';

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
