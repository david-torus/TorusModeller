import { Input } from "@nextui-org/react";
import React from "react";

export default function ReusableInput({
  value,
  label,
  defaultValue,
  placeholder,
  type = "text",
  darkMode,
  handleChange,
  errrMsg,
  labelPlacement = "outside",
  isinvalid,
  startContent,
  endContent,
  isClearable = true,
  inputProps,
}) {
  return (
    <Input
      errorMessage={errrMsg}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      isInvalid={isinvalid}
      type={type}
      isClearable={isClearable}
      radius="lg"
      label={label}
      startContent={startContent}
      endContent={endContent}
      labelPlacement={labelPlacement}
      style={{
        color: darkMode ? "white" : "black",
      }}
      className="text-gray-700 shadow-md"
      classNames={{
        base: darkMode ? "w-full text-gray-200" : " w-full text-slate-700",
        label: darkMode
          ? ["data-[focused=true]:border-none text-sm font-bold text-white"]
          : ["data-[focused=true]:border-none text-sm font-bold text-zinc-700"],
        mainWrapper: "h-full text-slate-700 ",
        input: darkMode
          ? ["bg-transparent", "text-white", "placeholder:text-sm text-white "]
          : ["bg-transparent", "text-black", "placeholder:text-sm text-black "],
        inputWrapper: darkMode
          ? [
              "h-[8px] rounded-md text-slate-700 bg-transparent hover:bg-[#D9DEE8] hover:border-blue-500/50 hover:text-slate-700 border border-slate-500/50 ",
              "data-[focused=true]:border-pink-500/50",
            ]
          : [
              "h-[8px] rounded-md text-black bg-transparent hover:bg-[#D9DEE8] hover:border-blue-500/50 hover:text-pink-500 border border-slate-500/75 ",
            ],
      }}
      {...inputProps}
    />
  );
}
