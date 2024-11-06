import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../../../../graphql/generated/types';
import {
  NavbarViewingPartsFragmentDoc,
  NavbarViewerPartsFragmentDoc,
} from '../../../domain/Navbar/Navbar.fragment.generated';
import { DeliveryAddressDialogPartsFragmentDoc } from '../../../domain/DeliveryAddressDialog/DeliveryAddressDialog.fragment.generated';
import { PaymentDialogPartsFragmentDoc } from '../../../domain/PaymentDialog/PaymentDialog.fragment.generated';
import {
  NavbarMenuViewerFragmentDoc,
  NavbarMenuFacilityFragmentDoc,
} from '../../../domain/Navbar/NavbarMenu.fragment.generated';
import { FeatureFlagsForProviderFragmentDoc } from '../../../../providers/FeatureFlagsProvider/FeatureFlagsProvider.fragment.generated';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetTenantForNavbarQueryVariables = Types.Exact<{
  facilityId: Types.Scalars['ID']['input'];
}>;

export type GetTenantForNavbarQuery = {
  __typename: 'Query';
  tenant: { __typename: 'Tenant'; logo: string };
  viewer: {
    __typename: 'User';
    deliveryAddresses: Array<{
      __typename: 'DeliveryAddress';
      id: string;
      prefecture: string;
      addressLine: string;
      buildingName: string;
      memo?: string | null;
      isUsing: boolean;
    }>;
    payments: Array<{
      __typename: 'Payment';
      id: string;
      last4: string;
      brand: string;
      isSelected: boolean;
      paymentType: Types.PaymentType;
    }>;
    profile?: { __typename: 'Profile'; imageUrl: string } | null;
    loyaltyCard?: { __typename: 'UserLoyaltyCard' } | null;
  };
  facility?:
    | { __typename: 'Cart' }
    | { __typename: 'Coupon' }
    | { __typename: 'CourseMenu' }
    | { __typename: 'CourseMenuCategory' }
    | { __typename: 'DeliveryOrder' }
    | { __typename: 'EatInOrder' }
    | {
        __typename: 'Facility';
        featureFlags: {
          __typename: 'FeatureFlags';
          showPriceExcludingTax: boolean;
          loyaltyProgramEnabled: boolean;
          itemCodeSearchEnabled: boolean;
        };
      }
    | { __typename: 'MenuCategory' }
    | { __typename: 'MenuItem' }
    | { __typename: 'Survey' }
    | { __typename: 'Table' }
    | { __typename: 'TableOrder' }
    | { __typename: 'TakeoutOrder' }
    | { __typename: 'Tenant' }
    | { __typename: 'User' }
    | null;
};

export const GetTenantForNavbarDocument = gql`
  query GetTenantForNavbar($facilityId: ID!) {
    tenant: viewing {
      ...NavbarViewingParts
    }
    viewer {
      deliveryAddresses {
        ...DeliveryAddressDialogParts
      }
      payments {
        ...PaymentDialogParts
      }
      ...NavbarViewerParts
    }
    facility: node(id: $facilityId) {
      ...NavbarMenuFacility
    }
  }
  ${NavbarViewingPartsFragmentDoc}
  ${DeliveryAddressDialogPartsFragmentDoc}
  ${PaymentDialogPartsFragmentDoc}
  ${NavbarViewerPartsFragmentDoc}
  ${NavbarMenuViewerFragmentDoc}
  ${NavbarMenuFacilityFragmentDoc}
  ${FeatureFlagsForProviderFragmentDoc}
`;

export function useGetTenantForNavbarQuery(
  options: Omit<Urql.UseQueryArgs<GetTenantForNavbarQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTenantForNavbarQuery, GetTenantForNavbarQueryVariables>({
    query: GetTenantForNavbarDocument,
    ...options,
  });
}