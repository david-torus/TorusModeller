import React, { useContext, useState } from "react";
import { Line, TorusLogo, ZoomIn } from "./SVG_Application";
import { Heading } from "react-aria-components";
import { IoIosArrowDown } from "react-icons/io";
import TorusDropDown from "./torusComponents/TorusDropDown";
import { DarkModeContext } from "./context/darkmodeContext";

export default function NewNavbar() {
  const [selectededArtifacts, setSelectedArtifacts] = useState(new Set());
  const { darkMode } = useContext(DarkModeContext);
  const [selectedVersion, setSelectedVersion] = useState(new Set());
  return (
    <div className="w-full h-full bg-white border-b border-slate-300 flex items-center justify-center">
      <div className="w-[99%] h-[80%]  flex flex-row items-center">
        <div className="flex gap-2 w-[10%]">
          <TorusLogo />
          <span className=" font-semibold font-Neue Montreal text-black text-lg ">
            TORUS
          </span>
          <span className="ml-4">
            <Line />
          </span>
        </div>
        <div className="flex gap-2 w-[20%]">
          <span className="ml-4">
            <ZoomIn />
          </span>
          <div className="flex flex-col">
            <TorusDropDown
              title={
                <div className="flex flex-row items-center gap-2 w-[100%]">
                  <div
                    className={
                      "w-[80%] text-black font-inter 3xl:text-sm xl:text-sm xl:font-normal tracking-normal whitespace-nowrap"
                    }
                  >
                    {(selectededArtifacts &&
                      Array.from(selectededArtifacts)[0]) ||
                      "Select Artifacts"}
                  </div>
                  <div className="w-[20%]">
                    <IoIosArrowDown color={darkMode ? "#090b0e" : "white"} />
                  </div>
                </div>
              }
              fontStyle={
                "font-inter 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
              }
              classNames={{
                buttonClassName: `bg-transparent flex  text-black rounded-md font-semibold font-md  torus-pressed:animate-torusButtonActive `,
                listBoxClassName: "bg-white text-black ",
              }}
              selected={selectededArtifacts}
              setSelected={setSelectedArtifacts}
              selectionMode="single"
              items={[
                { key: "Bank Master", label: "Bank Master" },
                { key: "Bank", label: "Bank" },
              ]}
              btWidth={"md"}
            />
            <p className="text-xs text-black/35">Edited 10 mins ago</p>
          </div>
        </div>
        <div className="ml-[-7%]">
          <TorusDropDown
            s
            title={
              <span className="font-inter 3xl:text-xs xl:text-sm xl:font-normal tracking-tighter">
                {(selectedVersion && Array.from(selectedVersion)[0]) || "*"}
              </span>
            }
            classNames={{
              buttonClassName:
                " bg-white dark:bg-[#262626] flex items-center justify-center  rounded-md font-semibold   w-[30px] h-[24px] torus-pressed:animate-torusButtonActive ",

              listBoxClassName: "bg-white text-black ",
            }}
            popOverProps={{ offset: 15 }}
            selected={selectedVersion}
            setSelected={setSelectedVersion}
            selectionMode="single"
            items={[
              { key: "v1", label: "v1" },
              { key: "v2", label: "v2" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
