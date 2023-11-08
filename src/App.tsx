import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { MainNavigator } from './navigations/MainNavigator';

function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

registerRootComponent(App);
