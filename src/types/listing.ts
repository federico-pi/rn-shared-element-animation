import { ImageSourcePropType } from 'react-native';

export type ListingKeys = 'blossom' | 'awakening' | 'infinite' | 'shards';

export interface BaseProfile {
  fullName: string;
  pictureImageSource: ImageSourcePropType;
}

export interface OwnerProfile extends BaseProfile {
  editions: number;
}

export interface BidderProfile extends BaseProfile {
  amount: number;
  currency: string;
}

export interface Listing {
  key: ListingKeys;
  name: string;
  description: string;
  imageSource: ImageSourcePropType;
  owners: OwnerProfile[];
  bidders: BidderProfile[];
  listedAt: Date;
  expiresAt: Date;
  tags: string[];
  history: unknown[];
}
