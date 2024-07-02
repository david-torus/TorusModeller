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
import ButtonComponent from "../ButtonComponent";
export default function TorusDropDown({
  setSelected,
  seleected,
  items = [
    { key: "Item 1", label: "Item 1" },
    { key: "Item 2", label: "Item 2" },
    { key: "Item 3", label: "Item 3" },
  ],
  selectionMode = "multiple",
}) {
  return (
    <Select>
      <ButtonComponent
        Children={
          (seleected && Array.from(seleected).join(", ")) || "Select item"
        }
        buttonClassName={"p-2"}
        height={"15px"}
        width={"15px"}
      />
      <Popover
        placement="bottom"
        className={
          "torus-entering:animate-torusPopOverOpen torus-exiting:animate-torusPopOverClose  "
        }
      >
        <ListBox
          className={
            " bg-slate-300 transition-all p-1  rounded-md gap-1 w-24 flex flex-col items-center "
          }
          selectionMode={selectionMode}
          onSelectionChange={(keys) => {
            setSelected(keys);
            if (selectionMode === "single") {
            }
          }}
          selectedKeys={seleected}
          items={items}
        >
          {(item) => (
            <ListBoxItem
              key={item.key}
              className={
                "  p-1 torus-selected:bg-purple-100 rounded-md torus-hover:bg--300 cursor-pointer transition-colors duration-300"
              }
            >
              <Heading>{item.label}</Heading>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
}
