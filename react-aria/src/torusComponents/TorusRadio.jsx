import React from "react";
import { RadioGroup, Radio } from "react-aria-components"; // Import your radio components from your UI library
import { Label } from "react-aria-components"; // Import Label component if needed

export default function TorusRadio(props) {
  return (
    <div className={`${props.marginT} flex items-center justify-center`}>
      {props.label && <Label className="text-start pl-5">{props.label}</Label>}
      <RadioGroup>
        {props.content?.map((value, index) => (
          <Radio
            key={index}
            value={value}
            onChange={props.onChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <span className="text-sm white-nowrap torus-focus:outline-none transition ease-in-out duration-300">
              {value}
            </span>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
