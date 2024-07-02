import React from "react";
import { Input, Label } from "react-aria-components";

export default function TorusCheckBox(props) {
  console.log(props.content, "Contents");
  return (
    <div className={`${props.marginT} flex flex-col items-center w-[100%]`}>
      {props.label && <Label className="pl-5 w-full">{props.label}</Label>}
      <div className="w-[100%] flex justify-start">
        <div
          className={`flex items-center ${
            props.orientation === "vertical" ? "flex-col" : "flex-row gap-3"
          }  justify-start`}
        >
          {props.content?.map((value, index) => {
            return (
              <div className="flex items-center  w-[100%]">
                <div className="w-[20%] flex justify-start items-center ">
                  <Input
                    type="checkbox"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 torus-focus-within:ring-pink-500 torus-focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="w-[80%] flex justify-start items-center">
                  <Label class="ms-2  text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {value}
                  </Label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
