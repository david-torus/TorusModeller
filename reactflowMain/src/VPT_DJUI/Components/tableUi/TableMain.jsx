import React, { useEffect, useState } from "react";
import { onJsonChange } from "../utils/utils";
import Tableui from "./tableui";

export default function TableMain({
  mode,
  json,
  tableIName,
  tableIIName,
  updatedNodeConfig,
}) {
  const [tableI, setTableI] = useState([]);
  const [tableII, setTableII] = useState([]);
  const [tabopen, tabvisible] = useState(1);
  useEffect(() => {
    if (
      mode == "dual" &&
      json &&
      json.hasOwnProperty(tableIIName) &&
      json.hasOwnProperty(tableIName)
    ) {
      setTableI(json[tableIName]);
      setTableII(json[tableIIName]);
    } else if (mode == "single" && json && json.hasOwnProperty(tableIName)) {
      setTableI(json[tableIName]);
    }
  }, [tableIjson]);

  const onJsonUpdate1stTable = (func, path, obj) => {
    try {
      let newTable = onJsonChange(tableI, func, path, obj);
      if (newTable) {
        updatedNodeConfig({
          [tableIName]: jsons,
          [tableIIName]: tableII,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onJsonUpdate2ndTable = (func, path, obj) => {
    try {
      let newTable = onJsonChange(tableII, func, path, obj);
      if (newTable) {
        updatedNodeConfig({
          [tableIName]: tableI,
          [tableIIName]: newTable,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="transition-all w-full delay-100 flex flex-col justify-center 
          items-center gap-4 overflow-y-hidden h-full "
    >
      <div
        className={
          "  flex flex-row justify-around w-[60%] gap-[0px] text-base items-between rounded-md xl:py-[3px] py-[2px] bg-transparent "
        }
      >
        <div
          onClick={() => tabvisible(1)}
          className={`flex flex-row gap-2 capitalize transition-all items-center text-center select-none  
                 xl:px-[25px] xl:py-[3px] px-[21px] py-[4px]  xl:text-md text-sm
                  text-slate-600 rounded-md  cursor-pointer text-${darkmode ? "white" : "black"} 
                 
                ${tabopen === 1 && `border border-slate-500/50 font-bold `}`}
        >
          <AiOutlineDatabase className="text-xl" />
          {tableIName}
        </div>
        <div
          onClick={() => tabvisible(2)}
          className={`flex flex-row xl:gap-2 capitalize transition-all gap-1 items-center text-center 
                xl:text-md text-sm text-slate-600 select-none  
                 xl:px-[28px] xl:py-[3px] px-[21px] py-[4px] 
                  cursor-pointer rounded-md text-${darkmode ? "white" : "black"}
                  ${tabopen === 2 && `border border-slate-500/50  font-bold `} `}
        >
          <VscSymbolMethod className="text-xl" />
          {tableIIName}
        </div>
      </div>
      <div className=" shadow-black/40 rounded-xl w-full h-[80%]">
        <div
          className={
            " h-full w-full  " +
            (tabopen === 1 ? " flex items-center justify-center" : " hidden")
          }
        >
          <Tableui
            ArrayJson={tableI}
            functionality={onJsonUpdate1stTable}
            path={""}
            key={Math.random()}
          />
        </div>
        <div
          className={
            " h-full w-full  " +
            (tabopen === 2 ? " flex items-center justify-center" : " hidden")
          }
        >
          {tableII.length > 0 ? (
            <Tableui
              key={Math.random()}
              functionality={onJsonUpdate2ndTable}
              path={""}
              ArrayJson={tableII}
            />
          ) : (
            <p className="text-center text-2xl text-white">
              column found for this node
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
