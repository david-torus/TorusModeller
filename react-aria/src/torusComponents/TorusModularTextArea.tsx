import React, { useState, ChangeEvent, useEffect } from "react";
import { Label, TextArea, TextField } from "react-aria-components";
import { IoIosCloseCircle } from "react-icons/io";

interface TorusModularTextAreaProps {
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
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
  description?: string;
  label?: string;
  labelPlacement?: "top" | "left" | "right";
  isInvalid?: boolean;
  autoSize?: boolean;
  onHeightChange?: (height: number) => void;
}

const TorusModularTextArea: React.FC<TorusModularTextAreaProps> = (props) => {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.defaultValue || props.value || "");
  const [error, setError] = useState<string | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (props.autoSize && props.onHeightChange) {
      const textarea = document.querySelector("textarea");
      if (textarea) {
        const newHeight = textarea.scrollHeight;
        setHeight(newHeight);
        props.onHeightChange(newHeight);
      }
    }
  }, [value, props.autoSize, props.onHeightChange]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setValue(inputValue);

    props.onChange(inputValue);
  };

  const handleBlur = () => {
    setClicked(false);
    if (props.isRequired && !value.trim()) { // Check if value is empty or whitespace
      setError("This field is required.");
    } else {
      setError(null);
    }
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

  const renderLabel = () => (
    <Label className={labelStyle(props.labelColor)}>{props.label}</Label>
  );

  return (
    <div
      className={`w-full bg-[#FFFFFF] rounded-md px-1.5 py-1 ${props.marginT || "mt-1"
        } ${clicked ? outlineColor(props.borderColor) : ""}`}
    >
      {props.labelPlacement === "top" && renderLabel()}
      <TextField
        isReadOnly={props.isReadOnly || false}
        isRequired={props.isRequired || false}
        isInvalid={props.isInvalid || false}
        isDisabled={props.isDisabled || false}
        className={`w-full flex items-center justify-center ${colorsBg} ${props.radius === "sm"
          ? "rounded-sm"
          : props.radius === "md"
            ? "rounded-md"
            : props.radius === "lg"
              ? "rounded-lg"
              : props.radius === "full"
                ? "rounded-full"
                : "rounded-none"
          }`}
      >
        {props.labelPlacement === "left" && renderLabel()}
        <div
          className={` w-[100%] flex
            `}
        >
          <div className="w-[100%] flex justify-start">


            <TextArea
              placeholder={props.placeholder || ""}
              onChange={handleInputChange}
              onFocus={() => setClicked(true)}
              onBlur={handleBlur}
              value={value}
              className={`w-[100%] bg-transparent focus:outline-none ${props.textColor
                ? `${props.textColor} text-base font-normal`
                : "text-black text-base font-normal"
                } ${props.size === "sm"
                  ? "h-6"
                  : props.size === "md"
                    ? "h-8"
                    : props.size === "lg"
                      ? "h-10"
                      : props.size === "xl"
                        ? "h-12"
                        : "h-10"
                }`}
              style={props.autoSize ? { height: `${height}px` } : {}}
            />
          </div>


        </div>
        {props.labelPlacement === "right" && renderLabel()}
      </TextField>

      {props.description && (
        <p className="text-gray-500 text-xs">{props.description}</p>
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TorusModularTextArea;
