import React, { useState } from "react";

export default function SideBar() {
  const [selctedSidebar, setSelectedsidebar] = useState("Create Rule");
  const sidebarContens = ["Create Rule", "update Rule", "Apperance"];

  return (
    <div className="w-full h-[100%] p-2">
      <div className="bg-slate-400/25 h-[93vh] rounded-md shadow-sm">
        <header>Rule Engine</header>

        <div className="flex flex-col justify-between gap-[0.25rem] p-2">
          {sidebarContens.map((item, index) => {
            return (
              <div
                className={`transition-all ease-in-out duration-100  ${
                  selctedSidebar === item ? "bg-red-400 " : ""
                } bg-slate-400/25 rounded-md shadow-sm`}
                key={index}
                onClick={() => setSelectedsidebar(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
