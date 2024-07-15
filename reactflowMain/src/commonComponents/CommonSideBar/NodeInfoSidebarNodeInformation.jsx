
import {
  Accordion,
  AccordionItem,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { IoIosInformationCircle } from "react-icons/io";
import ReusableDropDown from "../reusableComponents/ReusableDropDown";
import ReusableInput from "../reusableComponents/ReusableInput";

export const NodeInfoSidebarNodeInformation = ({
  sideBarData,
  currentDrawing,
  handleNames,
  darkmode,
  changeProperty,
  selectedIPC,
  handleIPCselection,
  err,
}) => {
  return (
    <>
      <Accordion>
        <AccordionItem
          key={"2"}
          title="Node Information"
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
          {Object.entries(sideBarData.property).map(([key, value]) => (
            <React.Fragment key={key}>
              {key === "name" && (
                <div className="mt-0 px-2 w-full py-2">
                  <ReusableInput
                    key={key + "nodeInfo"}
                    errrMsg={
                      (err && "Application Already Exists") ||
                      (!value && "Please Enter Application Name")
                    }
                    type="text"
                    darkmode={darkmode}
                    isInvalid={err}
                    defaultValue={value}
                    label={key}
                    handleChange={(e) =>
                      handleNames(e.target.value.replace(/\s/g, ""), key)
                    }
                    labelPlacement="outside"
                  />
                </div>
              )}

              {key === "description" && (
                <div className="mt-0 px-2 w-full py-2">
                  <Textarea
                    defaultValue={value}
                    variant={darkmode ? "bordered" : "flat"}
                    placeholder={key}
                    disableAutosize
                    onValueChange={(e) => changeProperty({ [key]: e })}
                    isClearable
                    radius="lg"
                    style={{
                      outline: "none",
                      border: "none",
                      boxShadow: "none",
                    }}
                    className="text-white shadow-md"
                    classNames={{
                      base: " w-full ",
                      label: "text-sm font-bold text-zinc-700",
                      mainWrapper: "h-full text-slate-700 ",
                      input: darkmode
                        ? [
                            "bg-transparent",
                            "text-white",
                            "placeholder:text-white",
                            "text-sm",
                            "font-bold",
                          ]
                        : [
                            "bg-transparent",
                            "text-black",
                            "placeholder:text-black",
                            "text-sm",
                            "font-bold",
                          ],
                      inputWrapper: darkmode
                        ? [
                            "h-[10px]",
                            "rounded-md bg-transparent border border-slate-500/50",
                            "text-white",
                            "data-[hover=true]:border-blue-500",
                            "data-[focus-visible=true]:ring-pink-900",
                          ]
                        : [
                            "h-[10px]",
                            "rounded-md bg-transparent border border-slate-500/50",
                            "text-black",
                            "bg-gray-300",
                            "data-[hover=true]:border-blue-500",
                            "data-[focus-visible=true]:ring-pink-900",
                          ],
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}

          {sideBarData && sideBarData?.type === "group" && (
            <>
              {Object.entries(sideBarData).map(([key, value]) => (
                <React.Fragment key={key}>
                  {key === "layoutFlag" && (
                    <>
                      <RadioGroup
                        label="Select Flag for Layout"
                        defaultValue={value}
                        onValueChange={(e) => changeProperty({ [key]: e })}
                        color="secondary"
                        size="md"
                      >
                        <Radio value="yes">yes</Radio>
                        <Radio value="no">no</Radio>
                      </RadioGroup>
                    </>
                  )}
                </React.Fragment>
              ))}
            </>
          )}

          {sideBarData && currentDrawing === "PF" && 
                <React.Fragment>
                      <span className="">
                        <p
                          className={
                            darkmode
                              ? "text-white"
                              : "text-black text-md font-bold"
                          }
                        >
                          Select Flag for Layout
                        </p>
                      </span>
                      <ReusableDropDown
                        key={"IPC_flag"}
                        title={ selectedIPC ||sideBarData.property.IPC_flag || "select IPC"}
                        buttonClassName={
                          "bg-[#143C59]/70 border border-slate-400/30 text-white"
                        }
                        selectedKey={selectedIPC || new Set([sideBarData.property.IPC_flag])}
                        handleSelectedKey={handleIPCselection}
                        items={[
                          {
                            key: "AG",
                            label: "AG",
                          },
                          {
                            key: "APP",
                            label: "APP",
                          },
                          {
                            key: "N",
                            label: "N",
                          },
                        ]}
                      />
                </React.Fragment>}
        </AccordionItem>
      </Accordion>
    </>
  );
};
