import React, { useState, useEffect } from "react";
import { Input, Label, TextField } from "react-aria-components";
import { BsGraphDown } from "react-icons/bs";
import { SearchIcon } from "../SVG_Application";

export default function TorusSearch(props) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    toggleClicked();
  }, [props.value]);

  const toggleClicked = () => {
    console.log(value.length, "length-2");
    if (value.length > 0) {
    } else if (value.length <= 0) {
    }
  };

  const handleInputChange = (e) => {
    props.type == "number"
      ? setValue(e.target.value.replace(/[a-zA-Z]+/g, ""))
      : setValue(e.target.value);
    console.log(e.target.value.length, "length-3");
    if (e.target.value.length === 0) {
    } else {
      props.onChange(e.target.value);
    }
  };

  const colorsBgFn = () => {
    if (props.bgColor) {
      return `${props.bgColor}`;
    }
    return "";
  };

  const colorsHoverFn = () => {
    if (props.hoverColor) {
      return `${props.hoverColor}`;
    }
    return "";
  };

  const colorsBg = colorsBgFn();
  const colorsHover = colorsHoverFn();

  return (
    <TextField
      className={` 
    ${props.marginT ? props.marginT : "mt-1"} 
    w-[100%] flex items-center ${colorsBg} 
    ${
      clicked
        ? "torus-focus:ring-1 torus-focus:ring-blue-500"
        : "torus-focus:border-[#D0D5DD]"
    } 
    ${
      props.radius === "sm"
        ? "rounded-sm"
        : props.radius === "md"
        ? "rounded-md"
        : props.radius === "lg"
        ? "rounded-lg"
        : props.radius === "full"
        ? "rounded-full"
        : "rounded-none"
    }
  `}
      isDisabled={props.isDisabled ? props.isDisabled : false}
    >
      <div className="w-[10%] flex justify-end items-center">
        <SearchIcon />
      </div>
      <div className="w-[90%]">
        <Input
          {...props}
          placeholder={clicked ? "" : props.placeholder}
          onFocus={() => setClicked(true)}
          onChange={handleInputChange}
          value={value}
          type={props.type === "number" ? "text" : `${props.type}`}
          className={`w-[98%] bg-transparent 
        ${clicked ? "border-transparent" : ""} 
        ${colorsBg} ${colorsHover} 
        focus:outline-none 
        ${props.variant === "bordered" ? "pl-[0.8rem]" : ""}
        ${props.variant === "fade" ? props.textColor : "text-black"} 
        ${
          props.textColor
            ? `${props.textColor} font-base font-normal`
            : "text-black font-base font-normal"
        } 
        ${
          props.height === "sm"
            ? "h-6"
            : props.height === "md"
            ? "h-8"
            : props.height === "lg"
            ? "h-10"
            : props.height === "xl"
            ? "h-12"
            : "h-10"
        } 
      `}
        />
      </div>
    </TextField>
  );
}
