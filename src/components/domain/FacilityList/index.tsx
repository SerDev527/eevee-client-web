import { VStack, HStack, Text, Spinner, Image, StackDivider, Spacer, LinkBox, Box } from '@chakra-ui/react';
import { FC, useCallback, useMemo } from 'react';

import { useHandleErrorWithAlertDialog } from '@/providers/tenant/GlobalModalDialogProvider/hooks';
import { meterToKmText } from '@/utils/formatUtils';
import { OrderType } from '@/graphql/generated/types';
import { deliveryHome, takeoutHome, eatInHome, initialHome } from '@/utils/paths/facilityPages';

import { AvailableOrderTypeBadge } from '../AvailableOrderTypeBadge';
import { TenantPageLinkOverlay } from '../TenantPageLink';

import { useGetFacilitiesForFacilityListPageQuery } from './FacilityList.query.generated';

type Props = {
  location: LatLng | null;
  searchText: string;
};

type LatLng = {
  latitude: number;
  longitude: number;
};

export const FacilityList: FC<Props> = ({ location, searchText }) => {
  const [result] = useGetFacilitiesForFacilityListPageQuery({
    variables: {
      location,
    },
  });

  const { data, fetching, error } = result;

  const filtered = useMemo(() => {
    if (!data || !data.viewing.facilities) {
      return [];
    }
    return data.viewing.facilities.filter((facility) => {
      if (facility.availableOrderTypes.length === 0) {
        // NOTE: availableOrderTypes が空の店舗はOrderTypeの初期状態を決定できず詰むので省く
        return false;
      }
      // NOTE: アプリだとカタカナによるHITもさせているのでやった方が良いかも
      const fullAddress = `${facility.address1}${facility.address2}`;
      return facility.shortName.includes(searchText) || fullAddress.includes(searchText);
    });
  }, [data, searchText]);

  const resolveFacilityHomePage = useCallback((facilityId: string, orderType: OrderType): string => {
    switch (orderType) {
      case OrderType.Delivery:
        return deliveryHome(facilityId);
      case OrderType.Takeout:
        return takeoutHome(facilityId);
      case OrderType.EatIn:
        return eatInHome(facilityId);
    }
  }, []);

  const { handleErrorWithAlertDialog } = useHandleErrorWithAlertDialog();

  const useLocation = !!location;

  if (error) {
    handleErrorWithAlertDialog(error);
  }
  if (fetching) {
    return <Spinner className="mono-secondary" />;
  }

  if (data?.viewing.facilities.length === 0) {
    return (
      <Box paddingY="14px">
        <Text>店舗が見つかりませんでした</Text>
      </Box>
    );
  }

  return (
    <VStack w="full" spacing="14px" divider={<StackDivider color="mono.divider" />}>
      {/* 最初と最後にDividerを表示したいため空要素を置く */}
      <Spacer />
      {filtered.map((f) => (
        <LinkBox key={f.id} w="full" alignItems="start">
          <TenantPageLinkOverlay
            key={f.id}
            href={
              f.featureFlags.itemCodeSearchEnabled
                ? initialHome(f.id, f.availableOrderTypes[0].orderType)
                : resolveFacilityHomePage(f.id, f.availableOrderTypes[0].orderType)
            }
            passHref
          >
            <HStack w="full" spacing="12px" alignItems="start">
              <Image boxSize="88px" alt={`${f.shortName}店舗画像`} src={f.image} objectFit="cover" rounded="4px" />
              <VStack alignItems="start" spacing="8px">
                <VStack alignItems="start">
                  <Text className="bold-medium">{f.shortName}</Text>
                  {useLocation && (
                    <Text className="bold-extra-small">現在地から{meterToKmText(f.metaByLocation?.distance ?? 0)}</Text>
                  )}
                </VStack>
                <Text className="text-extra-small" color="mono.secondary">
                  {`${f.address1}${f.address2}`}
                </Text>
                <VStack spacing="6px" alignItems="start">
                  {f.availableOrderTypes.map((ot, i) => (
                    <AvailableOrderTypeBadge key={i} availableOrderType={ot} />
                  ))}
                </VStack>
              </VStack>
            </HStack>
          </TenantPageLinkOverlay>
        </LinkBox>
      ))}
      <Spacer />
    </VStack>
  );
};