import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { BsCollectionPlay } from "react-icons/bs";
import { IoIosInformationCircle } from "react-icons/io";
import {
  VscDebug,
  VscGitPullRequestGoToChanges,
  VscSaveAll,
} from "react-icons/vsc";
import ReusableDropDown from "../reusableComponents/ReusableDropDown";

export const SideBarDebugandFlag = ({
  sideBarData,
  currentDrawing,
  darkMode,
  SIFlag,
  handleSIFlagselection,
  actionAllowed,
  setActionAllowed,
  handleAAlag,
  actionDenied,
  setActionDenied,
  handleADlag,
  handleSave,
  status,
  emptyStatus,
  valueMsg,
  options,
  items,
  activeTab,
  handleDebug,
  handleRequest,
  handleSubmit,
  setSideResponse,
  sideResponse,
  upIdKey,
}) => {
  return (
    <div className="h-30">
      {sideBarData && currentDrawing === "SF" && (
        <>
          <div className="flex flex-wrap">
            {Object.entries(sideBarData?.data).map(([key, value]) => (
              <>
                {key === "SIFlag" && (
                  <div className="mt-0 w-full px-2 py-2 text-default-100">
                    <ReusableDropDown
                      key={key}
                      title={
                        SIFlag && Array.from(SIFlag).length > 0
                          ? SIFlag
                          : value && value.length > 0
                            ? value
                            : "SI-Flag"
                      }
                      buttonClassName={`${
                        darkMode
                          ? "w-full h-[40px] border border-slate-400/30 text-[#F4F4F5] "
                          : "w-full h-[40px] border border-slate-400/30 text-black "
                      }`}
                      selectedKey={
                        value && value.length ? new Set(value) : SIFlag
                      }
                      handleSelectedKey={handleSIFlagselection}
                      items={
                        options &&
                        options?.map((item, index) => {
                          return {
                            key: item.key,
                            label: item.label,
                          };
                        })
                      }
                    />
                  </div>
                )}

                {key === "actionAllowed" && (
                  <div className="mt-0 w-full px-2 py-2 text-default-100">
                    <ReusableDropDown
                      key={key}
                      selectionMode="multiple"
                      title={
                        actionAllowed && Array.from(actionAllowed).length > 0
                          ? Array.from(actionAllowed).join(", ")
                          : value && value.length > 0
                          ? value.join(", ")
                          : "Action Allowed"
                      }
                      buttonClassName={`${
                        darkMode
                          ? "w-full h-[40px] border border-slate-400/30 text-[#F4F4F5] "
                          : "w-full h-[40px] border border-slate-400/30 text-black "
                      }`}
                      selectedKey={
                        value && value.length ? new Set(value) : actionAllowed}
                      handleSelectedKey={handleAAlag}
                      items={items}
                    />
                  </div>
                )}

                {key === "actionDenied" && (
                  <div className="mt-0 w-full px-2 py-2 text-default-100">
                    <ReusableDropDown
                      key={key}
                      title={
                        actionDenied && Array.from(actionDenied).length > 0
                          ? Array.from(actionDenied).join(", ")
                          : value && value.length > 0
                            ? value.join(", ")
                            : "Action Denied"
                      }
                      // buttonProps={{
                      //   onClick: () => {
                      //     if (actionDenied.includes("*")) {
                      //       setActionDenied([]);
                      //     }
                      //   },
                      // }}
                       selectionMode="multiple"
                      buttonClassName={`${
                        darkMode
                          ? "w-full h-[40px] border border-slate-400/30 text-[#F4F4F5] "
                          : "w-full h-[40px] border border-slate-400/30 text-black "
                      }`}
                      selectedKey={
                        value && value.length ? new Set(value) : actionDenied
                      }
                      handleSelectedKey={handleADlag}
                      items={items}
                    />
                  </div>
                )}
              </>
            ))}

            <Button
              className="mt-4 w-full cursor-pointer rounded-md bg-blue-500 p-2 text-sm font-bold text-white hover:shadow-md hover:shadow-[#414141]"
              onClick={() => handleSave()}
            >
              S A V E
            </Button>

            {status && !emptyStatus && !valueMsg && (
              <div className="col-span-4 mt-4 rounded-md border  border-slate-100 bg-blue-500/90 p-2 text-center">
                <p className="font-bold text-white">
                  {" "}
                  OPTIONS Were saved into Object{" "}
                </p>
              </div>
            )}
            {emptyStatus && !status && !valueMsg && (
              <div className="col-span-4 mt-4 rounded-md border  border-slate-100 bg-red-500/90 p-2 text-center">
                <p className="font-bold text-white">
                  {" "}
                  EMPTY values were not saved{" "}
                </p>
              </div>
            )}

            {valueMsg && !status && !emptyStatus && (
              <div className="col-span-4 mt-4 rounded-md border  border-slate-100 bg-red-500/90 p-2 text-center">
                <p className="font-bold text-white">
                  VALUES were not Applicable
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {sideBarData && currentDrawing === "PF" && (
        <>
          <Accordion>
            <AccordionItem
              key={"2"}
              title="Debug"
              classNames={{
                titleWrapper: "w-full",
                title: darkMode
                  ? "w-full text-md font-bold text-blue-400"
                  : "w-full text-md font-bold text-blue-700",
                indicator: darkMode
                  ? "text-white font-bolder text-md"
                  : "text-black font-bolder text-md",
              }}
              startContent={
                <IoIosInformationCircle
                  className={
                    darkMode
                      ? "font-bolder text-lg text-blue-400"
                      : "font-bolder text-lg text-blue-700"
                  }
                />
              }
            >
              <div className="flex w-full flex-row justify-center">
                <div className="mt-4 flex flex-col">
                  <Button
                    isDisabled={!upIdKey}
                    className={
                      darkMode
                        ? `ml-[5px] mt-[-5px] h-[35px] w-[100px] rounded-md hover:bg-blue-500 hover:shadow-lg
                            ${!activeTab ? "bg-slate-600 text-slate-800/65" : " bg-[#009BC9] text-slate-50"}  
                            flex cursor-pointer items-center justify-center  shadow-md`
                        : `h-[35px] w-[100px] rounded-md hover:bg-blue-500 hover:shadow-lg 
                            ${activeTab ? "bg-[#009BC9] text-slate-800/65 " : " bg-slate-300 text-slate-800"}
                            ${!upIdKey ? "cursor-not-allowed" : "cursor-pointer"}  
                             flex cursor-pointer items-center justify-center  shadow-md`
                    }
                    onClick={handleDebug}
                  >
                    <VscDebug
                      className={`cursor-pointer rounded border  border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                        darkMode
                          ? " hover:border-gray-200/80 hover:text-white"
                          : " hover:border-gray-700 hover:text-gray-700 "
                      }`}
                      size={25}
                      color={darkMode ? "#F4F4F5" : "#616A6B "}
                    />
                  </Button>
                  <p
                    className={`${
                      darkMode
                        ? "mb-3 ml-[20px] mt-1 text-sm font-semibold text-[#F4F4F5] "
                        : "mb-3 ml-[20px]  mt-1 text-sm  font-semibold text-black"
                    }   } cursor-pointer`}
                  >
                    Debug
                  </p>
                </div>
                <div className="mt-4 flex flex-col">
                  <Button
                    isDisabled={!upIdKey}
                    onClick={handleRequest}
                    className={
                      darkMode
                        ? `ml-[5px] mt-[-5px] h-[35px] w-[100px] rounded-md hover:bg-blue-500 hover:shadow-lg
                            ${!activeTab ? "bg-slate-600 text-slate-800/65" : " bg-[#009BC9] text-slate-50"}  
                            flex cursor-pointer items-center justify-center  shadow-md`
                        : `h-[35px] w-[100px] rounded-md hover:bg-blue-500 hover:shadow-lg 
                            ${activeTab ? "bg-[#009BC9] text-slate-800/65 " : " bg-slate-300 text-slate-800"}  
                           flex cursor-pointer items-center justify-center  shadow-md`
                    }
                  >
                    <VscGitPullRequestGoToChanges
                      className={`  cursor-pointer  rounded p-[3px] transition-all active:opacity-50 ${
                        darkMode
                          ? " hover:border-gray-200/80 hover:text-white"
                          : " hover:border-gray-700 hover:text-gray-700 "
                      }`}
                      size={25}
                      color={darkMode ? "#F4F4F5" : "#616A6B "}
                    />
                  </Button>
                  <p
                    className={`${
                      darkMode
                        ? "mb-3 ml-[27px] mt-1 text-sm font-semibold text-[#F4F4F5] "
                        : "mb-3 ml-[27px]  mt-1 text-sm  font-semibold text-black"
                    }   } cursor-pointer`}
                  >
                    Request
                  </p>
                </div>

                <div className="mt-4 flex flex-col">
                  <Button
                    className={
                      darkMode
                        ? `ml-[5px] mt-[-5px] h-[35px] w-[100px] rounded-md hover:bg-blue-500 hover:shadow-lg
                            ${!activeTab ? "bg-slate-600 text-slate-800/65" : " bg-[#009BC9] text-slate-50"}  
                            flex cursor-pointer items-center justify-center  shadow-md`
                        : `h-[35px] w-[100px] rounded-md hover:bg-blue-500 hover:shadow-lg 
                            ${activeTab ? "bg-[#009BC9] text-slate-800/65 " : " bg-slate-300 text-slate-800"}
                            ${!upIdKey ? "cursor-not-allowed" : "cursor-pointer"}  
                             flex cursor-pointer items-center justify-center  shadow-md`
                    }
                    onClick={handleSubmit}
                  >
                    <VscSaveAll
                      className={`  cursor-pointer  rounded p-[3px] transition-all active:opacity-50 ${
                        darkMode
                          ? " hover:border-gray-200/80 hover:text-white"
                          : " hover:border-gray-700 hover:text-gray-700 "
                      }`}
                      size={25}
                      color={darkMode ? "#F4F4F5" : "#616A6B "}
                    />
                  </Button>
                  <p
                    className={`${
                      darkMode
                        ? "mb-3 ml-[20px] mt-1 text-sm font-semibold text-[#F4F4F5] "
                        : "mb-3 ml-[20px]  mt-1 text-sm  font-semibold text-black"
                    }   } cursor-pointer`}
                  >
                    Submit
                  </p>
                </div>
              </div>
              <div className="ml-[85px] mt-1 flex flex-col">
                <Button
                  className={
                    darkMode
                      ? `ml-[-16px] mt-[-5px] h-[35px] w-[150px] rounded-md hover:bg-blue-500 hover:shadow-lg
                            ${!activeTab ? "bg-blue-500 text-slate-800/65" : " bg-[#009BC9] text-slate-50"}  
                            flex cursor-pointer items-center justify-center  shadow-md`
                      : `ml-[-16px] h-[35px] w-[150px] rounded-md hover:bg-blue-500 hover:shadow-lg 
                            ${activeTab ? "bg-blue-500 text-slate-800/65 " : " bg-blue-500 text-slate-800"}
                            ${!upIdKey ? "cursor-not-allowed" : "cursor-pointer"}  
                             flex cursor-pointer items-center justify-center  shadow-md`
                  }
                  onClick={() => {
                    setSideResponse(!sideResponse);
                  }}
                >
                  <BsCollectionPlay
                    className={`  cursor-pointer rounded p-[3px] transition-all active:opacity-50 ${
                      darkMode
                        ? " hover:border-gray-200/80 hover:text-white"
                        : " hover:border-gray-700 hover:text-gray-700 "
                    }`}
                    size={25}
                    color={darkMode ? "#F4F4F5" : "#616A6B "}
                  />
                </Button>
                <p
                  className={`${
                    darkMode
                      ? "mb-3 ml-[15px] mt-1 text-sm font-semibold text-[#F4F4F5] "
                      : "mb-3 ml-[15px]  mt-1 text-sm  font-semibold text-black"
                  }   } cursor-pointer`}
                >
                  Response
                </p>
              </div>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
};
