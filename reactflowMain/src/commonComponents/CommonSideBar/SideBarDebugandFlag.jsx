

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
  darkmode,
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
    <>
      {sideBarData && currentDrawing === "SF" && (
        <>
          <div className="flex flex-wrap">
            {Object.entries(sideBarData?.data).map(([key, value]) => (
              <>
                {key === "SIFlag" && (
                  <div className="mt-0 px-2 w-full py-2 text-default-100">
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
                        darkmode
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
                  <div className="mt-0 px-2 w-full py-2 text-default-100">
                    <ReusableDropDown
                      key={key}
                      title={
                        actionAllowed && Array.from(actionAllowed).length > 0
                          ? Array.from(actionAllowed).join(", ")
                          : value && value.length > 0
                            ? value.join(", ")
                            : "Action Allowed"
                      }
                      buttonClassName={`${
                        darkmode
                          ? "w-full h-[40px] border border-slate-400/30 text-[#F4F4F5] "
                          : "w-full h-[40px] border border-slate-400/30 text-black "
                      }`}
                      selectedKey={
                        value && value.length ? new Set(value) : actionAllowed
                      }
                      handleSelectedKey={handleAAlag}
                      items={items}
                    />
                  </div>
                )}

                {key === "actionDenied" && (
                  <div className="mt-0 px-2 w-full py-2 text-default-100">
                    <ReusableDropDown
                      key={key}
                      title={
                        actionDenied && Array.from(actionDenied).length > 0
                          ? Array.from(actionDenied).join(", ")
                          : value && value.length > 0
                            ? value.join(", ")
                            : "Action Denied"
                      }
                      buttonProps={{
                        onClick: () => {
                          if (actionDenied.includes("*")) {
                            setActionDenied([]);
                          }
                        },
                      }}
                      buttonClassName={`${
                        darkmode
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
              className="w-full mt-4 bg-blue-500 font-bold text-sm rounded-md p-2 cursor-pointer text-white hover:shadow-md hover:shadow-[#414141]"
              onClick={() => handleSave()}
            >
              S A V E
            </Button>

            {status && !emptyStatus && !valueMsg && (
              <div className="col-span-4 mt-4 p-2 text-center  bg-blue-500/90 border border-slate-100 rounded-md">
                <p className="text-white font-bold">
                  {" "}
                  OPTIONS Were saved into Object{" "}
                </p>
              </div>
            )}
            {emptyStatus && !status && !valueMsg && (
              <div className="col-span-4 mt-4 p-2 text-center  bg-red-500/90 border border-slate-100 rounded-md">
                <p className="text-white font-bold">
                  {" "}
                  EMPTY values were not saved{" "}
                </p>
              </div>
            )}

            {valueMsg && !status && !emptyStatus && (
              <div className="col-span-4 mt-4 p-2 text-center  bg-red-500/90 border border-slate-100 rounded-md">
                <p className="text-white font-bold">
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
                title: darkmode
                  ? "w-full text-md font-bold text-blue-400"
                  : "w-full text-md font-bold text-blue-700",
                indicator: darkmode
                  ? "text-white font-bolder text-md"
                  : "text-black font-bolder text-md",
              }}
              startContent={
                <IoIosInformationCircle
                  className={
                    darkmode
                      ? "text-blue-400 font-bolder text-lg"
                      : "text-blue-700 font-bolder text-lg"
                  }
                />
              }
            >
              <div className="flex flex-row w-full justify-center">
                <div className="flex flex-col mt-4">
                  <Button
                    isDisabled={!upIdKey}
                    className={
                      darkmode
                        ? `rounded-md w-[100px] h-[35px] hover:bg-blue-500 hover:shadow-lg ml-[5px] mt-[-5px]
                            ${!activeTab ? "bg-slate-600 text-slate-800/65" : " bg-[#009BC9] text-slate-50"}  
                            flex items-center justify-center cursor-pointer  shadow-md`
                        : `rounded-md w-[100px] h-[35px] hover:bg-blue-500 hover:shadow-lg 
                            ${activeTab ? "bg-[#009BC9] text-slate-800/65 " : " bg-slate-300 text-slate-800"}
                            ${!upIdKey ? "cursor-not-allowed" : "cursor-pointer"}  
                             flex items-center justify-center cursor-pointer  shadow-md`
                    }
                    onClick={handleDebug}
                  >
                    <VscDebug
                      className={`border border-gray-600/50 p-[3px]  rounded cursor-pointer active:opacity-50 transition-all ${
                        darkmode
                          ? " hover:text-white hover:border-gray-200/80"
                          : " hover:text-gray-700 hover:border-gray-700 "
                      }`}
                      size={25}
                      color={darkmode ? "#F4F4F5" : "#616A6B "}
                    />
                  </Button>
                  <p
                    className={`${
                      darkmode
                        ? "text-[#F4F4F5] text-sm ml-[20px] mt-1 font-semibold mb-3 "
                        : "text-black text-sm  ml-[20px] mt-1  font-semibold mb-3"
                    }   cursor-pointer }`}
                  >
                    Debug
                  </p>
                </div>
                <div className="flex flex-col mt-4">
                  <Button
                    isDisabled={!upIdKey}
                    onClick={handleRequest}
                    className={
                      darkmode
                        ? `rounded-md w-[100px] h-[35px] hover:bg-blue-500 hover:shadow-lg ml-[5px] mt-[-5px]
                            ${!activeTab ? "bg-slate-600 text-slate-800/65" : " bg-[#009BC9] text-slate-50"}  
                            flex items-center justify-center cursor-pointer  shadow-md`
                        : `rounded-md w-[100px] h-[35px] hover:bg-blue-500 hover:shadow-lg 
                            ${activeTab ? "bg-[#009BC9] text-slate-800/65 " : " bg-slate-300 text-slate-800"}  
                           flex items-center justify-center cursor-pointer  shadow-md`
                    }
                  >
                    <VscGitPullRequestGoToChanges
                      className={`  p-[3px]  rounded cursor-pointer active:opacity-50 transition-all ${
                        darkmode
                          ? " hover:text-white hover:border-gray-200/80"
                          : " hover:text-gray-700 hover:border-gray-700 "
                      }`}
                      size={25}
                      color={darkmode ? "#F4F4F5" : "#616A6B "}
                    />
                  </Button>
                  <p
                    className={`${
                      darkmode
                        ? "text-[#F4F4F5] text-sm ml-[27px] mt-1 font-semibold mb-3 "
                        : "text-black text-sm  ml-[27px] mt-1  font-semibold mb-3"
                    }   cursor-pointer }`}
                  >
                    Request
                  </p>
                </div>

                <div className="flex flex-col mt-4">
                  <Button
                    className={
                      darkmode
                        ? `rounded-md w-[100px] h-[35px] hover:bg-blue-500 hover:shadow-lg ml-[5px] mt-[-5px]
                            ${!activeTab ? "bg-slate-600 text-slate-800/65" : " bg-[#009BC9] text-slate-50"}  
                            flex items-center justify-center cursor-pointer  shadow-md`
                        : `rounded-md w-[100px] h-[35px] hover:bg-blue-500 hover:shadow-lg 
                            ${activeTab ? "bg-[#009BC9] text-slate-800/65 " : " bg-slate-300 text-slate-800"}
                            ${!upIdKey ? "cursor-not-allowed" : "cursor-pointer"}  
                             flex items-center justify-center cursor-pointer  shadow-md`
                    }
                    onClick={handleSubmit}
                  >
                    <VscSaveAll
                      className={`  p-[3px]  rounded cursor-pointer active:opacity-50 transition-all ${
                        darkmode
                          ? " hover:text-white hover:border-gray-200/80"
                          : " hover:text-gray-700 hover:border-gray-700 "
                      }`}
                      size={25}
                      color={darkmode ? "#F4F4F5" : "#616A6B "}
                    />
                  </Button>
                  <p
                    className={`${
                      darkmode
                        ? "text-[#F4F4F5] text-sm ml-[20px] mt-1 font-semibold mb-3 "
                        : "text-black text-sm  ml-[20px] mt-1  font-semibold mb-3"
                    }   cursor-pointer }`}
                  >
                    Submit
                  </p>
                </div>
              </div>
              <div className="ml-[85px] flex flex-col mt-1">
                <Button
                  className={
                    darkmode
                      ? `rounded-md w-[150px] h-[35px] hover:bg-blue-500 hover:shadow-lg ml-[-16px] mt-[-5px]
                            ${!activeTab ? "bg-blue-500 text-slate-800/65" : " bg-[#009BC9] text-slate-50"}  
                            flex items-center justify-center cursor-pointer  shadow-md`
                      : `rounded-md w-[150px] h-[35px] ml-[-16px] hover:bg-blue-500 hover:shadow-lg 
                            ${activeTab ? "bg-blue-500 text-slate-800/65 " : " bg-blue-500 text-slate-800"}
                            ${!upIdKey ? "cursor-not-allowed" : "cursor-pointer"}  
                             flex items-center justify-center cursor-pointer  shadow-md`
                  }
                  onClick={() => {
                    setSideResponse(!sideResponse);
                  }}
                >
                  <BsCollectionPlay
                    className={`  p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                      darkmode
                        ? " hover:text-white hover:border-gray-200/80"
                        : " hover:text-gray-700 hover:border-gray-700 "
                    }`}
                    size={25}
                    color={darkmode ? "#F4F4F5" : "#616A6B "}
                  />
                </Button>
                <p
                  className={`${
                    darkmode
                      ? "text-[#F4F4F5] text-sm ml-[15px] mt-1 font-semibold mb-3 "
                      : "text-black text-sm  ml-[15px] mt-1  font-semibold mb-3"
                  }   cursor-pointer }`}
                >
                  Response
                </p>
              </div>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </>
  );
};
