import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MainNavigator } from './navigation/MainNavigator';

SplashScreen.preventAutoHideAsync();

function App() {
  useEffect(() => {
    const prepare = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
