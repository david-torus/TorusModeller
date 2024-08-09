import React, { useState } from "react";
import { TorusAccordianArrow } from "./SVG_Application";

export default function CatalogAccordian({ items, onSelectionChange }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectionChange = (id) => {
    setSelectedItem(id);
    onSelectionChange(id);
  };

  return (
    <div className="flex flex-col gap-0.5 p-2">
      {items &&
        items.map((item) => (
          <DisplayTkeys
            key={item.id}
            title={item.title}
            id={item.id}
            items={item.content}
            onSelectionChange={handleSelectionChange}
            selectedItem={selectedItem}
          />
        ))}
    </div>
  );
}

const DisplayTkeys = ({
  title,
  id,
  items,
  onSelectionChange,
  selectedItem,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-[100%] flex-col gap-0.5 rounded-md bg-white">
      <div
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-start gap-2"
      >
        <span
          className={`transition duration-300 ease-in-out ${
            open && items.length > 0 ? "rotate-[0deg]" : "rotate-[-90deg]"
          }`}
        >
          <TorusAccordianArrow />
        </span>
        <span className="cursor-pointer select-none text-sm ">{title}</span>
      </div>
      <div>
        <div className="mx-2 flex flex-col gap-0.5 border-l">
          {open &&
            items &&
            items.map((item) => (
              <DisplayCatalog
                key={item.catalog}
                title={item.catalog}
                id={{ tKey: id, catalog: item.catalog }}
                items={item.artifactGroupList}
                onSelectionChange={onSelectionChange}
                selectedItem={selectedItem}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const DisplayCatalog = ({
  title,
  id,
  items,
  onSelectionChange,
  selectedItem,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-[100%] flex-col gap-0.5 rounded-md bg-white px-1">
      <div
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-start gap-2"
      >
        <span
          className={`transition duration-300 ease-in-out ${
            open ? "rotate-[0deg]" : "rotate-[-90deg]"
          }`}
        >
          <TorusAccordianArrow />
        </span>
        <span className="cursor-pointer select-none text-sm ">{title}</span>
      </div>
      <div className="mx-2 flex flex-col gap-1 border-l">
        {open &&
          items &&
          items.map((item) => (
            <DisplayContent
              key={item}
              title={item}
              id={{ ...id, artifactGroup: item }}
              onSelectionChange={onSelectionChange}
              isSelected={
                JSON.stringify(selectedItem) ===
                JSON.stringify({ ...id, artifactGroup: item })
              }
            />
          ))}
      </div>
    </div>
  );
};

const DisplayContent = ({ title, id, onSelectionChange, isSelected }) => {
  return (
    <div
      className={`fade-in-out flex w-[100%] cursor-pointer flex-col gap-0.5 rounded-md transition-all  duration-150  ${
        isSelected
          ? "  text-sm font-medium text-[#000000] dark:text-white"
          : "bg-white text-slate-500/80"
      }`}
      onClick={() => onSelectionChange(id)}
    >
      <span
        className={`transition-all duration-300 ease-in-out ${isSelected ? "px-3.5 text-sm" : "px-3 text-xs"} `}
      >
        {title}
      </span>
    </div>
  );
};
