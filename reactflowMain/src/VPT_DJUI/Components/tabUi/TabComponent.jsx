/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import UiDecider from "../UiDecider";
import { BuilderContext } from "../../builder";
import { PopupAddElements } from "../reusableUiElements/PopupAddElements";
import useOnClickOutsideRef from "../../../commonComponents/customhooks/outsidecall";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { Tooltip } from "@nextui-org/react";
import { RenderTooltip } from "../utils/RenderTooltip";
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { SvgAddIcon, SvgDeleteIcon } from "../../../asset/SvgsApplication";
import ReusableInput from "../../../commonComponents/reusableComponents/ReusableInput";
import { handlepath } from "../utils/utils";

export default function TabComponent({
  json,

  path,
  totalOptions,
  depth,
  isAdmin,
  totalColors,

  uiPolicys,
  getjson,

  keyJson,

  level,
  children,
}) {
  const [toggle, setToggle] = useState(true);

  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  const [selectedTab, setSelectedTab] = useState(null);

  const [showspan, setShowSpan] = useState(false);
  const [visible, setVisible] = useState(false);
  const { functionality } = useContext(BuilderContext);
  const [keyvalue, setKeyvalue] = useState(null);
  const [show, setShow] = useState(null);

  const modalRef = useOnClickOutsideRef(() => setShow(null));
  const { darkmode } = useContext(DarkmodeContext);

  useEffect(() => {
    setValue(json);
  }, [json]);

  useEffect(() => {
    setOptions(totalOptions[depth]?.options);
  });

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {value && (
        <div
          key={path + "tab"}
          className="tabContainer"
          style={{
            width: "100%",
            height: "100%",
            padding: "10px",
            backgroundColor: darkmode ? "#1F2937" : "white",
          }}
        >
          <section
            className="tabComponent"
            style={{
              height: "10%",
              width: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <header
              className="rounded-2xl select-none bg-slate-700"
              style={{
                padding: "0.5em",

                borderRadius: "100vw",
                backgroundColor: darkmode ? "#1F2937" : "white",

                boxShadow: "1px 1px 7px 0 rgba(0, 0, 0, 0.16)",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                cursor: "pointer",
                position: "-webkit-sticky",
                position: "sticky",
                top: 0,
                overflow: "scroll",
              }}
            >
              {Object.keys(value) &&
                Object.keys(value).length > 0 &&
                Object.keys(value).map((ele, index) => {
                  if (typeof value[ele] === "object") {
                    return (
                      <div
                        className={
                          "tablabel cursor-pointer " +
                          (selectedTab === ele + index
                            ? ` text-black rounded-xl ${
                                darkmode
                                  ? "bg-slate-400/20 w-[-10px]"
                                  : "bg-gray-100"
                              }`
                            : ``)
                        }
                        key={ele + index}
                        onClick={() => {
                          if (selectedTab === ele + index) {
                            setSelectedTab((prev) => null);
                          } else {
                            setSelectedTab(ele + index);
                          }
                        }}
                      >
                        <label
                          style={{
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                            overflow: "hidden",
                            display: "flex",
                            gap: "10px",
                          }}
                          htmlFor={ele + index}
                          onMouseEnter={() => setShowSpan(ele + index)}
                          onMouseLeave={() => setShowSpan(false)}
                        >
                          <span
                            style={{
                              display: "flex",
                              gap: "5px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <span
                              class="circle"
                              style={{
                                backgroundColor: `${totalColors[depth]?.color}`,
                              }}
                            >
                              <i
                                class={`fa-solid fa-number fa-${totalOptions[depth]?.L}`}
                              ></i>
                            </span>
                            <span
                              style={{
                                display:
                                  show === ele + index ? "none " : "block",
                                color: darkmode ? "white" : "black",
                              }}
                              onDoubleClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShow(ele + index);
                              }}
                            >
                              {ele}
                            </span>
                            {keyJson &&
                              keyJson.hasOwnProperty(
                                handlepath(path + "." + ele)
                              ) && (
                                <Tooltip
                                  content={
                                    <RenderTooltip
                                      tooltip={
                                        keyJson[handlepath(path + "." + ele)]
                                      }
                                    />
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
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <ReusableInput
                                darkmode={darkmode}
                                type="text"
                                defaultValue={ele}
                                handleChange={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setKeyvalue(e.target.value);
                                }}
                                isClearable={false}
                                endContent={
                                  <span
                                    title="Cancel"
                                    style={{
                                      visibility:
                                        show === ele + index
                                          ? "visible"
                                          : "hidden",
                                    }}
                                    onClick={(e) => {
                                      setShow(false);
                                    }}
                                  >
                                    <AiOutlineCloseCircle
                                      color={darkmode ? "white" : "black"}
                                    />
                                  </span>
                                }
                                inputProps={{
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                  },

                                  onKeyDown: (e) => {
                                    if (e.key === "Enter") {
                                      if (keyvalue) {
                                        e.preventDefault();
                                        functionality(
                                          "edit",
                                          path + "." + ele,
                                          keyvalue
                                        );
                                        functionality(
                                          "edit",
                                          path + "." + ele,
                                          keyvalue
                                        );
                                        setShow(false);
                                        setKeyvalue(null);
                                      }
                                    }
                                  },

                                  ref: modalRef,
                                  style: {
                                    display:
                                      show === ele + index ? "block " : "none",
                                  },
                                }}
                              />
                            </span>
                            <span
                              style={{
                                visibility:
                                  show === ele + index
                                    ? "hidden"
                                    : showspan === ele + index
                                      ? "visible"
                                      : "hidden",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                functionality("delete", path + "." + ele);
                              }}
                            >
                              <SvgDeleteIcon />
                            </span>
                          </span>
                        </label>
                      </div>
                    );
                  }
                })}
              {children}
            </header>
            <div>
              <span onClick={() => setVisible(true)} className="fileUpload">
                <Tooltip content="Add Element">
                  <SvgAddIcon />
                </Tooltip>
              </span>

              <PopupAddElements
                type={
                  Array.isArray(value)
                    ? "array"
                    : typeof value == "object" && "object"
                }
                options={options}
                json={value}
                path={path}
                visible={visible}
                setVisble={setVisible}
              />
            </div>
          </section>

          <div
            style={{
              width: "100%",
              height: "90%",
              overflow: "scroll",
              visibility: selectedTab == null ? "hidden" : "visible",
            }}
          >
            {Object.keys(value) &&
              Object.keys(value).length > 0 &&
              Object.keys(value).map((ele, index) => {
                if (
                  typeof value[ele] === "object" &&
                  selectedTab === ele + index
                ) {
                  return (
                    <>
                      {totalColors && totalOptions && uiPolicys && (
                        <UiDecider
                          title={ele}
                          uiPolicy={uiPolicys}
                          json={value[ele]}
                          isAdmin={isAdmin}
                          depth={depth}
                          functionality={functionality}
                          totalOptions={totalOptions}
                          totalColors={totalColors}
                          getjson={getjson}
                          level={level}
                          path={path + "." + ele}
                        />
                      )}
                    </>
                  );
                }
              })}
          </div>
        </div>
      )}
    </>
  );
}
