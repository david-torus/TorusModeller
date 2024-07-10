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
      <span
        className={
          "flex  items-center gap-2 text-xs cursor-pointer" +
          (activeTab == fg
            ? "text-xs  cursor-pointer text-[#6600ff]"
            : "text-black cursor-pointer")
        }
        onClick={() => {
          setShowObj(fg);
          setActiveTab(fg);
          setPath(fg);
        }}
      >
        {obj[0].grouplabel}[]
        <span>
          <TorusToolTip
            hoverContent={<MdInfoOutline size={15} color="black" />}
            tooltipContent={fg}
            color={"black"}
          />
        </span>
      </span>
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
                      {obj[ele].label ? obj[ele].label + "{}" : ele + "{}"}

                      <span>
                        <TorusToolTip
                          hoverContent={
                            <MdInfoOutline size={15} color="black" />
                          }
                          tooltipContent={ele}
                          color={"black"}
                        />
                      </span>
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
                />
              );
            }
          })}
      </div>
    </>
  );
};
