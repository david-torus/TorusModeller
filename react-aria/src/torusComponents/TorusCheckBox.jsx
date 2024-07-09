import React from "react";
import { Input, Label } from "react-aria-components";

export default function TorusCheckBox(props) {
  console.log(props.content, "Contents");
  return (
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
              props.content?.length > 3 ? "grid grid-cols-8" : ""
            }`}
          >
            {props.content?.map((value, index) => {
              return (
                <div
                  className={`${
                    props.content?.length > 2 ? "col-span-4" : "w-[100%]"
                  } flex items-center`}
                >
                  <div className="w-[10%] flex justify-start items-center">
                    <Input
                      type="checkbox"
                      value=""
                      name="default-radio"
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 torus-focus-within:ring-pink-500 torus-focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="w-[90%] flex justify-start items-center">
                    <Label className="ms-2 text-sm text-[#000000] whitespace-nowrap">
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
  );
}
