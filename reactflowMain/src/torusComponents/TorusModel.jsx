import React from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { FabricBar, TorusModelClose } from "../SVG_Application";
import { isValidElement } from "react";

export default function TorusModel({
  triggerButton,
  title,
  body,
  onConfirm,
  onCancel,
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  confirmButtonStyle,
  cancelButtonStyle,
  modalStyle,
  overlayStyle,
  titleStyle,
  bodyStyle,
  triggerButtonStyle,
  modelClassName,
  onPress,
}) {
  return (
    <>
      <DialogTrigger>
        <Button
          className={`${triggerButtonStyle} pressed:bg-opacity-40 inline-flex cursor-default items-center justify-center rounded-md`}
          onPress={() => {
            if (onPress) onPress();
          }}
        >
          {triggerButton}
        </Button>
        <ModalOverlay
          className={({ isEntering, isExiting }) => `
             fixed inset-0 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center backdrop-blur
            ${isEntering ? "duration-300 ease-out animate-in fade-in" : ""}
            ${isExiting ? "duration-200 ease-in animate-out fade-out" : ""}
            ${overlayStyle || ""}
          `}
          style={{
            zIndex: 1000,
          }}
        >
          <Modal
            className={({
              isEntering,
              isExiting,
            }) => `${modelClassName || "max-h-60 w-full max-w-lg overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl"}
              
              ${isEntering ? "duration-300 ease-out animate-in zoom-in-95" : ""}
              ${isExiting ? "duration-200 ease-in animate-out zoom-out-95" : ""}
              ${modalStyle || ""}
            `}
          >
            <Dialog role="alertdialog" className="relative outline-none">
              {({ close }) => (
                <>
                  <div className="w-full p-6">
                    <div
                      className={`text-xxl my-0 flex w-full items-center justify-center font-semibold leading-6  ${
                        titleStyle || ""
                      }`}
                    >
                      <div className="flex w-full items-center justify-start">
                        {isValidElement(title) ? title : title}
                      </div>

                      <div
                        className=" flex h-6 w-6 cursor-pointer items-center justify-center rounded-full stroke-2 text-red-500 torus-hover:ring-1 torus-hover:ring-red-600 torus-hover:ring-offset-1"
                        onClick={() => close()}
                      >
                        <TorusModelClose />
                      </div>
                    </div>

                    <div
                      className={`mt-3 overflow-x-scroll text-slate-500 ${bodyStyle || ""}`}
                    >
                      {body}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 border border-t-1 border-[#E5E9EB]">
                    <div className="flex justify-between gap-3 px-6 py-4">
                      <DialogButton
                        className={`pressed:bg-slate-300 cursor-pointer bg-slate-200 text-slate-800 hover:border-slate-300 ${
                          cancelButtonStyle || ""
                        }`}
                        onPress={() => {
                          if (onCancel) onCancel();
                          close();
                        }}
                      >
                        {cancelButtonText}
                      </DialogButton>
                      <DialogButton
                        className={` ${confirmButtonStyle || ""}`}
                        onPress={() => {
                          if (onConfirm) onConfirm();
                          close();
                        }}
                      >
                        {confirmButtonText}
                      </DialogButton>
                    </div>
                  </div>
                </>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </>
  );
}

function DialogButton({ className, ...props }) {
  return (
    <Button
      {...props}
      className={`inline-flex cursor-default justify-center rounded-md border border-solid border-transparent px-5 py-2 font-[inherit] text-base font-semibold outline-none ring-blue-500 ring-offset-2 transition-colors focus-visible:ring-2 ${className}`}
    />
  );
}
