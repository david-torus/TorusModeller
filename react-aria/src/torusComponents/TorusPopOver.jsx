import React from "react";
import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import TorusButton from "./TorusButton";

export default function TorusPopOver({
  children,
  heading,
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
        className={
          "bg-[#F4F5FA] w-[200px] rounded-lg border-2  border-[#D0D5DD] text-black text-sm "
        }
      >
        <Dialog className="outline-none rounded-lg ">{children}</Dialog>
      </Popover>
    </DialogTrigger>
  );
}
