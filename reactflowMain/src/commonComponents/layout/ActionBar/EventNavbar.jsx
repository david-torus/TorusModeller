import React, { useState, useContext, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { DarkmodeContext } from "../../context/DarkmodeContext";
import { MdOutlineClose } from "react-icons/md";
import {
  Button,
  useDisclosure,
} from "@nextui-org/react";
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
export default function EventNavbar({
  setToggleReactflow,
  tenant,
  appGroup,
  application,
  fabrics,
  mainArtifacts,
  mainVersion,
  data,
  setData,
  dataum,
  setSelectedControlEvents,
}) {
  const [open, setOpen] = useState(false);

  const [versions, setVersions] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedVersion, setSelectedVersion] = useState(null);

  const [selectedDeletingVersinItem, setSelectedDeletingVersionItem] =
    useState(null);


  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);

  const [selectedComponent, setSelectedComponent] = useState(null);

  const [selectedComponentName, setSelectedComponentName] = useState(null);

  const [selectedControl, setSelectedControl] = useState(null);

  const [selectedControlName, setSelectedControlName] = useState(null);

  const getEventsfromVersion = useCallback(
    async (
      tenant,
      appGroup,
      application,
      fabrics,
      mainArtifacts,
      mainVersion,
      selectedComponentName,
      selectedControlName,
      selectedVersion
    ) => {
      try {
        const res = await getEventsByVersion(
          tenant,
          appGroup,
          application,
          fabrics,
          mainArtifacts,
          mainVersion,
          selectedComponentName,
          selectedControlName,
          selectedVersion
        );
  
        if (res) setData(res.data);
      } catch (error) {
        toast.error("Cannot find Events by version", {
          position: "bottom-right",
          autoClose: 2000,
          theme: darkmode ? "dark" : "light",
        });
      }
    },
    [darkmode,setData] 
  );
  

  const getVersionList = useCallback(
    async (
      tenant,
      appGroup,
      application,
      fabrics,
      mainArtifacts,
      mainVersion,
      componentName,
      controlName
    ) => {
      try {
        const res = await getVersion(
          tenant,
          appGroup,
          application,
          fabrics,
          mainArtifacts,
          mainVersion,
          componentName,
          controlName,
          "v1"
        );
  
        if (res) setVersions(res?.data);
      } catch (error) {
        console.error("Error in getVersionList:", error);
  
        toast.error("Cannot find Events Version list", {
          position: "bottom-right",
          autoClose: 2000,
          theme: darkmode ? "dark" : "light",
        });
      }
    },
    [darkmode] // Add any other dependencies needed inside useCallback
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

        theme: darkmode ? "dark" : "light",
      });
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      if (selectedComponentName && selectedControlName) {
        getVersionList(
          tenant,
          appGroup,
          application,
          fabrics,
          mainArtifacts,
          mainVersion,
          selectedComponentName,
          selectedControlName
        );
      } else {
        return;
      }
    } catch (error) {
      console.error("Error in getVersionList:", error);
  
      toast.error("Cannot find Events Version list", {
        position: "bottom-right",
        autoClose: 2000,
        theme: darkmode ? "dark" : "light",
      });
    }
  }, [
    selectedComponentName,
    selectedControlName,
    appGroup,
    application,
    darkmode,
    fabrics,
    mainArtifacts,
    mainVersion,
    tenant,
    getVersionList,
  ]);
  

  useEffect(() => {
    try {
      if (selectedVersion) {
        getEventsfromVersion(
          tenant,
          appGroup,
          application,
          fabrics,
          mainArtifacts,
          mainVersion,
          selectedComponentName,
          selectedControlName,
          selectedVersion
        ).then((res) => {
          toast.success(`Events fetched successfully from ${selectedVersion}`, {
            position: "bottom-right",
            autoClose: 2000,
            theme: darkmode ? "dark" : "light",
          });
        });
      } else {
        return;
      }
    } catch (error) {
      toast.error("Failed to fetch events.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: darkmode ? "dark" : "light",
      });
  
      console.error("Error fetching events:", error);
    }
  }, [
    selectedVersion,
    appGroup,
    application,
    darkmode,
    fabrics,
    getEventsfromVersion,
    mainArtifacts,
    mainVersion,
    selectedComponentName,
    selectedControlName,
    tenant,
  ]);
  

 

  

  const saveEvents = async (
    tenant,

    appGroup,

    application,

    fabrics,
    mainArtifacts,

    mainVersion,

    componentName,

    controlName,

    ccwversion,

    data,

    type
  ) => {
    try {
      const res = await handleEvents(
        tenant,

        appGroup,

        application,

        fabrics,

        mainArtifacts,

        mainVersion,

        componentName,

        controlName,

        ccwversion,

        data,

        type
      );

      if (res && res.status === 200) {
        if (type === "save" && res && res.data && res.data.length > 0) {
          setVersions(res.data);
          setSelectedVersion(res.data[res.data.length - 1]);
        }

        toast.success(`Events is sucessfully ${type}`, {
          position: "bottom-right",

          autoClose: 2000,

          theme: darkmode ? "dark" : "light",
        });
      }
    } catch (error) {
      console.error(`Error in ${type} Events:`, error);

      toast.error("Cannot save Events", {
        position: "bottom-right",

        autoClose: 2000,

        theme: darkmode ? "dark" : "light",
      });
    }
  };

  const handleComponentChange = (e) => {
    try {
      setSelectedComponent(Array.from(e)[0]);
      const selectedComponentData = dataum.find(
        (component) => component.component.nodeId === Array.from(e)[0]
      );

      setSelectedComponentName(selectedComponentData?.component?.nodeName);

      setData({
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

      const selectedComponentData = dataum.find(
        (component) => component.component.nodeId === selectedComponent
      );

      const selectedControlData = selectedComponentData?.controls.find(
        (control) => control.nodeId === Array.from(e)[0]
      );

      setData({
        nodes: [],

        nodeEdges: [],

        nodeProperty: {},
      });

      setSelectedControlName(selectedControlData?.nodeName);

      setSelectedVersion(null);

      setSelectedControlEvents(selectedControlData);
    } catch (e) {
      console.error(e);
    }
  };

  const componentOptions =
    dataum &&
    dataum.length > 0 &&
    dataum.map((component) => ({
      label: component?.component?.nodeName,
      key: component?.component?.nodeId,
      value: component?.component?.nodeId,
    }));

  const controlOptions =
    selectedComponent && selectedComponent
      ? dataum

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
        top: 0,

        position: "fixed",

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
          darkmode
            ? "bg-[#1E1E1E]/90 backdrop-blur-sm border-b border-gray-600  pl-1 pt-2 pr-2 pb-2 "
            : "bg-[#F0F0F0] backdrop-blur-sm border-b border-gray-600 pl-1 pt-2 pr-2 pb-2 "
        } `}
        initial={false}
      >
        <div
          className="flex flex-row items-center justify-around pl-1 pt-2 pr-2 pb-2 gap-[21.5%]"
          style={{
            height: "inherit",
          }}
        >
          <div className="w-[35%] flex flex-row items-center justify-around gap-1">
            <p
              className={`border ${darkmode ? "border-gray-300/50" : "border-gray-800/50"}  p-[3px]  rounded-md cursor-pointer active:opacity-50 transition-all `}
              onClick={handleClick}
            >
              <MdOutlineClose
                color={darkmode ? "#F4F4F5" : "#1D1D1D"}
                size={20}
              />
            </p>

            <div
              className={`${
                darkmode
                  ? "w-[80%] flex flex-row justify-evenly h-11 items-center gap-1 border border-gray-600/30   bg-gray-50/10 rounded-md p-1   "
                  : "w-[80%] flex flex-row justify-evenly h-11 items-center gap-1 border border-gray-600/30  bg-gray-600/10 rounded-md p-1 "
              }`}
            >
              <ReusableDropDown
                darkmode={darkmode}
                key={"EcomponentDropdown"}
                title={
                  selectedComponentName ? selectedComponentName : "Component"
                }
                buttonClassName={
                  darkmode
                    ? " flex flex-row w-[50%] h-8 justify-center  items-center hover:border-gray-300  bg-[#323232] border rounded-md hover:animate-pulse hover:bg-[#424242] border-gray-600 text-white/70"
                    : "flex flex-row w-[50%] h-8 justify-center  items-center hover:border-gray-600  bg-[#ffffff] border rounded-md hover:animate-pulse hover:bg-[#c7c6c6] border-gray-300 text-black/70"
                }


                selectedKey={selectedComponent}
                handleSelectedKey={(e) => handleComponentChange(e)}
                items={componentOptions}
              />

              <ReusableDropDown
                darkmode={darkmode}
                key={"EcontrolDropdown"}
                isDisabled={selectedComponentName ? false : true}
                title={selectedControlName ? selectedControlName : "Control"}
                buttonClassName={
                  darkmode
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
                      tenant,
                      appGroup,
                      application,
                      fabrics,
                      mainArtifacts,
                      mainVersion,
                      selectedComponentName,
                      Array.from(e)[0]
                    );
                  } else {
                    toast.error("Please Select Component and Control", {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      progress: undefined,
                      theme: darkmode ? "dark" : "light",
                    });
                  }
                }}
                items={controlOptions}
              />
            </div>
          </div>

          <div className="flex flex-row items-center w-[65%] pl-[25%]">
            <Button
              size="xs"
              isIconOnly
              variant="outline"
              className=" flex flex-row w-[20%] justify-center gap-2 items-center p-2"
              onClick={() => toggleDarkmode(!darkmode)}
            >
              <Tooltip
                content=" Dark Mode"
                className={`rounded-md ${
                  darkmode
                    ? "bg-[#E9E8E8] text-black  "
                    : "bg-[#333333] text-white "
                }`}
              >
                <span>
                  {darkmode ? (
                    <FaMoon
                      className={` p-[3px] rounded cursor-pointer border border-gray-600/50 active:opacity-50 transition-all ${
                        darkmode
                          ? " hover:text-white hover:border-gray-200/80 "
                          : " hover:text-gray-700 hover:border-gray-700"
                      }`}
                      size={25}
                      color={darkmode ? "#F4F4F5" : "#616A6B "}
                    />
                  ) : (
                    <IoSunny
                      className={` p-[3px] rounded cursor-pointer border border-gray-600/50 active:opacity-50 transition-all ${
                        darkmode
                          ? " hover:text-white hover:border-gray-200/80 "
                          : " hover:text-gray-700 hover:border-gray-700"
                      }`}
                      size={25}
                      color={darkmode ? "#F4F4F5" : "#616A6B "}
                    />
                  )}
                </span>
              </Tooltip>
            </Button>

            <div className="w-[80%] ml-[0%] p-[5px] h-12 mt-[-5px] scale-[0.9]">
              <div
                className={`${
                  darkmode
                    ? "w-[140px] flex flex-row justify-evenly h-11 items-center gap-1 border border-gray-600/30   bg-gray-50/10 rounded-md p-1   "
                    : "w-[140px] flex flex-row justify-evenly h-11 items-center gap-1 border border-gray-600/30  bg-gray-600/10 rounded-md p-1 "
                }`}
              >
                <ReusableDropDown
                  darkmode={darkmode}
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
                  className=" flex flex-row w-[30%] ml-[-10px] justify-center items-center bg-transparent"
                  variant="outline"
                  onClick={() =>
                    saveEvents(
                      tenant,

                      appGroup,

                      application,

                      fabrics,
                      mainArtifacts,

                      mainVersion,

                      selectedComponentName,

                      selectedControlName,

                      selectedVersion,

                      data,

                      "update"
                    )
                  }
                >
                  <Tooltip
                    content="Upload"
                    className={`rounded-md ${
                      darkmode
                        ? "bg-[#E9E8E8] text-black  "
                        : "bg-[#333333] text-white  "
                    }`}
                  >
                    <MdOutlineUploadFile
                      className={`border border-gray-600 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                        darkmode
                          ? " hover:text-white hover:border-gray-300 "
                          : " hover:text-gray-700 hover:border-gray-700 "
                      }`}
                      size={25}
                      color={darkmode ? "#F4F4F5" : "#616A6B "}
                    />
                  </Tooltip>
                </Button>

                <Tooltip
                  content="Save"
                  className={`rounded-md  ${
                    darkmode
                      ? "bg-[#E9E8E8] text-black  "
                      : "bg-[#333333] text-white  "
                  }`}
                >
                  <Button
                    isIconOnly={true}
                    size="xs"
                    className=" flex flex-row w-[30%] ml-[-15px] justify-center  items-center bg-transparent"
                    variant="outline"
                    onClick={() =>
                      saveEvents(
                        tenant,

                        appGroup,

                        application,

                        fabrics,
                        mainArtifacts,

                        mainVersion,

                        selectedComponentName,

                        selectedControlName,

                        selectedVersion,

                        data,

                        "save"
                      )
                    }
                  >
                    <MdOutlineSave
                      className={` p-[3px] rounded cursor-pointer border-gray-600 active:opacity-50 transition-all border${
                        darkmode
                          ? " hover:text-white hover:border-gray-300"
                          : " hover:text-gray-700 hover:border-gray-700 "
                      }`}
                      size={25}
                      color={darkmode ? "#F4F4F5" : "#616A6B "}
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
          </div>
        </div>
      </motion.div>
    </div>
  );
}