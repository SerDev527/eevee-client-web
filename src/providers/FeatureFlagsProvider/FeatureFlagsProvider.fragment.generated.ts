import gql from 'graphql-tag';
export type FeatureFlagsForProviderFragment = {
  __typename: 'FeatureFlags';
  showPriceExcludingTax: boolean;
  loyaltyProgramEnabled: boolean;
  itemCodeSearchEnabled: boolean;
};

export const FeatureFlagsForProviderFragmentDoc = gql`
  fragment FeatureFlagsForProvider on FeatureFlags {
    showPriceExcludingTax
    loyaltyProgramEnabled
    itemCodeSearchEnabled
  }
`;
