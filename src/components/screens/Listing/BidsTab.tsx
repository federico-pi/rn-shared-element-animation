import React from 'react';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { BidderProfile } from '../../../types/profile';
import { THEME } from '../../../utils/theme';
import { Spacer } from '../../Spacer';
import { UserCard } from '../../UserCard';

export interface BidsTabProps {
  bidders: BidderProfile[];
}

export function BidsTab({ bidders }: BidsTabProps) {
  return (
    <Animated.FlatList
      entering={FadeInDown}
      exiting={FadeOutDown}
      keyExtractor={(_, index) => index.toString()}
      data={bidders}
      renderItem={({ item }) => (
        <UserCard
          image={item.pictureImageSource}
          title={item.fullName}
          text={`${item.amount} ${item.currency}`}
        />
      )}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Spacer height={THEME.spacing.sm} />}
    />
  );
}
