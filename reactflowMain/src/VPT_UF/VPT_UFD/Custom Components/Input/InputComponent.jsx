import React from "react";
import { Input } from "@nextui-org/react";

const InputComponent = ({ height, width }) => {
  return (
    <React.Fragment>
      <div className="w-full h-full flex justify-center items-center">
        <Input
          style={{
            height: height,
            width: width,
          }}
          type="email"
          label="Email"
          placeholder="Enter your email"
          labelPlacement="inside"
        />
      </div>
    </React.Fragment>
  );
};

export default InputComponent;
