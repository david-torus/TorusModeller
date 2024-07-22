import { useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { DarkmodeContext } from "../../commonComponents/context/DarkmodeContext";

export const DeleteModel = ({
  selectedKey,
  onOpenChange,
  isOpen,
  header,
  body,
  button1,
  button2,
  deleteFunction,
  handleEmpty,
}) => {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      classNames={{
        backdrop: darkMode
          ? "bg-[#353535]/70 backdrop-opacity-60"
          : "bg-slate-300/70 backdrop-opacity-60",
        base: darkMode
          ? "border-[#2B2B2B] bg-[#404142] shadow-xl"
          : "border-[#2B2B2B] bg-slate-300 shadow-xl",
        header: darkMode ? " text-white" : " text-slate-900",
        body: darkMode ? "text-white" : "text-slate-900",
        footer: darkMode ? "   text-white" : "   text-slate-900",
        closeButton: darkMode
          ? "hover:bg-white/5 active:bg-white/10"
          : "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
              <Button
                className="text-red-300 bg-transparent hover:font-bold hover:bg-red-600 hover:text-white "
                onPress={onClose}
              >
                {button1}
              </Button>
              <Button
                className="bg-[#3B82F6] text-white shadow-sm shadow-[#3B82F6] hover:shadow-lg"
                onClick={async () => {
                  await deleteFunction(selectedKey);

                  onClose();
                  if (typeof handleEmpty === "function") {
                    handleEmpty();
                  } else {
                    console.error("handleEmpty is not a function");
                  }
                }}
              >
                {button2}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
