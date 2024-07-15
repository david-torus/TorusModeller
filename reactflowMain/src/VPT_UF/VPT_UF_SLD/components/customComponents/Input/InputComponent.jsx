import React from "react";
import { Input } from "@nextui-org/react";

const InputComponent = ({ height, width, json }) => {
  return (
    <React.Fragment>
      <div className="w-full flex justify-center items-center px-2  py-2">
        <Input
          style={{
            height: height,
            width: width,
          }}
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
      </div>
    </React.Fragment>
  );
};

export default InputComponent;
