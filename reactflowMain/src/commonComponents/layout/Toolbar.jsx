import React, { useContext } from "react";
import { DarkmodeContext } from "../context/DarkmodeContext";
import { FabricContext } from "../App&FabricSelection/Fabrics";
import { useReactFlow, getTransformForBounds, getRectOfNodes } from "reactflow";
import { FaRegSave } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { MdOutlineContentCut } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { FaRegPaste } from "react-icons/fa6";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BsWindow } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { BsFiletypeSvg } from "react-icons/bs";
import { BsFiletypePng } from "react-icons/bs";
import { AiOutlineLayout } from "react-icons/ai";
import { IoPlayOutline } from "react-icons/io5";
import { GrMonitor } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";
import { VscDebug } from "react-icons/vsc";
import { toPng, toSvg } from "html-to-image";
import { toast } from "react-toastify";
import { GoZoomIn } from "react-icons/go";
import { GoZoomOut } from "react-icons/go";
import { CgMaximize } from "react-icons/cg";
import { Tooltip } from "@nextui-org/react";
import useCopyPaste from "../react-flow-pro/useCopyPaste";

const Toolbar = ({ undoredo, setMenu, open }) => {
  const { darkMode } = useContext(DarkmodeContext);
  const { zoomIn, zoomOut, fitView, getNodes } = useReactFlow();
  const setSelectedFabric = useContext(FabricContext);

  const { cut, copy, paste, bufferedNodes } = useCopyPaste();
  const saveAsPngOrSvg = (type) => {
    const canvas = document.querySelector(".react-flow__viewport");

    if (!canvas) {
      return toast.error("Canvas not found!", {
        position: "bottom-right",
        theme: darkMode ? "dark" : "light",
      });
    }
    function downloadImage(dataUrl, type) {
      const a = document.createElement("a");

      a.setAttribute("download", type === "png" ? "canvas.png" : "canvas.svg");
      a.setAttribute("href", dataUrl);
      a.click();
    }
    const imageWidth = 1024;
    const imageHeight = 768;
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );
    return toast.promise(
      new Promise((resolve, reject) => {
        if (type === "png")
          toPng(canvas, {
            width: imageWidth,
            height: imageHeight,
            style: {
              width: imageWidth,
              height: imageHeight,
              transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
          })
            .then((data) => {
              downloadImage(data, type);
              resolve("Image saved successfully!");
            })
            .catch((error) => {
              console.error("Error saving image:", error);
              reject("Failed to save image. Please try again later.");
            });
        if (type === "svg")
          toSvg(canvas, {
            style: {
              transform: "translate(0, 0) scale(1)",
            },
          })
            .then((data) => {
              downloadImage(data, type);
              resolve("SVG saved successfully!");
            })
            .catch((error) => {
              console.error("Error SVG :", error);
              reject("Failed to SVG . Please try again later.");
            });
      }),
      {
        pending: "Saving image...",
        success: "Image saved successfully!",
        error: "Failed to save image. Please try again later.",
      },
      {
        position: "bottom-right",
        theme: darkMode ? "dark" : "light",
        autoClose: 300,
      }
    );
  };

  const canCopy = getNodes().some(({ selected }) => selected);
  const canPaste = bufferedNodes.length > 0;

  const handleFullScreen = () => {
    try {
      const elem = document.documentElement;
      if (document.fullscreenEnabled) {
        if (!document.fullscreenElement) {
          elem.requestFullscreen().catch((err) => {
            console.error(
              "Error attempting to enable full-screen mode:",
              err.message
            );
          });
        } else {
          document.exitFullscreen();
        }
      } else {
        console.error("Fullscreen mode is not supported");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        transitionDuration: "1s",

        display: open ? "block" : "none",
      }}
      className={`  w-[100%] h-[100%]  ${
        darkMode
          ? "bg-[#1D1D1D]   border-gray-300/40 rounded-b-lg border-t text-white  "
          : " bg-[#E9E8E8]  border-gray-300/40 rounded-b-lg border-t text-black "
      }`}
    >
      <div>
        <div
          style={{
            opacity: open ? 1 : 0,
            visibility: open ? "visible" : "hidden",
            transitionDuration: open ? "2.5s" : "0.1s",
          }}
          className="flex gap-3 mt-[-2px] "
        >
          <div className="flex flex-row w-full justify-center gap-2 items-center mt-[4px]">
            <Tooltip
              placement="bottom"
              content="Save"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <FaRegSave
                  className={` p-[3px] rounded cursor-pointer border border-gray-600/50 active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700"
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Reload"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <TfiReload
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
          </div>

          <div className="ml-3 flex flex-row w-full justify-center gap-2 items-center mt-[4px]">
            <Tooltip
              placement="bottom"
              content="Undo"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <FaUndo
                  className={`p-[3px] border border-gray-600/50 rounded active:opacity-50 transition-all ${!undoredo?.canUndo ? "cursor-pointer" : "cursor-not-allowed"} ${
                    darkMode
                      ? ` hover:text-white hover:border-gray-200/80  `
                      : "  hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                  onClick={() => {
                    if (!undoredo?.canUndo) {
                      undoredo?.undo();
                      setMenu && setMenu(null);
                    }
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Redo"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <FaRedo
                  className={` border border-gray-600/50 p-[3px] rounded active:opacity-50 transition-all ${!undoredo?.canRedo ? "cursor-pointer" : "cursor-not-allowed"} ${
                    darkMode
                      ? ` hover:text-white hover:border-gray-200/80 `
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                  onClick={() => {
                    if (!undoredo?.canRedo) {
                      undoredo?.redo();
                      setMenu && setMenu(null);
                    }
                  }}
                />
              </span>
            </Tooltip>
          </div>

          <div className="ml-3 flex flex-row w-full justify-center gap-2 items-center mt-[4px]">
            <Tooltip
              placement="bottom"
              content="Cut"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <MdOutlineContentCut
                  onClick={() => cut()}
                  disabled={!canCopy}
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Copy"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <FaRegCopy
                  onClick={() => copy()}
                  disabled={!canCopy}
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Paste"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <FaRegPaste
                  onClick={() => paste({ x: 0, y: 0 })}
                  disabled={!canPaste}
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80"
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
          </div>

          <div className="ml-3 flex flex-row w-full justify-center gap-2 items-center mt-[4px]">
            <Tooltip
              placement="bottom"
              content="Full Screen"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <MdOutlineCheckBoxOutlineBlank
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                  onClick={() => handleFullScreen()}
                />
              </span>
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Window Mode"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <BsWindow
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
          </div>

          <div className="ml-3 flex flex-row w-full justify-center gap-2 items-center mt-[4px]">
            <Tooltip
              placement="bottom"
              content="Search"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <FiSearch
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
          </div>

          <div className="ml-3 flex flex-row w-full justify-center gap-2 items-center mt-[4px]">
            <Tooltip
              placement="bottom"
              content="Save as PNG or SVG"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <BsFiletypeSvg
                  onClick={() => saveAsPngOrSvg("svg")}
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Save as PNG"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <BsFiletypePng
                  onClick={() => saveAsPngOrSvg("png")}
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>

            <Tooltip
              placement="bottom"
              content="Auto Layout Connection"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <AiOutlineLayout
                  className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80 "
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
          </div>

          <div className="ml-3 flex flex-row w-full justify-center gap-2 items-center mt-[4px]">
            <Tooltip
              placement="bottom"
              content="Debug"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <VscDebug
                  className={`border border-gray-600/50 p-[3px]  rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80"
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
          </div>

          <div
            className=" flex flex-row w-full justify-center border 
        border-gray-600/50 gap-2 items-center mt-[4px] rounded "
          >
            <span
              className={`text-sm cursor-pointer ${
                darkMode ? "text-white/70 " : " text-black/80  "
              }`}
            >
              Publish
            </span>
            <IoPlayOutline
              className={` p-[3px]  rounded cursor-pointer active:opacity-50 transition-all ${
                darkMode
                  ? " hover:text-white hover:border-gray-200/80 "
                  : "  hover:text-gray-700 hover:border-gray-700 "
              }`}
              size={25}
              color={darkMode ? "#F4F4F5" : "#616A6B "}
            />
          </div>
          <div
            className="mr-7 flex flex-row w-full justify-center border 
        border-gray-600/50  items-center mt-[4px] rounded"
          >
            <span
              className={`text-sm cursor-pointer ${
                darkMode ? "text-white/70 " : " text-black/80  "
              }`}
            >
              Preview
            </span>
            <GrMonitor
              size={20}
              color={darkMode ? "#F4F4F5" : "#616A6B "}
              className={` p-[3px] ml-1 rounded cursor-pointer active:opacity-50 transition-all ${
                darkMode
                  ? "  hover:text-white hover:border-gray-200/80 "
                  : "  hover:text-gray-700 hover:border-gray-700 "
              }`}
            />
          </div>
          <div className="mr-3 flex flex-row w-full justify-center gap-2 items-center mt-[4px]">
            <Tooltip
              placement="bottom"
              content="Zoom In"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <GoZoomIn
                  onClick={() => {
                    zoomIn();
                  }}
                  className={`border border-gray-600/50 p-[3px]  rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80"
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Zoom Out"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <GoZoomOut
                  onClick={() => {
                    zoomOut();
                  }}
                  className={`border border-gray-600/50 p-[3px]  rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80"
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Fit View"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <CgMaximize
                  onClick={() => {
                    fitView();
                  }}
                  className={`border border-gray-600/50 p-[3px]  rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80"
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Close"
              className={`rounded-md ${
                darkMode
                  ? "bg-[#E9E8E8] text-black  "
                  : "bg-[#333333] text-white "
              }`}
            >
              <span>
                <MdOutlineClose
                  onClick={() => {
                    setSelectedFabric(null);
                  }}
                  className={`border border-gray-600/50 p-[3px]  rounded cursor-pointer active:opacity-50 transition-all ${
                    darkMode
                      ? " hover:text-white hover:border-gray-200/80"
                      : " hover:text-gray-700 hover:border-gray-700 "
                  }`}
                  size={25}
                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
