import { Text, FormControl, Flex, FormErrorMessage, Link, VStack, useDisclosure } from '@chakra-ui/react';
import { FC, useCallback, useMemo, useState } from 'react';

import { BasicInput } from '@/components/ui/Input';
import { PrimaryButton } from '@/components/ui/Button';
import { useHandleErrorWithAlertDialog } from '@/providers/tenant/GlobalModalDialogProvider/hooks';
import { ModalButtonAction, ModalDialog } from '@/components/ui/ModalDialog';
import { useLoadingOverlay } from '@/providers/GlobalLoadingSpinnerProvider';

import {
  useRequestAuthCodeByPhoneMutation,
  useRequestAuthCodeBySmsMutation,
  useVerifyAuthCodeMutation,
} from './SignUp.mutation.generated';

type Props = {
  phoneNumber: string;
  onClickNext: () => void;
};

const ResendTextWithDialog: FC<{ onClickText: () => Promise<void>; text: string; requested: string }> = ({
  onClickText,
  text,
  requested,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dialogAction: ModalButtonAction = {
    text: '閉じる',
    onClick: onClose,
  };

  const handleOnClick = useCallback(async () => {
    await onClickText();
    onOpen();
  }, [onClickText, onOpen]);

  return (
    <>
      <Link color="brand.primaryText" className="text-extra-small" onClick={handleOnClick}>
        {text}
      </Link>
      <ModalDialog isOpen={isOpen} onClose={onClose} title="コードの再送" secondaryAction={dialogAction}>
        {requested}
      </ModalDialog>
    </>
  );
};

export const InputAuthorizationCode: FC<Props> = ({ phoneNumber, onClickNext }) => {
  const [authCode, setAuthCode] = useState('');
  const [showError, setShowError] = useState(false);

  const { handleErrorWithAlertDialog } = useHandleErrorWithAlertDialog();
  const [verifyResult, verifyAuthCode] = useVerifyAuthCodeMutation();
  const [resendResult, requestAuthCodeBySMS] = useRequestAuthCodeBySmsMutation();
  const [resendByPhoneResult, requestAuthCodeByPhone] = useRequestAuthCodeByPhoneMutation();
  useLoadingOverlay(verifyResult.fetching || resendResult.fetching || resendByPhoneResult.fetching);

  const validAuthCode: boolean = useMemo(() => {
    return authCode.length > 0;
  }, [authCode.length]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
    if (validAuthCode) {
      setShowError(false);
    }
  };

  const handleBlurInput = () => {
    if (!validAuthCode) {
      setShowError(true);
    }
  };

  const handleClickResend = useCallback(async () => {
    const { error } = await requestAuthCodeBySMS({
      input: {
        phoneNumber,
      },
    });
    if (error) {
      handleErrorWithAlertDialog(error);
      return;
    }
  }, [handleErrorWithAlertDialog, phoneNumber, requestAuthCodeBySMS]);

  const handleClickResendByPhone = useCallback(async () => {
    const { error } = await requestAuthCodeByPhone({
      input: {
        phoneNumber,
      },
    });
    if (error) {
      handleErrorWithAlertDialog(error);
      return;
    }
  }, [handleErrorWithAlertDialog, phoneNumber, requestAuthCodeByPhone]);

  const handleClickNext = useCallback(async () => {
    if (!validAuthCode) {
      return;
    }
    const { error } = await verifyAuthCode({
      input: {
        phoneNumber,
        authCode,
      },
    });
    if (error) {
      handleErrorWithAlertDialog(error);
      return;
    }
    onClickNext();
  }, [validAuthCode, verifyAuthCode, phoneNumber, authCode, onClickNext, handleErrorWithAlertDialog]);

  return (
    <Flex direction="column">
      <Text className="bold-small" w="full">
        届いた番号を入力してください
      </Text>
      <FormControl mt="20px" isInvalid={showError}>
        <BasicInput
          type="number"
          h="56px"
          textAlign="center"
          fontSize="28px"
          placeholder="000000"
          value={authCode}
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
        />
        <FormErrorMessage>有効な電話番号を入力してください。</FormErrorMessage>
      </FormControl>
      <VStack mt="16px" spacing="16px">
        <ResendTextWithDialog
          onClickText={handleClickResend}
          text="認証コードを再送する"
          requested="認証コードを再送しました。"
        />
        <ResendTextWithDialog
          onClickText={handleClickResendByPhone}
          text="電話で認証コードを確認する"
          requested="電話音声通知をリクエストしました"
        />
      </VStack>
      <PrimaryButton mt="32px" h="56px" disabled={!validAuthCode} onClick={handleClickNext}>
        次へ
      </PrimaryButton>
    </Flex>
  );
};