import React from "react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate, parseDate } from "@internationalized/date";
export const DateInputComponent = ({ height, width }) => {
  return (
    <div>
      <DateInput
        style={{
          height: height,
          width: width,
        }}
        label={"Birth date"}
        isDisabled
        defaultValue={parseDate("2024-04-04")}
        placeholderValue={new CalendarDate(1995, 11, 6)}
      />
    </div>
  );
};
