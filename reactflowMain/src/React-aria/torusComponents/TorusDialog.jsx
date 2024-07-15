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
          "fixed z-[100] top-0 left-0 w-screen h-screen bg-transparent/45 flex items-center justify-center",
          classNames?.modalClassName
        )}
      >
        <Modal  isDismissable>
          <Dialog className={merger("", classNames?.dialogClassName)}>
            {children}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
