import React from "react";
import ButtonComponent from "./ButtonComponent";

const buttonChildren = ["Testing", "writing", "coding", "reading"];

export default function Testing() {
  return (
    <div className="flex flex-col">
      {buttonChildren.map((value) => (
        <ButtonComponent
          value={value}
          isDisabled={false}
          Children={value}
          autoFocus={false}
          gap={1}
        />
      ))}
    </div>
  );
}
