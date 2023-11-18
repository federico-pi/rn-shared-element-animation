import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MainNavigator } from './navigation/MainNavigator';

function App() {
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
