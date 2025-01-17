import { VStack } from '@chakra-ui/react';

import { PrimaryButton } from '@/components/ui/Button';

type Props = {
  onSubmit: () => Promise<void>;
  disabled: boolean;
  submitLabel?: string;
};

export const FixedOrderSubmitButton = ({ onSubmit, disabled, submitLabel }: Props) => {
  return (
    <VStack
      py="16px"
      bgColor="mono.white"
      borderTop="1px"
      borderTopColor="mono.divider"
      align="start"
      spacing="16px"
      position="sticky"
      zIndex="sticky"
      bottom="0"
    >
      <PrimaryButton h="56px" rounded="32px" onClick={onSubmit} isDisabled={disabled}>
        {submitLabel ? submitLabel : 'この内容で注文する'}
      </PrimaryButton>
    </VStack>
  );
};
