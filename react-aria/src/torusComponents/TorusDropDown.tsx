import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { IoIosArrowDown, IoIosCheckmark } from "react-icons/io";
import { merger } from "../utils/utils";

const defaultTropdownClassNames = {
  buttonClassName: `py-1 px-0.5`,
  popoverClassName:
    "torus-entering:animate-torusPopOverOpen torus-exiting:animate-torusPopOverClose w-40",
  dialogClassName: "outline-none w-full",
  listBoxClassName:
    " torus-entering:animate-dropdownOpen torus-exiting:animate-dropdownClose w-full bg-slate-200 border-2 border-gray-300 transition-all p-1 rounded-md gap-1 flex flex-col items-center",
  listBoxItemClassName:
    "p-1 w-full torus-focus:outline-none torus-hover:bg-blue-300 rounded-md cursor-pointer transition-colors duration-300 data-disabled:text-red-500",
};

interface Item {
  key: string;
  label: string;
}

interface DropDownButtonProps {
  fontStyle?: string;
  btncolor?: string;
  radius?: keyof typeof radiusClasses;
  color?: string;
  outlineColor?: string;
  borderColor?: string;
  buttonClassName?: string;
  marginT?: string;
  gap?: string;
  size?: keyof typeof sizeClasses;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  children: React.ReactNode;
  selected?: any;
}

interface TorusDropDownProps {
  title?: string;
  label?: string;
  size?: keyof typeof sizeClasses;
  classNames?: Partial<typeof defaultTropdownClassNames>;
  buttonHeight?: string;
  buttonWidth?: string;
  setSelected: (keys: Set<string>) => void;
  selected: [];
  endContent?: React.ReactNode;
  renderEmptyState?: React.ReactNode;
  dynamicItems?: Item[];
  popOverProps?: object;
  listBoxProps?: object;
  color?: string;
  btWidth?: string;
  btheight?: string;
  selectionMode?: "single" | "multiple";
  fontStyle?: string;
  btncolor?: string;
  radius?: keyof typeof radiusClasses;
  outlineColor?: string;
  labelColor?: string;
  gap?: string;
  borderColor?: string;
  startContent?: React.ReactNode;
  disabledKeys?: string[];
  onAction?: () => void;
  description?: string;
  clicked?: boolean;
}

const sizeClasses = {
  sm: "px-1.5 py-0.5",
  md: "px-2.5 py-2.5",
  lg: "p-3.5 py-2.5",
  xl: "px-4.5 py-3.5",
  full: "px-5.5 py-4.5",
};

const radiusClasses = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const DropDownButton: React.FC<DropDownButtonProps> = (props) => {
  const outlineFn = () => {
    if (props.outlineColor) {
      return `torus-hover:ring-2 torus-hover:ring-offset-4 ${props.outlineColor}`;
    }
    return "outline-none";
  };

  const hoverOutline = outlineFn();
  const commonClass = `font-lg w-[100%] ${
    props.marginT
  } border-none outline-none  torus-hover:outline-none torus-hover:border-2 ${hoverOutline} ${
    props.gap
  } ${
    (props.startContent || props.endContent) &&
    "flex justify-center items-center"
  } ${radiusClasses[props.radius || "rounded-lg"]}`;
  const contentClass = sizeClasses[props.size || "px-2.5 py-1.5"];

  return (
    <Button
      className={merger(commonClass, props.buttonClassName)}
      style={{
        background:
          props.btncolor === "primary"
            ? "#0736C4"
            : props.btncolor === "secondary"
            ? "#9353D3"
            : props.btncolor === "success"
            ? "#17C964"
            : props.btncolor === "danger"
            ? "#F5A524"
            : props.btncolor === "warning"
            ? "#F5A524"
            : "#ffffff",
        border:
          props.borderColor === "primary"
            ? "#0736C4"
            : props.borderColor === "secondary"
            ? "#9353D3"
            : props.borderColor === "success"
            ? "#17C964"
            : props.borderColor === "danger"
            ? "#F5A524"
            : props.borderColor === "warning"
            ? "#F5A524"
            : "#ffffff",
      }}
    >
      <div className={`w-[100%] flex justify-center ${contentClass}`}>
        <div
          className={`${props.fontStyle} ${props.color} w-[90%] flex justify-start`}
        >
          {props.children}
        </div>
        {props.selected && Array.from(props.selected).length > 0 && (
          <div className="w-[10%] flex justify-start">
            <IoIosArrowDown />
          </div>
        )}
      </div>
    </Button>
  );
};

const TorusDropDown: React.FC<TorusDropDownProps> = ({
  title,
  label,
  classNames,
  labelColor,
  setSelected,
  selected,
  endContent,
  dynamicItems = [
    { key: "Item 1", label: "Item 1" },
    { key: "Item 2", label: "Item 2" },
    { key: "Item 3", label: "Item 3" },
  ],
  popOverProps,
  listBoxProps,
  color,
  size,
  selectionMode,
  fontStyle,
  btncolor,
  radius,
  outlineColor,
  borderColor,
  disabledKeys,
  onAction,
  description,
}) => {
  const [clicked, setClicked] = useState(false);

  const labelStyle = (style?: string) => {
    return `text-xs font-medium text-[#000000]/50 ${style}`;
  };

  const outlineColorFn = (style?: string) => {
    return `transition-border duration-100 ease-in-out border-2 ${style}`;
  };
  return (
    <div
      className={`w-full bg-[#FFFFFF] rounded-md px-1.5 py-1 mt-2
         ${clicked ? outlineColorFn(borderColor) : ""}`}
    >
      <Label className={labelStyle(labelColor)}>{label}</Label>
      <DialogTrigger>
        <div className="w-[100%] flex justify-sart">
          <DropDownButton
            fontStyle={fontStyle}
            btncolor={btncolor}
            radius={radius}
            color={color}
            outlineColor={outlineColor}
            borderColor={borderColor}
            buttonClassName={classNames?.buttonClassName}
            size={size}
            selected={selected}
          >
            {Array.from(selected || []).length > 0 ? (
              <>{Array.from(selected).join(",")}</>
            ) : (
              <>{title}</>
            )}
          </DropDownButton>
        </div>

        <Popover
          placement="bottom"
          className={merger(
            defaultTropdownClassNames.popoverClassName,
            classNames?.popoverClassName
          )}
          {...popOverProps}
        >
          <Dialog
            className={merger(
              defaultTropdownClassNames.dialogClassName,
              classNames?.dialogClassName
            )}
          >
            {({ close }) => (
              <ListBox
                className={merger(
                  defaultTropdownClassNames.listBoxClassName,
                  classNames?.listBoxClassName
                )}
                selectionMode={selectionMode}
                onSelectionChange={(keys: any) => {
                  setSelected(keys);
                  if (selectionMode === "single") {
                    close();
                  }
                }}
                selectedKeys={selected}
                items={dynamicItems}
                {...listBoxProps}
                disabledKeys={disabledKeys}

                // onAction={onAction} // incase onAction is provided means value doesnt takes any action
              >
                {(item) => (
                  <ListBoxItem
                    key={item.key}
                    className={merger(
                      defaultTropdownClassNames.listBoxItemClassName,
                      classNames?.listBoxItemClassName
                    )}
                  >
                    {({ isSelected }) => (
                      <div className="w-full flex justify-between items-center">
                        <Heading className=" text-xs font-normal tracking-normal">
                          {item.label}
                        </Heading>

                        <div className="flex justify-end">
                          <span
                            className={`transition-all duration-150 ${
                              isSelected ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            <IoIosCheckmark size={20} className="text-black" />
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
        {description && <p className="text-gray-500 text-xs">{description}</p>}
      </DialogTrigger>
    </div>
  );
};

export default TorusDropDown;
