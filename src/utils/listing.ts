import { add, sub } from 'date-fns';
import { BaseProfile, Listing } from '../types/listing';
import { ASSETS } from './assets';

const USER_1_BASE_PROFILE: BaseProfile = {
  fullName: 'Robert A.',
  pictureImageSource: ASSETS.images.users['user-1'],
};

const USER_2_BASE_PROFILE: BaseProfile = {
  fullName: 'Amy S.',
  pictureImageSource: ASSETS.images.users['user-2'],
};

const USER_3_BASE_PROFILE: BaseProfile = {
  fullName: 'John C.',
  pictureImageSource: ASSETS.images.users['user-3'],
};

const USER_4_BASE_PROFILE: BaseProfile = {
  fullName: 'Lily H.',
  pictureImageSource: ASSETS.images.users['user-4'],
};

export const LISTINGS_MAP: Listing[] = [
  {
    key: 'blossom',
    name: 'Blossom',
    description:
      'Captivating artwork aimed at challenging conventional perceptions, inviting viewers to embrace the beauty found in the harmonious coexistence of diverse elements.',
    imageSource: ASSETS.images.blossom,
    owners: [
      {
        ...USER_1_BASE_PROFILE,
        editions: 2,
      },
    ],
    bidders: [
      {
        ...USER_2_BASE_PROFILE,
        amount: 24.5,
        currency: 'ETH',
      },
      {
        ...USER_3_BASE_PROFILE,
        amount: 23.5,
        currency: 'ETH',
      },
      {
        ...USER_4_BASE_PROFILE,
        amount: 20.2,
        currency: 'ETH',
      },
    ],
    listedAt: sub(new Date(), { days: 12, hours: 20, minutes: 12 }),
    expiresAt: add(new Date(), { hours: 15, minutes: 39 }),
    tags: ['flower', 'birth', 'cryptoart', 'nftart'],
    history: [],
  },
  {
    key: 'awakening',
    name: 'Awakening',
    description:
      "A hand reaching with purpose and curiosity, symbolizing the relentless pursuit of a higher understanding and the awakening of one's true potential. ",
    imageSource: ASSETS.images.awakening,
    owners: [
      {
        ...USER_2_BASE_PROFILE,
        editions: 2,
      },
    ],
    bidders: [
      {
        ...USER_3_BASE_PROFILE,
        amount: 40.2,
        currency: 'ETH',
      },
      {
        ...USER_4_BASE_PROFILE,
        amount: 36.9,
        currency: 'ETH',
      },
      {
        ...USER_1_BASE_PROFILE,
        amount: 34.3,
        currency: 'ETH',
      },
    ],
    listedAt: sub(new Date(), { days: 8, hours: 20, minutes: 12 }),
    expiresAt: add(new Date(), { hours: 11, minutes: 30 }),
    tags: ['hand', 'rise', 'nft', 'cryptoart'],
    history: [],
  },
  {
    key: 'infinite',
    name: 'Infinite',
    description:
      'An endless spectrum of creativity and imagination, symbolizing the infinite potential that resides within every moment and artistic expression.',
    imageSource: ASSETS.images.infinite,
    owners: [
      {
        ...USER_3_BASE_PROFILE,
        editions: 2,
      },
    ],
    bidders: [
      {
        ...USER_4_BASE_PROFILE,
        amount: 19.8,
        currency: 'ETH',
      },
      {
        ...USER_1_BASE_PROFILE,
        amount: 19.6,
        currency: 'ETH',
      },
      {
        ...USER_2_BASE_PROFILE,
        amount: 15.9,
        currency: 'ETH',
      },
    ],
    listedAt: sub(new Date(), { days: 15, hours: 20, minutes: 12 }),
    expiresAt: add(new Date(), { hours: 11, minutes: 30 }),
    tags: ['ring', 'infinity', 'digitalart', 'nftart'],
    history: [],
  },
  {
    key: 'shards',
    name: 'Shards',
    description:
      'Evocative piece inviting contemplation on the beauty that arises from embracing change and the mosaic of experiences that shape our journey.',
    imageSource: ASSETS.images.shards,
    owners: [
      {
        ...USER_4_BASE_PROFILE,
        editions: 2,
      },
    ],
    bidders: [
      {
        ...USER_1_BASE_PROFILE,
        amount: 12.6,
        currency: 'ETH',
      },
      {
        ...USER_2_BASE_PROFILE,
        amount: 11.5,
        currency: 'ETH',
      },
      {
        ...USER_3_BASE_PROFILE,
        amount: 10.8,
        currency: 'ETH',
      },
    ],
    listedAt: sub(new Date(), { days: 26, hours: 20, minutes: 12 }),
    expiresAt: add(new Date(), { hours: 11, minutes: 30 }),
    tags: ['pieces', 'woman', 'nft', 'cryptoart'],
    history: [],
  },
];
