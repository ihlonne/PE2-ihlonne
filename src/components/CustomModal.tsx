import { Dialog } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const CustomModal = ({
  open,
  onClose,
  title,
  children,
}: CustomModalProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          maxW='md'
          borderRadius='2xl'
          shadow='xl'
          bg='white'
          p='4'
        >
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.CloseTrigger />
          </Dialog.Header>

          <Dialog.Body>{children}</Dialog.Body>

          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default CustomModal;
