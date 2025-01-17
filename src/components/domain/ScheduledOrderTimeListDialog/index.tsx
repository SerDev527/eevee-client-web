import React, { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Box, HStack, Icon, ListItem, OrderedList, Text, useDisclosure, Divider, VStack } from '@chakra-ui/react';

import { ModalDialog } from '@/components/ui/ModalDialog';
import { useGetScheduledOrderTimeListQuery } from '@/components/domain/ScheduledOrderTimeListDialog/ScheduledOrderTimeListDialog.query.generated';
import {
  DeliveryType,
  OrderType,
  ScheduledOrderTimeType,
  UpdateScheduledOrderTimeInput,
} from '@/graphql/generated/types';
import { useFacilityId, useTenantRouter } from '@/providers/tenant/WebOrderPageStateProvider';
import { useHandleErrorWithAlertDialog } from '@/providers/tenant/GlobalModalDialogProvider/hooks';
import { useGlobalLoadingSpinnerDispatch, useLoadingOverlay } from '@/providers/GlobalLoadingSpinnerProvider';
import variables from '@/styles/variables.module.scss';
import { useUpdateScheduledOrderTimeMutation } from '@/components/domain/ScheduledOrderTimeListDialog/ScheduledOrderTimeListDialog.mutation.generated';
import { generateMutationId } from '@/graphql/helper';
import { ScheduledOrderTimeItemListDialog } from '@/components/domain/ScheduledOrderTimeListDialog/ScheduledOrderTimeItemListDialog';
import { orderDateSelectionPage } from '@/utils/paths/facilityPages';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderType: OrderType;
};

export const ScheduledOrderTimeListDialog: FC<Props> = ({ isOpen, onClose, orderType }) => {
  const facilityId = useFacilityId();
  const itemListDialogState = useDisclosure();
  const { handleErrorWithAlertDialog } = useHandleErrorWithAlertDialog();
  const router = useTenantRouter();
  const setLoading = useGlobalLoadingSpinnerDispatch();

  const [_, updateSchedule] = useUpdateScheduledOrderTimeMutation();

  const isDelivery = orderType === OrderType.Delivery;

  const handleSelectScheduledOrderTimeType = async (tp: ScheduledOrderTimeType, orderType: OrderType) => {
    switch (tp) {
      case ScheduledOrderTimeType.Now:
        onClose();
        setLoading(true);

        const input: UpdateScheduledOrderTimeInput = {
          clientMutationId: generateMutationId(),
          type: ScheduledOrderTimeType.Now,
          orderType: orderType,
          facilityId: facilityId,
        };
        if (isDelivery) {
          input.deliveryType = DeliveryType.OnDemand;
        }
        const { error } = await updateSchedule({ input });
        setLoading(false);
        if (error) {
          handleErrorWithAlertDialog(error);
        }
        break;
      case ScheduledOrderTimeType.Schedule:
        itemListDialogState.onOpen();
        break;
      case ScheduledOrderTimeType.ScheduleDate:
        await router.push(orderDateSelectionPage(facilityId, orderType));
        break;
      default:
        break;
    }
  };

  const onTapScheduledOrderTimeItem = async (minArrival: string, maxArrival: string) => {
    const input: UpdateScheduledOrderTimeInput = {
      clientMutationId: generateMutationId(),
      type: ScheduledOrderTimeType.Schedule,
      orderType: orderType,
      facilityId: facilityId,
      minArrival: minArrival,
      maxArrival: maxArrival,
    };
    if (isDelivery) {
      input.deliveryType = DeliveryType.PreOrder;
    }
    const { error } = await updateSchedule({ input });
    if (error) {
      handleErrorWithAlertDialog(error);
    }

    itemListDialogState.onClose();
    onClose();
  };

  const [result] = useGetScheduledOrderTimeListQuery({
    variables: {
      facilityID: facilityId,
      orderType: orderType,
    },
  });
  const { data, error, fetching } = result;
  useLoadingOverlay(fetching);
  if (error) {
    handleErrorWithAlertDialog(error);
  }

  const todayScheduledOrderTime = data?.scheduledOrderTimes.find(
    (item) => item.type === ScheduledOrderTimeType.Schedule,
  );

  return (
    <>
      <ModalDialog
        isOpen={isOpen}
        onClose={onClose}
        secondaryAction={{
          text: '閉じる',
          onClick: onClose,
        }}
        title={isDelivery ? 'お届け時間' : '受け取り時間'}
      >
        {data && (
          <Box mt="8px" mb="16px" w="full">
            <Divider />
            <OrderedList styleType="none" marginStart="0px">
              {data.scheduledOrderTimes.map(
                (item, i) =>
                  item.available && (
                    <ListItem
                      pt="16px"
                      pb="16px"
                      key={i}
                      borderBottom="1px"
                      borderColor={variables.monoBackGround}
                      onClick={() => handleSelectScheduledOrderTimeType(item.type, orderType)}
                    >
                      <VStack align="start">
                        <HStack w="full" justifyContent="space-between">
                          <Text fontSize={14} className="bold-small" color={item.selected ? 'brand.primaryText' : ''}>
                            {item.name}
                          </Text>
                          {item.selected && <Icon as={CheckIcon} color="brand.primaryText" />}
                        </HStack>
                        {item.type == ScheduledOrderTimeType.ScheduleDate && item.selected && (
                          <Text textDecoration="underline" color="brand.primaryText" fontSize={14}>
                            変更する
                          </Text>
                        )}
                      </VStack>
                    </ListItem>
                  ),
              )}
            </OrderedList>
          </Box>
        )}
        {todayScheduledOrderTime && (
          <ScheduledOrderTimeItemListDialog
            isOpen={itemListDialogState.isOpen}
            onClose={itemListDialogState.onClose}
            onTap={onTapScheduledOrderTimeItem}
            items={todayScheduledOrderTime.items}
          />
        )}
      </ModalDialog>
    </>
  );
};
