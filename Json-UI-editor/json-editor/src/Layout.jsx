import React from "react";
import SideBar from "./SideBar";
import Editor from "./Editor";

export default function Layout({  }) {
  return <div className="w-full h-full">
    <div className="flex justify-between flex-row items-center">
        <div className="w-[20%] " >
            <SideBar />
        </div>
        <div className="w-[80%]" >
            <Editor />
        </div>
    </div>


  </div>;
}
