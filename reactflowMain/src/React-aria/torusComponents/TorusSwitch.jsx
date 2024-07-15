import React from "react";

import "./switch.css";
import { Input, Label } from "react-aria-components";

import { useState } from "react";

export default function TorusSwitch({ label, isChecked, setIsChecked, marginT }) {
  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className=" w-[100%]">
      <div
        className={`${marginT} `}
      >
        <span className="switch">
          <input
            id="switch-rounded"
            type="checkbox"
            className="hidden peer"
            checked={isChecked}
            onChange={handleToggle}
          />
          <label htmlFor="switch-rounded"></label>
        </span>
      </div>
    </div>
  );
}
