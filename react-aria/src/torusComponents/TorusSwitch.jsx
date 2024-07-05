import { Switch } from "react-aria-components";
import React from "react";

export default function TorusSwitch() {
  return (
    <div>
      <Switch>
        <div className="indicator" />
        Low power mode
      </Switch>
    </div>
  );
}
