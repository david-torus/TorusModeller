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
  Switch,
} from "react-aria-components";
export default function TorusDropDown({
  setSelected,
  seleected,
  items = [
    { key: "Item 1", Label: "Item 1" },
    { key: "Item 2", Label: "Item 2" },
    { key: "Item 3", Label: "Item 3" },
  ],
}) {
  return (
    <DialogTrigger>
      <Button>{Array.from(seleected).join(", ") || "Select item"}</Button>
      <Popover>
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
        <Dialog>
          <ListBox
            className={
              " bg-slate-300 p-1 border-2 border-slate-400 rounded-md gap-1 w-24 flex flex-col items-center "
            }
            selectionMode="multiple"
            onSelectionChange={setSelected}
            selectedKeys={seleected}
            items={items}
          >
            {(item) => (
              <ListBoxItem
                key={item.key}
                className={
                  "  p-1 torus-selected:bg-purple-100 rounded-md torus-hover:bg-purple-300 cursor-pointer"
                }
              >
                <Heading>{item.Label}</Heading>
              </ListBoxItem>
            )}
          </ListBox>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
