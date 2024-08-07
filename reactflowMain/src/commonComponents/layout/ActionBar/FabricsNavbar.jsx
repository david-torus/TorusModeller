/*eslint-disable*/
import React, { useEffect, useState, useContext, useCallback } from "react";
import ReusableDropDown from "../../reusableComponents/ReusableDropDown";
import { IoIosCreate, IoMdAdd } from "react-icons/io";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
} from "@nextui-org/react";
import {
  getJson,
  versionList,
  artifactList,
  saveWorkFlow,
  applicationLists,
} from "../../api/fabricsApi";
import { VscSaveAs, VscServerProcess } from "react-icons/vsc";

import { MenuToggle } from "./MenuToggle";
import { AnimatePresence, motion } from "framer-motion";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { MdOutlineEventNote } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { TbTemplate } from "react-icons/tb";
import { toast } from "react-toastify";

import {
  getDomainList,
  getVersionList,
  getartifactList,
  getDefaultJson,
} from "../../api/DefaultsApi";

import { DeleteModel } from "../../Model/DeleteModel";
import { Tooltip } from "@nextui-org/react";
import { MdOutlineSave, MdOutlineUploadFile } from "react-icons/md";
import Toolbar from "../Toolbar";

import { VscDebug } from "react-icons/vsc";
import ReusableInput from "../../reusableComponents/ReusableInput";
import TorusToast from "../../../torusComponents/TorusToaster/TorusToast";
export default function FabricsNavbar({
  setFabricsKey = null,
  setUpIdKey = null,
  fabrics,
  tenant,
  group,
  application,
  children,
  undoredo,
  setartifact,
  setdomain,
  getDataFromFabrics,
  sendDataToFabrics,
  setToggleReactflow,

  setMainArtifacts,

  setMainVersion,
}) {
  const [openArtifactsCreate, setOpenArtifactsCreate] = useState(false);
  const [openProjectCreate, setOpenProjectCreate] = useState(false);
  const [openSaveAsArtifacts, setOpenSaveAsArtifacts] = useState(false);
  const [open, setOpen] = useState(true);

  const [artifactsList, setArtifactsList] = useState([]);
  const [applicationArtifactsName, setApplicationArtifactsName] = useState([]);
  const [applicationList, setApplicationList] = useState([]);
  const [selectedApplictionName, setSelectedApplictionName] = useState(null);

  const [selectedArtifacts, setSelectedArtifacts] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedArtifactsname, setSelectedArtifactsname] = useState("");
  const [versions, setVersions] = useState([]);
  const [selectedVerison, setSelectedVerison] = useState("");

  const [newArtifactsName, setNewArtifactsName] = useState("");
  const [newArtifactsNameValidation, setNewArtifactsNameValidation] =
    useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectNameValidation, setNewProjectNameValidation] =
    useState(false);

  const [openDefaultTemplate, setOpenDefaultTemplate] = useState(false);
  const [selectedsource] = useState("torus");
  const [domainList, setDomainList] = useState([]);
  const [selectedDomainLIst, setSelectedDomainLIst] = useState("");
  const [defaultArtifactList, setDefaultArtifactList] = useState([]);
  const [selectedDefaultArtifacts, setSelectedDefaultArtifacts] = useState("");
  const [defaultVersionList, setDefaultVersionList] = useState([]);
  const [selectedDefaultVersion, setSelectedDefaultVersion] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openArtifactsModal, setOpenArtifactsModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);

  const [wordLength, setWordLength] = useState(0);

  const [selectedDeletingArtifactsItem, setSelectedDeletingArtifactsItem] =
    useState(null);
  const [selectedDeletingVersinItem, setSelectedDeletingVersionItem] =
    useState(null);
  const [selectedDeletingProjectItem, setSelectedDeletingProjectItem] =
    useState(null);

  const { darkMode, toggleDarkMode } = useContext(DarkmodeContext);

  const [peModal, setPeModal] = useState("");
  const [peurlopen, setPeurlopen] = useState(false);
  const [urlOpen, setUrlOpen] = useState(false);
  const [urls, setUrl] = useState("");

  const handleArtifactSubmit = async (e, erDatas, type = "") => {
    try {
      const res = await saveProcessFlow(
        "create",
        selectedApplictionName,
        new Set([newArtifactsName.trim().toLocaleLowerCase()]),
        new Set("v1"),
        erDatas,
      );

      if (res.status === 200 || res.status === 201) {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "success",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Success",
            text: `Saved successfully`,
            closeButton: false,
          },
        );
      } else {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "error",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Error",
            text: `Error while saving`,
            closeButton: false,
          },
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e, erDatas, type = "") => {
    try {
      if (type === "saveAs") {
        const res = await saveProcessFlow(
          "create",
          selectedApplication,
          selectedArtifactsname,
          new Set("v1"),
          erDatas,
        );
        if (res.status === 200 || res.status === 201) {
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
              text: `saveAs successfully`,
              closeButton: false,
            },
          );
        } else {
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "error",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Error",
              text: `Error while saveAs`,
              closeButton: false,
            },
          );
        }
      } else {
        const res = await saveProcessFlow(
          "create",
          new Set([newProjectName.trim().toLocaleLowerCase()]),
          new Set([newArtifactsName.trim().toLocaleLowerCase()]),
          new Set("v1"),
          erDatas,
        );

        if (res.status === 200 || res.status === 201) {
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
              text: `created successfully`,
              closeButton: false,
            },
          );
        } else {
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "error",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Error",
              text: `Error while creating`,
              closeButton: false,
            },
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleProcessEngine = async () => {
    try {
      const version = [...selectedVerison][0];
      const artifact = [...selectedArtifacts][0];
      await fetch(`${process.env.REACT_APP_API_URL}pe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "Admin",
        },
        body: JSON.stringify({
          key: `${tenant}:${group}:${application}:${fabrics}:${artifact}:${version}:`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.url && Object.keys(data.url).length) {
            const { key, upId, nodeId, nodeName, url, mode } = data.url;

            window.open(url, "_blank");
            setPeModal(
              `${url}?key=${key}&upId=${upId}&nodeId=${nodeId}&nodeName=${nodeName}&mode=${mode}`,
            );

            setPeurlopen(true);

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
                text: `data send to process engine`,
                closeButton: false,
              },
            );
          } else if (data && data.data) {
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
                title: "Error",
                text: `data send to process engine`,
                closeButton: false,
              },
            );
          }
        })
        .catch((err) => {
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "error",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Error",
              text: `Error sending key to process engine`,
              closeButton: false,
            },
          );
        });
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Error sending key to process engine`,
          closeButton: false,
        },
      );
    }
  };
  const handleDebug = async () => {
    try {
      const version = [...selectedVerison][0];
      const artifact = [...selectedArtifacts][0];

      await fetch(`${process.env.REACT_APP_API_URL}pe/debugExecution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "Admin",
        },
        body: JSON.stringify({
          key: `${tenant}:${group}:${application}:${fabrics}:${artifact}:${version}:`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            toast(
              <TorusToast
                setWordLength={setWordLength}
                wordLength={wordLength}
              />,
              {
                type: "success",
                position: "bottom-right",
                autoClose: 2000,
                closeButton: false,
                hideProgressBar: true,
                title: "Success",
                text: `upId found in process engine - ${data.formjson.url}`,
              },
            );

            const { key, upId, nodeId, nodeName, url, mode } = data.formjson;
            setUrl(
              `${url}?key=${key}&upId=${upId}&nodeId=${nodeId}&nodeName=${nodeName}&mode=${mode}`,
            );
            setUpIdKey(data.formjson.upId);
            setUrlOpen(true);
          } else if (data.hasOwnProperty("err")) {
            // toast.success(" Error found in process engine - " + data.err, {
            //   position: "bottom-right",
            //   autoClose: 2000,
            // });

            toast(
              <TorusToast
                setWordLength={setWordLength}
                wordLength={wordLength}
              />,
              {
                type: "success",
                position: "bottom-right",
                autoClose: 2000,
                closeButton: false,
                hideProgressBar: true,
                title: "Success",
                text: `Error found in process engine - ${data.err}`,
              },
            );
          }
        })
        .catch((err) => {
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "error",
              position: "bottom-right",
              autoClose: 2000,
              closeButton: false,
              hideProgressBar: true,
              title: "Error",
              text: `Error in process engine`,
            },
          );
        });
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
          title: "Error",
          text: `Error sending key to process engine`,
        },
      );
    }
  };

  const addProjectName = (e) => {
    try {
      let condicheck = true;

      applicationList?.map((obj) => {
        if (obj.trim().toLocaleLowerCase() === e.trim().toLocaleLowerCase()) {
          condicheck = false;
        }
        return obj;
      });

      if (condicheck) {
        setNewProjectNameValidation(false);
        setNewProjectName(e);
      } else {
        setNewProjectNameValidation(true);
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
          text: `Cannot create artifact`,
          closeButton: false,
        },
      );
    }
  };

  const addArtifactsName = (e) => {
    try {
      let condicheck = true;

      artifactsList?.map((obj) => {
        if (obj.trim().toLocaleLowerCase() === e.trim().toLocaleLowerCase()) {
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
    } catch (err) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot create artifact`,
          closeButton: false,
        },
      );
    }
  };

  const getVersion = async (artifact) => {
    try {
      if (Array.from(artifact)[0]) {
        const version = await versionList(
          tenant,
          group,
          Array.from(selectedApplictionName)[0],
          artifact,
          fabrics,
        );
        if (version && version?.status === 200) setVersions(version?.data);
        else
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "error",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Error",
              text: `Cannot get version details`,
              closeButton: false,
            },
          );
      }
    } catch (err) {
      toast.error("Cannot get artifacts details", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleArtifactsChange = (e) => {
    try {
      setSelectedVerison(null);
      if (Array.from(e)[0]) {
        getVersion(Array.from(e)[0]);
      } else {
        setVersions([]);
      }
      sendDataToFabrics({});
      setSelectedArtifacts(e);
      setMainArtifacts && setMainArtifacts(Array.from(e)[0]);
    } catch (err) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot get artifacts details`,
          closeButton: false,
        },
      );
    }
  };

  const handleArtifactsNameChange = (e) => {
    try {
      setSelectedArtifactsname(e);
    } catch (err) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot get artifacts details`,
          closeButton: false,
        },
      );
    }
  };

  const handleDomainNameChange = (e) => {
    try {
      setSelectedDomainLIst(e);
      setdomain(e);
      setSelectedDefaultArtifacts("");
      setSelectedDefaultVersion("");
    } catch (err) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot set Domain`,
          closeButton: false,
        },
      );
    }
  };

  const handleDefaultArtifactsChange = (e) => {
    try {
      setSelectedDefaultArtifacts(e);
      setartifact(e);
    } catch (err) {
      setSelectedDefaultVersion("");

      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot set selected artifacts`,
          closeButton: false,
        },
      );
    }
  };

  const handleDefaultVersionChange = (e) => {
    try {
      setSelectedDefaultVersion(e);
    } catch (err) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot set selected Default Version`,
          closeButton: false,
        },
      );
    }
  };

  const handleDeafaultLoad = async () => {
    try {
      const responses = await getDefaultJson(
        Array.from(selectedDefaultVersion)[0],
        Array.from(selectedDefaultArtifacts)[0],
        selectedsource,
        Array.from(selectedDomainLIst)[0],
        fabrics,
      );

      if (responses) sendDataToFabrics(responses.data);
    } catch (err) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot load Default FLow details`,
          closeButton: false,
        },
      );
    }
  };

  const handleApplicationName = async (e) => {
    try {
      setSelectedArtifacts([]);
      setSelectedVerison([]);
      setSelectedApplictionName(e);

      if (e) {
        handleIntialLoad(tenant, group, fabrics, Array.from(e)[0]).catch(
          (err) => {
            throw err;
          },
        );
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
          text: `Cannot set selected Application`,
          closeButton: false,
        },
      );
    }
  };
  const handleApplication = async (e) => {
    try {
      setSelectedApplication(e);
      if (e) {
        try {
          const response = await artifactList(
            tenant,
            group,
            Array.from(e)[0],
            fabrics,
          );

          if (response && response?.status === 200) {
            setApplicationArtifactsName(response.data);
          }
        } catch (error) {
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "error",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Error",
              text: `Cannot get artifacts details`,
              closeButton: false,
            },
          );
        }
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
          text: `Cannot set selected Application`,
          closeButton: false,
        },
      );
    }
  };

  const handleGetApplications = async (tenant, group, fabrics) => {
    try {
      console.log("handleGetApplications", tenant, group, fabrics);
      const response = await applicationLists(tenant, group, fabrics);

      if (response && response.status === 200) {
        setApplicationList(response.data);
      }
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot save application details`,
          closeButton: false,
        },
      );
    }
  };
  console.log("applicationList", applicationList);

  const handleIntialLoad = async (tenant, group, fabrics, applications) => {
    try {
      console.log("handleIntialLoad", applications);
      const response = await artifactList(tenant, group, applications, fabrics);
      if (response && response?.status === 200) {
        setArtifactsList(response.data);
      }
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot get artifacts details`,
          closeButton: false,
        },
      );
    }
  };

  // const handleApplicationLoad = async (
  //   tenant,
  //   group,
  //   fabrics,
  //   selectedApplication
  // ) => {
  //   try {
  //     console.log("handleApplicationLoad", selectedApplication )
  //     const response = await artifactList(
  //       tenant,
  //       group,
  //       selectedApplication,
  //       fabrics
  //     );

  //     if (response && response?.status === 200) {
  //       setApplicationArtifactsName(response.data);
  //     }
  //   } catch (error) {
  //     toast.error("Cannot get artifacts details", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //   }
  // };

  useEffect(() => {
    if (urlOpen) {
      window.open(urls, "_blank");
    }
  }, [urlOpen, urls]);

  useEffect(() => {
    if (peurlopen) {
      window.open(peModal, "_blank");
    }
  }, [peurlopen, peModal]);

  const saveProcessFlow = async (
    type,
    selectedApplictionNames,
    selectedArtifactss,
    selectedVerisonss,
    erDatas,
  ) => {
    try {
      const payload = {
        flow: { ...erDatas },

        applicationName: Array.from(selectedApplictionNames)[0],

        artifact: Array.from(selectedArtifactss)[0],
      };

      const response = await saveWorkFlow(
        payload,
        type,
        Array.from(selectedVerisonss)[0],
        tenant,
        group,
        fabrics,
      );
      if (response && response.status === 200) {
        if (type === "create") {
          await handleIntialLoad(
            tenant,
            group,
            fabrics,
            Array.from(selectedApplictionNames)[0] || selectedApplication,
          );
          setNewArtifactsName("");
          setSelectedApplictionName(selectedApplictionNames);
          setSelectedArtifacts(selectedArtifactss);
          setMainArtifacts &&
            setMainArtifacts(Array.from(selectedArtifactss)[0]);
          setVersions(response.data);
          setSelectedVerison(
            new Set([response.data[response.data.length - 1]]),
          );
          setMainVersion &&
            setMainVersion(response.data[response.data.length - 1]);
          if (fabrics) {
            toast.success(`${fabrics} Fabrics saved successfully`, {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        }
      } else if (response && response.status === 201) {
        if (type === "update") {
          setSelectedApplictionName(selectedApplictionNames);
          setSelectedArtifacts(selectedArtifactss);
          if (fabrics) {
            toast(
              <TorusToast
                setWordLength={setWordLength}
                wordLength={wordLength}
              />,
              {
                type: "info",
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                title: "Information",
                text: `${fabrics} Fabrics updated successfully`,
                closeButton: false,
              },
            );
          }
        }
      }

      return response;
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot save artifacts details`,
          closeButton: false,
        },
      );
    }
  };

  const getProcessFlowApi = useCallback(
    async (event) => {
      try {
        if (Array.from(selectedVerison)[0]) {
          const response = await getJson(
            Array.from(selectedApplictionName)[0],
            Array.from(selectedVerison)[0],
            Array.from(selectedArtifacts)[0],
            tenant,
            group,
            fabrics,
          );

          if (response && typeof response === "object" && response) {
            sendDataToFabrics({
              ...response.data,
            });
          } else {
            toast(
              <TorusToast
                setWordLength={setWordLength}
                wordLength={wordLength}
              />,
              {
                type: "error",
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                title: "Error",
                text: `no data found`,
                closeButton: false,
              },
            );
          }
        } else {
          sendDataToFabrics({});
        }
      } catch (error) {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "error",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Error",
            text: `Cannot load Flow details`,
            closeButton: false,
          },
        );
      }
    },
    [
      fabrics,
      group,
      selectedApplictionName,
      selectedArtifacts,
      selectedVerison,
      sendDataToFabrics,
      tenant,
    ],
  );

  const openmodal = (type) => {
    try {
      if (type === "project") {
        setOpenProjectModal(true);
        onOpen();
      }
      if (type === "artifacts") {
        setOpenArtifactsModal(true);
        // setOpenVersionModal(false);
        onOpen();
      }
      if (type === "version") {
        // setOpenVersionModal(true);
        setOpenArtifactsModal(false);
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
    }
  };

  const handleProjectDelete = async (e) => {
    try {
      const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;

      const response = await fetch(
        `${BASE_URL}/deleteApplication?tenant=${tenant}&appGroup=${group}&applicationName=${e}`,
        {
          method: "DELETE",
        },
      ).then((res) => res.json());

      if (response && response.status === 200) {
        setApplicationList(response.data);
        setSelectedApplictionName("");
        setSelectedArtifacts("");
        setVersions([]);

        sendDataToFabrics({
          nodes: [],
          nodeEdges: [],
          nodeProperty: {},
        });

        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "success",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Success",
            text: `${e} Deleted Successfully`,
            closeButton: false,
          },
        );

        setOpenProjectModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    try {
      const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;

      const response = await fetch(
        `${BASE_URL}/deleteFlowArtifact?tenant=${tenant}&appGroup=${group}&applicationName=${application}&fabrics=${fabrics}&artifact=${e}`,
        {
          method: "DELETE",
        },
      ).then((res) => res.json());

      if (response && response.status === 200) {
        setArtifactsList(response.data);
        setSelectedArtifacts("");
        setVersions([]);

        sendDataToFabrics({
          nodes: [],
          nodeEdges: [],
          nodeProperty: {},
        });

        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "success",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Success",
            text: `${e} Deleted Successfully`,
            closeButton: false,
          },
        );

        setOpenArtifactsModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVersionDelete = async (e) => {
    try {
      const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;

      const response = await fetch(
        `${BASE_URL}/deleteFlowVersion?tenant=${tenant}&appGroup=${group}&applicationName=${application}&fabrics=${fabrics}&artifact=${Array.from(selectedArtifacts)[0]}&version=${e}`,
        {
          method: "DELETE",
        },
      ).then((res) => res.json());

      if (response && response.status === 200) {
        setVersions(response?.data);
        setSelectedVerison("");
        sendDataToFabrics({
          nodes: [],
          nodeEdges: [],
          nodeProperty: {},
        });

        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "success",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Success",
            text: `${e} Deleted Successfully`,
            closeButton: false,
          },
        );

        // setOpenVersionModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      getDomainList(selectedsource)
        .then((domain) => {
          if (domain) setDomainList(domain.data);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.error(error);
    }
  }, [selectedsource]);

  useEffect(() => {
    try {
      if (selectedDomainLIst) {
        getartifactList(
          selectedsource,
          Array.from(selectedDomainLIst)[0],
          fabrics,
        )
          .then((artifacts) => {
            if (artifacts) setDefaultArtifactList(artifacts.data);
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedsource, selectedDomainLIst]);

  useEffect(() => {
    try {
      if (selectedDefaultArtifacts) {
        getVersionList(
          selectedsource,
          Array.from(selectedDomainLIst)[0],
          fabrics,
          Array.from(selectedDefaultArtifacts)[0],
        )
          .then((res) => {
            if (res) setDefaultVersionList(res.data.version);
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {}
  }, [selectedsource, selectedDomainLIst, selectedDefaultArtifacts, fabrics]);

  useEffect(() => {
    try {
      if (!selectedVerison) return;
      const version = [...selectedVerison][0];
      const artifact = [...selectedArtifacts][0];

      if (setFabricsKey)
        setFabricsKey(
          `${tenant}:${group}:${Array.from(selectedApplictionName)[0]}:${fabrics}:${artifact}:${version}:`,
        );
      getProcessFlowApi(selectedVerison).catch((err) => {
        throw err;
      });
    } catch (error) {
      console.error(error);
    }
  }, [
    selectedVerison,
    selectedArtifacts,
    selectedApplictionName,
    fabrics,
    group,
    setFabricsKey,
    tenant,
  ]);

  // useEffect(() => {
  //   try {
  //     setSelectedApplictionName(new Set([application]));
  //     setArtifactsList([]);
  //     setSelectedArtifacts("");
  //     setVersions([]);
  //     setSelectedVerison("");
  //     if(selectedApplictionName){
  //       handleIntialLoad(tenant, group, fabrics, Array.from(selectedApplictionName)[0]).catch((err) => {
  //         throw err;
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [fabrics, application, group, tenant]);

  // useEffect(() => {
  //   try {
  //     if (selectedApplictionName) {
  //       handleApplicationLoad(
  //         tenant,
  //         group,
  //         fabrics,
  //         Array.from(selectedApplictionName)[0]
  //       ).catch((err) => {
  //         throw err;
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [selectedApplication, fabrics, group, tenant]);

  useEffect(() => {
    try {
      handleGetApplications(tenant, group, fabrics).catch((err) => {
        throw err;
      });
    } catch (error) {
      console.error(error);
    }
  }, [fabrics, group, tenant]);

  return (
    <>
      {tenant && (
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
                ? "relative rounded-lg border  border-gray-500 bg-[#1E1E1E]/90"
                : "relative rounded-lg border  border-gray-500 backdrop-blur-sm"
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
              style={{ visibility: open ? "visible" : "hidden" }}
              className="flex h-[60%] w-[100%] flex-row items-center   justify-between  p-2  "
            >
              <div
                style={{
                  opacity: open ? 1 : 0,
                  visibility: open ? "visible" : "hidden",
                  transitionDuration: open ? "2.5s" : "0.1s",
                }}
              >
                <Breadcrumbs className="ml-14  select-none ">
                  <BreadcrumbItem
                    classNames={{
                      item: darkMode
                        ? "text-white/70  font-bold"
                        : "text-black/70  font-bold",
                      separator: darkMode
                        ? "text-white/70  "
                        : "text-black/70  ",
                    }}
                  >
                    {tenant}
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    classNames={{
                      item: darkMode
                        ? "text-white/70  font-bold"
                        : "text-black/70  font-bold",
                      separator: darkMode
                        ? "text-white/70  "
                        : "text-black/70  ",
                    }}
                  >
                    {group}
                  </BreadcrumbItem>

                  {/* <BreadcrumbItem
                    classNames={{
                      item: darkMode
                        ? "text-white/70  font-bold"
                        : "text-black/70  font-bold",
                      separator: darkMode
                        ? "text-white/70  "
                        : "text-black/70  ",
                    }}
                  >
                    {Array.from(selectedApplictionName)[0]}
                  </BreadcrumbItem> */}
                  <BreadcrumbItem
                    classNames={{
                      item: darkMode
                        ? "text-white/70  font-bold"
                        : "text-black/70  font-bold",
                      separator: darkMode
                        ? "text-white/70  "
                        : "text-black/70  ",
                    }}
                  >
                    {fabrics}
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>

              <div
                style={{ transitionDuration: open ? "1.7s" : "0.1s" }}
                className={`flex flex-row items-center justify-between  gap-1 opacity-0   ${
                  open ? "h-full opacity-100" : ""
                }`}
              >
                <Popover
                  isOpen={openDefaultTemplate}
                  onOpenChange={setOpenDefaultTemplate}
                >
                  <PopoverTrigger>
                    <Button
                      size="sm"
                      isIconOnly
                      variant="outline"
                      className="flex w-full flex-row items-center justify-center gap-2"
                    >
                      <Tooltip
                        content="Load Default Template"
                        className={`rounded-md ${
                          darkMode
                            ? "bg-[#E9E8E8] text-black  "
                            : "bg-[#333333] text-white  "
                        }`}
                      >
                        <span>
                          <TbTemplate
                            className={`cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                              darkMode
                                ? " hover:border-gray-200/80 hover:text-white "
                                : " hover:border-gray-700 hover:text-gray-700 "
                            }`}
                            size={25}
                            color={darkMode ? "#F4F4F5" : "#616A6B "}
                          />
                        </span>
                      </Tooltip>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="border border-slate-400/30 bg-white text-black">
                    <div className="mb-2 mt-2 flex w-full flex-wrap gap-2 ">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border border-slate-400/30 bg-[#143C59]/70 text-white"
                      >
                        {(selectedsource && selectedsource) || "Source"}
                      </Button>
                      <ReusableDropDown
                        key={"defaultsDomainDropdown"}
                        title={
                          (selectedDomainLIst &&
                            Array.from(selectedDomainLIst)[0]) ||
                          "Domain Name"
                        }
                        buttonClassName="bg-[#143C59]/70 border border-slate-400/30 text-white"
                        darkMode={darkMode}
                        isDisabled={
                          domainList && domainList.length < 0 ? true : false
                        }
                        DropdownMenuClassName={
                          domainList && domainList.length > 6
                            ? "h-56 overflow-y-scroll"
                            : ""
                        }
                        items={
                          domainList &&
                          domainList?.map((obj, index) => {
                            return {
                              key: obj,
                              label: obj,
                            };
                          })
                        }
                        selectedKey={selectedDomainLIst}
                        handleSelectedKey={handleDomainNameChange}
                      />

                      <ReusableDropDown
                        key={"defaultsArtifactDropdown"}
                        title={
                          (selectedDefaultArtifacts &&
                            Array.from(selectedDefaultArtifacts)[0]) ||
                          "Artifacts Name"
                        }
                        buttonClassName="bg-[#143C59]/70 border border-slate-400/30 text-white"
                        darkMode={darkMode}
                        isDisabled={
                          defaultArtifactList && defaultArtifactList.length < 0
                            ? true
                            : false
                        }
                        DropdownMenuClassName={
                          defaultArtifactList && defaultArtifactList.length > 6
                            ? "h-56 overflow-y-scroll"
                            : ""
                        }
                        items={
                          defaultArtifactList &&
                          defaultArtifactList?.map((obj, index) => {
                            return {
                              key: obj,
                              label: obj,
                            };
                          })
                        }
                        selectedKey={selectedDefaultArtifacts}
                        handleSelectedKey={handleDefaultArtifactsChange}
                      />

                      <ReusableDropDown
                        key={"defaultsVersionDropdown"}
                        title={
                          (selectedDefaultVersion &&
                            Array.from(selectedDefaultVersion)[0]) ||
                          "Version List"
                        }
                        buttonClassName="bg-[#143C59]/70 border border-slate-400/30 text-white"
                        darkMode={darkMode}
                        isDisabled={
                          defaultVersionList && defaultVersionList.length < 0
                            ? true
                            : false
                        }
                        DropdownMenuClassName={
                          defaultVersionList && defaultVersionList.length > 6
                            ? "h-56 overflow-y-scroll"
                            : ""
                        }
                        items={
                          defaultVersionList &&
                          defaultVersionList?.map((obj, index) => {
                            return {
                              key: obj,
                              label: obj,
                            };
                          })
                        }
                        selectedKey={selectedDefaultVersion}
                        handleSelectedKey={handleDefaultVersionChange}
                      />

                      <Button
                        size="sm"
                        onClick={async () => {
                          await handleDeafaultLoad();
                        }}
                      >
                        Load Defaults
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  size="sm"
                  isIconOnly
                  variant="outline"
                  className=" flex w-full flex-row items-center justify-center gap-2 p-2"
                  onClick={() => toggleDarkMode(!darkMode)}
                >
                  <Tooltip
                    className={`rounded-md ${
                      darkMode
                        ? "bg-[#E9E8E8] text-black  "
                        : "bg-[#333333] text-white "
                    }`}
                    content="Dark Mode"
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
                <DeleteModel
                  selectedKey={openProjectModal && selectedDeletingProjectItem}
                  onOpenChange={onOpenChange}
                  isOpen={isOpen}
                  header="Are you sure?"
                  body={`${openProjectModal && selectedDeletingProjectItem} is Permanently delete from REDIS SERVER`}
                  button1="Cancel"
                  button2="Confirm"
                  deleteFunction={handleProjectDelete}
                />

                {children && <>{children}</>}

                <div className="flex  flex-row items-center justify-center gap-1  ">
                  <div
                    className={`${
                      darkMode
                        ? "flex cursor-pointer flex-row  items-center justify-center gap-3 rounded-md bg-[#353535]/80 p-1  ring-gray-400/50 transition-all hover:ring-2"
                        : "flex cursor-pointer flex-row  items-center justify-center gap-3 rounded-md bg-gray-600/10 p-1  ring-white transition-all hover:ring-2"
                    }  `}
                  >
                    <ReusableDropDown
                      key={"ApplicationDropdown"}
                      title={
                        (selectedApplictionName &&
                          Array.from(selectedApplictionName)[0]) ||
                        "Projects"
                      }
                      darkMode={darkMode}
                      isDisabled={applicationList.length < 0 ? true : false}
                      DropdownMenuClassName={
                        applicationList.length > 6
                          ? "h-56 overflow-y-scroll"
                          : ""
                      }
                      items={
                        applicationList &&
                        applicationList?.map((obj) => {
                          return {
                            key: obj,
                            label: obj,
                          };
                        })
                      }
                      selectedKey={selectedApplictionName}
                      handleSelectedKey={handleApplicationName}
                      handleDelete={(key) => {
                        setSelectedDeletingProjectItem(key);
                        openmodal("project");
                      }}
                    />

                    <ReusableDropDown
                      key={"artifactsDropdown"}
                      title={
                        (selectedArtifacts &&
                          Array.from(selectedArtifacts)[0]) ||
                        "Artifacts"
                      }
                      darkMode={darkMode}
                      isDisabled={!selectedApplictionName ? true : false}
                      DropdownMenuClassName={
                        artifactsList && artifactsList.length > 6
                          ? "h-56 overflow-y-scroll"
                          : ""
                      }
                      items={
                        artifactsList &&
                        artifactsList?.map((obj, index) => {
                          return {
                            key: obj,
                            label: obj,
                          };
                        })
                      }
                      selectedKey={selectedArtifacts}
                      handleSelectedKey={handleArtifactsChange}
                      handleDelete={(key) => {
                        setSelectedDeletingArtifactsItem(key);
                        openmodal("artifacts");
                      }}
                    />

                    <ReusableDropDown
                      key={"versionDropdown"}
                      title={
                        (selectedVerison && Array.from(selectedVerison)[0]) ||
                        "Version"
                      }
                      darkMode={darkMode}
                      isDisabled={
                        selectedArtifacts && Array.from(selectedArtifacts)[0]
                          ? false
                          : true
                      }
                      DropdownMenuClassName={
                        versions && versions.length > 6
                          ? "h-30 overflow-y-scroll  "
                          : ""
                      }
                      items={
                        versions &&
                        versions?.map((obj) => {
                          return {
                            key: obj,
                            label: obj,
                          };
                        })
                      }
                      selectedKey={selectedVerison}
                      handleSelectedKey={(key) => {
                        setSelectedVerison(key);
                        setMainVersion && setMainVersion(Array.from(key)[0]);
                      }}
                      handleDelete={(key) => {
                        setSelectedDeletingVersionItem(key);

                        openmodal("version");
                      }}
                    />

                    {fabrics && fabrics === "UF" && (
                      <Button
                        isIconOnly
                        size="sm"
                        variant="outline"
                        className=" flex w-full flex-row items-center justify-center gap-2 "
                        onClick={() => {
                          if (selectedArtifacts && selectedVerison) {
                            setToggleReactflow((prev) => ({
                              ...prev,
                              events: true,
                            }));
                          } else {
                            toast(
                              <TorusToast
                                setWordLength={setWordLength}
                                wordLength={wordLength}
                              />,
                              {
                                position: "bottom-right",
                                autoClose: 2000,
                                hideProgressBar: true,
                                closeButton: false,
                                closeOnClick: true,
                                title: "Error",
                                text: "Please select artifacts and version",
                              },
                            );
                          }
                        }}
                      >
                        <Tooltip
                          content="Events"
                          className={`rounded-md ${
                            darkMode
                              ? "bg-[#E9E8E8] text-black  "
                              : "bg-[#333333] text-white  "
                          }`}
                        >
                          <span>
                            <MdOutlineEventNote
                              className={`cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                                darkMode
                                  ? " hover:border-gray-200/80 hover:text-white "
                                  : " hover:border-gray-700 hover:text-gray-700 "
                              }`}
                              size={25}
                              color={darkMode ? "#F4F4F5" : "#616A6B "}
                            />
                          </span>
                        </Tooltip>
                      </Button>
                    )}
                    {fabrics === "PF" &&
                      selectedArtifacts &&
                      selectedVerison && (
                        <>
                          <Button
                            isIconOnly
                            className=" flex w-full flex-row items-center justify-center gap-2 "
                            size="sm"
                            onClick={handleProcessEngine}
                            variant="outline"
                          >
                            <Tooltip
                              content="PE_EXECUTE"
                              className={`rounded-md ${
                                darkMode
                                  ? "bg-[#E9E8E8] text-black  "
                                  : "bg-[#333333] text-white  "
                              }`}
                            >
                              <span>
                                <VscServerProcess
                                  className={`cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                                    darkMode
                                      ? " hover:border-gray-200/80 hover:text-white "
                                      : " hover:border-gray-700 hover:text-gray-700 "
                                  }`}
                                  size={25}
                                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                                />
                              </span>
                            </Tooltip>
                          </Button>
                          <Button
                            isIconOnly
                            className=" flex w-full flex-row items-center justify-center gap-2 "
                            size="sm"
                            onClick={handleDebug}
                            variant="outline"
                          >
                            <Tooltip
                              content="DEBUG"
                              className={`rounded-md ${
                                darkMode
                                  ? "bg-[#E9E8E8] text-black  "
                                  : "bg-[#333333] text-white  "
                              }`}
                            >
                              <span>
                                <VscDebug
                                  className={`cursor-pointer rounded border  border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                                    darkMode
                                      ? " hover:border-gray-200/80 hover:text-white"
                                      : " hover:border-gray-700 hover:text-gray-700 "
                                  }`}
                                  size={25}
                                  color={darkMode ? "#F4F4F5" : "#616A6B "}
                                />
                              </span>
                            </Tooltip>
                          </Button>
                        </>
                      )}
                  </div>

                  <Popover
                    isOpen={openProjectCreate}
                    onOpenChange={setOpenProjectCreate}
                  >
                    <PopoverTrigger>
                      <Button
                        size="sm"
                        isIconOnly
                        className=" flex w-full flex-row items-center justify-center gap-2 "
                        variant="outline"
                      >
                        <Tooltip
                          content="Create Project"
                          className={`rounded-md ${
                            darkMode
                              ? "bg-[#E9E8E8] text-black  "
                              : "bg-[#333333] text-white  "
                          }`}
                        >
                          <span>
                            <IoIosCreate
                              className={`cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                                darkMode
                                  ? " hover:border-gray-200/80 hover:text-white "
                                  : " hover:border-gray-700 hover:text-gray-700 "
                              }`}
                              size={25}
                              color={darkMode ? "#ffffff" : "#616A6B "}
                            />
                          </span>
                        </Tooltip>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className={`${darkMode ? "bg-[#121212]" : " bg-white"} border border-gray-400/30 text-black/70`}
                    >
                      <div className="mb-2 mt-2 flex w-full flex-col gap-2 ">
                        <ReusableInput
                          key={"fabricsNavbarInput1"}
                          darkMode={darkMode}
                          value={newProjectName}
                          isInvalid={newProjectNameValidation}
                          errrMsg={
                            newProjectNameValidation &&
                            "Project name already exists"
                          }
                          label="Project Name"
                          size="sm"
                          variant="faded"
                          handleChange={(e) => {
                            addProjectName(e.target.value);
                          }}
                        />

                        <ReusableInput
                          key={"fabricsNavbarInput1"}
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
                            newArtifactsNameValidation ||
                            newArtifactsName === "" ||
                            newProjectName === "" ||
                            newProjectNameValidation
                          }
                          onClick={async (e) =>
                            await handleSubmit(e, getDataFromFabrics())
                          }
                        >
                          Create
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover
                    isOpen={openArtifactsCreate}
                    onOpenChange={setOpenArtifactsCreate}
                  >
                    <PopoverTrigger>
                      <Button
                        size="sm"
                        isIconOnly
                        color="red"
                        className=" flex w-full flex-row items-center justify-center gap-2 "
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
                              className={`cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                                darkMode
                                  ? " hover:border-gray-200/80 hover:text-white "
                                  : " hover:border-gray-700 hover:text-gray-700 "
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
                      <div className="mb-2 mt-2 flex w-full flex-col gap-2 ">
                        <ReusableInput
                          key={"fabricsNavbarInput1"}
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
                          isDisabled={
                            newArtifactsNameValidation ||
                            newArtifactsName === "" ||
                            !selectedApplictionName
                          }
                          onClick={async (e) =>
                            await handleArtifactSubmit(e, getDataFromFabrics())
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
                        ? "flex flex-row items-center justify-center gap-2  rounded-md bg-[#121212] p-1  "
                        : "flex flex-row items-center justify-center gap-2  rounded-md bg-gray-600/10 p-1 "
                    }`}
                  >
                    <Button
                      size="sm"
                      isIconOnly
                      className=" flex w-full flex-row items-center justify-center gap-2 "
                      onClick={async () => {
                        await saveProcessFlow(
                          "update",
                          selectedApplictionName,
                          selectedArtifacts,
                          selectedVerison,
                          getDataFromFabrics(),
                        );
                      }}
                      isDisabled={
                        selectedArtifacts == null ||
                        selectedVerison == null ||
                        selectedArtifacts === "" ||
                        selectedVerison === ""
                      }
                      variant="outline"
                    >
                      <Tooltip
                        content="Update"
                        className={`rounded-md ${
                          darkMode
                            ? "bg-[#E9E8E8] text-black  "
                            : "bg-[#333333] text-white  "
                        }`}
                      >
                        <span>
                          <MdOutlineUploadFile
                            className={`cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                              darkMode
                                ? " hover:border-gray-200/80 hover:text-white "
                                : " hover:border-gray-700 hover:text-gray-700 "
                            }`}
                            size={25}
                            color={darkMode ? "#F4F4F5" : "#616A6B "}
                          />
                        </span>
                      </Tooltip>
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      className=" flex w-full flex-row items-center justify-center gap-2 "
                      onClick={async () => {
                        await saveProcessFlow(
                          "create",
                          selectedApplictionName,
                          selectedArtifacts,
                          selectedVerison,
                          getDataFromFabrics(),
                        );
                      }}
                      isDisabled={
                        selectedArtifacts == null ||
                        selectedVerison == null ||
                        selectedArtifacts === "" ||
                        selectedVerison === ""
                      }
                      variant="outline"
                    >
                      <Tooltip
                        content="Save"
                        className={`rounded-md ${
                          darkMode
                            ? "bg-[#E9E8E8] text-black  "
                            : "bg-[#333333] text-white  "
                        }`}
                      >
                        <span>
                          <MdOutlineSave
                            className={`cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                              darkMode
                                ? " hover:border-gray-200/80 hover:text-white "
                                : " hover:border-gray-700 hover:text-gray-700 "
                            }`}
                            size={25}
                            color={darkMode ? "#F4F4F5" : "#616A6B "}
                          />
                        </span>
                      </Tooltip>
                    </Button>

                    <Popover
                      isOpen={openSaveAsArtifacts}
                      onOpenChange={setOpenSaveAsArtifacts}
                    >
                      <PopoverTrigger
                        disabled={
                          selectedArtifacts == null ||
                          selectedVerison == null ||
                          selectedArtifacts === "" ||
                          selectedVerison === ""
                        }
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          isIconOnly
                          isDisabled={
                            selectedArtifacts == null ||
                            selectedVerison == null ||
                            selectedArtifacts === "" ||
                            selectedVerison === ""
                          }
                          className=" flex w-full flex-row items-center justify-center gap-2 "
                        >
                          <Tooltip
                            content="Save As"
                            className={`rounded-md ${
                              darkMode
                                ? "bg-[#E9E8E8] text-black  "
                                : "bg-[#333333] text-white  "
                            }`}
                          >
                            <span>
                              <VscSaveAs
                                className={`cursor-pointer rounded border border-gray-600/50 p-[3px] transition-all active:opacity-50 ${
                                  darkMode
                                    ? " hover:border-gray-200/80 hover:text-white "
                                    : " hover:border-gray-700 hover:text-gray-700 "
                                }`}
                                size={25}
                                color={darkMode ? "#F4F4F5" : "#616A6B "}
                              />
                            </span>
                          </Tooltip>
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="border border-slate-400/30 bg-white text-black">
                        <div className="mb-2 mt-2 flex w-full flex-col gap-2 ">
                          <ReusableDropDown
                            key={"ApplicationDropdown"}
                            title={
                              (selectedApplication &&
                                Array.from(selectedApplication)[0]) ||
                              "Application"
                            }
                            buttonClassName="bg-[#143C59]/70 border border-slate-400/30 text-white"
                            darkMode={darkMode}
                            isDisabled={
                              applicationList.length < 0 ? true : false
                            }
                            DropdownMenuClassName={
                              applicationList.length > 6
                                ? "h-56 overflow-y-scroll"
                                : ""
                            }
                            items={
                              applicationList &&
                              applicationList?.map((obj) => {
                                return {
                                  key: obj,
                                  label: obj,
                                };
                              })
                            }
                            selectedKey={selectedApplication}
                            handleSelectedKey={handleApplication}
                          />

                          <ReusableDropDown
                            key={"AppArtifactsDropdown"}
                            title={
                              (selectedArtifactsname &&
                                Array.from(selectedArtifactsname)[0]) ||
                              "Artifact Name"
                            }
                            buttonClassName="bg-[#143C59]/70 border border-slate-400/30 text-white"
                            darkMode={darkMode}
                            isDisabled={
                              applicationArtifactsName.length < 0 ? true : false
                            }
                            DropdownMenuClassName={
                              applicationArtifactsName.length > 6
                                ? "h-56 overflow-y-scroll"
                                : ""
                            }
                            items={
                              applicationArtifactsName &&
                              applicationArtifactsName?.map((obj, index) => {
                                return {
                                  key: obj,
                                  label: obj,
                                };
                              })
                            }
                            selectedKey={selectedArtifactsname}
                            handleSelectedKey={handleArtifactsNameChange}
                          />

                          <Button
                            size="sm"
                            onClick={async (e) =>
                              await handleSubmit(
                                e,
                                getDataFromFabrics(),
                                "saveAs",
                              )
                            }
                          >
                            Save As
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
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
      )}
    </>
  );
}
