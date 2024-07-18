import React, { useEffect, useState } from "react";
import { Input, Label } from "react-aria-components";

export default function TorusCheckBox(props) {
  console.log(props.content, "Contents");

  const handleOnChange = (e) => {
    const value = e.target.value;
    props.onChange((prevSelectedValues) => {
      if (value && prevSelectedValues.includes(value)) {
        var values= prevSelectedValues.filter((item) => item !== value);
        console.log(values,"ggg")
        return values;
      } else {
        console.log("kjjjjj",value)
        return [...prevSelectedValues, value];
      }
    });
  };

  return (
    <>
      {props.type === "group" && (
        <div className=" w-[100%] pt-2">
          <div
            className={`${props.marginT} w-[100%] flex flex-col gap-0.5 bg-white rounded-md px-2 py-3`}
          >
            {props.label && (
              <Label className="text-xs text-[#000000]/50">{props.label}</Label>
            )}
            <div className="w-[100%]">
              <div
                className={`flex items-center justify-start ${
                  props.content?.length > 2 ? "grid grid-cols-8" : " gap-2.5"
                }`}
              >
                {props.content?.map((value, index) => {
                  return (
                    <div
                      className={`${
                        props.content?.length > 1 ? "col-span-4 justify-between gap-1" : "w-[100%]"
                      } flex items-center`}
                    >
                      <div className="w-[10%] flex justify-start items-center">
                        <Input
                          type="checkbox"
                          key={index}
                          value={`${value}`}
                          name="default-radio"
                          onChange={handleOnChange}
                          className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 torus-focus-within:ring-pink-500 torus-focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="w-[90%] flex justify-start items-center">
                        <Label className="ps-2 text-sm text-[#000000] whitespace-nowrap">
                          {value}
                        </Label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {props.type === "single " && (
        <div className="w-[100%] g-white rounded-md px-2 py-3">
          <div className="w-[10%] flex justify-start items-center">
            <Input
              type="checkbox"
              name="default-radio"
              onChange={handleOnChange}
              className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 torus-focus-within:ring-pink-500 torus-focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      )}
    </>
  );
}
