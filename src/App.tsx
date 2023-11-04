import { NavigationContainer } from '@react-navigation/native';
import { format } from 'date-fns';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, Modal } from 'react-native';
import { registerRootComponent } from 'expo';
import { MainNavigator } from './navigations/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

registerRootComponent(App);
