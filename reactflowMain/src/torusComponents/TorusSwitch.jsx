import React from "react";

import "./switch.css";
import { Input, Label } from "react-aria-components";

import { useState } from "react";

export default function TorusSwitch({skey, label, isChecked, setIsChecked, marginT }) {
  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="">
      <div
        className={`${marginT} `}
      >
        <span className="switch">
          <input
          key={skey}
            id="switch-rounded"
            type="checkbox"
            className="hidden peer"
            checked={isChecked}
            onChange={handleToggle}
          />
          <label htmlFor="switch-rounded"> {label}</label>
        </span>
      </div>
    </div>
  );
}
