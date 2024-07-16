/* eslint-disable */
import React, {  useState, useContext,useEffect } from "react";


import { Tooltip } from "@nextui-org/react";

import UiDecider from "../UiDecider";
import { Rendertype } from "../reusableUiElements/Rendertype";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";

import { PopupAddElements } from "../reusableUiElements/PopupAddElements";
import { InputEditor } from "../reusableUiElements/InputEditor";
import { TextAreaEditor } from "../reusableUiElements/TextAreaEditor";

import { RenderTooltip } from "../utils/RenderTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BuilderContext } from "../../builder";

import { IoIosArrowForward } from "react-icons/io";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { SvgDeleteIcon } from "../../../asset/SvgsApplication";
import { RiAddBoxLine } from "react-icons/ri";
import { handlepath } from "../utils/utils";
export default function DisplayObject({
  keyJson,
  title,
  json,
  totalOptions,
  depth,

  isAdmin,
  totalColors,
  parentType,
  path,
  uiPolicy,
  level,
  children,
  type,
}) {
  const [obj, setObj] = useState();
  const [func, setFunc] = useState(null);
  const [options, setOptions] = useState([]);

  const [expanded, setExpanded] = useState(false);

  const { darkmode } = useContext(DarkmodeContext);
  const [show, setShow] = useState(false);
  const { functionality, collapse } = useContext(BuilderContext);
  const [visible, setVisible] = useState(false);



  useEffect(() => { 
    setExpanded(collapse);
  }, [collapse]);

  useEffect(() => {
    try {
      if (json) {
        setObj(json);
        setOptions(totalOptions[depth]?.options);

        return () => {
          setFunc(null);
        };
      }
    } catch (err) {
      console.error(err);
    }
  }, [json, depth, totalOptions, totalColors]);

  const headerValue = parentType == "object"
  ? title
  : json.hasOwnProperty("isHeader")
  ? json[json["isHeader"]]
  : title;
  
  return (
    <>
      {totalOptions.length > depth && (
        <div key={path}>
          <details
            open={expanded}
            className={
              darkmode
                ? " bg-[#494949] border-2 rounded-lg border-gray-500/50 obj-box"
                : "bg-white obj-box"
            }
            onToggle={(e) => setExpanded(e.currentTarget.open)}
          >
            <summary
              className={
                darkmode
                  ? `summary-title  bg-${
                      expanded ? "[#595959]" : "[#494949]"
                    } text-white`
                  : "summary-title  bg-slate-200 text-black"
              }
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <div
                className="heading-primary "
                style={{ display: "flex", gap: "10px" }}
              >
                <span className="bg-gray-400 transition-all-ease-in duration-500 hover:bg-gray-300  p-1 flex items-center justify-center  rounded-2xl">
                  <IoIosArrowForward
                    style={{ transform: expanded && "rotate(90deg)" }}
                  />
                </span>

                <div
                  class="circle"
                  style={{ backgroundColor: `${totalColors[depth]?.color}` }}
                >
                  <span class="text">{totalOptions[depth]?.L}</span>
                </div>
                <span style={{ color: darkmode ? "white" : "black" }}>
              {  headerValue}
                </span>
                {keyJson && keyJson.hasOwnProperty(handlepath(path)) && (
                  <Tooltip
                    content={
                      <RenderTooltip tooltip={keyJson[handlepath(path)]} />
                    }
                  >
                    <div className="flex gap-2 items-center">
                      <span>
                        <AiOutlineInfoCircle
                          color={darkmode ? "white" : "black"}
                        />
                      </span>
                    </div>
                  </Tooltip>
                )}
                <PiBracketsCurlyBold color={darkmode ? "white" : "black"} />
                <span> {children} </span>
              </div>

              <div
                className={`opacity-${show ? "100" : "0"}  flex bg-${
                  darkmode ? "slate-500" : "gray-300"
                } p-1 gap-2 rounded-md transition-all ease-in-out duration-500 hover:bg-${
                  darkmode ? "slate-400 " : "white"
                }`}
              >
                <span
                  title="Add"
                  className="icon-button"
                  style={{
                    display: isAdmin?.canAdd ? "inline" : "none",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    setFunc("add");
                    setVisible(true);
                    e.preventDefault();
                  }}
                >
                  <RiAddBoxLine color="black" opacity={0.5} />
                </span>

                <span
                  title="Delete"
                  style={{
                    display: isAdmin?.canDelete ? "inline" : "none",
                    cursor: "pointer",
                  }}
                  htmlFor=""
                  onClick={() => functionality("delete", path)}
                >
                  <SvgDeleteIcon />
                </span>
              </div>
            </summary>
            <div className="obj-model">
              {func && func == "add" && (
                <PopupAddElements
                  key={path}
                  setFunc={setFunc}
                  json={json}
                  path={path}
                  options={options}
                  visible={visible}
                  setVisble={setVisible}
                  type={"object"}
                />
              )}
            </div>
            {obj && expanded && (
              <>
                <div className="grid grid-cols-2 gap-2 p-3  ">
                  {Object.keys(obj)?.map((key, index) => {
                    if (key !== "isHeader" && key !== "path") {
                      if (typeof obj[key] == "object") {
                        return (
                          <div
                            style={{ marginLeft: "2px", marginBottom: "10px" }}
                          >
                            {obj[key]?.hasOwnProperty("type") && (
                              <Rendertype
                                isAdmin={isAdmin}
                                key={path + "." + index}
                                keys={key}
                                obj={obj}
                                setObj={setObj}
                                path={path + "." + key}
                                functionality={functionality}
                              />
                            )}
                          </div>
                        );
                      }
                      if (typeof obj[key] !== "object") {
                        return (
                          <div className="w-full h-full ">
                            {type !== "" ? (
                              <TextAreaEditor
                                keyJson={keyJson}
                                isAdmin={isAdmin}
                                key={path + "." + index}
                                keys={key}
                                nodes={obj}
                                path={path + "." + key}
                                functionality={functionality}
                              />
                            ) : (
                              <InputEditor
                                keyJson={keyJson}
                                isAdmin={isAdmin}
                                key={path + "." + index}
                                keys={key}
                                nodes={obj}
                                path={path + "." + key}
                                functionality={functionality}
                              />
                            )}
                          </div>
                        );
                      }
                    }
                  })}
                </div>
                <div
                  className="home-page-view  p-1 "
                  style={{ overflow: "scroll" }}
                >
                  {Object.keys(obj)?.map((key) => {
                    if (key !== "isHeader" && key !== "path") {
                      if (
                        typeof obj[key] === "object" &&
                        !obj[key]?.hasOwnProperty("selectedValue") &&
                        !obj[key]?.hasOwnProperty("selectionList") &&
                        !obj[key]?.hasOwnProperty("type")
                      ) {
                        return (
                          <div className="w-full h-full">
                            <UiDecider
                              keyJson={keyJson}
                              title={key}
                              uiPolicy={uiPolicy}
                              json={obj[key]}
                              isAdmin={isAdmin}
                              depth={depth + 1}
                              totalOptions={totalOptions}
                              totalColors={totalColors}
                              level={level}
                              path={path + "." + key}
                              type={type}
                            />
                          </div>
                        );
                      }
                    }
                  })}
                </div>
              </>
            )}
          </details>
        </div>
      )}
    </>
  );
}
