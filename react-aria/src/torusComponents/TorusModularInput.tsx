import React, { useState, ChangeEvent } from "react";
import { Input, Label, TextField } from "react-aria-components";
import { IoIosCloseCircle } from "react-icons/io";

interface TorusModularInputProps {
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
  maxLength?: number;
  type?: string;
  placeholder?: string;
  bgColor?: string;
  borderColor?: string;
  labelColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  radius?: "sm" | "md" | "lg" | "full" | "none";
  marginT?: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  errorShown?: boolean;
  description?: string;
  isClearable?: boolean;
  label?: string;
}

const TorusModularInput: React.FC<TorusModularInputProps> = (props) => {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.defaultValue || props.value || "");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(`^.{${props.maxLength}}$`);
    let inputValue = e.target.value;

    if (props.type === "number") {
      inputValue = inputValue.replace(/[a-zA-Z]+/g, "");
    }

    setValue(inputValue);

    if (!regex.test(inputValue)) {
      setError(`Input must be exactly ${props.maxLength} characters long.`);
    } else {
      setError("");
    }

    props.onChange(inputValue);
  };

  const handleBlur = () => {
    setClicked(false);
    if (props.isRequired && !value) {
      setError("This field is required.");
    }
  };

  const handleClear = () => {
    setValue("");
    setError(null);
    props.onChange("");
  };

  const outlineColor = (style?: string) => {
    return `transition-border duration-100 ease-in-out border-2 ${style}`;
  };

  const colorsBgFn = () => {
    return props.bgColor || "";
  };

  const labelStyle = (style?: string) => {
    return `text-xs font-medium ${style}`;
  };

  const colorsBg = colorsBgFn();

  return (
    <div
      className={`w-full bg-[#FFFFFF] rounded-md px-1.5 py-1 ${
        props.marginT || "mt-1"
      } ${clicked ? outlineColor(props.borderColor) : ""}`}
    >
      <Label className={labelStyle(props.labelColor)}>{props.label}</Label>
      <TextField
        isReadOnly={props.isReadOnly || false}
        isRequired={props.isRequired || false}
        className={`w-full flex items-center ${
          props.startContent ? "justify-center" : "justify-start"
        } ${colorsBg} ${
          props.radius === "sm"
            ? "rounded-sm"
            : props.radius === "md"
            ? "rounded-md"
            : props.radius === "lg"
            ? "rounded-lg"
            : props.radius === "full"
            ? "rounded-full"
            : "rounded-none"
        }`}
        isDisabled={props.isDisabled || false}
      >
        {props.startContent && (
          <div className="w-[10%] flex justify-center items-center text-sm font-normal">
            {props.startContent}
          </div>
        )}
        <div
          className={`relative ${
            props.startContent || props.endContent ? "w-[90%]" : "w-[100%]"
          }`}
        >
          <Input
            placeholder={props.placeholder || ""}
            onChange={handleInputChange}
            onFocus={() => setClicked(true)}
            onBlur={handleBlur}
            value={value}
            type={props.type === "number" ? "text" : props.type}
            className={`w-[100%] bg-transparent focus:outline-none ${
              props.textColor
                ? `${props.textColor} text-base font-normal`
                : "text-black text-base font-normal"
            } ${
              props.size === "sm"
                ? "h-6"
                : props.size === "md"
                ? "h-8"
                : props.size === "lg"
                ? "h-10"
                : props.size === "xl"
                ? "h-12"
                : "h-10"
            }`}
          />
          {props.isClearable && value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <IoIosCloseCircle
                size={20}
                className="text-gray-400 hover:text-gray-600"
              />
            </button>
          )}
        </div>
        {props.endContent && (
          <div className="w-[10%] flex justify-center items-center text-sm font-normal">
            {props.endContent}
          </div>
        )}
      </TextField>

      {props.errorShown && (
        <>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {!error && props.description && (
            <p className="text-gray-500 text-xs">{props.description}</p>
          )}
        </>
      )}
    </div>
  );
};

export default TorusModularInput;
