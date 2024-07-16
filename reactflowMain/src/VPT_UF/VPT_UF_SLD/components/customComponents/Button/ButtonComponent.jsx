import React from "react";
import { Button } from "@nextui-org/react";

const ButtonComponent = ({ height, width, json }) => {
  return (
    <React.Fragment>
      <div className="w-full flex justify-center items-center px-2  py-2">
        <Button
          isDisabled
          style={{
            height: height,
            width: width,
          }}
          className=""
          color="primary"
        >
          Button
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ButtonComponent;
