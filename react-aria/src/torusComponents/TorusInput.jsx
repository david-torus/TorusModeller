import { useEffect, useState } from "react";
import { Input, Label } from "react-aria-components";

export default function TorusUnderLinedInput(props) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    toggleClicked();
    colorsBorderFn();
    colorsLabelFn();
  }, [props.value, props.labelColor, props.borderColor]);

  const colorsLabelFn = () => {
    if (props.labelColor) {
      return props.labelColor;
    }
    return "";
  };

  const colorsBorderFn = () => {
    if (props.borderColor) {
      return props.borderColor;
    }
    return "";
  };

  console.log(
    colorsBorderFn(),
    "colorsBorderFn()",
    colorsLabelFn(),
    "colorsLabelFn()"
  );
  const toggleClicked = () => {
    if (value.length > 0) {
      setClicked(false);
    } else setClicked(true);
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

  const topValueFn = () => {
    if (props.py) {
      let value = props.py;
      const [prefix, number] = value.split("-");

      if (number) {
        const newValue = parseInt(number, 10) + 6;
        return `${newValue}px`;
      }
    }
    return "";
  };

  const topNValueFn = () => {
    if (props.py) {
      let value = props.py;
      const [prefix, number] = value.split("-");
      if (number) {
        return `${number * 5}px`;
      }
    }
    return "";
  };

  const topValue = topValueFn();
  const topNValue = topNValueFn();
  const colorsLabel = colorsLabelFn();

  return (
    <div
      className={`w-[100%] flex justify-between relative ${
        props.marginT ? `${props.marginT}` : ""
      }`}
    >
      <Label
        onClick={toggleClicked}
        style={{
          left: clicked ? "1rem" : "0",
          top: clicked ? topValue : `-${topNValue}`,
          transition: "all ease-in-out 0.15s",
        }}
        className={`cursor-pointer absolute font-semibold ${
          clicked ? "" : `${colorsLabel}`
        }  font-small`}
      >
        {props.label}
      </Label>
      <Input
        {...props}
        placeholder={clicked ? "" : props.placeholder}
        onClick={toggleClicked}
        onChange={handleInputChange}
        value={value}
        className={`w-[100%] bg-transparent  outline-none border-2 border-b-slate-500/30 
              border-t-transparent border-l-transparent border-r-transparent
              ${colorsBorderFn()} transition-all ease-linear duration-75 ${
          clicked ? "border-transparent" : ""
        } ${props.px ? `${props.px}` : ""} ${props.py ? `${props.py}` : ""}  `}
      />
    </div>
  );
}

export function TorusFadedInput(props) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    toggleClicked();
    colorsBgFn();
    colorsLabelFn();
  }, [props.value, props.labelColor, props.borderColor]);

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
  };

  const colorsHoverFn = () => {
    if (props.hoverColor) {
      return `${props.hoverColor}`;
    }
  };

  const toggleClicked = () => {
    if (value.length > 0) {
      setClicked(false);
    } else setClicked(true);
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

  const colorsLabel = colorsLabelFn();
  const colorsBg = colorsBgFn();
  const colorsHover = colorsHoverFn();

  return (
    <div
      className={`w-[100%] flex flex-col justify-between items-center relative ${
        props.marginT ? `${props.marginT}` : ""
      } `}
    >
      <Label className={` flex w-full justify-start ${colorsLabel}`}>
        {props.label}
      </Label>
      <Input
        {...props}
        placeholder={clicked ? "" : props.placeholder}
        onClick={toggleClicked}
        onChange={handleInputChange}
        value={value}
        className={`w-[100%] outline-none text-md  px-2 border-b-transparent
              border-t-transparent border-l-transparent border-r-transparent
              ${colorsBg} ${colorsHover}  transition-all ease-linear duration-75 
              ${clicked ? "border-transparent" : ""} 
        
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
        
        ${props.textColor ? `${props.textColor}` : "text-black"} 
        
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

        `}
      />
    </div>
  );
}
