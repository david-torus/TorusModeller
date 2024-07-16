import { TimeInput } from "@nextui-org/react";
import React from "react";

export const TimeInputComponent = ({ height, width }) => {
  return (
    <div className="flex flex-wrap px-2  py-2 gap-4" style={{ width: width,  height: height, }}>
      <TimeInput
        style={{
          height: height,
          width: width,
        }}
        label="Event Time"
      />
    </div>
  );
};
