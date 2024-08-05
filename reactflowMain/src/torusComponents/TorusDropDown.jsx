import React, { useRef } from "react";
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
import ButtonComponent from "../torusComponents/TorusButton";
import { merger } from "../utils/utils";
import TorusButton from "../torusComponents/TorusButton";
const defaultTropdownClassNames = {
  buttonClassName: `torus-pressed:animate-torusButtonActive 
  `,
  popoverClassName:
    "torus-entering:animate-torusPopOverOpen torus-exiting:animate-torusPopOverClose w-40",
  dialogClassName: "outline-none w-full",
  listBoxClassName:
    "w-full bg-slate-200 border-2 border-gray-300 transition-all p-1 rounded-md gap-1 flex flex-col items-center",
  listBoxItemClassName:
    "p-1 w-full torus-focus:outline-none torus-hover:bg-blue-300 rounded-md cursor-pointer transition-colors duration-300",
};

export default function TorusDropDown({
  label,
  title,
  classNames,
  buttonHeight = "",
  buttonWidth = "",
  setSelected,
  selected,
  endContent,
  renderEmptyState,
  items = [
    { key: "Item 1", label: "Item 1" },
    { key: "Item 2", label: "Item 2" },
    { key: "Item 3", label: "Item 3" },
  ],
  popOverProps,
  listBoxProps,
  color,
  btWidth,
  btheight,
  selectionMode = "multiple",
  fontStyle,
  btncolor,
  radius,
  outlineColor,
  gap,
  borderColor,
  startContent,
  isDropDown = false,
  className,
  onPress,
}) {
  const listBoxRefItem = useRef(null);

  const closeFn = () => {
    console.log(listBoxRefItem.current.parentNode, "listparentItem-->");
    console.log(listBoxRefItem.current.id, "listBox-->");

    const parentNode = listBoxRefItem.current.parentNode;
    if(parentNode) {
    parentNode.style.display= "none";
    }
  };

  return (
    <DialogTrigger>
      {/* <label>{label}</label> */}
      <TorusButton
        Children={title}
        buttonClassName={merger(
          defaultTropdownClassNames.buttonClassName,
          classNames?.buttonClassName,
        )}
        // title={label}
        height={btheight}
        width={btWidth}
        fontStyle={fontStyle}
        btncolor={btncolor}
        radius={radius}
        outlineColor={outlineColor}
        color={color}
        gap={gap}
        borderColor={borderColor}
        startContent={startContent ? startContent : ""}
        endContent={endContent ? endContent : ""}
        isDropDown={isDropDown}
        onPress={onPress}
      />

      <Popover
        placement="bottom"
        className={merger(
          defaultTropdownClassNames.popoverClassName,
          classNames?.popoverClassName,
        )}
        {...popOverProps}
      >
        <Dialog
          className={merger(
            defaultTropdownClassNames.dialogClassName,
            classNames?.dialogClassName,
          )}
        >
          {({ close }) => (
            <ListBox
              renderEmptyState={renderEmptyState}
              className={merger(
                defaultTropdownClassNames.listBoxClassName,
                classNames?.listBoxClassName,
              )}
              selectionMode={selectionMode}
              onSelectionChange={(keys) => {
                setSelected(keys);
                // closeFn();
                console.log(close,"list");
              }}
              selectedKeys={selected}
              items={items}
              {...listBoxProps}
            >
              {(item) => (
                <ListBoxItem
                  key={item.key}
                  className={merger(
                    defaultTropdownClassNames.listBoxItemClassName,
                    classNames?.listBoxItemClassName,
                  )}
                  ref={listBoxRefItem}
                >
                  {({ isSelected }) => (
                    <div className="flex w-full items-center justify-between">
                      <Heading className=" text-xs  font-normal tracking-normal">
                        {item.label}
                      </Heading>

                      <div className="flex justify-end ">
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
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
