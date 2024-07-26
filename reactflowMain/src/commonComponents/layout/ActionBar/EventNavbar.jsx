import React, { useState, useContext, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { DarkmodeContext } from "../../context/DarkmodeContext";
import { MdOutlineClose } from "react-icons/md";
import { Button, useDisclosure } from "@nextui-org/react";
import { MdOutlineSave, MdOutlineUploadFile } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import {
  getEventsByVersion,
  getVersion,
  handleEvents,
} from "../../../commonComponents/api/eventsApi";
import { toast } from "react-toastify";
import { DeleteModel } from "../../../commonComponents/Model/DeleteModel";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import ReusableDropDown from "../../reusableComponents/ReusableDropDown";
import { TorusModellerContext } from "../../../Layout";
export default function EventNavbar({
  sendDataToFabrics,
  getDataFromFabrics,
  setToggleReactflow,
  tKey,
  client,
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
  } = useContext(TorusModellerContext);
  console.log("eventsNavBarData", selectedControlEvents);
  const [open, setOpen] = useState(false);

  const [versions, setVersions] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedVersion, setSelectedVersion] = useState(null);

  const [selectedDeletingVersinItem, setSelectedDeletingVersionItem] =
    useState(null);

  const { darkMode, toggleDarkMode } = useContext(DarkmodeContext);

  const [selectedComponent, setSelectedComponent] = useState(null);

  const [selectedControl, setSelectedControl] = useState(null);

  const getEventsfromVersion = useCallback(
    async (
      tKey,
      client,
      project,
      fabrics,
      mainArtifacts,
      mainVersion,
      selectedComponentName,
      selectedControlName,
      selectedVersion,
    ) => {
      try {
        const res = await getEventsByVersion(
          tKey,
          client,
          project,
          fabrics,
          mainArtifacts,
          mainVersion,
          selectedComponentName,
          selectedControlName,
          selectedVersion,
        );

        if (res) sendDataToFabrics(res.data);
      } catch (error) {
        toast.error("Cannot find Events by version", {
          position: "bottom-right",
          autoClose: 2000,
          theme: darkMode ? "dark" : "light",
        });
      }
    },
    [darkMode, sendDataToFabrics],
  );

  const getVersionList = useCallback(
    async (
      tKey,
      client,
      project,
      fabrics,
      mainArtifacts,
      mainVersion,
      componentName,
      controlName,
    ) => {
      try {
        const res = await getVersion(
          tKey,
          client,
          project,
          fabrics,
          mainArtifacts,
          mainVersion,
          componentName,
          controlName,
          "v1",
        );

        if (res) setVersions(res?.data);
      } catch (error) {
        console.error("Error in getVersionList:", error);

        toast.error("Cannot find Events Version list", {
          position: "bottom-right",
          autoClose: 2000,
          theme: darkMode ? "dark" : "light",
        });
      }
    },
    [darkMode], // Add any other dependencies needed inside useCallback
  );

  const handleClick = () => {
    try {
      setToggleReactflow((prev) => ({
        ...prev,

        events: false,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const openmodal = (type) => {
    try {
      if (type === "version") {
        onOpen();
      }
    } catch (err) {
      toast.error(`cannot get ${type}`, {
        position: "bottom-right",

        autoClose: 2000,

        theme: darkMode ? "dark" : "light",
      });
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      if (selectedComponentName && selectedControlName) {
        getVersionList(
          tKey,
          client,
          project,
          fabrics,
          mainArtifacts,
          mainVersion,
          selectedComponentName,
          selectedControlName,
        );
      } else {
        return;
      }
    } catch (error) {
      console.error("Error in getVersionList:", error);

      toast.error("Cannot find Events Version list", {
        position: "bottom-right",
        autoClose: 2000,
        theme: darkMode ? "dark" : "light",
      });
    }
  }, [
    selectedComponentName,
    selectedControlName,
    client,
    project,
    darkMode,
    fabrics,
    mainArtifacts,
    mainVersion,
    tKey,
    getVersionList,
  ]);

  useEffect(() => {
    try {
      if (selectedVersion) {
        getEventsfromVersion(
          tKey,
          client,
          project,
          fabrics,
          mainArtifacts,
          mainVersion,
          selectedComponentName,
          selectedControlName,
          selectedVersion,
        ).then((res) => {
          toast.success(`Events fetched successfully from ${selectedVersion}`, {
            position: "bottom-right",
            autoClose: 2000,
            theme: darkMode ? "dark" : "light",
          });
        });
      } else {
        return;
      }
    } catch (error) {
      toast.error("Failed to fetch events.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: darkMode ? "dark" : "light",
      });

      console.error("Error fetching events:", error);
    }
  }, [
    selectedVersion,
    client,
    project,
    darkMode,
    fabrics,
    getEventsfromVersion,
    mainArtifacts,
    mainVersion,
    selectedComponentName,
    selectedControlName,
    tKey,
  ]);

  const saveEvents = async (
    tKey,

    client,

    project,

    fabrics,
    mainArtifacts,

    mainVersion,

    componentName,

    controlName,

    ccwversion,

    data,

    type,
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

        ccwversion,

        data,

        type,
      );

      if (res && res.status === 200) {
        if (type === "save" && res && res.data && res.data.length > 0) {
          setVersions(res.data);
          setSelectedVersion(res.data[res.data.length - 1]);
        }

        toast.success(`Events is sucessfully ${type}`, {
          position: "bottom-right",

          autoClose: 2000,

          theme: darkMode ? "dark" : "light",
        });
      }
    } catch (error) {
      console.error(`Error in ${type} Events:`, error);

      toast.error("Cannot save Events", {
        position: "bottom-right",

        autoClose: 2000,

        theme: darkMode ? "dark" : "light",
      });
    }
  };

  const handleComponentChange = (e) => {
    try {
      setSelectedComponent(Array.from(e)[0]);
      const selectedComponentData = eventsNavBarData.find(
        (component) => component.component.nodeId === Array.from(e)[0],
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

      setSelectedVersion(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleControlChange = (e) => {
    try {
      setSelectedControl(Array.from(e)[0]);

      const selectedComponentData = eventsNavBarData.find(
        (component) => component.component.nodeId === selectedComponent,
      );

      const selectedControlData = selectedComponentData?.controls.find(
        (control) => control.nodeId === Array.from(e)[0],
      );

      sendDataToFabrics({
        nodes: [],

        nodeEdges: [],

        nodeProperty: {},
      });
      console.log(selectedControlData, "selectedControlData");
      setSelectedControlName(selectedControlData?.nodeName);

      setSelectedVersion(null);

      setSelectedControlEvents(selectedControlData);
    } catch (e) {
      console.error(e);
    }
  };

  const componentOptions =
    eventsNavBarData &&
    eventsNavBarData.length > 0 &&
    eventsNavBarData.map((component) => ({
      label: component?.component?.nodeName,
      key: component?.component?.nodeId,
      value: component?.component?.nodeId,
    }));

  const controlOptions =
    selectedComponent && selectedComponent
      ? eventsNavBarData

          .find((component) => component.component.nodeId === selectedComponent)

          .controls?.map((control) => ({
            label: control?.nodeName,
            key: control?.nodeId,
            value: control?.nodeId,

            events: control?.events,
          }))
      : [];

  return (
    <div
      style={{
        transitionDuration: "0.4s",

        zIndex: 100,

        width: "100%",

        height: "8%",
      }}
    >
      <motion.div
        onClick={() => {
          if (!open) setOpen(true);
        }}
        style={{
          width: "100%",

          height: "100%",

          cursor: "pointer",

          transitionDuration: "0.4s",
        }}
        className={`${
          darkMode
            ? "border-b border-gray-600 bg-[#1E1E1E]/90 pb-2  pl-1 pr-2 pt-2 backdrop-blur-sm "
            : "border-b border-gray-600 bg-[#F0F0F0] pb-2 pl-1 pr-2 pt-2 backdrop-blur-sm "
        } `}
        initial={false}
      >
        <div
          className="flex flex-row items-center justify-around gap-[21.5%] pb-2 pl-1 pr-2 pt-2"
          style={{
            height: "inherit",
          }}
        >
          <div className="flex w-[35%] flex-row items-center justify-around gap-1">
            <p
              className={`border ${darkMode ? "border-gray-300/50" : "border-gray-800/50"}  cursor-pointer  rounded-md p-[3px] transition-all active:opacity-50 `}
              onClick={handleClick}
            >
              <MdOutlineClose
                color={darkMode ? "#F4F4F5" : "#1D1D1D"}
                size={20}
              />
            </p>

            <div
              className={`${
                darkMode
                  ? "flex h-11 w-[80%] flex-row items-center justify-evenly gap-1 rounded-md border   border-gray-600/30 bg-gray-50/10 p-1   "
                  : "flex h-11 w-[80%] flex-row items-center justify-evenly gap-1 rounded-md border  border-gray-600/30 bg-gray-600/10 p-1 "
              }`}
            >
              <ReusableDropDown
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
              />

              <ReusableDropDown
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
                    (selectedVersion && selectedVersion) || (
                      <div>
                        <span>{"Version"}</span>
                        {versions && versions.length > 0 && <span>*</span>}
                      </div>
                    )
                  }
                  selectedKey={new Set([selectedVersion])}
                  DropdownMenuClassName={
                    versions && versions.length > 6
                      ? "h-30 overflow-y-scroll  "
                      : ""
                  }
                  handleSelectedKey={(keys) => {
                    setSelectedVersion(Array.from(keys)[0]);
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
                  isDisabled={!selectedVersion}
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

                      selectedVersion,

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

                        selectedVersion,

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
      </motion.div>
    </div>
  );
}
