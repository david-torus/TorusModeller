import React from "react";
import ButtonComponent from "./ButtonComponent";

const buttonChildren = ["Testing", "writing", "coding", "reading"];

export default function Testing() {
  return (
    <div className="flex flex-col">
      <ButtonComponent
        width={"13%"}
        height={"70px"}
        pressedHeight={"45px"}
        pressedWidth={"15%"}
        isDisabled={false}
        Children={"Create a Artifact"}
        autoFocus={false}
        gap={1}
        slot={buttonChildren}
        onPress={() => console.log("clicked")}
      />
    </div>
  );
}
