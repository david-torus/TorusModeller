import React, { useState } from "react";
import { Input, Label, TextField } from "react-aria-components";
import { IoIosCloseCircle } from "react-icons/io";

const TorusModularInput = ({
  defaultValue = "",
  value: propValue,
  onChange,
  maxLength,
  type,
  placeholder,
  bgColor,
  borderColor,
  labelColor,
  textColor,
  size,
  radius,
  marginT,
  isReadOnly,
  isRequired,
  isDisabled,
  startContent,
  endContent,
  errorShown,
  description,
  isClearable,
  label,
  backgroundColor,
}) => {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(defaultValue || propValue || "");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    if (type === "number") {
      inputValue = inputValue.replace(/[a-zA-Z]+/g, "");
    }

    if (maxLength && inputValue.length > maxLength) {
      setError(`Input must be exactly ${maxLength} characters long.`);
    } else {
      setError(null);
    }

    setValue(inputValue);
    onChange(inputValue);
  };

  const handleBlur = () => {
    setClicked(false);
    if (isRequired && !value) {
      setError("This field is required.");
    }
  };

  const handleClear = () => {
    setValue("");
    setError(null);
    onChange("");
  };

  const outlineColor = (style) =>
    `transition-border duration-100 ease-in-out border-2 ${style}`;

  const labelStyle = (style) => `text-xs font-medium  ${style}`;

  return (
    <div
      className={`w-full rounded-md ${
        backgroundColor ? backgroundColor : " bg-[#FFFFFF] "
      } px-1.5 py-1 ${marginT || "mt-1"} ${
        clicked ? outlineColor(borderColor) : `${borderColor}`
      }`}
    >
      {label && (
        <div className="flex w-full items-center justify-start">
          <Label className={labelStyle(labelColor)}>{label}</Label>
        </div>
      )}
      <TextField
        isReadOnly={isReadOnly || false}
        isRequired={isRequired || false}
        isDisabled={isDisabled || false}
        className={`flex w-full items-center ${
          startContent ? "justify-center" : "justify-start"
        } ${bgColor || ""} ${
          radius === "sm"
            ? "rounded-sm"
            : radius === "md"
              ? "rounded-md"
              : radius === "lg"
                ? "rounded-lg"
                : radius === "full"
                  ? "rounded-full"
                  : "rounded-none"
        }`}
      >
        {startContent && (
          <div className="flex w-[10%] items-center justify-center text-sm font-normal">
            {startContent}
          </div>
        )}
        <div
          className={`flex items-center ${
            startContent || endContent
              ? "w-[90%]"
              : isClearable
                ? "w-[100%]"
                : "w-[100%]"
          }`}
        >
          <Input
            placeholder={placeholder || ""}
            onChange={handleInputChange}
            // onFocus={() => setClicked(true)}
            onBlur={handleBlur}
            value={value}
            type={type === "number" ? "text" : type}
            className={`w-[100%] bg-transparent focus:outline-none ${
              textColor
                ? `${textColor} text-sm font-normal`
                : "text-sm font-normal text-black"
            } ${
              size === "sm"
                ? "h-6"
                : size === "md"
                  ? "h-8"
                  : size === "lg"
                    ? "h-10"
                    : size === "xl"
                      ? "h-12"
                      : "h-10"
            }`}
          />
          {isClearable && value && (
            <button
              type="button"
              onClick={handleClear}
              className="flex w-[10%] items-center justify-center"
            >
              <IoIosCloseCircle
                size={20}
                className="text-gray-400 hover:text-gray-600"
              />
            </button>
          )}
        </div>
        {endContent && (
          <div className="flex w-[10%] items-center justify-center text-sm font-normal">
            {endContent}
          </div>
        )}
      </TextField>

      {errorShown && (
        <>
          {error && <p className="text-xs text-red-500">{error}</p>}
          {!error && description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </>
      )}
    </div>
  );
};

export default TorusModularInput;
