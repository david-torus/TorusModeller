import { useState } from "react";

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
       style={{ color: activeTab == fg ? "red" : "black" }}
       onClick={() => {
         setShowObj(fg);
         setActiveTab(fg);
         setPath(fg );

       }}
      
      >{obj[0].grouplabel}[]</span>
      <span>

      </span>
    </>
  );
};

export const JsonSidebarIcon = ({ obj, setShowObj, setPath  }) => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <>
    
    <div className="w-full  flex flex-col p-2 gap-3">
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
                    {obj[ele].label ? obj[ele].label : ele}
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
