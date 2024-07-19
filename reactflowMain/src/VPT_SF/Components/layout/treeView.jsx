import React, { useState, useContext } from "react";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { IoIosArrowForward } from "react-icons/io";
import { ScrollShadow } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";

const Treearr = ({ data, parentdata }) => {
  const { darkMode } = useContext(DarkmodeContext);
  const [getparent, setGetParent] = useState({});
  const [filteredObj, setFilteredObj] = useState({});

  useEffect(() => {
    setGetParent(parentdata);
  }, [parentdata]);

  useEffect(() => {
    const newFilteredObj = {};
    for (const key in getparent) {
      if (key.endsWith("GrpName")) {
        newFilteredObj["name"] = getparent[key];
      }
      if (key === "id") {
        newFilteredObj[key] = getparent[key];
      }
    }

    setFilteredObj(newFilteredObj);
  }, [getparent]);

  const onDragStart = (event, nodeName, nodeType, parentnode, item) => {
    if (nodeType.includes("org")) {
      event.dataTransfer.setData(
        "application/groupName",
        JSON.stringify({
          nodeType: nodeType,
          nodeName: nodeName,
          code: item?.orgCode,
        })
      );

      event.dataTransfer.setData(
        "application/childparent",
        JSON.stringify(parentnode)
      );

      event.dataTransfer.effectAllowed = "move";
    }

    if (nodeType.includes("role")) {
      event.dataTransfer.setData(
        "application/roleName",
        JSON.stringify({
          nodeType: nodeType,
          nodeName: nodeName,
          code: item?.roleCode,
        })
      );
      event.dataTransfer.setData(
        "application/childparent",
        JSON.stringify(parentnode)
      );

      event.dataTransfer.effectAllowed = "move";
    }
    if (nodeType.includes("ps")) {
      event.dataTransfer.setData(
        "application/psName",
        JSON.stringify({
          nodeType: nodeType,
          nodeName: nodeName,
          code: item?.psCode,
        })
      );
      event.dataTransfer.setData(
        "application/childparent",
        JSON.stringify(parentnode)
      );

      event.dataTransfer.effectAllowed = "move";
    }
  };

  return (
    <div>
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <div
            key={index}
            className={` ${darkMode ? "border-gray-300/50 bg-[#313137]" : "border-slate-700 bg-[#f1f3f3]"} border p-1 rounded-sm shadow-md mb-2`}
          >
            {Object.entries(item) &&
              Object.entries(item).length > 0 &&
              Object.entries(item).map(([key, value]) => (
                <div key={key} className="text-white">
                  {key.includes("Code") ? (
                    <div className="w-full  gap-1 flex justify-around items-center">
                      <div
                        className={`w-[45%] flex justify-around gap-2 items-center text-sm ${darkMode ? "text-white" : "text-black"}`}
                      >
                        {key}
                        <p
                          className={`${darkMode ? "text-white" : "text-black"}`}
                        >
                          :
                        </p>
                      </div>
                      <div
                        className={` w-[45%] flex justify-center items-center text-sm ${darkMode ? "text-white" : "text-black"} `}
                      >
                        {value}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-1 w-full">
                      <div
                        className="w-full  gap-3 flex justify-around items-center hover:cursor-grab"
                        onDragStart={(event) =>
                          onDragStart(event, value, key, filteredObj, item)
                        }
                        draggable
                      >
                        <div
                          className={`w-[45%] flex  justify-around gap-2 items-center text-sm ${darkMode ? "text-white" : "text-black"}`}
                        >
                          {key}
                          <p
                            className={`${darkMode ? "text-white" : "text-black"}`}
                          >
                            :
                          </p>
                        </div>

                        <div
                          className={` w-[45%] flex justify-center items-center text-sm ${darkMode ? "text-white" : "text-black"} `}
                        >
                          {value}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

const TreeObj = ({ obj }) => {
  const { darkMode } = useContext(DarkmodeContext);
  const [expanded, setExpanded] = useState(false);
  const [getparent, setGetParent] = useState({});
  const [filteredObj, setFilteredObj] = useState({});

  useEffect(() => {
    setGetParent(obj);
  }, [obj]);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const newFilteredObj = {};
    for (const key in getparent) {
      if (key.endsWith("GrpName")) {
        newFilteredObj[key] = getparent[key];
      }
      if (key === "id") {
        newFilteredObj[key] = getparent[key];
      }
    }

    setFilteredObj(newFilteredObj);
  }, [getparent]);

  const onDragStart = (event, nodeName, nodeType, parentnode) => {
    if (nodeType.includes("org")) {
      event.dataTransfer.setData(
        "application/orgGroup",
        JSON.stringify({
          nodeType: nodeType,
          nodeName: nodeName,
          childNodes: obj.org,
          type: "orgGrp",
          label: "orgName",
          code: "orgCode",
          obj: obj.orgGrpCode,
          childType: "org",
          parentId: obj.id,
        })
      );

      event.dataTransfer.setData(
        "application/parentNode",
        JSON.stringify(parentnode)
      );

      event.dataTransfer.effectAllowed = "move";
    }

    if (nodeType.includes("role")) {
      event.dataTransfer.setData(
        "application/roleGroup",
        JSON.stringify({
          nodeType: nodeType,
          nodeName: nodeName,
          childNodes: obj.roles,
          type: "roleGrp",
          obj: obj.roleGrpCode,
          label: "roleName",
          code: "roleCode",
          childType: "roles",
          parentId: obj.id,
        })
      );
      event.dataTransfer.setData(
        "application/parentNode",
        JSON.stringify(parentnode)
      );
      event.dataTransfer.effectAllowed = "move";
    }
    if (nodeType.includes("psGrp")) {
      event.dataTransfer.setData(
        "application/psGroup",
        JSON.stringify({
          nodeType: nodeType,
          nodeName: nodeName,
          childNodes: obj.ps,
          type: "psGrp",
          label: "psName",
          code: "psCode",
          obj: obj.psGrpCode,
          childType: "ps",
          parentId: obj.id,
        })
      );
      event.dataTransfer.setData(
        "application/parentNode",
        JSON.stringify(parentnode)
      );
      event.dataTransfer.effectAllowed = "move";
    }
  };

  return (
    <div
      className={`${darkMode ? "bg-[#1d1c20]" : "bg-[#e9e8e8]"} border-1 ${darkMode ? "border-gray-300/50" : "border-slate-700"}  rounded-md p-2 mb-2 shadow-lg`}
    >
      {obj &&
        Object.keys(obj) &&
        Object.keys(obj).length > 0 &&
        Object.keys(obj).map((key) => {
          if (
            typeof obj[key] == "object" &&
            obj[key] !== null &&
            !Array.isArray(obj[key])
          ) {
            return <>{TreeObj(obj[key])}</>;
          }
          if (typeof obj[key] == "string") {
            return (
              <div className="flex gap-2 mb-2">
                {key.includes("Code") ? (
                  <>
                    <div className="w-full  gap-1 flex justify-around items-center ml-[17.2px]">
                      <div
                        className={`w-[45%] flex justify-around gap-2 items-center text-sm ${darkMode ? "text-white" : "text-black"}`}
                      >
                        {key}
                        <p
                          className={`${darkMode ? "text-white" : "text-black"}`}
                        >
                          :
                        </p>
                      </div>

                      <div
                        className={` w-[45%] flex justify-center items-center text-sm ${darkMode ? "text-white" : "text-black"} `}
                      >
                        {obj[key]}
                      </div>
                    </div>
                  </>
                ) : key.includes("Name") ? (
                  <div className="flex gap-1 w-full">
                    <Button
                      className="min-w-[5%] min-h-[5%] p-0 bg-transparent border-gray-500/50  flex justify-center items-center"
                      size="xs"
                      variant="outline"
                      onClick={toggleExpansion}
                    >
                      <IoIosArrowForward
                        color={darkMode ? "white" : "black"}
                        size={15}
                        className={`transition-all ease-in-out duration-200 delay-75 ${expanded ? "rotate-90" : ""}`}
                      />
                    </Button>

                    <div
                      className="w-[95%]  gap-3 flex justify-around items-center hover:cursor-grab"
                      onDragStart={(event) =>
                        onDragStart(event, obj[key], key, filteredObj)
                      }
                      draggable
                    >
                      <div
                        className={`w-[45%] flex  justify-around gap-2 items-center text-sm ${darkMode ? "text-white" : "text-black"}`}
                      >
                        {key}
                        <p
                          className={`${darkMode ? "text-white" : "text-black"}`}
                        >
                          :
                        </p>
                      </div>

                      <div
                        className={` w-[45%] flex justify-center items-center text-sm ${darkMode ? "text-white" : "text-black"} `}
                      >
                        {obj[key]}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          }

          if (Array.isArray(obj[key]) && expanded) {
            return (
              <div className="mt-2 mb-2">
                <Treearr data={obj[key]} parentdata={obj} />
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

const TreeView = ({ data }) => {
  console.log(data, "sff");
  return (
    <ScrollShadow className="max-h-[360px] overflow-y-auto p-2">
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          if (typeof item === "object" && item !== null) {
            return (
              <React.Fragment key={index}>
                <TreeObj obj={item} />
              </React.Fragment>
            );
          }
          return null;
        })}
    </ScrollShadow>
  );
};

export default TreeView;
