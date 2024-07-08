import { useState } from "react";

const RenderJsonArraySidebarIcon = ({
  obj,
  setShowObj,
  setPath,
  fg,
  key,
  activeTab,
  setActiveTab,
  json,
}) => {
  return (
    <>
      {obj &&
        obj.map((ele, index) => {
          if (typeof ele !== "string")
            return (
              <div className=" flex flex-col" key={index}>
            
                <span
                  style={{ color: activeTab == ele ? "blue" : "black" }}
                  onClick={() => {
                    setShowObj(ele);
                    setActiveTab(ele);
                    setPath(fg + "[" + index + "]");
                  }}
                >
                  {ele.label}[]
                </span>
              </div>
            );
        })}
    </>
  );
};

export const JsonSidebarIcon = ({ obj, setShowObj, setPath }) => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="w-full h-full flex flex-col p-2">
      {obj &&
        Object.keys(obj).map((ele) => {
          if (typeof obj[ele] == "object" && !Array.isArray(obj[ele])) {
            {
              return (
                <div className=" flex flex-col">
                  <span
                    style={{ color: activeTab === ele ? "blue" : "black" }}
                    onClick={() => {
                      setShowObj(ele);
                      setPath(ele);
                      setActiveTab(ele);
                    }}
                  >
                    {obj[ele].label}
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
                json={obj}
                obj={obj[ele]}
                key={ele}
                fg={ele}
                setShowObj={setShowObj}
                setPath={setPath}
              />
            );
          }
        })}
    </div>
  );
};
