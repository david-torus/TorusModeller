import {
  Button,
  Dialog,
  ModalOverlay,
  DialogTrigger,
  Heading,
  Modal,
} from "react-aria-components";
import { merger } from "../utils/utils";

export default function TorusDialog({ triggerElement, children, classNames }) {
  return (
    <DialogTrigger>
      {triggerElement}
      <ModalOverlay
        isDismissable
        className={merger(
          "fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-transparent/45",
          classNames?.modalOverlayClassName,
        )}
      >
        <Modal className={merger("", classNames?.modalClassName)} isDismissable>
          <Dialog className={merger("", classNames?.dialogClassName)} >
            {children}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
