import React from "react";
import { Data, Wire } from "./SVG_Application";

export default function Navbar() {
  return (
    <div className="top-0 flex bg-[#0736C4] w-full h-[40px]">
      <div className="flex w-[90%] h-[40px]">
        <div className="w-[40px] h-[40px] rounded-t-md bg-white">
          <Data />
          <Wire />
        </div>
      </div>
    </div>
  );
}
