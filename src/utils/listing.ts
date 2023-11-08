import { ImageSourcePropType } from 'react-native';
import { ASSETS } from './assets';
import { CurrentBidBoxProps } from '../components/CurrentBidBox';

export type AvailableItems = 'blossom' | 'awakening';

export const AVAILABLE_ITEMS_MAP: {
  [key in AvailableItems]: {
    source: ImageSourcePropType;
    currentBid: CurrentBidBoxProps;
  };
} = {
  blossom: {
    source: ASSETS.images.blossom,
    currentBid: {
      label: 'Blossom',
      bidder: 'Robert A.',
      price: '24.5 ETH',
    },
  },
  awakening: {
    source: ASSETS.images.awakening,
    currentBid: {
      label: 'Awakening',
      bidder: 'Robert A.',
      price: '40.2 ETH',
    },
  },
};
