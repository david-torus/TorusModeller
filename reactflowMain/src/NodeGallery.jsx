import React, { useContext } from "react";
import { Header, Text } from "react-aria-components";
import { Back } from "./SVG_Application";
import TorusButton from "./torusComponents/TorusButton";
import { Panel } from "reactflow";
import { EnvSideData } from "./commonComponents/layout/SideBar/SidebarData";
import { TorusModellerContext } from "./Layout";
import { DarkmodeContext } from "./commonComponents/context/DarkmodeContext";

export default function NodeGallery({
  color,
  showFabricSideBar,
  handleSidebarToggle,
  children,
  showNodeProperty,
  selectedControlEvents,
}) {
  const { selectedFabric } = useContext(TorusModellerContext);
  return (
    <Panel
      position="top-left"
      style={{
        left: "6%",
      }}
      className={` 
    ${
      showFabricSideBar
        ? `h-[95%] rounded-lg border border-slate-300 bg-white  dark:border-[#212121]  dark:bg-[#161616]  md:w-4/12  lg:w-2/12  ${showNodeProperty ? "xl:w-[18.0%] 3xl:w-[16%] " : "xl:w-[15.0%] 3xl:w-[12%]"}  3xl:w-[12%] 4xl:w-4/12`
        : "hidden"
    }`}
    >
      <div
        className={`flex h-full  w-full items-center justify-between border-b border-slate-300 p-2 font-medium dark:border-[#212121]  dark:text-white lg:h-[7%] xl:h-[9%] 2xl:h-[9%] 3xl:h-[7%]`}
      >
        <div className="felx-col flex w-[100%] justify-between">
          <div className="flex w-[70%] items-center justify-start">
            <Header
              className={`3xl:text-md font-inter  font-semibold tracking-normal transition-opacity  duration-1000 ease-in-out xl:text-sm 3xl:text-xl`}
            >
              Node Gallery
            </Header>
          </div>
          <div
            className={`flex items-center justify-end ${
              !showFabricSideBar ? "w-[100%]" : "w-[30%]"
            }`}
          >
            <TorusButton
              buttonClassName={`flex justify-center items-center  border border-slate-300 border-l-transparent   transition-transform ease-in-out duration-300 w-[100%] bg-white dark:bg-[#161616] `}
              width={showFabricSideBar ? "sm" : "none"}
              onPress={handleSidebarToggle}
              Children={<Back />}
            />
          </div>
        </div>
      </div>
      <div
        className={`  flex h-[91.5%]  w-[100%] flex-col justify-between  transition-opacity duration-700 ease-in-out`}
      >
        <div className="flex w-full flex-col items-start justify-between overflow-y-scroll p-2  scrollbar-hide xl:max-h-[88%] xl:min-h-[50%] 2xl:max-h-[75%] 2xl:min-h-[35%] ">
          <Loop
            color={color}
            selectedFabric={selectedFabric}
            selectedControlEvents={selectedControlEvents}
          />
        </div>

        <div className="flex w-[100%] items-center justify-center xl:max-h-[7.3%] xl:min-h-[33.5%] 2xl:min-h-[25%] ">
          <div className=" w-[95%] rounded-lg bg-[#F4F5FA] p-3 dark:bg-[#0F0F0F] dark:text-white   ">
            <Text className="font-inter tracking-normal xl:text-sm xl:font-semibold 3xl:text-sm 3xl:font-semibold">
              Upgrade to unlock more features
            </Text>

            <br />
            <p
              slot="description"
              className=" font-inter   tracking-normal xl:text-xs xl:leading-[1.0rem] 2xl:pr-[18px] 2xl:text-sm 2xl:leading-[0.8rem] 3xl:pr-[20px] 3xl:text-sm 3xl:leading-[1.0rem] "
            >
              Enjoy unlimited space for fabrics, applets, extra security
              features & more.
            </p>

            <div className="flex w-[50%] items-center justify-start ">
              <TorusButton
                buttonClassName={"text-white"}
                Children="Upgrade"
                width={"sm"}
                bgColor={"bg-[#0736C4]"}
                outlineColor="torus-hover:ring-[#0736C4]"
                radius="full"
                color={"white"}
                size={"sm"}
                marginT={"mt-2"}
                btncolor={"#0736C4"}
                fontStyle={
                  "font-sfpros 3xl:text-xs 3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter px-1 py-2"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

const Loop = ({ color, selectedControlEvents }) => {
  const { selectedFabric } = useContext(TorusModellerContext);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <>
      {selectedFabric !== "events" ? (
        EnvSideData[selectedFabric] &&
        EnvSideData[selectedFabric].map((item, index) => (
          <div
            key={index}
            className="flex w-full items-center gap-1 rounded-lg p-2 hover:bg-[#F4F5FA] dark:text-white dark:hover:bg-[#0F0F0F]"
            draggable
            onDragStart={(event) => onDragStart(event, item.nodeType)}
          >
            <div
              className={` flex  cursor-grab  items-center justify-center rounded-lg  bg-gray-100 dark:bg-[#0736C4]/15 dark:text-white xl:h-7 xl:w-7 3xl:h-10 3xl:w-10`}
            >
              {React.createElement(item.icon, {
                color: color ? color : "#0736C4",
                size: 18,
                selectedFabric: selectedFabric,
              })}
            </div>
            <span className="cursor-grab px-2 font-inter font-normal tracking-normal xl:text-sm 2xl:text-base 3xl:text-lg">
              {item.label}
            </span>
          </div>
        ))
      ) : (
        <>
          <EventScreen selectedControlEvents={selectedControlEvents} />
        </>
      )}
    </>
  );
};
export const EventScreen = ({ selectedControlEvents }) => {
  // const { selectedControlEvents } = useContext(TorusModellerContext);
  console.log("event screen json", selectedControlEvents);
  const onDragStart = (event, eventName, parentNode) => {
    event.dataTransfer.setData(
      "application/parentNode",
      JSON.stringify(parentNode),
    );
    event.dataTransfer.setData("application/eventName", eventName);
    event.dataTransfer.effectAllowed = "move";
  };

  const { darkMode } = useContext(DarkmodeContext);

  return (
    <>
      {selectedControlEvents && (
        <>
          <span className={`${!darkMode ? "text-white" : "text-black"} `}>
            {selectedControlEvents?.nodeName || selectedControlEvents?.nodeType}
          </span>
          {selectedControlEvents?.events &&
            selectedControlEvents?.events.length > 0 &&
            selectedControlEvents?.events.map((item) => {
              return (
                <div
                  className="mt-2 flex cursor-grab flex-row justify-start gap-2 pl-[10px] text-left text-sm"
                  onDragStart={(event) =>
                    onDragStart(event, item.name, selectedControlEvents)
                  }
                  draggable
                >
                  <span className={`text-black dark:text-white`}>
                    {item.name}
                  </span>
                </div>
              );
            })}
        </>
      )}
    </>
  );
};
