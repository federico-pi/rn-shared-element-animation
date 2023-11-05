import { Dimensions, Platform } from 'react-native';

import Constants from 'expo-constants';

/** @description the experience is running inside of the Expo Go app. */
export const IS_EXPO = Constants.appOwnership === 'expo';
/**
 * @description It is a standalone app ((/classic/building-standalone-apps#building-standalone-apps)
 * OR it has been opened through a link from a standalone app (guest).
 * */
export const IS_STANDALONE = Constants.appOwnership !== 'expo';
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
  Dimensions.get('screen');
export const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } =
  Dimensions.get('window');

export const KEYBOARD_SHOW_LISTENER = IS_IOS
  ? 'keyboardWillShow'
  : 'keyboardDidShow';
export const KEYBOARD_HIDE_LISTENER = IS_IOS
  ? 'keyboardWillHide'
  : 'keyboardDidHide';
