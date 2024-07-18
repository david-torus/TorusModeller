import {
  Button,
  Dialog,
  ModalOverlay,
  DialogTrigger,
  Heading,
  Modal,
} from "react-aria-components";
import { merger } from "../utils/utils";

export default function TorusDialog({
  triggerElement,
  children,
  classNames,
  isOpen,
}) {
  return (
    <DialogTrigger>
      {triggerElement}
      <ModalOverlay
        isDismissable
        isOpen={isOpen}
        className={merger(
          "fixed z-[100] top-0 left-0 w-screen h-screen bg-transparent/45 flex  justify-center",
          classNames?.modalClassName
        )}
      >
        <Modal isDismissable>
          <Dialog className="border-none torus-focus:border-none torus-focus-within:border-none torus-focus-visible:border-none">
            {children}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
