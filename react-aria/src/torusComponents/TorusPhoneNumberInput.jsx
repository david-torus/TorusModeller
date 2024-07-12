import React, { useState, useEffect } from "react";
import { Input, Label, TextField } from "react-aria-components";
import { BsGraphDown } from "react-icons/bs";
import { SearchIcon } from "../SVG_Application";
import countryCode from "./countryCode.json";
import TorusSelector from "./TorusSelector";

export default function TorusPhoneNumberInput(props) {
  const [countryCodeList, setCountryCodeList] = useState([]);
  const [selectedCC, setSelectedCC] = useState(new Set(["IN"]));
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.value || "");
  const [inutDefaultValue, setInutDefaultValue] = useState("");

  console.log(selectedCC, "selectedCC");

  const countrycodeSegregation = (value) => {
    if (value) {
      // Assuming value is an array of objects
      value.forEach((item) => {
        if (item) {
          let { code, phone, phoneLength, label, specialKey } = item;

          let newObje = {
            label: phone,
            key: code,
            phone: ` ${label}  +${phone}`,
            phoneLength: phoneLength,
            specialKey: specialKey,
          };

          // Use a functional update to ensure immutability
          setCountryCodeList((prevList) => [...prevList, newObje]);
        }
      });
    }
  };

  const gettingCode = (value) => {
    if (value) {
      let code = countryCode.find((item) => item.code == value);
      console.log(code, "code-1");
      if (code) {
        setInutDefaultValue(code);
      }
    }
  };

  const toggleClicked = () => {
    console.log(value.length, "length-2");
    if (value.length > 0) {
    } else if (value.length <= 0) {
    }
  };

  useEffect(() => {
    toggleClicked();
    countrycodeSegregation(countryCode);
    gettingCode(selectedCC);
  }, [props.value, countryCode, selectedCC]);

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

  const borderColor = () => {
    if (props.borderColor) {
      return `transision-border duration-100 ease-in-out border-2 ${props.borderColor}`;
    }
    return "";
  };

  const colorsBg = colorsBgFn();
  const colorsHover = colorsHoverFn();
  const border = borderColor();

  console.log(clicked, border, "clicked");
  console.log(countryCodeList, "countryCodeList");

  return (
    <TextField
      className={` 
    ${props.marginT ? props.marginT : "mt-1"} 
    w-[100%] flex items-center  ${colorsBg} ${colorsHover} ${colorsBg}
    ${clicked ? `${border}` : "torus-focus:border-[#D0D5DD]"} 
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
      <div className="w-[30%] flex justify-end items-center">
        <TorusSelector
          items={countryCodeList}
          selected={selectedCC}
          setSelected={setSelectedCC}
          key={setSelectedCC}
          placeholder="Code"
          type="mobilenumber"
        />
      </div>
      <div className="w-[70%]">
        <Input
          {...props}
          placeholder={clicked ? "" : props.placeholder}
          onFocus={() => setClicked(true)}
          onBlur={() => setClicked(false)}
          onChange={handleInputChange}
          defaultValue={inutDefaultValue ? inutDefaultValue?.phone : "Number"}
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
