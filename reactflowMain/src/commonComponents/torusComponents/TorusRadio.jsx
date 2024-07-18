import React from "react";
import { RadioGroup, Radio, Input } from "react-aria-components"; // Import your radio components from your UI library
import { Label } from "react-aria-components"; // Import Label component if needed

export default function TorusRadio(props) {
  const handleOnChange = (e) => {
    const value = e.target.value;
    props.onChange(value);
  };

  return (
    <div
      className={` ${props.className}  w-[100%] pt-2`}
      key={props.key}
    >
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
              props.content?.length > 3
                ? "grid grid-cols-12"
                : "grid grid-cols-12"
            }`}
          >
            {props.content?.map((value, index) => {
              return (
                <div
                  className={`${
                    props.content?.length > 2
                      ? "col-span-6 max-md:col-span-12 max-lg:col-span-12 max-xl:col-span-6"
                      : " col-span-3"
                  }  flex items-center justify-between gap-0.5`}
                >
                  <div className="w-[20%] flex justify-start items-center">
                    <Input
                      type="radio"
                      key={index}
                      checked={props.value === value}
                      value={value}
                      name="default-radio"
                      onChange={handleOnChange}
                      className={` ${
                        props.size === "sm"
                          ? "w-3 h-3"
                          : props.size === "md"
                          ? "w-4 h-4"
                          : props.size === "lg"
                          ? "w-5 h-5"
                          : props.size === "xl"
                          ? "w-6 h-6"
                          : "w-4 h-4"
                      } `}
                    />
                  </div>
                  <div className="w-[80%] flex justify-start items-center">
                    <Label className=" text-xs text-[#000000] whitespace-nowrap">
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
