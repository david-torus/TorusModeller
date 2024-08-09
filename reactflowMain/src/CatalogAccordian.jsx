import React from "react";

export default function CatalogAccordian({ items, onSelectionChange }) {
  return (
    <div className=" flex flex-col">
      {items &&
        items.map((item) => (
          <DisplayTkeys
            title={item.title}
            id={item.id}
            items={item.content}
            onSelectionChange={onSelectionChange}
          />
        ))}
    </div>
  );
}

const DisplayTkeys = ({ title, id, items, onSelectionChange }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex w-[100%] flex-col gap-0.5 rounded-md bg-white px-2 py-3">
      <h1  onClick={() => setOpen(!open)} className="text-lg font-medium cursor-pointer">
        {title}
      </h1>
      {open &&
        items &&
        items.map((item) => (
          <DisplayCatalog
            title={item.catalog}
            id={{ tKey: id, catalog: item.catalog }}
            items={item.artifactGroupList}
            onSelectionChange={onSelectionChange}
          />
        ))}
    </div>
  );
};

const DisplayCatalog = ({ title, id, items, onSelectionChange }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex w-[100%] flex-col gap-0.5 rounded-md bg-white px-2 py-3">
      <h1 onClick={() => setOpen(!open)} className="text-lg font-medium  cursor-pointer">
        {title}
      </h1>
      {open &&
        items &&
        items.map((item) => (
          <DisplayContent
            title={item}
            id={{ ...id, artifactGroup: item }}
            onSelectionChange={onSelectionChange}
          />
        ))}
    </div>
  );
};

const DisplayContent = ({ title, id, onSelectionChange }) => {
  return (
    <div
      className="flex w-[100%] cursor-pointer flex-col gap-0.5 rounded-md bg-white px-2 py-3"
      onClick={() => onSelectionChange(id)}
    >
      <h1 className="text-lg font-medium">{title}</h1>
    </div>
  );
};
