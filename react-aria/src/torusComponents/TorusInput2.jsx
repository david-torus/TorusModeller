import { useState } from "react";
import { Input, Label, TextField } from "react-aria-components";

export function TorusModifiedInput1(props) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.value || "");

  const toggleClicked = () => {
    setClicked(true);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.length === 0) {
      setClicked(true);
    } else {
      setClicked(false);
      props.onChange(e.target.value);
    }
  };

  const colorsLabelFn = () => {
    if (props.labelColor) {
      return props.labelColor;
    }
    return "";
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

  const defaultClassNamesforbordered = {
    textFieldClassName:
      "relative px-2.5 pb-2.5 pt-4 w-[100%] text-sm text-gray-200 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
    labelClassNames: `  absolute top-0 left-0 p-4  dark:text-gray-400 transition-all duration-300 `,

    inputClassNames:
      " w-full px-2 py-3  pb-0 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
  };

  const defaultClassNamesforlight = {
    textFieldClassName: "w-[100%]",
    labelClassNames:
      " cursor-pointer absolute transition-all ease-in-out duration-150",

    inputClassNames: `bg-transparent  outline-none border-2 border-b-slate-500/30
      border-t-transparent border-l-transparent border-r-transparent
         torus-focus:border-b-purple-500  transition-all ease-linear duration-75  px-3 py-1`,
  };

  const defaultClassNamesforFade = {
    textFieldClassName: "w-[100%]",
    labelClassNames:
      "w-[100%] cursor-pointer flex justify-start items-center absolute ",

    inputClassNames: `bg-transparent  outline-none 
    bg-slate-500/80 torus-hover:bg-slate-500/60 torus-focus:bg-slate-500/90 torus-focus:outline-none
    border-t-transparent border-l-transparent border-r-transparent  border-b-transparent
    torus-focus:border-b-purple-500  transition-all ease-linear duration-75  px-3 py-1`,
  };

  const colorsLabel = colorsLabelFn();
  const colorsBg = colorsBgFn();
  const colorsHover = colorsHoverFn();

  return (
    <>
      <TextField
        className={`${
          props.variant === "bordered"
            ? defaultClassNamesforbordered.textFieldClassName
            : props.variant === "light"
            ? defaultClassNamesforlight.textFieldClassName
            : props.variant === "fade"
            ? defaultClassNamesforFade.textFieldClassName
            : ""
        }`}
        isDisabled={props.isDisabled ? props.isDisabled : false}
      >
        <Label
          className={
            props.className.labelClassNames +
            (props.variant === "bordered"
              ? ` ${colorsLabel}`
              : props.variant === "light"
              ? ` ${colorsLabel}`
              : props.variant === "fade"
              ? ` ${colorsLabel}`
              : "")
          }
        >
          {props.label}
        </Label>

        <Input
          {...props}
          placeholder={clicked ? "" : props.placeholder}
          onFocus={toggleClicked}
          onChange={handleInputChange}
          value={value}
          className={
            props.className.inputClassNames +
            `
            <--variants !-->
            ${
              props.variant === "bordered"
                ? ` ${colorsBg} ${colorsHover}`
                : props.variant === "light"
                ? ` ${colorsBg} ${colorsHover}`
                : props.variant === "fade"
                ? ` ${colorsBg} ${colorsHover}`
                : ""
            }
            
            <--Heights !-->
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
            <--width !-->
      
              ${
                props.width === "sm"
                  ? "w-[30%]"
                  : props.width === "md"
                  ? "w-[45%]"
                  : props.width === "lg"
                  ? "w-[60%]"
                  : props.width === "xl"
                  ? "w-[75%]"
                  : "w-[50%]"
              }

            <--Radius !-->
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


            `
          }
        />
      </TextField>
    </>
  );
}
