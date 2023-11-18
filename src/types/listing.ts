import { ImageSourcePropType } from 'react-native';
import { BidderProfile, OwnerProfile } from './profile';

export type ListingKeys = 'blossom' | 'awakening' | 'infinite' | 'shards';

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

export enum ListingTab {
  OWNERS = 'Owners',
  BIDS = 'Bids',
  DETAILS = 'Details',
  HISTORY = 'History',
}

export interface ListingLayoutValues {
  tab: ListingTab;
  x: number;
  width: number;
}
