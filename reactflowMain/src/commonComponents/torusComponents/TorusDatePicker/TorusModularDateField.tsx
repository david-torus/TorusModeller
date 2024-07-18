import React from 'react';
import { DateInput, DateSegment } from 'react-aria-components'; // Adjust imports based on your actual components

interface TorusModularDateFieldProps {
  slot: string;
}

const TorusModularDateField: React.FC<TorusModularDateFieldProps> = ({ slot }) => {
  return (
    <DateInput
      className="flex justify-around gap-2 w-1/2 text-sm font-normal torus-focus:outline-none torus-focus:ring-1 torus-focus:ring-[#000000]/50"
      slot={slot}
    >
      {(segment) => (
        <DateSegment
          className="torus-focus-within:border-transparent torus-focus:border-transparent torus-pressed:border-transparent"
          segment={segment}
        />
      )}
    </DateInput>
  );
};

export default TorusModularDateField;
