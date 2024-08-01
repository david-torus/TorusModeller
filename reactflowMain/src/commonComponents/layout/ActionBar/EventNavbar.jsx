import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import { DarkmodeContext } from "../../context/DarkmodeContext";
import { MdOutlineClose } from "react-icons/md";
import { Button, useDisclosure } from "@nextui-org/react";
import { MdOutlineSave, MdOutlineUploadFile } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import {
  getEventsByVersion,
  getInitialEvents,
  handleEvents,
} from "../../../commonComponents/api/eventsApi";
import { toast } from "react-toastify";
import { DeleteModel } from "../../../commonComponents/Model/DeleteModel";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import ReusableDropDown from "../../reusableComponents/ReusableDropDown";
import { TorusModellerContext } from "../../../Layout";
import TorusDropDown from "../../torusComponents/TorusDropDown";
import TorusButton from "../../torusComponents/TorusButton";
import TorusToast from "../../../torusComponents/TorusToaster/TorusToast";
export default function EventNavbar({
  sendDataToFabrics,
  getDataFromFabrics,
  setToggleReactflow,
  tKey,
  project,
  fabrics,
  mainArtifacts,
  mainVersion,
}) {
  const {
    selectedControlEvents,
    eventsNavBarData,
    setSelectedControlEvents,
    setSelectedComponentName,
    selectedComponentName,
    setSelectedControlName,
    selectedControlName,
    selectedVersion,
    selectedTkey,
    selectedProject,
    selectedArtifact,
    client,
  } = useContext(TorusModellerContext);

  const eventSelectedVersion = console.log(
    "eventsNavBarData",
    selectedControlEvents,
  );
  const [open, setOpen] = useState(false);

  const [wordLength, setWordLength] = useState(0);

  const [versions, setVersions] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [defSelectedVersion, setDefSelectedVersion] = useState(null);

  const [selectedDeletingVersinItem, setSelectedDeletingVersionItem] =
    useState(null);

  const { darkMode, toggleDarkMode } = useContext(DarkmodeContext);

  const [selectedComponent, setSelectedComponent] = useState(null);

  const [selectedControl, setSelectedControl] = useState(null);

  console.log(`${selectedTkey},
    ${client},
    ${selectedProject},
    ${selectedArtifact},
    ${selectedVersion}, mkEdit`);

  const openmodal = (type) => {
    try {
      if (type === "version") {
        onOpen();
      }
    } catch (err) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `cannot get ${type}`,
          closeButton: false,
        },
      );

      console.error(err);
    }
  };

  // useEffect(() => {
  //   try {
  //     if (selectedComponentName && selectedControlName) {
  //       getVersionList(
  //         tKey,
  //         client,
  //         project,
  //         fabrics,
  //         mainArtifacts,
  //         mainVersion,
  //         selectedComponentName,
  //         selectedControlName,
  //       );
  //     } else {
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Error in getVersionList:", error);

  //     toast.error("Cannot find Events Version list", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //       theme: darkMode ? "dark" : "light",
  //     });
  //   }
  // }, [
  //   selectedComponentName,
  //   selectedControlName,
  //   client,
  //   project,
  //   darkMode,
  //   fabrics,
  //   mainArtifacts,
  //   mainVersion,
  //   tKey,
  //   getVersionList,
  // ]);

  // useEffect(() => {
  //   try {
  //     if (defSelectedVersion) {
  //       getEventsfromVersion(
  //         selectedTkey,
  //         client,
  //         selectedProject,
  //         "Nextui",
  //         selectedArtifact,
  //         selectedVersion
  //       ).then((res) => {
  //         toast.success(
  //           `Events fetched successfully from ${defSelectedVersion}`,
  //           {
  //             position: "bottom-right",
  //             autoClose: 2000,
  //             theme: darkMode ? "dark" : "light",
  //           },
  //         );
  //       });
  //     } else {
  //       return;
  //     }
  //   } catch (error) {
  //     toast.error("Failed to fetch events.", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //       theme: darkMode ? "dark" : "light",
  //     });

  //     console.error("Error fetching events:", error);
  //   }
  // }, [
  //   defSelectedVersion,
  //   client,
  //   project,
  //   darkMode,
  //   fabrics,
  //   mainArtifacts,
  //   mainVersion,
  //   selectedComponentName,
  //   selectedControlName,
  //   tKey,
  // ]);

  // useEffect(async () => {
  //   try {
  //     const response = await getInitialEvents(
  //       selectedTkey,
  //       client,
  //       selectedProject,
  //       "Nextui",
  //       selectedArtifact,
  //       selectedVersion,
  //     );

  //     if (response && response.status === 200) {
  //       if (response && response.data && response.data.length > 0) {

  //       }
  //     }
  //   } catch {
  //     toast.error("Failed to fetch events.", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //       theme: darkMode ? "dark" : "light",
  //     });
  //   }
  // }, [defSelectedVersion]);

  const saveEvents = async (
    tKey,
    client,
    project,
    fabrics,
    mainArtifacts,
    mainVersion,
    componentName,
    controlName,
    data,
  ) => {
    try {
      const res = await handleEvents(
        tKey,
        client,
        project,
        fabrics,
        mainArtifacts,
        mainVersion,
        componentName,
        controlName,
        data,
        JSON.stringify([
          "TCL",
          tKey,
          fabrics,
          project,
          "pgrp",
          mainArtifacts,
          mainVersion,
        ]),
      );

      if (res && res.status === 200) {
        if (res && res.data && res.data.length > 0) {
          setVersions(res.data);
          setDefSelectedVersion(res.data[res.data.length - 1]);
        }

        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "success",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Success",
            text: `Events saved successfully`,
            closeButton: false,
          },
        );
      }
    } catch (error) {
      console.error(`Error in save Events:`, error);

      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot save Events`,
          closeButton: false,
        },
      );
    }
  };

  const handleComponentChange = (e) => {
    try {
      setSelectedComponent(e);
      const selectedComponentData = eventsNavBarData.find(
        (component) => component.component.nodeId === e,
      );

      setSelectedComponentName(selectedComponentData?.component?.nodeName);

      sendDataToFabrics({
        nodes: [],

        nodeEdges: [],

        nodeProperty: {},
      });

      setSelectedControl(null);

      setSelectedControlName(null);

      setSelectedControlEvents(null);

      setDefSelectedVersion(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleControlChange = (e, commonComponentId, componentName) => {
    try {
      setSelectedControl(Array.from(e)[0]);
      setSelectedComponent(commonComponentId);
      setSelectedComponentName(componentName);
      const selectedComponentData = eventsNavBarData.find(
        (component) => component.component.nodeId === commonComponentId,
      );

      const selectedControlData = selectedComponentData?.controls.find(
        (control) => control.nodeId === Array.from(e)[0],
      );

      sendDataToFabrics({
        nodes: [],

        nodeEdges: [],

        nodeProperty: {},
      });

      setSelectedControlName(selectedControlData?.nodeName);

      setDefSelectedVersion(null);

      setSelectedControlEvents(selectedControlData);

      getEventsByVersion(
        selectedTkey,
        client,
        selectedProject,
        "UF",
        selectedArtifact,
        selectedVersion,
        componentName,
        selectedControlData?.nodeName,
        JSON.stringify([
          "TCL",
          selectedTkey,
          "UF",
          selectedProject,
          "pgrp",
          selectedArtifact,
          selectedVersion,
        ]),
      ).then((res) => {
        if (res?.status == 200) {
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "success",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Success",
              text: `Events fetched successfully`,
              closeButton: false,
            },
          );
          sendDataToFabrics(res?.data);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const componentOptions = useMemo(() => {
    return eventsNavBarData && eventsNavBarData.length > 0
      ? eventsNavBarData.map((component) => ({
          label: component?.component?.nodeName,
          key: component?.component?.nodeId,
          value: component?.component?.nodeId,
          controls: component?.controls,
        }))
      : [];
  }, [eventsNavBarData]);

  const controlOptions = useMemo(
    (selectedComponent) => {
      if (!selectedComponent) return [];
      return eventsNavBarData && eventsNavBarData.length > 0
        ? eventsNavBarData
            .find(
              (component) => component.component.nodeId === selectedComponent,
            )
            ?.controls?.map((control) => ({
              label: control?.nodeName,
              key: control?.nodeId,
              value: control?.nodeId,

              events: control?.events,
            }))
        : [];
    },
    [eventsNavBarData],
  );

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-between  bg-white dark:border-[#212121] dark:bg-[#161616] xl:h-[100%] xl:w-[100%] 2xl:h-[580px] 2xl:w-[700px]">
        <div className="flex flex-col gap-2">
          {componentOptions &&
            componentOptions.length > 0 &&
            componentOptions.map((obj, index) => {
              console.log(obj, "itemisinl;oop");
              return (
                <div className="flex h-full w-full flex-row items-center justify-center gap-2 ">
                  <div
                    key={index}
                    className="flex h-[30px] w-[170px] cursor-pointer items-center justify-between rounded-md bg-[#F4F5FA] p-2 text-sm dark:bg-[#0F0F0F]"
                  >
                    {obj.label}
                  </div>
                  <div>
                    <TorusDropDown
                      title={
                        selectedControlName &&
                        selectedComponentName === obj?.label
                          ? selectedControlName
                          : "Control"
                      }
                      key={obj?.key}
                      selected={
                        selectedComponentName === obj?.label
                          ? new Set([selectedControl])
                          : new Set([""])
                      }
                      selectionMode="single"
                      items={obj?.controls?.map((control) => ({
                        label: control?.nodeName,
                        key: control?.nodeId,
                        value: control?.nodeId,

                        events: control?.events,
                      }))}
                      setSelected={(e) => {
                        handleControlChange(e, obj?.key, obj?.label);

                        // if (obj.key && Array.from(e)[0]) {
                        //   getVersionList(
                        //     tKey,
                        //     client,
                        //     project,
                        //     fabrics,
                        //     mainArtifacts,
                        //     mainVersion,
                        //     obj.key,
                        //     Array.from(e)[0],
                        //   );
                        // } else {
                        //   toast.error("Please Select Component and Control", {
                        //     position: "bottom-right",
                        //     autoClose: 2000,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: true,
                        //     progress: undefined,
                        //     theme: darkMode ? "dark" : "light",
                        //   });
                        // }
                      }}
                      classNames={{
                        buttonClassName:
                          "rounded-md h-[30px] w-[170px] text-sm font-medium   bg-[#F4F5FA] dark:bg-[#0F0F0F] text-center dark:text-white",
                        popoverClassName: "w-[170px] text-md",
                        listBoxClassName:
                          "overflow-y-auto bg-white border border-[#F2F4F7] dark:bg-[#0F0F0F] ",
                        listBoxItemClassName: "flex  justify-between text-md",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          {/* <TorusDropDown
              title={
                selectedComponentName ? selectedComponentName : "Component"
              }
              items={componentOptions}
              key={"EcomponentDropdown"}
              selected={selectedComponent}
              setSelected={(e) => handleComponentChange(e)}
              classNames={{
                buttonClassName:
                  "rounded-lg w-[100px] text-xs h-[30px] font-medium  p-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] text-center dark:text-white",
                popoverClassName: "w-[70px]",
                listBoxClassName: "overflow-y-auto",
                listBoxItemClassName: "flex text-sm justify-between",
              }}
            /> */}

          {/* <ReusableDropDown
                darkMode={!darkMode}
                key={"EcomponentDropdown"}
                title={
                  selectedComponentName ? selectedComponentName : "Component"
                }
                buttonClassName={
                  !darkMode
                    ? " flex flex-row w-[50%] h-8 justify-center  items-center hover:border-gray-300  bg-[#323232] border rounded-md hover:animate-pulse hover:bg-[#424242] border-gray-600 text-white/70"
                    : "flex flex-row w-[50%] h-8 justify-center  items-center hover:border-gray-600  bg-[#ffffff] border rounded-md hover:animate-pulse hover:bg-[#c7c6c6] border-gray-300 text-black/70"
                }
                selectedKey={selectedComponent}
                handleSelectedKey={(e) => handleComponentChange(e)}
                items={componentOptions}
              /> */}
          {/* <ReusableDropDown
                darkMode={!darkMode}
                key={"EcontrolDropdown"}
                isDisabled={selectedComponentName ? false : true}
                title={selectedControlName ? selectedControlName : "Control"}
                buttonClassName={
                  !darkMode
                    ? " flex flex-row w-[50%] h-8 justify-center  items-center hover:border-gray-300  bg-[#323232] border rounded-md hover:animate-pulse hover:bg-[#424242] border-gray-600 text-white/70"
                    : "flex flex-row w-[50%] h-8 justify-center  items-center hover:border-gray-600  bg-[#ffffff] border rounded-md hover:animate-pulse hover:bg-[#c7c6c6] border-gray-300 text-black/70"
                }
                // DropdownMenuClassName={
                //   controlOptions.length>6 ? "h-[200px] overflow-y-scroll" :""
                // }
                selectedKey={selectedControl}
                handleSelectedKey={(e) => {
                  handleControlChange(e);
                  if (selectedComponentName && Array.from(e)[0]) {
                    getVersionList(
                      tKey,
                      client,
                      project,
                      fabrics,
                      mainArtifacts,
                      mainVersion,
                      selectedComponentName,
                      Array.from(e)[0],
                    );
                  } else {
                    toast.error("Please Select Component and Control", {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      progress: undefined,
                      theme: darkMode ? "dark" : "light",
                    });
                  }
                }}
                items={controlOptions}
              /> */}
        </div>

        <div className="flex w-[100%] items-center justify-between border-t-1 border-gray-300 p-2">
          <div className="flex w-[50%] justify-start">
            <TorusButton
              btncolor={"primary"}
              buttonClassName=" dark:bg-[#0F0F0F] w-[110px] h-[30px]  rounded-md flex justify-center items-center"
              Children={
                <div className="flex h-full w-[100%] flex-row items-center justify-center gap-1">
                  <p className="text-xs text-white ">Save</p>
                </div>
              }
              onPress={() => {
                saveEvents(
                  selectedTkey,
                  client,
                  selectedProject,
                  "UF",
                  selectedArtifact,
                  selectedVersion,
                  selectedComponentName,
                  selectedControlName,
                  getDataFromFabrics,
                );
              }}
            />
          </div>
        </div>

        {/* <div className="flex w-[65%] flex-row items-center pl-[25%]">
            <Button
              size="xs"
              isIconOnly
              variant="outline"
              className=" flex w-[20%] flex-row items-center justify-center gap-2 p-2"
              onClick={() => toggleDarkMode(!darkMode)}
            >
              <Tooltip
                content=" Dark Mode"
                className={`rounded-md ${
                  darkMode
                    ? "bg-[#E9E8E8] text-black  "
                    : "bg-[#333333] text-white "
                }`}
              >
                <span>
                  {darkMode ? (
                    <FaMoon
                      className={` cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                        darkMode
                          ? " hover:border-gray-200/80 hover:text-white "
                          : " hover:border-gray-700 hover:text-gray-700"
                      }`}
                      size={25}
                      color={darkMode ? "#F4F4F5" : "#616A6B "}
                    />
                  ) : (
                    <IoSunny
                      className={` cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                        darkMode
                          ? " hover:border-gray-200/80 hover:text-white "
                          : " hover:border-gray-700 hover:text-gray-700"
                      }`}
                      size={25}
                      color={darkMode ? "#F4F4F5" : "#616A6B "}
                    />
                  )}
                </span>
              </Tooltip>
            </Button>

            <div className="ml-[0%] mt-[-5px] h-12 w-[80%] scale-[0.9] p-[5px]">
              <div
                className={`${
                  darkMode
                    ? "flex h-11 w-[140px] flex-row items-center justify-evenly gap-1 rounded-md border   border-gray-600/30 bg-gray-50/10 p-1   "
                    : "flex h-11 w-[140px] flex-row items-center justify-evenly gap-1 rounded-md border  border-gray-600/30 bg-gray-600/10 p-1 "
                }`}
              >
                <ReusableDropDown
                  darkMode={darkMode}
                  key={"eversion"}
                  isDisabled={versions && versions.length > 0 ? false : true}
                  title={
                    (defSelectedVersion && defSelectedVersion) || (
                      <div>
                        <span>{"Version"}</span>
                        {versions && versions.length > 0 && <span>*</span>}
                      </div>
                    )
                  }
                  selectedKey={new Set([defSelectedVersion])}
                  DropdownMenuClassName={
                    versions && versions.length > 6
                      ? "h-30 overflow-y-scroll  "
                      : ""
                  }
                  handleSelectedKey={(keys) => {
                    setDefSelectedVersion(Array.from(keys)[0]);
                  }}
                  items={
                    versions &&
                    versions?.map((version, index) => {
                      return {
                        key: version,

                        label: version,
                      };
                    })
                  }
                  handleDelete={(key) => {
                    setSelectedDeletingVersionItem(key);

                    openmodal("version");
                  }}
                />

                <Button
                  isDisabled={!defSelectedVersion}
                  size="xs"
                  isIconOnly
                  className=" ml-[-10px] flex w-[30%] flex-row items-center justify-center bg-transparent"
                  variant="outline"
                  onClick={() =>
                    saveEvents(
                      tKey,

                      client,

                      project,

                      fabrics,
                      mainArtifacts,

                      mainVersion,

                      selectedComponentName,

                      selectedControlName,

                      defSelectedVersion,

                      data,

                      "update",
                    )
                  }
                >
                  <Tooltip
                    content="Upload"
                    className={`rounded-md ${
                      darkMode
                        ? "bg-[#E9E8E8] text-black  "
                        : "bg-[#333333] text-white  "
                    }`}
                  >
                    <MdOutlineUploadFile
                      className={`cursor-pointer rounded border border-gray-600 p-[3px] transition-all active:opacity-50 ${
                        darkMode
                          ? " hover:border-gray-300 hover:text-white "
                          : " hover:border-gray-700 hover:text-gray-700 "
                      }`}
                      size={25}
                      color={darkMode ? "#F4F4F5" : "#616A6B "}
                    />
                  </Tooltip>
                </Button>

                <Tooltip
                  content="Save"
                  className={`rounded-md  ${
                    darkMode
                      ? "bg-[#E9E8E8] text-black  "
                      : "bg-[#333333] text-white  "
                  }`}
                >
                  <Button
                    isIconOnly={true}
                    size="xs"
                    className=" ml-[-15px] flex w-[30%] flex-row items-center  justify-center bg-transparent"
                    variant="outline"
                    onClick={() =>
                      saveEvents(
                        tKey,

                        client,

                        project,

                        fabrics,
                        mainArtifacts,

                        mainVersion,

                        selectedComponentName,

                        selectedControlName,

                        defSelectedVersion,

                        data,

                        "save",
                      )
                    }
                  >
                    <MdOutlineSave
                      className={` cursor-pointer rounded border-gray-600 p-[3px] transition-all active:opacity-50 border${
                        darkMode
                          ? " hover:border-gray-300 hover:text-white"
                          : " hover:border-gray-700 hover:text-gray-700 "
                      }`}
                      size={25}
                      color={darkMode ? "#F4F4F5" : "#616A6B "}
                    />
                  </Button>
                </Tooltip>

                <DeleteModel
                  selectedKey={
                    setSelectedDeletingVersionItem && selectedDeletingVersinItem
                  }
                  onOpenChange={onOpenChange}
                  isOpen={isOpen}
                  header="Are you sure?"
                  body={`${
                    setSelectedDeletingVersionItem && selectedDeletingVersinItem
                  } is Permanently delete from REDIS SERVER`}
                  button1="Cancel"
                  button2="Confirm"
                />
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
}
