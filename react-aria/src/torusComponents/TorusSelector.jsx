import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Heading,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";

export default function TorusSelector({
  label,
  items,
  marginT,
  selected,
  setSelected,
  renderEmptyState,
  placeholder,
  type,
}) {
  console.log(items, "keyhg");
  const handleSelect = (code) => {
    console.log(code, "keyhg");
    setSelected(code);
  };

  const spliting = (code) => {
    if (code) {
      let value = code;

      console.log(value, "value");
    }
  };

  useEffect(() => {
    spliting(selected);
  }, [selected]);

  return (
    <div className={`${marginT} flex justify-start w-[100%] `}>
      <Select
        className={
          "w-[100%] flex flex-col gap-0.5 bg-white rounded-md px-2 py-[5px]"
        }
        onSelectionChange={handleSelect}
        selectedKey={selected}
        placeholder={placeholder}
        defaultSelectedKey={selected}
      >
        <Label className="text-xs text-[#000000]/50">{label}</Label>
        <Popover
          offset={15}
          placement="bottom"
          className="w-[17%] min-h-[5rem] overflow-y-scroll scrollbar-none"
        >
          <ListBox
            items={items}
            className="w-[100%]  bg-white transition-all p-1  gap-1 flex flex-col items-center torus-focus:outline-none"
            selectionMode="single"
          >
            {(item) => (
              <ListBoxItem
                className="w-[100%] torus-hover:bg-gray-100 torus-hover:outline-none bg-white transition-all p-1 rounded-md gap-1 flex flex-col items-center "
                value={item.key}
                textValue={item.label}
                key={item.specialKey}
              >
                {({ isSelected }) => (
                  <div
                    className={`w-full ${
                      isSelected ? "bg-white px-1  py-2" : ""
                    } flex justify-between items-center torus-focus:outline-none torus-hover:outline-none torus-hover:ring-0 torus-hover:border-none `}
                  >
                    <span className="whitespace-nowrap text-[0.2rem] 3xl:text-xs xl:text-sm font-normal  tracking-tighter">
                      {type === "mobilenumber" ? item.phone : item.label}
                    </span>

                    <div className="flex items-center justify-center  ">
                      <span
                        className={` transition-all duration-150  ${
                          isSelected ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <IoIosCheckmark size={20} color="#000" />
                      </span>
                    </div>
                  </div>
                )}
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
        <Button
          className={
            "flex justify-between items-center torus-pressed:border-transparent torus-focus:outline-none torus-pressed:ring-0  "
          }
        >
          <div className="w-[50%] flex justify-start">
            <SelectValue
              className="text-sm text-[#000000]"
              children={type == "mobilenumber" ? selected : null}
            />
          </div>
          <div className="w-[50%] flex justify-end" aria-hidden="true">
            <span className="pr-1">
              <FaAngleDown size={15} />
            </span>
          </div>
        </Button>
      </Select>
    </div>
  );
}
