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
import ReusableInput from "../reusableComponents/ReusableInput";

export const AddingModel = ({
  onOpenChange,
  isOpen,
  header,
  body,
  button1,
  button2,
  addingFunction,
  handlenewApplication,
  placeholder,
  appGroup,
  setPostApplication,

  handleReRenderFun,
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
            <ModalBody>
              {body}
              <>
                <div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between gap-3 items-center"
                >
                  <ReusableInput
                    key={"AddingModelInput"}
                    darkMode={darkMode}
                    placeholder={`Create ${placeholder}`}
                    handleChange={(e) => {
                      handlenewApplication(e);
                      setPostApplication(e.target.value);
                    }}
                  />
                </div>
              </>
            </ModalBody>
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
                  try {
                    await addingFunction(appGroup);
                    onClose();
                    handleReRenderFun();
                  } catch (error) {
                    console.error(error.message);
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
