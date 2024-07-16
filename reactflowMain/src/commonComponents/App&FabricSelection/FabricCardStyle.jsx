import React, { useContext, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { IoSettingsOutline } from "react-icons/io5";
import { DataFabrics } from "../../asset/SvgsApplication";
import { ProcessFlow } from "../../asset/SvgsApplication";
import { UserFabric } from "../../asset/SvgsApplication";
import { OFandSFFabric } from "../../asset/SvgsApplication";
import { DataFabricsDefault } from "../../asset/SvgsApplication";
import { ProcessFlowDefault } from "../../asset/SvgsApplication";
import { UserFabricDefault } from "../../asset/SvgsApplication";
import { DarkmodeContext } from "../context/DarkmodeContext";

const Slide = ({ slide, setSelectedFabric }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);

  /**
   * Handles the mouse move event by getting the clientX and clientY coordinates.
   *
   * @param {MouseEvent} event - The mouse move event.
   * @return {void} This function does not return anything.
   */
  const handleMouseMove = (event) => {
    
  };

  /**
   * Sets the state of isHovered to true.
   *
   * @return {void}
   */
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  /**
   * Sets the state of isHovered to false.
   *
   * @return {void}
   */
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  /**
   * Renders the appropriate SVG component based on the given parameter.
   *
   * @param {string} param - The parameter that determines which SVG component to render.
   * @return {ReactNode} The rendered SVG component.
   */
  const Svgshown = (param) => {
    switch (param) {
      case "DataFabrics":
        return <DataFabrics isHovered={isHovered} />;

      case "ProcessFlow":
        return <ProcessFlow isHovered={isHovered} />;

      case "UserFabric":
        return <UserFabric isHovered={isHovered} />;

      case "Security Fabric":
        return <OFandSFFabric isHovered={isHovered} />;

      case "DataFabricsDefault":
        return <DataFabricsDefault isHovered={isHovered} />;

      case "ProcessFlowDefault":
        return <ProcessFlowDefault isHovered={isHovered} />;

      case "UserFabricDefault":
        return <UserFabricDefault isHovered={isHovered} />;

      default:
        return null;
    }
  };

  //Returning the slide component with the appropriate SVG component and the appropriate headline.
  return (
    <div
      className={`transition-all flex flex-col gap-4 justify-between items-between delay-100 border cursor-pointer ${darkmode ? "bg-[#292929] border-gray-300/40" : "bg-[#E7E7E7] border-gray-600/80"}    rounded-md shadow-lg   slide ${isHovered ? "scale-105 shadow-sm  " : "scale-100"}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setSelectedFabric(slide.button)}
    >
      <div className="w-[300px] h-[150px] ">
        <div className="flex justify-center items-center px-2 py-3">
          {Svgshown(slide.src)}
        </div>
      </div>

      <div
        className={` w-[100%] p-1 rounded-md  bg-transparent flex  justify-center items-center`}
      >
        <h3
          className={`whitespace-nowrap  ${darkmode ? "text-slate-50/90" : "text-black/70"}  object-cover  text-center font-bold`}
        >
          {slide.headline}
        </h3>
      </div>
    </div>
  );
};

const CornerSlide = ({ slide, setSelectedFabric }) => {
  const [isHovered, setIsHovered] = useState(false);
  const  {darkmode} = useContext(DarkmodeContext);




  /**
   * Sets the state variable `isHovered` to `true` when the mouse enters the element.
   *
   * @return {void}
   */
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  /**
   * Sets the state variable `isHovered` to `false` when the mouse leaves the element.
   *
   * @return {void}
   */
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  /**
   * Sets the opacity of the target image element to 0.5 when it is loaded.
   *
   * @param {Event} event - The event object containing information about the image load event.
   * @return {void} This function does not return anything.
   */
  const handleImageLoad = (event) => {
    event.target.style.opacity = 0.5;
  };

  //Returning JSX
  return (
    <div className="w-[100%] flex justify-end items-center">
      <Popover
        classNames={{
          content: "bg-[#717275]",
          base: "w-[150px] h-[150px] ",
        }}
      >
        <PopoverTrigger>
          <button>
            <IoSettingsOutline
              size={23}
              color={darkmode ? "#D3D3D3" : "#474747"}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div
            className={`slide_corner ${isHovered ? "slide--hovered_corner" : ""}`}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            <div className="slide__content_corner">
              <Tooltip
                delay={0}
                closeDelay={0}
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
                content={
                  <div
                    className={`transition-all w-[300px] h-[150px] delay-100 slide ${isHovered ? "scale-105 " : "scale-100"}`}
                  >
                    <img
                      loading="lazy"
                      className={`${isHovered ? "opacity-100 rounded-md" : "opacity-75 rounded-md"}  w-full h-full object-cover rounded-md transition-all `}
                      alt={slide.headline}
                      src={slide.src}
                      onLoad={handleImageLoad}
                    />
                  </div>
                }
                classNames={{
                  content: "bg-[#1a293d] w-[300px] h-[150px] rounded-md",
                }}
              >
                <h3
                  className="whitespace-nowrap text-slate-800 text-center font-bold"
                  onClick={() => setSelectedFabric(slide.button)}
                >
                  {slide.headline}
                </h3>
              </Tooltip>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

/**
 * Renders a grid of fabric cards.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.slides - An array of slide objects.
 * @param {Function} props.setSelectedFabric - A function to set the selected fabric.
 * @return {JSX.Element} The rendered fabric cards.
 */
const FabricCards = ({ slides, setSelectedFabric }) => (
  <>
    <div className="absolute top-[50px] right-[50px]">
      {slides &&
        slides.length > 0 &&
        slides.map((slide) => {
          if (slide.headline === "Defaults Json Ui") {
            return (
              <div>
                <CornerSlide
                  slide={slide}
                  setSelectedFabric={setSelectedFabric}
                />
              </div>
            );
          }
          return null;
        })}
    </div>
    <div className="grid grid-cols-6 w-1366:gap-3 md:justify-center gap-5 w-[100%] h-[100%] ">
      {slides &&
        slides.length > 0 &&
        slides.map((slide) => {
          if (slide.headline !== "Defaults Json Ui") {
            return (
              <div className=" col-span-2 w-1366:col-span-3 w-1366:bg-white">
                <Slide
                  key={slide.index}
                  slide={slide}
                  setSelectedFabric={setSelectedFabric}
                />
              </div>
            );
          }
          return null;
        })}
    </div>
  </>
);

export default FabricCards;
