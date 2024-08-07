import React, { memo, useState } from "react";
import { TorusAccordianArrow } from "../SVG_Application";

const TorusAccordion = memo(
  ({
    parent,
    items,
    onToggle,
    onContentToggle,
    onItemClick,
    toogle = true,
    onNestedItemClick,
    selectedContent,
  }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index, tKey) => {
      const newIndex = openIndex === index ? null : index;
      setOpenIndex(newIndex);

      if (onToggle && !toogle) {
        onToggle(newIndex, tKey);
      }
    };

    console.log(items, "<<<items>>>");

    const handleItemClick = (item) => {
      if (onItemClick && toogle) {
        onItemClick(item);
      }
    };

    const handleNestedItemClick = (nestedItem) => {
      if (onNestedItemClick) {
        onNestedItemClick(nestedItem);
      }
    };

    const renderContent = (content, Imetiatdparent) => {
      if (Array.isArray(content)) {
        return content.length === 0
          ? null
          : content.map((item, index) => (
              <div key={index} className="pl-[0.25rem]">
                {typeof item === "object" ? (
                  <TorusAccordion
                    parent={Imetiatdparent}
                    items={[item]}
                    toogle={true}
                    onToggle={onToggle}
                    onContentToggle={onContentToggle}
                    onItemClick={onItemClick}
                    onNestedItemClick={onNestedItemClick}
                    selectedContent={selectedContent}
                  />
                ) : (
                  <p
                    onClick={() =>
                      handleItemClick({
                        tkey: parent,
                        catalouge: Imetiatdparent,
                        artifactgroup: item.id,
                      })
                    }
                    className="w-[100%] cursor-pointer text-sm text-black/35"
                  >
                    {item.title}
                  </p>
                )}
              </div>
            ));
      } else if (typeof content === "object" && content !== null) {
        return Object.entries(content).map(([key, value], index) => (
          <div key={index} className="pl-[0.52rem]">
            <TorusAccordion
              items={[{ title: key, content: value }]}
              onToggle={onToggle}
              onContentToggle={onContentToggle}
              onItemClick={onItemClick}
              onNestedItemClick={onNestedItemClick}
              selectedContent={selectedContent}
            />
          </div>
        ));
      } else {
        return (
          <p
            onClick={() =>
              handleItemClick({
                tkey: parent,
                cataloge: Imetiatdparent,
                artigrp: content,
              })
            }
            className="w-[100%] cursor-pointer text-sm text-black/35"
          >
            {content}
          </p>
        );
      }
    };

    return (
      <div id="accordion-open" data-accordion="open">
        {items.map((item, index) => {
          if (Array.isArray(item.content) && item.content.length === 0) {
            return (
              <div
                className="cursor-pointer whitespace-nowrap py-[0.5rem] pl-[0.4rem] text-xs font-medium text-[#000000] hover:text-gray-900 dark:text-gray-300"
                key={index}
                onClick={() => handleItemClick(item)}
              >
                {item.title}
              </div>
            ); // Skip rendering accordion if content is empty
          }

          return (
            <div key={index}>
              <h2 id={`accordion-open-heading-${index}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 font-medium text-[#000000] hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-expanded={openIndex === index}
                  aria-controls={`accordion-open-body-${index}`}
                  onClick={() => {
                    handleItemClick(item);
                    handleToggle(index, item.title);
                    console.log(item, "item");
                  }}
                >
                  <div className="flex w-[100%] items-center justify-between py-1.5 pl-2.5">
                    <div className="flex w-[80%] items-center justify-start">
                      <div className="flex w-[20%] items-center justify-end">
                        <div className="flex w-[100%] justify-start">
                          <span
                            className={`transition duration-300 ease-in-out ${
                              openIndex === index
                                ? "rotate-[0deg]"
                                : "rotate-[-90deg]"
                            }`}
                          >
                            <TorusAccordianArrow />
                          </span>
                        </div>
                      </div>
                      <div className="flex w-[80%] items-center justify-start">
                        <div className="flex w-[100%] justify-start">
                          <p className="cursor-pointer whitespace-nowrap pl-[0.4rem] text-xs font-medium text-[#000000] hover:text-gray-900 dark:text-gray-300">
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
                className={`border-gray-500 ${openIndex === index ? "block" : "hidden"}`}
                aria-labelledby={`accordion-open-heading-${index}`}
              >
                <div className="pl-[1.15rem]">
                  <div
                    className={`overflow-hidden border-b-0 border-l-1.5 border-r-0 border-t-0 border-[#00000026] px-1 py-2 pl-[0rem] transition-[max-height] duration-300 ease-in-out dark:border-gray-300 ${
                      openIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    style={{ maxHeight: openIndex === index ? "500px" : "0px" }}
                  >
                    {renderContent(item.content, item.id)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

export default TorusAccordion;
