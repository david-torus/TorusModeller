import React from "react";
import { RadioGroup, Radio, Input } from "react-aria-components"; // Import your radio components from your UI library
import { Label } from "react-aria-components"; // Import Label component if needed

export default function TorusRadio(props) {
  const handleOnChange = (e) => {
    const value = e.target.value;
    props.onChange(value);
  };

  return (
    <div className=" w-[100%] pt-2" key={props.key}>
      <div
        className={`${props.marginT} w-[100%] flex flex-col gap-0.5 bg-white rounded-md px-2 py-3`}
      >
        {props.label && (
          <Label className="text-xs text-[#000000]/50">{props.label}</Label>
        )}
        <div className="w-[100%]">
          <div
            className={`flex items-center ${
              props.orientation === "vertical"
                ? "flex-col"
                : "flex-row gap-[0.5rem]"
            } justify-start ${
              props.content?.length > 3 ? "grid grid-cols-8" : ""
            }`}
          >
            {props.content?.map((value, index) => {
              return (
                <div
                  className={`${
                    props.content?.length > 2 ? "col-span-4" : "w-[100%]"
                  } flex items-center justify-between gap-0.5`}
                >
                  <div className="w-[20%] flex justify-start items-center">
                    <Input
                      type="radio"
                      key={index}
                      value={value}
                      name="default-radio"
                      onChange={handleOnChange}
                      className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 torus-focus-within:ring-pink-500 torus-focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="w-[80%] flex justify-end items-center">
                    <Label className=" text-sm text-[#000000] whitespace-nowrap">
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
