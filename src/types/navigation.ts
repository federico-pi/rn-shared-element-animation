import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ListingKeys } from './listing';

export type StackParamList = {
  Home: undefined;
  Listing: { listingKey: ListingKeys };
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;
