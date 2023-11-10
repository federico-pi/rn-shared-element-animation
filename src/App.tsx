import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MainNavigator } from './navigations/MainNavigator';

registerRootComponent(() => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
