import React, { useState, useEffect, useRef } from "react";
import { Input, Label, ListBoxItem, TextField } from "react-aria-components";
import { BsGraphDown } from "react-icons/bs";
import { SearchIcon } from "../SVG_Application";
import countryCode from "./countryCode.json";
import TorusSelector from "./TorusSelector";
import PortalDropdown from "./PortalDropdown";
import { IoIosCheckmark } from "react-icons/io";
import { map } from "lodash";

export default function TorusPhoneNumberInput(props) {
  const [countryCodeList, setCountryCodeList] = useState([]);
  const [selectedCC, setSelectedCC] = useState(new Set(["IN"]));
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.value || "");
  const [inputDefaultValue, setInutDefaultValue] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [displayValue, setDisplayValue] = useState("IN");

  const gettingCountryCode = () => {
    if (displayValue) {
      let code = countryCode.find((item) => {
        return item.code == displayValue;
      });
      console.log(code, "code-1");
      if (code) {
        setInutDefaultValue(code);
      }
    }
  };

  console.log(selectedCC, "selectedCC");
  console.log(inputDefaultValue, "inutDefaultValue");

  const renderOption = (item, close, handleSelectionChange) => (
    <ListBoxItem
      key={item.code}
      textValue={item.specialKey}
      onAction={() => handleSelectionChange(item, close)}
      className={`p-2 cursor-pointer focus:outline-none flex justify-between`}
    >
      {` +${item.phone} ${item.label}`}
      {selectedKeys.includes(item) ? (
        <IoIosCheckmark size={20} fill="blue" />
      ) : (
        ""
      )}
    </ListBoxItem>
  );

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
    // countrycodeSegregation(countryCode);
    gettingCode(selectedCC);
    gettingCountryCode();
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

  console.log(selectedKeys, "selectedKeys");

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
      <div className="w-[20%] flex justify-end items-center">
        <PortalDropdown
          triggerButton={displayValue}
          multiple={false}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          items={countryCode}
          displayParam="code"
          classNames={{
            triggerButton: "border",
            popover: "w-[25%]",
            listbox: "h-80  overflow-y-auto scrollbar-none",
            listboxItem: "flex justify-between",
          }}
          renderOption={renderOption}
        />
      </div>
      <div className="w-[20%]">
        <Input
          {...props}
          // onFocus={() => setClicked(true)}
          // onBlur={() => setClicked(false)}
          // onChange={handleInputChange}
          // ref={inputRef}
          value={
            selectedKeys.length > 0
              ? `+${selectedKeys[0]?.phone} -`
              : `+${inputDefaultValue?.phone} -`
          }
          readOnly
          type={props.type === "number" ? "text" : `${props.type}`}
          className={`w-[98%] bg-transparent pl-[0.8rem]
        ${clicked ? "border-transparent" : ""} 
        ${colorsHover} 
        focus:outline-none 
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
      <div className="w-[60%]">
        <Input
          {...props}
          onChange={handleInputChange}
          maxLength={
            inputDefaultValue
              ? inputDefaultValue.phoneLength
              : selectedKeys.length > 0 && selectedKeys[0]
              ? selectedKeys[0].phoneLength
              : undefined
          }
          value={value}
          type={props.type === "number" ? "text" : `${props.type}`}
          className={`w-[98%] bg-transparent 
        ${clicked ? "border-transparent" : ""} 
        ${colorsHover} 
        focus:outline-none 
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
