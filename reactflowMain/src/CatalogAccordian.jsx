import React from "react";
import { TorusAccordianArrow } from "./SVG_Application";
const Arrow = (open) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1959 6.47379C12.4563 6.73413 12.4563 7.15627 12.1959 7.4166L8.93438 10.6749C8.41365 11.1951 7.56978 11.1949 7.04925 10.6745L3.78901 7.4142C3.52866 7.15387 3.52866 6.73173 3.78901 6.47139C4.04936 6.21103 4.47147 6.21103 4.73182 6.47139L7.52225 9.2618C7.78258 9.5222 8.20472 9.5222 8.46505 9.2618L11.2531 6.47379C11.5135 6.21344 11.9355 6.21344 12.1959 6.47379Z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
};
export default function CatalogAccordian({ items, onSelectionChange }) {
  return (
    <div className=" flex flex-col gap-0.5 p-2">
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
    <div className="flex w-[100%] flex-col gap-0.5 rounded-md bg-white">
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
      <div>
        <div className="mx-2 flex flex-col gap-0.5 border-l">
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
      </div>
    </div>
  );
};

const DisplayCatalog = ({ title, id, items, onSelectionChange }) => {
  const [open, setOpen] = React.useState(false);
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
              title={item}
              id={{ ...id, artifactGroup: item }}
              onSelectionChange={onSelectionChange}
            />
          ))}
      </div>
    </div>
  );
};

const DisplayContent = ({ title, id, onSelectionChange }) => {
  return (
    <div
      className=" flex w-[100%] cursor-pointer flex-col gap-0.5 rounded-md  bg-white  "
      onClick={() => onSelectionChange(id)}
    >
      <span className="px-3  text-xs ">{title}</span>
    </div>
  );
};
