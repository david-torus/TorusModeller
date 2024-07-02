import React, { useEffect, useState } from "react";

import { Input, Label, TextField } from "react-aria-components";

export function TorusModifiedInput(props) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    toggleClicked();
  }, [props.value]);

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
    <TextField className="mt-3 flex justify-between relative z-50">
      <Label
        onClick={toggleClicked}
        className={`cursor-pointer absolute ${
          clicked
            ? "left-5 top-[5px]"
            : "left-0 top-[-25px] font-semibold text-purple-900 font-small"
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
        className={`bg-transparent  outline-none border-2 border-b-slate-500/30
            border-t-transparent border-l-transparent border-r-transparent
 torus-focus:border-b-purple-500  transition-all ease-linear duration-75 ${
   clicked ? "border-transparent" : ""
 } px-3 py-1`}
      />
    </TextField>
  );
}
