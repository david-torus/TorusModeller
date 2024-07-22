import React from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Popover,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import { IoIosCheckmark } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { DownArrow } from "./SVG_Application";

// type classNames = {
//   triggerButton?: string;
//   popover?: string;
//   listbox?: string;
//   listboxItem?: string;
// };

// interface CustomDropDpwnProps {
//   triggerButton: React.ReactNode;
//   multiple?: boolean;
//   selectedKeys: string[] | any[] | any;
//   setSelectedKeys: (keys: any) => void;
//   items: any[];
//   displayParam?: string;
//   classNames?: classNames;
//   renderOption?: (
//     item: any,
//     close: () => void,
//     handleSelectionChange: (selectedItems: any, close: () => void) => void,
//     setOpen: (open: boolean) => void
//   ) => React.ReactNode;
// }

export default function DropDown({
  triggerButton,
  multiple = false,
  selectedKeys,
  setSelectedKeys,
  items,
  displayParam,
  classNames,
  renderOption,
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelectionChange = (selectedItem, close) => {
    if (multiple) {
      setSelectedKeys((prevKeys) =>
        prevKeys.some((k) =>
          displayParam
            ? k[displayParam] === selectedItem[displayParam]
            : k === selectedItem
        )
          ? prevKeys.filter((k) =>
              displayParam
                ? k[displayParam] !== selectedItem[displayParam]
                : k !== selectedItem
            )
          : [...prevKeys, selectedItem]
      );
    } else {
      setSelectedKeys(selectedItem);
      close();
      setOpen(false);
    }
  };

  const getItemDisplayValue = (item) => {
    return displayParam ? item[displayParam] : item;
  };

  return (
    <DialogTrigger>
      <Button
        className={twMerge(
          `p-2 items-center flex justify-between dark:text-white rounded focus:outline-none w-full ${
            open ? "border-[#0736C4]" : ""
          }`,
          classNames?.triggerButton
        )}
        onPress={() => setOpen(!open)}
      >
        {selectedKeys.length && Array.isArray(selectedKeys)
          ? selectedKeys.map((item) => getItemDisplayValue(item)).join(", ")
          : selectedKeys && typeof selectedKeys === "string"
          ? getItemDisplayValue(selectedKeys)
          : triggerButton}
        {<DownArrow />}
      </Button>
      <Popover
        placement="bottom"
        className={twMerge("w-full", classNames?.popover)}
      >
        <Dialog className="border bg-white dark:bg-[#212121] dark:text-white dark:border-[#212121] focus:outline-none rounded-lg">
          {({ close }) => (
            <ListBox
              aria-label="Custom dropdown"
              selectionMode={multiple ? "multiple" : "single"}
              className={twMerge("", classNames?.listbox)}
            >
              {items.map((item) => {
                const isSelected = () => {
                  if (multiple) {
                    return selectedKeys.some((k) =>
                      displayParam
                        ? k[displayParam] === item[displayParam]
                        : k === item
                    );
                  } else {
                    return selectedKeys === item;
                  }
                };
                if (renderOption) {
                  return renderOption(
                    item,
                    close,
                    handleSelectionChange,
                    setOpen
                  );
                } else {
                  return (
                    <ListBoxItem
                      key={displayParam ? item[displayParam] : item}
                      textValue={getItemDisplayValue(item)}
                      onAction={() => handleSelectionChange(item, close)}
                      className={twMerge(
                        `focus:outline-none p-2 flex justify-between-none rounded ${
                          isSelected() ? "bg-[#F9FAFB] dark:bg-[#000]" : ""
                        }`,
                        classNames?.listboxItem
                      )}
                    >
                      {getItemDisplayValue(item)}
                      {isSelected() && <IoIosCheckmark size={25} fill="blue" />}
                    </ListBoxItem>
                  );
                }
              })}
            </ListBox>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
