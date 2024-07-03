import React from "react";
import { SearchField, Label, Input, Button } from "react-aria-components";
const defaultTorusSearchFeildClassNames = {
  searchFieldClassName:
    "bg-purple-300 font-lg w-[300px] h-[40px]  rounded-lg  torus-focus:outline-none transition-all ease-in-out duration-300 ",
  labelClassName: "absolute left-5 top-[-25px] font-semibold font-small",
  inputClassName:
    "w-[100%] bg-transparent  outline-none border-2 border-b-slate-500/30",
  buttonClassName:
    "w-[100%] bg-transparent  outline-none border-2 border-b-slate-500/30",
};
export default function TorusSearchFeild({
  classNames,
  onChange,
  placeholder,
}) {
  return (
    <SearchField
      onChange={onChange && onChange}
    //   classNames={
    //     defaultTorusSearchFeildClassNames.searchFieldClassName +
    //     " " +
    //     classNames?.searchFieldClassName
    //   }
    >
      <Input
        placeholder={placeholder && placeholder}
        className={
          defaultTorusSearchFeildClassNames.inputClassName +
          " " +
          classNames?.inputClassName 
        }
      />
    </SearchField>
  );
}
