import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { BsTrash3 } from "react-icons/bs";
export default function ReusableDropDown({
  isDisabled = false,
  title,
  buttonProps,
  selectionMode = "single",
  darkMode,
  DropdownMenuClassName,
  items,
  buttonClassName,
  selectedKey,
  handleSelectedKey,
  closeOnSelect = true,
  handleDelete = null,
}) {
  return (
    <Dropdown isDisabled={isDisabled}>
      <DropdownTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={
            buttonClassName ??
            `${
              darkMode
                ? " border border-slate-400/30 text-[#F4F4F5] "
                : " border border-slate-400/30 text-black "
            } w-[100%] `
          }
          {...buttonProps}
        >
          <span className=" w-[100%] truncate ">{title}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        className={DropdownMenuClassName}
        itemClasses={{
          base: [
            "rounded-md",
            "text-white font-bold",

            "transition-opacity",
            "data-[hover=true]:text-pink-500 font-bold",
            "data-[hover=true]:bg-gray-600/40 ",
            "dark:data-[hover=true]:bg-[#1E1E1E]",
            "data-[selectable=true]:focus:bg-gray-600/40",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
          selectedIcon: "w-1 h-1 flex items-center",
        }}
        classNames={{
          base:` bg-[#1E1E1E] text-white font-bold p-[5px] rounded-lg ${ items && items.length>5 ?"overflow-y-auto h-[200px]":""}  ` ,
          
        }}
        closeOnSelect={closeOnSelect}
        selectionMode={selectionMode}
        selectedKeys={selectedKey}
        onSelectionChange={handleSelectedKey}
        items={items && items.length > 0 ? items : []}
      >
        {(item, index) => (
          <DropdownItem onClick={() => {}} key={item.key}>
            {handleDelete ? (
              <div className={"flex justify-between   gap-2 "}>
                <div>{item.label}</div>

                <div
                  onClick={() => {
                    handleDelete(item.key);
                  }}
                  className="  hover:scale-125 hover:transition bg-transparent
       hover:ease-in-out duration-200 hover:text-red-500 text-[#616A6B]"
                >
                  <BsTrash3 className=" items-end hover:text-red-500 text-[#616A6B]" />
                </div>
              </div>
            ) : (
              <div>{item.label}</div>
            )}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
