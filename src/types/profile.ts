import { ImageSourcePropType } from 'react-native';

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
