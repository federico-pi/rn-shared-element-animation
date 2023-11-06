import { NavigationContainer } from '@react-navigation/native';
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
