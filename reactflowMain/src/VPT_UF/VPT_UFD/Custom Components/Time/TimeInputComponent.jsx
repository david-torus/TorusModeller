import { TimeInput } from "@nextui-org/react";
import React from "react";

export const TimeInputComponent = ({ height, width }) => {
  return (
    <div className="flex flex-wrap gap-4">
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
