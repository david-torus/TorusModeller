import React, { memo, useEffect, useState } from "react";
import { TorusAccordianArrow } from "../SVG_Application";

const TorusAccordion = memo(({ items, onToggle, onContentToggle }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleToggle = (index) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);

    if (onToggle) {
      onToggle(newIndex);
    }
  };

  console.log(items[2].content, "items");

  return (
    <div id="accordion-open" data-accordion="open">
      {items.map((item, index) => (
        <div key={index}>
          <h2 id={`accordion-open-heading-${index}`}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 border border-b-0 border-gray-200 font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800 rtl:text-right"
              aria-expanded={openIndex === index}
              aria-controls={`accordion-open-body-${index}`}
              onClick={() => handleToggle(index)}
            >
              <div className="flex w-[100%] items-center justify-between py-1.5">
                <div className="flex w-[20%] items-center justify-end">
                  <div className="flex w-[100%] justify-start">
                    <span
                      className={`transition duration-300 ease-in-out ${openIndex === index ? "" : "rotate-180"}`}
                    >
                      <TorusAccordianArrow />
                    </span>
                  </div>
                </div>
                <div className="flex w-[80%] items-center justify-start">
                  <div className="flex w-[100%] justify-start">
                    <p className="text-xs font-medium text-slate-800 hover:text-gray-900 dark:text-gray-300">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id={`accordion-open-body-${index}`}
            className={` border-gray-500 ${
              openIndex === index ? "block" : "hidden"
            }`}
            aria-labelledby={`accordion-open-heading-${index}`}
          >
            <div className="pl-[0.5rem]">
              <div
                className={`border-[#00000026] overflow-hidden border-b-0 border-l-1.5 border-r-0 border-t-0 px-1 py-2 transition-[max-height] duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
                style={{ maxHeight: openIndex === index ? "500px" : "0px" }}
              >
                {typeof item.content === "string" ? (
                  <p>{item.content}</p>
                ) : React.isValidElement(item.content) ? (
                  <div className="w-[100%] bg-yellow-400">{item.content}</div>
                ) : Array.isArray(item.content) ? (
                  item.content.map((contentItem, contentIndex) => (
                    <div
                      key={contentIndex}
                      onClick={() => {
                        setSelectedContent(contentItem);
                        onContentToggle(contentItem);
                      }}
                      className={`cursor-pointer flex w-[100%] flex-row items-center gap-1 ${
                        contentItem === selectedContent
                          ? "font-semibold text-black dark:text-white"
                          : "font-normal text-black/35 dark:text-white/35"
                      }`}
                    >
                      {typeof contentItem === "string" ? (
                        <p>{contentItem}</p>
                      ) : React.isValidElement(contentItem) ? (
                        contentItem
                      ) : null}
                    </div>
                  ))
                ) : typeof item.content === "object" &&
                  !Array.isArray(item.content) ? (
                  <>
                    {Object.values(item.content).map(
                      (contentItem, contentIndex) => (
                        <div
                          key={contentIndex}
                          onClick={() => {
                            setSelectedContent(contentItem);
                          }}
                          className={`cursor-pointer flex w-[100%] flex-row items-center gap-1 ${
                            contentItem === selectedContent
                              ? "font-semibold text-black dark:text-white"
                              : "font-normal text-black/35 dark:text-white/35"
                          }`}
                        >
                          {typeof contentItem === "string" ? (
                            <p>{contentItem}</p>
                          ) : React.isValidElement(contentItem) ? (
                            contentItem
                          ) : null}
                        </div>
                      ),
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default TorusAccordion;
