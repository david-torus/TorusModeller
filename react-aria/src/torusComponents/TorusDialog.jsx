import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
} from "react-aria-components";

export default function TorusDialog({
  title,
  message,
  triggerElement,
  children,
}) {
  return (
    <DialogTrigger>
      {triggerElement}
      <Modal>
        <Dialog
          role="alertdialog"
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          {({ close }) => (
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <Heading slot="title" className="text-lg font-bold mb-4">
                {title}
              </Heading>
              <p className="mb-4">{message}</p>
              <div className="flex gap-4">
                {children}
                <button
                  onClick={close}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                ></button>
              </div>
            </div>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
