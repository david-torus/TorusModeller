import React from "react";
import { Switch } from "react-aria-components";
import "./switch.css";

export default function TorusSwitch({ Children }) {
  return (
    <Switch>
      <div className="indicator" />
      {Children}
    </Switch>
  );
}
