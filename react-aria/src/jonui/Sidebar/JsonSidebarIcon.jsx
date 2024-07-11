import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import TorusToolTip from "../../torusComponents/TorusToolTip";

const RenderJsonArraySidebarIcon = ({
  obj,
  setShowObj,
  setPath,
  fg,
  activeTab,
  setActiveTab,
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
        onClick={() => {
          setShowObj(fg);
          setActiveTab(fg);
          setPath(fg);
        }}
      >
        <div className="w-[80%] flex justify-start">
          <span className="text-[0.55rem]">{obj[0].grouplabel}[]</span>
        </div>
        <div className="w-[20%] flex justify-end">
          <TorusToolTip
            hoverContent={<MdInfoOutline size={15} color="black" />}
            tooltipContent={fg}
            color={"black"}
          />
        </div>
      </div>
    </>
  );
};

export const JsonSidebarIcon = ({ obj, setShowObj, setPath }) => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <>
      <div className="w-full  h-full overflow-y-scroll scrollbar-none flex flex-col p-2 gap-3">
        {obj &&
          Object.keys(obj).map((ele) => {
            if (typeof obj[ele] == "object" && !Array.isArray(obj[ele])) {
              {
                return (
                  <div
                    className={
                      " flex items-center text-xs cursor-pointer gap-[0.2rem] w-[100%]" +
                      (activeTab === ele
                        ? " cursor-pointer  text-xs text-[#0073e6]"
                        : " text-black cursor-pointer")
                    }
                    // style={{ color: activeTab === ele ? "  #6600ff" : "black" }}
                    onClick={() => {
                      setShowObj(ele);
                      setPath(ele);
                      setActiveTab(ele);
                    }}
                  >
                    <div className="w-[80%] flex justify-start">
                      <span className="text-[0.55rem]">
                        {obj[ele].label ? obj[ele].label + "{}" : ele + "{}"}
                      </span>
                    </div>

                    <div className="cursor-pointer w-[20%] flex justify-end">
                      <TorusToolTip
                        hoverContent={<MdInfoOutline size={15} color="black" />}
                        tooltipContent={ele}
                        color={"black"}
                      />
                    </div>
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
                />
              );
            }
          })}
      </div>
    </>
  );
};
