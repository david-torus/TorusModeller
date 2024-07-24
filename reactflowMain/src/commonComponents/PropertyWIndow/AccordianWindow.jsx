import React, { useCallback, useContext } from "react";
import { useState, useEffect } from "react";

import _ from "lodash";
import { Accordion, AccordionItem, Tooltip } from "@nextui-org/react";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { ScrollShadow } from "@nextui-org/react";

import { Upload } from "../Model/UploadJson";
import { DarkmodeContext } from "../context/DarkmodeContext";
import ReusableInput from "../reusableComponents/ReusableInput";

const RenderAccordion = ({
  data,
  path,
  handlejs,
  keyJson,
  tooltip,
  setTooltip,
}) => {
  const [handleValue, setHandleValue] = useState(null);
  const [visible, setVisible] = useState(false);
  const { darkMode } = useContext(DarkmodeContext);

  const handleInput = (e, value, path) => {
    setHandleValue(e);
    if (e) {
      handlejs(e, path);
    }
  };

  const handleTooltip = (key) => {
    console.log(key, "path");
    setVisible(true);
    setTooltip(keyJson[key]);
  };
  return (
    <>
      {Object.keys(data) &&
        Object.keys(data).length > 0 &&
        Object.keys(data).map((key) => {
          const currentPath = `${path}.${key}`;
          console.log(currentPath, "currentPath");
          if (typeof data[key] === "object" && !Array.isArray(data[key])) {
            return (
              <div className="mb-4">
                <Accordion
                  key={key}
                  itemClasses={{
                    title: darkMode ? "text-white" : "text-black",
                  }}
                  className={`flex text-base gap-4 w-[100%] overflow-x-auto overflow-y-scroll
                 scrollbar-hide px-2 border-none`}
                  variant="light"
                >
                  <AccordionItem
                    title={key}
                    className={`${darkMode ? "w-[100%] text-white" : "w-[100%] text-black"}`}
                  >
                    <>
                      {keyJson && (
                        <Tooltip
                          content={
                            visible ? <RenderTooltip tooltip={tooltip} /> : null
                          }
                        >
                          <div className="flex gap-2 items-center">
                            <span
                              className={`${darkMode ? " text-white" : " text-black"}`}
                              onMouseEnter={() => handleTooltip(currentPath)}
                            >
                              <AiOutlineInfoCircle
                                color={darkMode ? "white" : "black"}
                              />
                            </span>
                          </div>
                        </Tooltip>
                      )}
                      <RenderAccordion
                        data={data[key]}
                        path={currentPath}
                        handlejs={handlejs}
                        keyJson={keyJson}
                        tooltip={tooltip}
                        setTooltip={setTooltip}
                      />
                    </>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          } else if (
            Array.isArray(data[key]) &&
            typeof data[key][0] !== "string"
          ) {
            return (
              <div className="">
                <Accordion
                  key={key}
                  itemClasses={{ title: "text-white/90" }}
                  className={`flex flex-row text-base gap-4 w-[100%] overflow-x-auto overflow-y-scroll scrollbar-hide px-2 border-none`}
                  variant="light"
                >
                  <AccordionItem
                    title={
                      <div
                        className="flex items-center justify-between gap-2 my-2"
                        style={{
                          width: "30%",
                        }}
                      >
                        <span
                          className={
                            darkMode
                              ? "text-white text-sm font-bold"
                              : "text-slate-900 text-sm font-bold "
                          }
                        >
                          {key}
                        </span>
                        {console.log(key.length, "keylength")}
                        {keyJson && keyJson.hasOwnProperty(currentPath) && (
                          <Tooltip
                            content={
                              visible ? (
                                <RenderTooltip tooltip={tooltip} />
                              ) : null
                            }
                            showArrow
                            placement="right"
                            closeDelay={50}
                            delay={10}
                            motionProps={{
                              variants: {
                                exit: {
                                  opacity: 0,
                                  transition: {
                                    duration: 0.1,
                                    ease: "easeIn",
                                  },
                                },
                                enter: {
                                  opacity: 1,
                                  transition: {
                                    duration: 0.15,
                                    ease: "easeOut",
                                  },
                                },
                              },
                            }}
                            classNames={{
                              base: [
                                "before:bg-neutral-400 dark:before:bg-white width-[300px]",
                              ],
                              content: [
                                "py-2 px-4 shadow-xl",
                                "text-black bg-gradient-to-br from-white to-neutral-600 text-center width-[300px]",
                              ],
                            }}
                          >
                            <div className="flex justify-center items-center">
                              <span
                                onMouseEnter={() => handleTooltip(currentPath)}
                              >
                                <AiOutlineInfoCircle
                                  color={darkMode ? "white" : "black"}
                                />
                              </span>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    }
                    className="w-[100%]"
                  >
                    {data[key] &&
                      data[key].length > 0 &&
                      data[key].map((item, index) => (
                        <div key={index}>
                          <RenderAccordion
                            data={item}
                            path={currentPath + "." + index}
                            handlejs={handlejs}
                            keyJson={keyJson}
                            tooltip={tooltip}
                            setTooltip={setTooltip}
                          />
                        </div>
                      ))}
                  </AccordionItem>
                </Accordion>
              </div>
            );
          } else if (
            Array.isArray(data[key]) &&
            typeof data[key][0] === "string"
          ) {
            return (
              <div className="">
                <Accordion
                  key={key}
                  itemClasses={{ title: "text-white/90" }}
                  className={`flex flex-row text-base gap-4 w-[100%] overflow-x-auto overflow-y-scroll scrollbar-hide px-2 border-none`}
                  variant="light"
                >
                  <AccordionItem
                    title={
                      <div
                        className="flex items-center justify-between gap-2 my-2"
                        style={{
                          width: "30%",
                        }}
                      >
                        <span
                          className={
                            darkMode
                              ? "text-white text-sm font-bold"
                              : "text-slate-900 text-sm font-bold "
                          }
                        >
                          {key}
                        </span>

                        {keyJson && (
                          <Tooltip
                            content={
                              visible ? (
                                <RenderTooltip tooltip={tooltip} />
                              ) : null
                            }
                            showArrow
                            placement="right"
                            closeDelay={50}
                            delay={10}
                            motionProps={{
                              variants: {
                                exit: {
                                  opacity: 0,
                                  transition: {
                                    duration: 0.1,
                                    ease: "easeIn",
                                  },
                                },
                                enter: {
                                  opacity: 1,
                                  transition: {
                                    duration: 0.15,
                                    ease: "easeOut",
                                  },
                                },
                              },
                            }}
                            classNames={{
                              base: [
                                "before:bg-neutral-400 dark:before:bg-white width-[300px]",
                              ],
                              content: [
                                "py-2 px-4 shadow-xl",
                                "text-black bg-gradient-to-br from-white to-neutral-600 text-center width-[300px]",
                              ],
                            }}
                          >
                            <div className="flex justify-center items-center">
                              <span
                                onMouseEnter={() => handleTooltip(currentPath)}
                              >
                                <AiOutlineInfoCircle
                                  color={darkMode ? "white" : "black"}
                                />
                              </span>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    }
                    className="w-[100%]"
                  >
                    {data[key] &&
                      data[key].length > 0 &&
                      data[key].map((item, index) => (
                        <div key={index} className="my-2 py-1">
                          <ReusableInput
                            key={index + "Accordian"}
                            darkMode={darkMode}
                            labelPlacement="outside"
                            label={
                              <label
                                className={
                                  darkMode
                                    ? "text-white text-sm font-bold"
                                    : "text-gray-700 text-sm font-bold"
                                }
                              >
                                {index}
                              </label>
                            }
                            handleChange={(e) => {
                              // setHandleValue(e )
                              handleInput(
                                e.target.value,
                                handleValue,
                                currentPath + "." + index
                              );
                            }}
                            type="text"
                            defaultValue={item}
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter") {
                            //     console.log(
                            //       currentPath + "." + index,
                            //       "string"
                            //     );
                            //     handlejs(
                            //       handleValue,
                            //       currentPath + "." + index
                            //     );
                            //   }
                            // }}
                          />
                        </div>
                      ))}
                  </AccordionItem>
                </Accordion>
              </div>
            );
          } else {
            return (
              <div key={key} className="my-2 py-1">
                <>
                  <ReusableInput
                    key={key + "Accordian"}
                    darkMode={darkMode}
                    labelPlacement="outside"
                    label={
                      <label
                        className={
                          darkMode
                            ? "text-white text-sm font-bold"
                            : "text-gray-700 text-sm font-bold"
                        }
                      >
                        {key}
                      </label>
                    }
                    handleChange={(e) => {
                      // setHandleValue(e )
                      handleInput(e.target.value, handleValue, currentPath);
                    }}
                    type="text"
                    defaultValue={data[key]}
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") {
                    //     console.log(
                    //       currentPath + "." + index,
                    //       "string"
                    //     );
                    //     handlejs(
                    //       handleValue,
                    //       currentPath + "." + index
                    //     );
                    //   }
                    // }}
                  />
                </>
              </div>
            );
          }
        })}
    </>
  );
};

const RenderTooltip = ({ tooltip }) => {
  return (
    <div>
      {tooltip &&
        Object.keys(tooltip).length > 0 &&
        Object.keys(tooltip) &&
        Object.keys(tooltip).map((key) => {
          return (
            <div className="px-2 py-2 bg-[D9DEE8]">
              <div className="text-small font-bold p-0">{key}:</div>
              <div className="text-tiny p-0">{tooltip[key]}</div>
            </div>
          );
        })}
    </div>
  );
};
export const AccordianWindow = ({
  helperJson,
  toogle,
  sideBarData,
  setSidebarData,
  sideT,
  setSidesJson,
  sidejson,
  setshown,
  modalType,
  setShowWorkflow,
  setShowConfig,
  currentDrawing,
}) => {
  const [value, setValue] = useState(null);
  const [keyJson, setKeyJson] = useState({});
  const [dupjson, setDupjson] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [visible, setVisible] = useState(false);
  const { darkMode } = useContext(DarkmodeContext);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    setDupjson(structuredClone(sideBarData));
    setKeyJson(structuredClone(helperJson));
  }, [sideBarData, helperJson]);

  console.log(dupjson,sideBarData, "accwindow");

  const checkForNull = useCallback((jsonData) => {
    try {
      if (
        typeof jsonData === "object" &&
        jsonData !== null &&
        jsonData !== undefined
      ) {
        if (Array.isArray(jsonData)) {
          jsonData.forEach((item) => checkForNull(item));
        } else {
          Object.values(jsonData).forEach((value) => checkForNull(value));
        }
      } else if (jsonData === null || jsonData === undefined) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (files) {
      try {
        const error = checkForNull(JSON.parse(files));
        if (error) {
          setDupjson(JSON.parse(files));
        } else {
          alert("Key should not be null or undefined");
        }
        setFiles(null);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Invalid JSON format");
        setFiles(null);
      }
    }
  }, [files, setDupjson, checkForNull]);

  const handleChange = (e, key) => {
    setValue(e);
    console.log(e, key, value, "renderc");
    if (e) {
      handlejs(e, key);
    }
  };
  const handlejs = (e, i) => {
    console.log(e, i, "render");
    if (i) {
      const js = structuredClone(dupjson);
      _.set(js, i, e);
      setDupjson(js);
      setSidebarData(js);

      console.log(js, "renderjs");
    }
  };

  const handleTooltip = (key) => {
    console.log(key, "path");
    setVisible(true);
    setTooltip(keyJson[key]);
  };
  return (
    <div>
      {dupjson && Object.keys(dupjson).length > 0 ? (
        <div>
          <div className=" dark flex flex-col gap-2 w-[100%] overflow-x-auto overflow-y-scroll scrollbar-hide px-2 border-none">
            {Object.keys(dupjson) &&
              Object.keys(dupjson).length > 0 &&
              Object.keys(dupjson).map((key) => (
                <>
                  {typeof dupjson[key] === "object" ? (
                    <Accordion
                      itemClasses={{
                        title: "text-white/90",
                      }}
                      className={`flex flex-col text-base
                      gap-4 w-[100%] overflow-x-auto overflow-y-scroll
                    h-[60%]
                     scrollbar-hide text-white/90  px-2 border-none `}
                      variant="bordered"
                    >
                      <AccordionItem
                        key={key}
                        className="w-[100%]"
                        title={
                          <div
                            className="flex items-center text-white/90 justify-between gap-2 my-2"
                            style={{
                              width: "30%",
                            }}
                          >
                            <span
                              className={`${darkMode ? "text-white" : "text-black"} text-md `}
                            >
                              {key}
                            </span>
                            {keyJson && keyJson.hasOwnProperty(key) && (
                              <Tooltip
                                content={
                                  visible ? (
                                    <ScrollShadow>
                                      <RenderTooltip tooltip={tooltip} />
                                    </ScrollShadow>
                                  ) : null
                                }
                                motionProps={{
                                  variants: {
                                    exit: {
                                      opacity: 0,
                                      transition: {
                                        duration: 0.1,
                                        ease: "easeIn",
                                      },
                                    },
                                    enter: {
                                      opacity: 1,
                                      transition: {
                                        duration: 0.15,
                                        ease: "easeOut",
                                      },
                                    },
                                  },
                                }}
                                showArrow
                                placement="right"
                                closeDelay={50}
                                delay={10}
                                classNames={{
                                  base: [
                                    "before:bg-neutral-400 dark:before:bg-white width-[300px]",
                                  ],
                                  content: [
                                    "py-2 px-4 shadow-xl w-[300px] max-h-[450px] overflow-y-scroll",
                                    "text-white ",
                                  ],
                                }}
                              >
                                <div className="flex gap-2 items-center">
                                  <span onMouseEnter={() => handleTooltip(key)}>
                                    <AiOutlineInfoCircle
                                      color={darkMode ? "white" : "black"}
                                    />
                                  </span>
                                </div>
                              </Tooltip>
                            )}
                          </div>
                        }
                      >
                        {typeof dupjson[key] === "object" && (
                          <RenderAccordion
                            data={dupjson[key]}
                            path={key}
                            handlejs={handlejs}
                            keyJson={keyJson}
                            tooltip={tooltip}
                            setTooltip={setTooltip}
                          />
                        )}
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <div>
                      <ReusableInput
                        key={key + "Accordian"}
                        darkMode={darkMode}
                        label={key}
                        labelPlacement="outside"
                        handleChange={(e) => {
                          // setHandleValue(e )
                          handleChange(e.target.value, key);
                        }}
                        type="text"
                        isClearable={false}
                        endContent={
                          keyJson &&
                          keyJson.hasOwnProperty(key) && (
                            <Tooltip
                              content={
                                visible ? (
                                  <ScrollShadow>
                                    <RenderTooltip tooltip={tooltip} />
                                  </ScrollShadow>
                                ) : null
                              }
                              motionProps={{
                                variants: {
                                  exit: {
                                    opacity: 0,
                                    transition: {
                                      duration: 0.1,
                                      ease: "easeIn",
                                    },
                                  },
                                  enter: {
                                    opacity: 1,
                                    transition: {
                                      duration: 0.15,
                                      ease: "easeOut",
                                    },
                                  },
                                },
                              }}
                              showArrow
                              placement="bottom"
                              closeDelay={50}
                              delay={10}
                              classNames={{
                                base: [
                                  "before:bg-neutral-400 dark:before:bg-white width-[300px]",
                                ],
                                content: [
                                  "py-2 px-4 shadow-xl w-[300px] max-h-[450px] overflow-y-scroll",
                                  "text-black ",
                                ],
                              }}
                            >
                              <span onMouseEnter={() => handleTooltip(key)}>
                                <AiOutlineInfoCircle
                                  color={darkMode ? "white" : "black"}
                                />
                              </span>
                            </Tooltip>
                          )
                        }
                        defaultValue={dupjson[key]}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     console.log(
                        //       currentPath + "." + index,
                        //       "string"
                        //     );
                        //     handlejs(
                        //       handleValue,
                        //       currentPath + "." + index
                        //     );
                        //   }
                        // }}
                      />

                      {/* <Input
                          isClearable
                          labelPlacement="outside"
                          radius="lg"
                          className="text-gray-700 shadow-md"
                          style={{
                            color: darkMode ? "white" : "black",
                          }}
                          classNames={{
                            base: darkMode
                              ? "w-full text-gray-200"
                              : " w-full text-slate-700",
                            label: darkMode
                              ? [
                                  "data-[focused=true]:border-none text-sm font-bold text-white",
                                ]
                              : [
                                  "data-[focused=true]:border-none text-sm font-bold text-zinc-700",
                                ],
                            mainWrapper: "h-full text-slate-700 ",
                            input: darkMode
                              ? [
                                  "bg-transparent",
                                  "text-white",
                                  "placeholder:text-sm text-white ",
                                ]
                              : [
                                  "bg-transparent",
                                  "text-black",
                                  "placeholder:text-sm text-black ",
                                ],
                            inputWrapper: darkMode
                              ? [
                                  "h-[10px] rounded-md text-slate-700 bg-transparent hover:bg-[#D9DEE8] hover:border-blue-500/50 hover:text-slate-700 border border-slate-500/50 ",
                                  "data-[focused=true]:border-pink-500/50",
                                ]
                              : [
                                  "h-[10px] rounded-md text-black bg-transparent hover:bg-[#D9DEE8] hover:border-blue-500/50 hover:text-pink-500 border border-slate-500/75 ",
                                ],
                          }}
                          onValueChange={(e) => {
                            handleChange(e, key);
                          }}
                          defaultValue={dupjson[key]}
                          // onKeyDown={(e) => {
                          //   if (e.key === "Enter") {
                          //     handlejs(value, key);
                          //   }
                          // }}
                        /> */}
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
      ) : (
        <div
        // style={{
        //   display: dupjson && Object.keys(dupjson).length == 0 ? "block" : "none",
        // }}
        >
          <span
            className="fileUpload"
            style={{ color: darkMode ? "white" : "black" }}
          >
            <Upload id="accordianUpload" setFiles={setFiles} />
          </span>
        </div>
      )}
    </div>
  );
};
