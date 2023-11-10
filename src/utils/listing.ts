import { add } from 'date-fns';
import { ImageSourcePropType } from 'react-native';
import { InfoBoxProps } from '../components/InfoBox';
import { ASSETS } from './assets';

export type ItemKey = 'blossom' | 'awakening' | 'infinite' | 'shards';

export interface AvailableItem {
  key: ItemKey;
  source: ImageSourcePropType;
  bid: InfoBoxProps;
  expiryDate: Date;
}

export const AVAILABLE_ITEMS_MAP: AvailableItem[] = [
  {
    key: 'blossom',
    source: ASSETS.images.blossom,
    bid: {
      title: 'Blossom',
      description: '24.5 ETH',
      image: ASSETS.images.profilePicturePlaceholder,
      imageLabel: 'Robert A.',
      subText: 'Current bid',
    },
    expiryDate: add(new Date(), { hours: 15, minutes: 39 }),
  },
  {
    key: 'awakening',
    source: ASSETS.images.awakening,
    bid: {
      title: 'Awakening',
      description: '40.2 ETH',
      image: ASSETS.images.profilePicturePlaceholder,
      imageLabel: 'Robert A.',
      subText: 'Current bid',
    },
    expiryDate: add(new Date(), { hours: 11, minutes: 30 }),
  },
  {
    key: 'infinite',
    source: ASSETS.images.infinite,
    bid: {
      title: 'Infinite',
      description: '19.8 ETH',
      image: ASSETS.images.profilePicturePlaceholder,
      imageLabel: 'Robert A.',
      subText: 'Current bid',
    },
    expiryDate: add(new Date(), { hours: 19, minutes: 48 }),
  },
  {
    key: 'shards',
    source: ASSETS.images.shards,
    bid: {
      title: 'Shards',
      description: '12.6 ETH',
      image: ASSETS.images.profilePicturePlaceholder,
      imageLabel: 'Robert A.',
      subText: 'Current bid',
    },
    expiryDate: add(new Date(), { hours: 21, minutes: 12 }),
  },
];
