import React from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Label,
  ListBox,
  ListBoxItem,
  OverlayArrow,
  Popover,
  Select,
  Switch,
} from "react-aria-components";
import { IoIosCheckmark } from "react-icons/io";
import ButtonComponent from "../ButtonComponent";
const defaultTropdownClassNames = {
  buttonClassName: "p-2 torus-pressed:animate-torusButtonActive",
  popoverClassName:
    "torus-entering:animate-torusPopOverOpen torus-exiting:animate-torusPopOverClose w-40",
  listBoxClassName:
    "w-full bg-slate-200 border-2 border-gray-300 transition-all p-1  rounded-md gap-1  flex flex-col items-center ",
  listBoxItemClassName: "flex items-center justify-center",
};
export default function TorusDropDown({
  title,
  classNames,
  buttonHeight = "15px",
  buttonWidth = "15px",
  setSelected,
  selected,
  endContent,
  renderEmptyState,
  items = [
    { key: "Item 1", label: "Item 1" },
    { key: "Item 2", label: "Item 2" },
    { key: "Item 3", label: "Item 3" },
  ],
  selectionMode = "multiple",
}) {
  return (
    <DialogTrigger>
      <ButtonComponent
        Children={title}
        buttonClassName={
          defaultTropdownClassNames.buttonClassName +
          " " +
          classNames?.buttonClassName
        }
        height={buttonHeight}
        width={buttonWidth}
      />
      <Popover
        placement="bottom"
        className={
          defaultTropdownClassNames.popoverClassName +
          " " +
          classNames?.popoverClassName
        }
      >
        <ListBox
          className={
            defaultTropdownClassNames.listBoxClassName +
            " " +
            classNames?.listBoxClassName
          }
          selectionMode={selectionMode}
          onSelectionChange={(keys) => {
            setSelected(keys);
          }}
          renderEmptyState={() => renderEmptyState}
          selectedKeys={selected}
          items={items}
        >
          {(item) => (
            <ListBoxItem
              key={item.key}
              className={
                defaultTropdownClassNames.listBoxItemClassName +
                " " +
                classNames?.listBoxItemClassName
              }
            >
              {({ isSelected }) => (
                <div className="w-full flex justify-between items-center">
                  <Heading>{item.label}</Heading>

                  <div className="flex items-center justify-center  ">
                    <span
                      className={` transition-all duration-150  ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <IoIosCheckmark size={20} className="text-black " />
                    </span>
                    {endContent}
                  </div>
                </div>
              )}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </DialogTrigger>
  );
}
