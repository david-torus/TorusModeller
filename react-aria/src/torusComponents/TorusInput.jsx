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
      } else setClicked(false);
    };
  
    return (
      <div
        className={`w-[100%] flex justify-between relative ${
          props.marginT ? `${props.marginT}` : ""
        }`}
      >
        <Label
          onClick={toggleClicked}
          className={`cursor-pointer absolute ${
            clicked
              ? "left-5 top-[5px]"
              : `left-0 top-[-25px] font-semibold ${colorsLabelFn()}  font-small`
          } 
       transition-all ease-in-out duration-150`}
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
          } px-3 py-1`}
        />
      </div>
    );
}