import React from "react";
import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import TorusButton from "./TorusButton";

export default function TorusPopOver({
  children,
  parentHeading,
  popOverContent,
  popBgColor,
  popbuttonClassNames,
}) {
  return (
    <DialogTrigger>
      <TorusButton
        bgColor={popBgColor}
        Children={parentHeading}
        startContent={popOverContent}
        buttonClassName={popbuttonClassNames}
      />
      <Popover
      style={{
        zIndex: 999,
      }}
      >
        <Dialog className="rounded-lg outline-none ">{children}</Dialog>
      </Popover>
    </DialogTrigger>
  );
}
