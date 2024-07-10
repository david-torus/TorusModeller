import React from "react";
import { Panel } from "reactflow";
import { Connect, Data, Home, Sheild, Wire } from "./SVG_Application";
import TorusTab from "./torusComponents/TorusTab";

const colors = {
  hidden: { dark: "#008080", light: "#008080" },
  DF: {
    dark: "#2257f7",
    light: "#244DCB",
  },
  UF: {
    dark: "#33CCFF",
    light: "#00BFFF",
  },
  PF: { dark: "#2AE38F", light: "#13CC78" },

  SF: { dark: "#FFc723", light: "#FFBE00" },
};

export default function NewSidebar({
  color,
  selectedFabric,
  showFabricSideBar,
  handleSidebarToggle,
  handleTabChange,
}) {
  return (
    <Panel
      position="top-left"
      className="h-[95%] w-[6%] bg-white border border-slate-300 rounded-lg"
    >
      <div className="flex justify-center items-center  gap-3">
        <div className="w-[75%] h-[90%] ">
          <div className="">
            <Home />
          </div>
          <div className="mt-10 w-full flex items-center justify-center ">
            <TorusTab
              orientation="vertical"
              classNames={{
                tabs: "cursor-pointer ml-[10px] lg:max-3xl:mt[2%]",
                tabList: "block  ",
                tab: `xl:w-[6.5%] xl:h-[2.48rem]
                  lg:w-[6.5%] lg:h-[2.3rem]
                  md:w-[10%] md:h-[2.5rem]
                  3xl:w-[6.5%] 3xl:h-[2.3rem]
                  md:mt-[1%] 
                  lg:mt-[1.6%] 
                  xl:mt-[1.7%] 
                  3xl:mt-[1.8%] 
                rounded-t-lg torus-focus:outline-none flex items-center justify-center torus-selected:bg-[#F4F5FA] dark:torus-selected:bg-[#1E2428]]`,
              }}
              tabs={[
                {
                  id: "DF",
                  content: ({ isSelected }) => (
                    <div>
                      <Data
                        strokeColor={
                          !isSelected ? "#A59E92" : colors[selectedFabric]?.dark
                        }
                      />
                    </div>
                  ),
                },
                {
                  id: "UF",
                  content: ({ isSelected }) => (
                    <div>
                      <Wire
                        strokeColor={
                          !isSelected ? "#A59E92" : colors[selectedFabric]?.dark
                        }
                      />
                    </div>
                  ),
                },
                {
                  id: "PF",
                  content: ({ isSelected }) => (
                    <div>
                      <Connect
                        strokeColor={
                          !isSelected ? "#A59E92" : colors[selectedFabric]?.dark
                        }
                      />
                    </div>
                  ),
                },
                {
                  id: "SF",
                  content: ({ isSelected }) => (
                    <div>
                      <Sheild
                        strokeColor={
                          !isSelected ? "#A59E92" : colors[selectedFabric]?.dark
                        }
                      />
                    </div>
                  ),
                },
              ]}
              onSelectionChange={handleTabChange}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
