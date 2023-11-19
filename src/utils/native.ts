import { Platform } from 'react-native';

import Constants from 'expo-constants';

export const IS_EXPO = Constants.appOwnership === 'expo';
export const IS_STANDALONE = Constants.appOwnership !== 'expo';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
