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

      <Popover>
        <Dialog className="outline-none rounded-lg ">{children}</Dialog>
      </Popover>
    </DialogTrigger>
  );
}
