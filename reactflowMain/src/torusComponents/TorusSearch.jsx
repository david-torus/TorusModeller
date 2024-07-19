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
    if (value.length > 0) {
    } else if (value.length <= 0) {
    }
  };

  const handleInputChange = (e) => {
    props.type == "number"
      ? setValue(e.target.value.replace(/[a-zA-Z]+/g, ""))
      : setValue(e.target.value);

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

  const borderColor = () => {
    if (props.borderColor) {
      return `transision-border duration-100 ease-in-out border-2 ${props.borderColor}`;
    }
    return "";
  };

  const colorsBg = colorsBgFn();
  const colorsHover = colorsHoverFn();
  const border = borderColor();

  return (
    <TextField
      className={` 
    ${props.marginT ? props.marginT : "mt-1"} 
    w-[100%] flex items-center border ${colorsBg} ${colorsHover} ${colorsBg}
    ${clicked ? `${border}` : " border-1-violet-900"} 
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
          onBlur={() => setClicked(false)}
          onChange={handleInputChange}
          value={value}
          type={props.type === "number" ? "text" : `${props.type}`}
          className={`w-[98%] bg-transparent 
        ${clicked ? "border-transparent" : ""} 
        ${colorsHover} 
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
