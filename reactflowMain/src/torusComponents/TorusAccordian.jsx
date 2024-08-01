import React, { memo, useState } from "react";
import { TorusAccordianArrow } from "../SVG_Application";

const TorusAccordion = memo(
  ({ items, onToggle, onContentToggle, selectedContent }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index, tKey) => {
      const newIndex = openIndex === index ? null : index;
      setOpenIndex(newIndex);

      if (onToggle) {
        onToggle(newIndex, tKey);
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
                className="flex w-full items-center justify-between gap-3  font-medium text-[#000000] hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-expanded={openIndex === index}
                aria-controls={`accordion-open-body-${index}`}
                onClick={() => handleToggle(index, item?.id)}
              >
                <div className="flex w-[100%] items-center justify-between py-1.5 pl-2.5">
                  <div className="flex w-[80%] items-center justify-start">
                    <div className="flex w-[20%] items-center justify-end">
                      <div className="flex w-[100%] justify-start">
                        <span
                          className={`transition duration-300 ease-in-out ${openIndex === index ? "rotate-[0deg]" : "rotate-[-90deg]"}`}
                        >
                          <TorusAccordianArrow />
                        </span>
                      </div>
                    </div>
                    <div className="flex w-[80%] items-center justify-start">
                      <div className="flex w-[100%] justify-start">
                        <p className="whitespace-nowrap pl-[0.4rem] text-xs font-medium text-[#000000] hover:text-gray-900 dark:text-gray-300">
                          {item.title}
                        </p>
                      </div>
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
              <div className="pl-[1.10rem]">
                <div
                  className={`overflow-hidden border-b-0 border-l-1.5 border-r-0 border-t-0 border-[#00000026] px-1 py-2 pl-[1.10rem] transition-[max-height] duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{ maxHeight: openIndex === index ? "500px" : "0px" }}
                >
                  {typeof item.content === "string" ? (
                    <p className="w-[100%] text-sm text-black/35">
                      {item.content}
                    </p>
                  ) : React.isValidElement(item.content) ? (
                    <div className="w-[100%] bg-yellow-400">{item.content}</div>
                  ) : Array.isArray(item.content) ? (
                    item.content.map((contentItem, contentIndex) => (
                      <div
                        key={contentIndex}
                        onClick={() => {
                          onContentToggle(contentItem);
                        }}
                        className={`flex w-[100%] cursor-pointer flex-row items-center gap-1 ${
                          contentItem === selectedContent
                            ? "font-semibold text-black dark:text-white"
                            : "font-normal text-black/35 dark:text-white/35"
                        }`}
                      >
                        {typeof contentItem === "string" ? (
                          <p className="w-[100%] text-sm">{contentItem}</p>
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
                              onContentToggle(contentItem);
                            }}
                            className={`flex w-[100%] cursor-pointer flex-row items-center gap-1 ${
                              contentItem === selectedContent
                                ? "font-semibold text-black dark:text-white"
                                : "font-normal text-black/35 dark:text-white/35"
                            }`}
                          >
                            {typeof contentItem === "string" ? (
                              <p className="w-[100%] text-sm">{contentItem}</p>
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
  },
);

export default TorusAccordion;
