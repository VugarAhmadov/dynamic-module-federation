import { Button, Flex, MantineSize, Modal, Title } from "@mantine/core";

interface IConfirmDialog {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  loading?: boolean;
  cancelText?: string;
  continueText?: string;
  preventClose?: boolean;
  size?: MantineSize | string | number;
}

export function ConfirmDialog({
  opened,
  onClose,
  onConfirm,
  title,
  description,
  loading,
  cancelText,
  continueText,
  preventClose = false,
  size = "xs",
}: IConfirmDialog) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={size}
      radius="lg"
      centered
      withCloseButton={false}
      closeOnClickOutside={!preventClose}
      padding="xl"
      zIndex={999999}
    >
      <Title order={4}>{title}</Title>
      {description && <p>{description}</p>}
      <Flex gap="lg" mt="lg">
        {!preventClose && (
          <Button onClick={onClose} variant="default" fullWidth>
            {cancelText ?? "Cancel"}
          </Button>
        )}
        <Button onClick={onConfirm} loading={loading} fullWidth color="red">
          {continueText ?? "Delete"}
        </Button>
      </Flex>
    </Modal>
  );
}
