/* eslint-disable */
import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  memo,
} from "react";
import { Tooltip } from "@nextui-org/react";
import _ from "lodash";

import UiDecider from "../UiDecider";

import { PopupAddElements } from "../reusableUiElements/PopupAddElements";
import { BuilderContext } from "../../builder";

import useOnClickOutsideRef from "../../../commonComponents/customhooks/outsidecall";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";

import { RenderTooltip } from "../utils/RenderTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { SvgAddingIcon, SvgDeletingIcon } from "../../../asset/SvgsApplication";
import { RiAddBoxLine } from "react-icons/ri";
import ReusableInput from "../../../commonComponents/reusableComponents/ReusableInput";
import { handlepath } from "../utils/utils";
import { InputEditor } from "../reusableUiElements/InputEditor";
import { TextAreaEditor } from "../reusableUiElements/TextAreaEditor";

export const Selectedjson = createContext();

const HoverIcon = memo(
  ({
    Hovered,

    options,

    keys,
    isAdmin,
    node,

    HoverKey,
    path,
  }) => {
    const [toggleAdd, setToggleAdd] = useState(false);
    const { darkmode } = useContext(DarkmodeContext);

    const { functionality } = useContext(BuilderContext);

    return (
      <>
        <div
          style={{
            display: "flex",
            gap: "10px",
            visibility: Hovered === HoverKey ? "visible" : "hidden",
          }}
        >
          {
            <div
              style={{
                width: "100%",
                height: "20%",
                display: "flex",
                padding: "2px",

                gap: "5px",
                justifyContent: "flex-end",
              }}
            >
              <span
                title="Add"
                className="icon-button"
                style={{
                  display: isAdmin?.canAdd ? "inline" : "none",
                  cursor: "pointer",
                }}
                onClick={() => setToggleAdd(true)}
              >
                <RiAddBoxLine
                  color={darkmode ? "white" : "black"}
                  opacity={0.5}
                />
              </span>

              <span
                title="Delete"
                style={{
                  display: isAdmin?.canDelete ? "inline" : "none",
                  cursor: "pointer",
                }}
                htmlFor=""
                onClick={() => {
                  functionality("delete", path);
                }}
              >
                <SvgDeletingIcon />
              </span>
            </div>
          }
        </div>

        <PopupAddElements
          type={
            Array.isArray(node[keys])
              ? "array"
              : typeof node[keys] === "object" && "object"
          }
          options={options}
          json={node[keys]}
          path={path}
          arrIndex={Array.isArray(node[keys]) ? node[keys].length : null}
          setVisble={setToggleAdd}
          visible={toggleAdd}
        />
      </>
    );
  }
);

const TreeObj = memo(
  ({
    keyJson,
    node,
    index,
    keys,
    iterator,
    setSelectedJson,
    dp,

    isAdmin,
    setPath,

    totalOptions,
    depth,
    totalColors,
    path,
    type,
  }) => {
    const { functionality, collapse } = useContext(BuilderContext);
    const [isOpen, setIsOpen] = useState(false);
    const [Hovered, setHovered] = useState(null);

    const { selectedjson, setSelectjs } = useContext(Selectedjson);

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [selectedkey, setSelectedkey] = useState(null);
    const modalRef = useOnClickOutsideRef(() => setSelected(false));
    const { darkmode } = useContext(DarkmodeContext);

    useEffect(() => {
      try {
        if (selectedjson) {
          if (selectedjson?.path === path) {
            handleClick();
          }
        }
      } catch (error) {
        console.error(error);
      }
    }, [node]);

    useEffect(() => {
      setIsOpen(collapse);
    }, [collapse]);

    useEffect(() => {
      try {
        setOptions(totalOptions[depth]?.options);
      } catch (error) {
        console.error(error);
      }
    }, [totalOptions]);

    const toogle = () => {
      try {
        setIsOpen(!isOpen);
      } catch (error) {
        console.error(error);
      }
    };

    const handleClick = useCallback(() => {
      try {
        setSelectjs({
          json: node[keys],
          path: path,
          title: keys,
          depth: depth,
        });
      } catch (error) {
        console.error(error);
      }
    }, [node, keys]);

    return (
      <div className="flex flex-col gap-2 pb-2 ">
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: "5px",
            marginLeft: "2px",
          }}
        >
          <span
            className=" transition-all-ease-in duration-500 hover:bg-gray-300/40
              p-2 flex items-center justify-center  rounded-2xl"
            role="button"
            style={{
              border: "none",
            }}
            onClick={() => {
              toogle();
            }}
          >
            {isOpen ? (
              <IoIosArrowDown color={darkmode ? "white" : "black"} />
            ) : (
              <IoIosArrowForward color={darkmode ? "white" : "black"} />
            )}
          </span>

          <span className="flex items-center justify-center">
            <span
              className="circle"
              style={{
                backgroundColor: `${totalColors[depth]?.color}`,
              }}
            >
              <span className="flex p-2.5 items-center justify-center text-white">
                {totalOptions[depth]?.L}
              </span>
            </span>
          </span>

          <span
            style={{
              width: "100%",
              height: "100%",
              display: "flex",

              alignItems: "center",
              justifyContent: "space-between",
            }}
            onMouseEnter={() => setHovered(index + keys)}
            onMouseLeave={() => setHovered(null)}
          >
            {selected && selected === index + keys ? (
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  display: "flex",

                  borderRadius: "20px",
                  padding: "5px",
                  backgroundColor: "transparent",
                }}
                ref={modalRef}
              >
                <ReusableInput
                  key={path + "." + keys}
                  isClearable
                  defaultValue={keys}
                  handleChange={(e) => setSelectedkey(e.target.value)}
                  type="text"
                  inputProps={{
                    onkeydown: (e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        functionality("edit", path, selectedkey);
                      }
                    },
                  }}
                />
              </div>
            ) : (
              <>
                <b
                  className={darkmode ? "text-white" : "text-black"}
                  onClick={() =>
                    setSelectjs({
                      json: node[keys],
                      path: path,
                      title: keys,
                      depth: depth,
                    })
                  }
                  onDoubleClick={() => setSelected(index + keys)}
                >
                  {isNaN(Number(keys)) ? keys : "*"}
                </b>

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
              </>
            )}

            <HoverIcon
              Hovered={Hovered}
              node={node}
              keys={keys}
              isAdmin={isAdmin}
              dp={dp}
              options={options}
              HoverKey={index + keys}
              totalOptions={totalOptions}
              depth={depth}
              totalColors={totalColors}
              path={path}
              type={type}
            />
          </span>
        </div>
        {isOpen && (
          <div
            className={
              darkmode
                ? `bg-[#494949] border-l-1  pt-2 border-slate-600/40  rounded-lg hover:${
                    dp === 0 && "bg-slate-600"
                  } transition-all duration-150 `
                : `pt-2 bg-slate-100 border-l-1 border-gray-600/40 
             rounded-lg hover:${
               dp === 0 && "bg-slate-200"
             } transition-all duration-150  font-normal text-black`
            }
          >
            {typeof node[keys] === "object" && (
              <TreeEditor
                keyJson={keyJson}
                key={index + keys}
                json={node[keys]}
                iterator={iterator + 1}
                parentType={Array.isArray(node[keys]) ? "array" : "object"}
                setSelectedJson={setSelectedJson}
                dp={dp + 1}
                isAdmin={isAdmin}
                setPath={setPath}
                totalOptions={totalOptions}
                depth={depth}
                totalColors={totalColors}
                path={path}
                type={type}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

const TreeEditor = memo(
  ({
    keyJson,

    json,
    iterator,
    to = null,

    setPath,
    totalOptions,
    depth,

    isAdmin,
    totalColors,
    parentType,

    setSelectedJson,
    dp,
    selectedjs,
    path,
    type,
  }) => {
    const [js, setJson] = useState(null);

    useEffect(() => {
      try {
        setJson(json);
      } catch (error) {
        console.error(error);
      }
    }, [json]);

    return (
      <>
        {js && (
          <div
            className="tree "
            style={{
              paddingLeft: "5px",

              transitionDelay: "1s",
            }}
          >
            {Object.keys(js) &&
              Object.keys(js).length > 0 &&
              Object.keys(js).map((key, index) => {
                if (typeof js[key] === "object") {
                  return (
                    <TreeObj
                      key={path + "." + key}
                      keyJson={keyJson}
                      dp={dp}
                      node={js}
                      index={index}
                      keys={key}
                      iterator={iterator}
                      setSelectedJson={setSelectedJson}
                      isAdmin={isAdmin}
                      setPath={setPath}
                      parentType={parentType}
                      selectedjs={selectedjs}
                      totalOptions={totalOptions}
                      depth={depth + 1}
                      totalColors={totalColors}
                      path={path + "." + key}
                      type={type}
                    />
                  );
                }
                if (key !== "isHeader" && key !== "path")
                  return (
                    <>
                      {type !== "" ? (
                        <TextAreaEditor
                          keyJson={keyJson}
                          key={path + "." + key}
                          keys={key}
                          nodes={js}
                          totalOptions={totalOptions}
                          depth={depth + 1}
                          totalColors={totalColors}
                          path={path + "." + key}
                        />
                      ) : (
                        <InputEditor
                          keyJson={keyJson}
                          key={path + "." + key}
                          keys={key}
                          nodes={js}
                          totalOptions={totalOptions}
                          depth={depth + 1}
                          totalColors={totalColors}
                          path={path + "." + key}
                        />
                      )}
                    </>
                  );
              })}
          </div>
        )}
      </>
    );
  }
);

const TreeView = memo(
  ({
    json,
    keyJson,
    iterator,
    getjson,
    setPath,
    totalOptions,
    depth,
    setDepth,
    isAdmin,
    totalColors,
    parentType,
    level,
    uiPolicy,
    children,
    path,
    type,
  }) => {
    const [selectedjson, setSelectedJson] = useState(null);
    const [treejson, settreejson] = useState(null);

    const [options, setOptions] = useState(null);

    const [visible, setVisible] = useState(false);
    const { darkmode } = useContext(DarkmodeContext);

    const setSelectjs = useCallback(
      (json) => {
        try {
          setSelectedJson(json);
        } catch (err) {
          console.error(err);
        }
      },
      [setSelectedJson]
    );
    useEffect(() => {
      try {
        settreejson(json);
      } catch (err) {
        console.error(err);
      }
    }, [json]);

    useEffect(() => {
      try {
        setOptions(totalOptions[depth]?.options);
      } catch (error) {
        console.error(error);
      }
    });

    return (
      <>
        {treejson && (
          <Selectedjson.Provider value={{ selectedjson, setSelectjs }}>
            <div
              key={path + "tree"}
              className={
                darkmode
                  ? " bg-[#434343] border border-gray-500/40 rounded-md shadow-lg"
                  : "bg-slate-100 border border-slate-100 rounded-md shadow-lg"
              }
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: "5px",
                padding: "8px",
                minHeight: "30%",
                maxHeight: "100%",
              }}
            >
              <div
                className={
                  darkmode
                    ? "tree shadow-xl  rounded-md border border-gray-400/30"
                    : "tree shadow-xl  rounded-md border border-slate-100"
                }
                style={{
                  color: "white",
                  backgroundColor: darkmode ? "#595959" : "white",
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  minHeight: "20%",
                  maxHeight: "100%",
                  minWidth: "25%",
                  maxWidth: "40%",
                }}
              >
                <div>
                  <div>
                    <span onClick={() => setVisible(true)}>
                      <Tooltip content="Add Element">
                        <SvgAddingIcon />
                      </Tooltip>
                    </span>
                  </div>
                  <PopupAddElements
                    type={
                      Array.isArray(treejson)
                        ? "array"
                        : typeof treejson === "object" && "object"
                    }
                    options={options}
                    json={treejson}
                    path={path}
                    visible={visible}
                    setVisble={setVisible}
                  />
                  <div style={{ width: "55%", margin: "10px" }}>{children}</div>
                </div>
                <div
                  style={{ width: "98%", height: "98%", overflowY: "scroll" }}
                >
                  {treejson && (
                    <TreeEditor
                      keyJson={keyJson}
                      json={treejson}
                      iterator={iterator}
                      parentType={parentType}
                      level={level}
                      setSelectedJson={setSelectedJson}
                      dp={0}
                      selectedjs={selectedjson}
                      isAdmin={isAdmin}
                      setPath={setPath}
                      totalOptions={totalOptions}
                      depth={depth}
                      path={path}
                      totalColors={totalColors}
                      type={type}
                    />
                  )}
                </div>
              </div>

              {selectedjson && (
                <div
                  className={
                    darkmode
                      ? "tree shadow-xl  rounded-xl border border-gray-500/50 bg-[#595959]"
                      : "tree shadow-xl  rounded-xl border border-slate-100 bg-white]"
                  }
                  style={{ width: "75%", padding: "10px", overflowY: "scroll" }}
                >
                  <UiDecider
                    keyJson={keyJson}
                    title={selectedjson.title}
                    uiPolicy={uiPolicy}
                    json={selectedjson.json}
                    path={selectedjson.path}
                    depth={selectedjson.depth}
                    isAdmin={isAdmin}
                    totalOptions={totalOptions}
                    totalColors={totalColors}
                    getjson={getjson}
                    setPath={setPath}
                    setDepth={setDepth}
                    level={level}
                    type={type}
                  />
                </div>
              )}
            </div>
          </Selectedjson.Provider>
        )}
      </>
    );
  }
);

export default TreeView;
