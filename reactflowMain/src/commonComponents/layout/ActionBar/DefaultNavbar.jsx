
import React, { useEffect, useState, useContext, useCallback } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Breadcrumbs,
  BreadcrumbItem,
  useDisclosure,
} from "@nextui-org/react";
import {
  saveWorkFlow,
  getartifactList,
  getVersionList,
  getDefaultJson,
} from "../../api/DefaultsApi";

import { MenuToggle } from "./MenuToggle";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { DarkmodeContext } from "../../context/DarkmodeContext";

import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

import { DeleteModel } from "../../Model/DeleteModel";
import { MdOutlineSave, MdOutlineUploadFile } from "react-icons/md";
import Toolbar from "../Toolbar";
import { Tooltip } from "@nextui-org/react";

import { nodeTypes } from "../../utils/util";
import ReusableDropDown from "../../reusableComponents/ReusableDropDown";
import ReusableInput from "../../reusableComponents/ReusableInput";

export default function DefaultNavbar({
  defaultsMode = null,
  setDefaultsMode = null,
  fabrics,
  setFabrics,
  tenant,
  group,
  getDataFromDefault,
  sendDataToDefault,
  fabricsList,
  undoredo,
}) {
  const [openArtifactsCreate, setOpenArtifactsCreate] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectedKeys] = React.useState(new Set([""]));
  const [selectedArtifacts, setSelectedArtifacts] = useState("");
  const [versions, setVersions] = useState([]);
  const [selectedVerison, setSelectedVerison] = useState("");
  const [newArtifactsName, setNewArtifactsName] = useState("");

  const [newArtifactsNameValidation, setNewArtifactsNameValidation] =
    useState(false);

  const [artifacts, setArtifacts] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openArtifactsModal, setOpenArtifactsModal] = useState(false);
  const [selectedDeletingArtifactsItem, setSelectedDeletingArtifactsItem] =
    useState(null);
  const [selectedDeletingVersinItem, setSelectedDeletingVersionItem] =
    useState(null);

  const { darkMode, toggleDarkMode } = useContext(DarkmodeContext);

  const handleSubmit = async (e) => {
    try {
      if (Array.from(selectedKeys)[0] === "Create new Application") {
        const res = await saveProcessFlow(
          "create",
          new Set([newArtifactsName.trim().toLocaleLowerCase()]),
          new Set("v1"),
          getDataFromDefault()
        );

        if (res.status === 200 || res.status === 201) {
          toast.success("new application created successfully", {
            position: "bottom-right",
            autoClose: 2000,
          });
        } else {
          toast.error("Error while creating", {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      } else {
        const res = await saveProcessFlow(
          "create",
          new Set([newArtifactsName.trim().toLocaleLowerCase()]),
          new Set("v1"),
          getDataFromDefault()
        );

        if (res.status === 200 || res.status === 201) {
          toast.success("new application created successfully", {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addArtifactsName = (e) => {
    try {
      if (Array.from(selectedKeys)[0] === "Create new Application") {
        setNewArtifactsNameValidation(false);
        setNewArtifactsName(e);
      } else {
        let condicheck = true;
        artifacts &&
          artifacts.length > 0 &&
          artifacts.map((obj) => {
            if (
              obj.trim() === e.trim() ||
              (nodeTypes.includes(e.trim()) && defaultsMode === "MultiNode")
            ) {
              condicheck = false;
            }
            return obj;
          });
        if (condicheck) {
          setNewArtifactsNameValidation(false);
          setNewArtifactsName(e);
        } else {
          setNewArtifactsNameValidation(true);
        }
      }
    } catch (err) {
      toast.error(`cannot create artifacts`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      console.error(err);
    }
  };
  const handleArtifactsChange = async (e) => {
    try {
      setSelectedVerison(null);
      if (Array.from(e)[0]) {
        await getVersion(tenant, group, fabrics, Array.from(e)[0]);
      } else {
        setVersions([]);
      }
      sendDataToDefault({});
      setSelectedArtifacts(e);
    } catch (err) {
      toast.error(`cannot change artifacts name`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      console.error(err);
    }
  };

  const getVersion = async (tenant, group, fabric, artifact) => {
    try {
      const response = await getVersionList(tenant, group, fabric, artifact);
      if (response && Object.keys(response).length) {
        setVersions(response?.data.version);
        setDefaultsMode(new Set([response?.data.mode]));
      }
    } catch (error) {
      toast.error(`cannot get version`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleIntialLoad = async (tenant, group, fabrics) => {
    try {
      const response = await getartifactList(tenant, group, fabrics);

      if (response && response?.status === 200) {
        setArtifacts(response.data);
      }
    } catch (error) {
      toast.error(`Cannot get application details`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const openmodal = (type, key) => {
    try {
      if (type === "artifacts") {
        try {
          setSelectedDeletingArtifactsItem(key);
          setOpenArtifactsModal(true);
          // setOpenVersionModal(false);
          onOpen();
        } catch (err) {
          toast.error(`cannot get ${type}`, {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
      if (type === "version") {
        try {
          setSelectedDeletingVersionItem(key);
          // setOpenVersionModal(true);
          setOpenArtifactsModal(false);
          onOpen();
        } catch (err) {
          toast.error(`cannot get ${type}`, {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
    } catch (err) {
      toast.error(`cannot get ${type}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };
  const handleDelete = async (e) => {
    try {
      const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;

      const response = await fetch(
        `${BASE_URL}/deleteDefaultArtifact?source=${tenant}&domain=${group}&fabrics=${fabrics}&artifact=${e}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());

      if (response && response.status === 200) {
        setArtifacts(response.data);
        setSelectedArtifacts("");
        setVersions([]);
        sendDataToDefault({
          nodes: [],
          nodeEdges: [],
          nodeProperty: {},
        });
        toast.success(`${e} deleted successfully`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVersionDelete = async (e) => {
    try {
      const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;

      const response = await fetch(
        `${BASE_URL}/deleteDefaultVersion?source=${tenant}&domain=${group}&fabrics=${fabrics}&artifact=${Array.from(selectedArtifacts)[0]}&version=${e}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());

      if (response && response.status === 200) {
        setSelectedVerison("");
        setVersions(response.data);
        sendDataToDefault({
          nodes: [],
          nodeEdges: [],
          nodeProperty: {},
        });
        toast.success(` ${e} deleted successfully`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveProcessFlow = async (
    type,
    selectedArtifactss,
    selectedVerisonss,
    erDatas
  ) => {
    try {
      const payload = {
        flow: { ...erDatas },
        mode: defaultsMode,
        artifact: Array.from(selectedArtifactss)[0],
      };

      const response = await saveWorkFlow(
        payload,
        type,
        Array.from(selectedVerisonss)[0],
        tenant,
        group,
        fabrics
      );
      if (response && response.status === 200) {
        if (type === "create") {
          const res = await handleIntialLoad(tenant, group, fabrics);
          setNewArtifactsName("");
          setSelectedArtifacts(selectedArtifactss);
          setVersions(response.data);
          setSelectedVerison(
            new Set([response.data[response.data.length - 1]])
          );

          if (res.status === 200 || res.status === 201) {
            toast.success("saved successfully", {
              position: "bottom-right",
              autoClose: 2000,
            });
          } else {
            toast.error("Error while saving", {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        }
      } else if (response && response.status === 201) {
        if (type === "update") {
          setSelectedArtifacts(selectedArtifactss);
          if (response.status === 200 || response.status === 201) {
            toast.success("updated successfully", {
              position: "bottom-right",
              autoClose: 2000,
            });
          } else {
            toast.error("Error while updating", {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        }
      } else {
        toast.success(` ${type} successfully`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
      console.error(response.msg);

      return response;
    } catch (error) {
      toast.success(` ${type} successfully`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const getProcessFlowApi = useCallback(async (event) => {
    try {
      const data = Array.from(event)[0];
  
      const response = await getDefaultJson(
        data,
        Array.from(selectedArtifacts)[0],
        tenant,
        group,
        fabrics
      );
  
      if (response && response.data) sendDataToDefault(response?.data);
    } catch (error) {
      toast.error(`cannot get flow details`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  }, [selectedArtifacts, tenant, group, fabrics,sendDataToDefault]);
  
  useEffect(() => {
    if (selectedVerison) {
      getProcessFlowApi(selectedVerison).catch((err) => {
        throw err;
      });
    }
  }, [selectedVerison, getProcessFlowApi]);
  

  useEffect(() => {
    if (selectedArtifacts) {
      if (nodeTypes && nodeTypes.includes(Array.from(selectedArtifacts)[0])) {
        setDefaultsMode(new Set(["SingleNode"]));
      }
    }
  }, [selectedArtifacts,setDefaultsMode]);

  useEffect(() => {
    try {
      handleIntialLoad(tenant, group, fabrics).catch((err) => {
        throw err;
      });
    } catch (error) {
      console.error(error);
    }
  }, [tenant, group, fabrics]);

  return (
    <div
      style={{
        top: 5,
        transitionDuration: "0.4s",
        position: "absolute",
        padding: "10px",
        zIndex: 100,
        width: open ? "100%" : "50px",
        height: open ? "100px" : "70px",
      }}
    >
      <motion.div
        onClick={() => {
          if (!open) setOpen(true);
        }}
        style={{
          width: open ? "100%" : "50px",
          height: "100%",
          cursor: open ? "default" : "pointer",
          transitionDuration: "0.4s",
        }}
        className={`${
          darkMode
            ? "bg-[#1E1E1E]/90 relative rounded-lg  border border-gray-500"
            : "backdrop-blur-sm relative rounded-lg  border border-gray-500"
        } `}
        initial={false}
        animate={open ? "open" : "closed"}
      >
        <MenuToggle
          toggle={() => {
            if (open) setOpen(false);
          }}
        />

        <div
          className={`w-[100%] transition-all duration-100 delay-75 
            overflow-hidden ${open ? "visible" : "hidden"} 
            ${open ? "h-[60%]" : "h-0"}  
            p-2 flex flex-row   justify-between  items-center  `}
        >
          <div
            style={{
              opacity: open ? 1 : 0,
              visibility: open ? "visible" : "hidden",
              transitionDuration: open ? "2.5s" : "0.1s",
            }}
          >
            <Breadcrumbs
              className="ml-14 select-none "
              classNames={{
                base: "w-[100%] flex justify-start items-center px-1",
              }}
            >
              <BreadcrumbItem
                classNames={{
                  item: darkMode
                    ? "text-white/70  font-bold"
                    : "text-black/70  font-bold",
                  separator: darkMode ? "text-white/70  " : "text-black/70  ",
                }}
              >
                {tenant}
              </BreadcrumbItem>
              <BreadcrumbItem
                classNames={{
                  item: darkMode
                    ? "text-white/70  font-bold"
                    : "text-black/70  font-bold",
                  separator: darkMode ? "text-white/70  " : "text-black/70  ",
                }}
              >
                {group}
              </BreadcrumbItem>
              <BreadcrumbItem
                classNames={{
                  item: darkMode
                    ? "text-white/70  font-bold"
                    : "text-black/70  font-bold",
                  separator: darkMode ? "text-white/70  " : "text-black/70  ",
                }}
              >
                {fabrics}
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <div
            style={{ transitionDuration: open ? "1.7s" : "0.1s" }}
            className={`flex flex-row   justify-between  items-center opacity-0   ${
              open ? "opacity-100 h-full  " : ""
            }`}
          >
            <Button
              size="sm"
              isIconOnly
              variant="outline"
              className=" flex flex-row w-full justify-center gap-2 items-center p-2"
              onClick={() => toggleDarkMode(!darkMode)}
            >
              <Tooltip
                content="Dark Mode"
                className={`rounded-md ${
                  darkMode
                    ? "bg-[#E9E8E8] text-black  "
                    : "bg-[#333333] text-white "
                }`}
              >
                <span>
                  {darkMode ? (
                    <FaMoon
                      className={` p-[3px] rounded cursor-pointer border border-gray-600/50 active:opacity-50 transition-all ${
                        darkMode
                          ? " hover:text-white hover:border-gray-200/80 "
                          : " hover:text-gray-700 hover:border-gray-700"
                      }`}
                      size={25}
                      color={darkMode ? "#F4F4F5" : "#616A6B "}
                    />
                  ) : (
                    <IoSunny
                      className={` p-[3px] rounded cursor-pointer border border-gray-600/50 active:opacity-50 transition-all ${
                        darkMode
                          ? " hover:text-white hover:border-gray-200/80 "
                          : " hover:text-gray-700 hover:border-gray-700"
                      }`}
                      size={25}
                      color={darkMode ? "#F4F4F5" : "#616A6B "}
                    />
                  )}
                </span>
              </Tooltip>
            </Button>
            <div className="flex  flex-row items-center justify-center gap-1   ">
              <div
                className={`${
                  darkMode
                    ? "bg-[#353535]/80 rounded-md flex  flex-row items-center justify-center p-1 gap-3 transition-all  hover:ring-2 ring-gray-400/50 cursor-pointer"
                    : "bg-gray-600/10 rounded-md flex  flex-row items-center justify-center p-1 gap-3 transition-all  hover:ring-2 ring-white cursor-pointer"
                }  `}
              >
                {defaultsMode && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setNewArtifactsName("");
                        setDefaultsMode(
                          defaultsMode === "MultiNode"
                            ? new Set(["SingleNode"])
                            : new Set(["MultiNode"])
                        );
                      }}
                      isDisabled={
                        selectedArtifacts
                          ? nodeTypes.includes(Array.from(selectedArtifacts)[0])
                          : false
                      }
                      className={`${
                        darkMode
                          ? " border border-slate-400/30 text-[#F4F4F5] "
                          : " border border-slate-400/30 text-black "
                      }`}
                    >
                      {defaultsMode}
                    </Button>
                  </>
                )}
                <ReusableDropDown
                  darkMode={darkMode}
                  isDisabled={artifacts && artifacts.length < 0 ? true : false}
                  key={"DartifactsDropdown"}
                  title={
                    (selectedArtifacts && Array.from(selectedArtifacts)[0]) ||
                    "Artifacts"
                  }
                  DropdownMenuClassName={
                    artifacts && artifacts.length > 6
                      ? "h-56 overflow-y-scroll"
                      : ""
                  }
                  selectedKey={selectedArtifacts}
                  handleSelectedKey={handleArtifactsChange}
                  items={
                    artifacts && artifacts.length > 0
                      ? artifacts.map((obj, index) => {
                          return {
                            key: obj,
                            label: obj,
                          };
                        })
                      : []
                  }
                  handleDelete={(key) => {
                    openmodal("artifacts", key);
                  }}
                />

                <DeleteModel
                  selectedKey={
                    openArtifactsModal
                      ? selectedDeletingArtifactsItem
                      : selectedDeletingVersinItem
                  }
                  onOpenChange={onOpenChange}
                  isOpen={isOpen}
                  header="Are you sure?"
                  body={`${openArtifactsModal ? selectedDeletingArtifactsItem : selectedDeletingVersinItem} is Permanently delete from REDIS SERVER`}
                  button1="Cancel"
                  button2="Confirm"
                  deleteFunction={
                    openArtifactsModal ? handleDelete : handleVersionDelete
                  }
                />

                <ReusableDropDown
                  darkMode={darkMode}
                  isDisabled={artifacts && artifacts.length < 0 ? true : false}
                  key={"DversionDropdown"}
                  title={
                    (selectedVerison && Array.from(selectedVerison)[0]) ||
                    "Version"
                  }
                  DropdownMenuClassName={
                    versions && versions.length > 6
                      ? "h-56 overflow-y-scroll"
                      : ""
                  }
                  selectedKey={selectedVerison}
                  handleSelectedKey={setSelectedVerison}
                  handleDelete={(key) => {
                    openmodal("version", key);
                  }}
                  items={
                    versions &&
                    versions.length > 0 &&
                    versions.map((obj) => {
                      return {
                        key: obj,
                        label: obj,
                      };
                    })
                  }
                />
              </div>

              <Popover
                isOpen={openArtifactsCreate}
                onOpenChange={setOpenArtifactsCreate}
              >
                <PopoverTrigger>
                  <Button
                    size="sm"
                    isIconOnly
                    className=" flex flex-row w-full justify-center gap-2 items-center "
                    variant="outline"
                  >
                    <Tooltip
                      content="Create Artifact"
                      className={`rounded-md ${
                        darkMode
                          ? "bg-[#E9E8E8] text-black  "
                          : "bg-[#333333] text-white  "
                      }`}
                    >
                      <span>
                        <IoMdAdd
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
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={`${darkMode ? "bg-[#121212]" : " bg-white"} border border-gray-400/30 text-black/70`}
                >
                  <div className="mt-2 flex flex-col gap-2 w-full mb-2 ">
                    <ReusableInput
                      key={"defaultsNavbarInput1"}
                      darkMode={darkMode}
                      value={newArtifactsName}
                      isInvalid={newArtifactsNameValidation}
                      errrMsg={
                        newArtifactsNameValidation &&
                        "Artifact name already exists"
                      }
                      label="Artifact Name"
                      size="sm"
                      variant="faded"
                      handleChange={(e) => {
                        addArtifactsName(e.target.value);
                      }}
                    />
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      isDisabled={
                        newArtifactsNameValidation || newArtifactsName === ""
                      }
                      onClick={async (e) =>
                        await handleSubmit(e, getDataFromDefault())
                      }
                    >
                      Create
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <div
                className={`${
                  darkMode
                    ? "flex flex-row justify-center items-center gap-[-3px] bg-[#121212] rounded-md p-1  "
                    : "flex flex-row justify-center items-center gap-[-3px] bg-gray-600/10 rounded-md p-1 "
                }`}
              >
                <Tooltip
                  content="Update"
                  className={`rounded-md ${
                    darkMode
                      ? "bg-[#E9E8E8] text-black  "
                      : "bg-[#333333] text-white "
                  }`}
                >
                  <span>
                    <Button
                      size="sm"
                      onClick={async () => {
                        if (selectedVerison)
                          await saveProcessFlow(
                            "update",
                            selectedArtifacts,
                            selectedVerison,
                            getDataFromDefault()
                          );
                      }}
                      variant="outline"
                    >
                      <MdOutlineUploadFile
                        className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                          darkMode
                            ? " hover:text-white hover:border-gray-200/80 "
                            : " hover:text-gray-700 hover:border-gray-700 "
                        }`}
                        size={25}
                        color={darkMode ? "#F4F4F5" : "#616A6B "}
                      />
                    </Button>
                  </span>
                </Tooltip>
                <Tooltip
                  content="Save"
                  className={`rounded-md ${
                    darkMode
                      ? "bg-[#E9E8E8] text-black  "
                      : "bg-[#333333] text-white "
                  }`}
                >
                  <span>
                    <Button
                      size="sm"
                      onClick={async () => {
                        await saveProcessFlow(
                          "create",
                          selectedArtifacts,
                          selectedVerison,
                          getDataFromDefault()
                        );
                      }}
                      variant="outline"
                    >
                      <MdOutlineSave
                        className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                          darkMode
                            ? " hover:text-white hover:border-gray-200/80 "
                            : " hover:text-gray-700 hover:border-gray-700 "
                        }`}
                        size={25}
                        color={darkMode ? "#F4F4F5" : "#616A6B "}
                      />
                    </Button>
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className={`${open ? "h-[40%]" : "h-0"}`}
              initial={{ y: "-10px", opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  type: "tween",
                  delay: 0.5,
                },
              }}
              exit={{
                y: "-10px",
                opacity: 0,
                transition: {
                  duration: 0.3,
                  type: "tween",
                },
              }}
            >
              <Toolbar undoredo={undoredo} open={open} setOpen={setOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
