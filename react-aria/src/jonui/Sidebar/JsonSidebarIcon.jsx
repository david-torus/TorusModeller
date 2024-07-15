import { useState } from "react";
import { MdDataArray, MdInfoOutline } from "react-icons/md";
import TorusToolTip from "../../torusComponents/TorusToolTip";
import { GiPipeOrgan, GiSamuraiHelmet } from "react-icons/gi";
import { TbBrandAmongUs } from "react-icons/tb";
import { FaPiedPiperAlt } from "react-icons/fa";
import { Pencil, Scan } from "../../SVG_Application";
import { MdDataObject } from "react-icons/md";
import { MdOutlineDataArray } from "react-icons/md";

const RenderJsonArraySidebarIcon = ({
  obj,
  setShowObj,
  setPath,
  fg,
  activeTab,
  setActiveTab,
  setLabel,
}) => {
  return (
    <>
      {/* {obj &&
        obj.map((ele, index) => {
          {console.log(obj, fg ,"obj09")}
          if (typeof ele !== "string")
            return (
              <div className=" flex flex-col" key={index}>
            
                <span
                  style={{ color: activeTab == ele ? "red" : "black" }}
                  onClick={() => {
                    setShowObj(ele);
                    setActiveTab(ele);
                    setPath(fg + "[" + index + "]");
                  }}
                >
              
                </span>
              </div>
            );
        })} */}
      <div
        className={
          "w-[100%] flex  items-center gap-[0.2rem] cursor-pointer" +
          (activeTab == fg
            ? "text-xs  cursor-pointer text-[#6600ff]"
            : " text-black cursor-pointer")
        }
        // onClick={() => {
        //   setShowObj(fg);
        //   setActiveTab(fg);
        //   setPath(fg);
        // }}
      >
        {/* fg */}

        {/* {obj[0].grouplabel}[] */}

        <TorusToolTip
          hoverContent={
            <MdOutlineDataArray
              size={20}
              color={activeTab == fg ? "#6600ff" : "#B2BABB "}
            />
          }
          tooltipFor="arr"
          tooltipContent={obj[0].grouplabel}
          color={activeTab == fg ? "#6600ff" : "#09254D"}
          setShowObj={setShowObj}
          setActiveTab={setActiveTab}
          setPath={setPath}
          fg={fg}
          setLabel={setLabel}
        />
      </div>
    </>
  );
};

export const JsonSidebarIcon = ({ obj, setShowObj, setPath, setLabel }) => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <>
      <div className="max-w-full  h-full overflow-y-scroll scrollbar-none flex flex-col p-4 gap-3">
        {obj &&
          Object.keys(obj).map((ele) => {
            if (typeof obj[ele] == "object" && !Array.isArray(obj[ele])) {
              {
                return (
                  <div>
                    <span
                      className={
                        " flex items-center text-xs cursor-pointer gap-4" +
                        (activeTab === ele
                          ? " cursor-pointer  text-xs text-[#0073e6]"
                          : "text-black cursor-pointer")
                      }
                      // style={{ color: activeTab === ele ? "  #6600ff" : "black" }}
                      onClick={() => {
                        setShowObj(ele);
                        setPath(ele);
                        setActiveTab(ele);
                      }}
                    >
                      <TorusToolTip
                        hoverContent={
                          // <GiSamuraiHelmet
                          //   size={25}
                          //   color={activeTab == ele ? "#6600ff" : "#09254D"}
                          // />
                          <MdDataObject
                            size={20}
                            color={activeTab == ele ? "#E74C3C" : "#B2BABB "}
                          />
                        }
                        tooltipFor="obj"
                        tooltipContent={obj[ele].label ? obj[ele].label : ele}
                        color={activeTab == ele ? "#6600ff" : "#09254D"}
                        setShowObj={setShowObj}
                        setActiveTab={setActiveTab}
                        setPath={setPath}
                        ele={ele}
                        setLabel={setLabel}
                      />
                      {/* <GiSamuraiHelmet size={25} color="#22012C" /> */}
                      {/* {obj[ele].label ? obj[ele].label + "{}" : ele + "{}"} */}

                      {/* <span>
                        <TorusToolTip
                          hoverContent={
                            <MdInfoOutline size={15} color="black" />
                          }
                          tooltipContent={ele}
                          color={"black"}
                        />
                      </span> */}
                    </span>
                  </div>
                );
              }
            }
            if (Array.isArray(obj[ele])) {
              return (
                <RenderJsonArraySidebarIcon
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  obj={obj[ele]}
                  fg={ele}
                  setShowObj={setShowObj}
                  setPath={setPath}
                  setLabel={setLabel}
                />
              );
            }
          })}
      </div>
    </>
  );
};
