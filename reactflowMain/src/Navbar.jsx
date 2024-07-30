/*eslint-disable*/
import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  ArtifactLogo,
  ArtifactOpen,
  BreadcrumbHome,
  Debugger,
  Home,
  Preview,
  Shared,
  TorusLogo,
  VerticalLine,
} from "./SVG_Application";
import TorusDropDown from "./torusComponents/TorusDropDown";
import { DarkmodeContext } from "./commonComponents/context/DarkmodeContext";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import TorusButton from "./torusComponents/TorusButton";
import TorusPopOver from "./commonComponents/torusComponents/TorusPopOver";
import { BiZoomIn } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { MdEmojiEvents, MdOutlineEmojiEvents } from "react-icons/md";
import { useDisclosure } from "@nextui-org/react";
import {
  getJson,
  versionList,
  artifactList,
  saveWorkFlow,
  applicationLists,
} from "./commonComponents/api/fabricsApi";

import { toast, ToastContainer } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import {
  getDomainList,
  getVersionList,
  getartifactList,
  getDefaultJson,
} from "./commonComponents/api/DefaultsApi";
import TorusAvatar from "./torusComponents/TorusAvatar";
import { BsTrash3 } from "react-icons/bs";
import { Input } from "react-aria-components";
import EventNavbar from "./commonComponents/layout/ActionBar/EventNavbar";
import { Breadcrumbs, Breadcrumb, Link } from "react-aria-components";
import { RiHome5Line } from "react-icons/ri";
import TorusTab from "./torusComponents/TorusTab";
import { TorusModellerContext } from "./Layout";
import TorusToast from "./torusComponents/TorusToaster/TorusToast.jsx";
import TorusAccordian from "./torusComponents/TorusAccordian.jsx";
import TorusAccordion from "./torusComponents/TorusAccordian.jsx";

export default function Navbar({
  tKey,
  color,
  project,
  setdomain,
  setartifact,

  sendDataToFabrics,
  setUpIdKey = null,
  setToggleReactflow,
  getDataFromFabrics,
  setFabricsKey = null,
}) {
  const {
    client,
    handleTabChange,
    selectedFabric,
    selectedArtifact,
    setSelectedArtifact,
    selectedVersion,
    setSelectedVersion,
    selectedProject,
    setSelectedProject,
  } = useContext(TorusModellerContext);
  const [openArtifactsCreate, setOpenArtifactsCreate] = useState(false);
  const [openProjectCreate, setOpenProjectCreate] = useState(false);
  const [openSaveAsArtifacts, setOpenSaveAsArtifacts] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectedArtifactText, setSelectedArtifactText] = useState(false);
  const [artifactsList, setArtifactsList] = useState([]);
  const [applicationArtifactsName, setApplicationArtifactsName] = useState([]);
  const [projectList, setApplicationList] = useState([]);

  // const [selectedArtifact, setSelectedArtifact] = useState("");

  const [versions, setVersions] = useState([]);

  const [newArtifactsName, setNewArtifactsName] = useState("");
  const [newArtifactsNameValidation, setNewArtifactsNameValidation] =
    useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectNameValidation, setNewProjectNameValidation] =
    useState(false);
  const [projectCollectionName, setProjectCollectionName] = useState(null);
  const [artifactCollectionName, setArtifactCollectionName] = useState(null);
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
  const [inputchange, setInputchange] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedDeletingArtifactsItem, setSelectedDeletingArtifactsItem] =
    useState(null);
  const [selectedDeletingVersinItem, setSelectedDeletingVersionItem] =
    useState(null);
  const [selectedDeletingProjectItem, setSelectedDeletingProjectItem] =
    useState(null);
  const [peModal, setPeModal] = useState("");
  const [peurlopen, setPeurlopen] = useState(false);
  const [urlOpen, setUrlOpen] = useState(false);
  const [urls, setUrl] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [wordLength, setWordLength] = useState(0);
  const [newArtifact, setNewArtifact] = useState(false);
  const [newArtifactValue, setNewArtifactValue] = useState("Untitled 1");

  const handleNewArtifact = () => {
    setNewArtifact(!newArtifact);
  };

  const SaveToast = () => {
    toast(
      <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
      {
        type: "success",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        title: "Success",
        text: `Saved successfully`,
        closeButton: false,
      },
    );
  };

  const handleArtifactSubmit = async (e, erDatas, type = "") => {
    try {
      const res = await saveProcessFlow(
        "create",
        selectedProject,
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
            autoClose: 3000,
            hideProgressBar: true,
            title: "Success",
            text: `created successfully`,
            closeButton: false,
          },
        );
      } else {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "error",
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            title: "Error",
            text: `Error while creating`,
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
          selectedProject,
          selectedArtifact,
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
      const version = [...selectedVersion][0];
      const artifact = [...selectedArtifact][0];
      await fetch(`${process.env.REACT_APP_API_URL}pe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "Admin",
        },
        body: JSON.stringify({
          key: `${tKey}:${client}:${project}:${selectedFabric}:${artifact}:${version}:`,
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
                type: "error",
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                title: "Error",
                text: `Error while sending data`,
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
      const version = [...selectedVersion][0];
      const artifact = [...selectedArtifact][0];

      await fetch(`${process.env.REACT_APP_API_URL}pe/debugExecution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "Admin",
        },
        body: JSON.stringify({
          key: `${tKey}:${client}:${project}:${selectedFabric}:${artifact}:${version}:`,
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
                hideProgressBar: true,
                title: "Success",
                text: `upId found in process engine - ${data.formjson.url}`,
                closeButton: false,
              },
            );
            const { key, upId, nodeId, nodeName, url, mode } = data.formjson;
            setUrl(
              `${url}?key=${key}&upId=${upId}&nodeId=${nodeId}&nodeName=${nodeName}&mode=${mode}`,
            );
            setUpIdKey(data.formjson.upId);
            setUrlOpen(true);
          } else if (data.hasOwnProperty("err")) {
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
                text: `Error found in process engine - ${data.err}`,
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
              text: `Error in process engine`,
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

  const addProjectName = (e) => {
    try {
      let condicheck = true;

      projectList?.map((obj) => {
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
          text: `Cannot create artifacts`,
          closeButton: false,
        },
      );
    }
  };

  const getVersion = async (artifact) => {
    try {
      if (artifact) {
        const version = await versionList(
          tKey,
          client,
          selectedProject,
          artifact,
          selectedFabric,
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

  const handleArtifactsChange = (e) => {
    try {
      setSelectedVersion(null);
      // if (Array.from(e)[0]) {
      //   getVersion(Array.from(e)[0]);
      // } else {
      //   setVersions([]);
      // }
      sendDataToFabrics({});
      setSelectedArtifact(e);
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
        selectedFabric,
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
      setSelectedArtifact("");
      setSelectedVersion("");
      setSelectedProject(e);

      handleIntialLoad(tKey, client, selectedFabric, e).catch((err) => {
        throw err;
      });
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
            tKey,
            client,
            Array.from(e)[0],
            selectedFabric,
          );

          if (response && response?.status === 200) {
            setSelectedProject(response.data);
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

  const handleGetApplications = async (tKey, client, selectedFabric) => {
    try {
      console.log("handleGetApplications", tKey, client, selectedFabric);
      const response = await applicationLists(tKey, client, selectedFabric);

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
  console.log("projectList", projectList);

  const handleIntialLoad = async (
    tKey,
    client,
    selectedFabric,
    applications,
  ) => {
    try {
      console.log("handleIntialLoad", applications);
      const response = await artifactList(
        tKey,
        client,
        applications,
        selectedFabric,
      );
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
  //   tKey,
  //   client,
  //   selectedFabric,
  //   selectedProject
  // ) => {
  //   try {
  //     console.log("handleApplicationLoad", selectedProject )
  //     const response = await artifactList(
  //       tKey,
  //       client,
  //       selectedProject,
  //       selectedFabric
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
      console.log("saveProcessFlow", erDatas);
      const payload = {
        flow: { ...erDatas },

        project: selectedApplictionNames,

        artifact: selectedArtifactss,
      };

      const response = await saveWorkFlow(
        payload,
        type,
        selectedVerisonss,
        tKey,
        client,
        selectedFabric,
      );
      if (response && response.status === 200) {
        if (type === "create") {
          await handleIntialLoad(
            tKey,
            client,
            selectedFabric,
            selectedApplictionNames || selectedProject,
          );
          setNewArtifactsName("");
          setSelectedProject(selectedApplictionNames);
          setSelectedArtifact(selectedArtifactss);

          handleIntialLoad(
            tKey,
            client,
            selectedFabric,
            selectedApplictionNames,
          );
          setSelectedVersion(response.data[response.data.length - 1]);

          if (selectedFabric) {
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
                text: `${selectedFabric} Fabrics saved successfully`,
                closeButton: false,
              },
            );
          }
        }
      } else if (response && response.status === 201) {
        if (type === "update") {
          setSelectedProject(selectedApplictionNames);
          setSelectedArtifact(selectedArtifactss);
          if (selectedFabric) {
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
                title: "INFORMATION",
                text: `${selectedFabric} Fabrics updated successfully`,
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
          title: "ERROR",
          text: `Cannot save artifacts details`,
          closeButton: false,
        },
      );
    }
  };

  const getProcessFlowApi = useCallback(
    async (event) => {
      try {
        if (selectedVersion) {
          const response = await getJson(
            selectedProject,
            selectedVersion,
            selectedArtifact,
            tKey,
            client,
            selectedFabric,
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
                position: "bottom-right",
                type: "error",
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
                title: "ERROR",
                text: `Cannot load Flow details`,
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
            position: "bottom-right",
            type: "error",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
            title: "ERROR",
            text: `Cannot load Flow details`,
          },
        );
      }
    },
    [
      selectedFabric,
      client,
      selectedProject,
      selectedArtifact,
      selectedVersion,
      sendDataToFabrics,
      tKey,
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
        `${BASE_URL}/deleteApplication?tKey=${tKey}&appGroup=${client}&applicationName=${e}`,
        {
          method: "DELETE",
        },
      ).then((res) => res.json());

      if (response && response.status === 200) {
        setApplicationList(response.data);
        setSelectedProject("");
        setSelectedArtifact("");
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
        `${BASE_URL}/deleteFlowArtifact?tKey=${tKey}&appGroup=${client}&applicationName=${project}&selectedFabric=${selectedFabric}&artifact=${e}`,
        {
          method: "DELETE",
        },
      ).then((res) => res.json());

      if (response && response.status === 200) {
        setArtifactsList(response.data);
        setSelectedArtifact("");
        setVersions([]);

        sendDataToFabrics({
          nodes: [],
          nodeEdges: [],
          nodeProperty: {},
        });
        // toast.success(`${e} Deleted Successfully`, {
        //   position: "bottom-right",
        //   autoClose: 2000,
        // });

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
        `${BASE_URL}/deleteFlowVersion?tKey=${tKey}&appGroup=${client}&applicationName=${project}&selectedFabric=${selectedFabric}&artifact=${selectedArtifact}&version=${e}`,
        {
          method: "DELETE",
        },
      ).then((res) => res.json());

      if (response && response.status === 200) {
        setVersions(response?.data);
        setSelectedVersion("");
        sendDataToFabrics({
          nodes: [],
          nodeEdges: [],
          nodeProperty: {},
        });

        // setOpenVersionModal(false);

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
          selectedFabric,
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
          selectedFabric,
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
  }, [
    selectedsource,
    selectedDomainLIst,
    selectedDefaultArtifacts,
    selectedFabric,
  ]);

  useEffect(() => {
    try {
      if (!selectedVersion) return;
      const version = [...selectedVersion][0];
      const artifact = [...selectedArtifact][0];

      if (setFabricsKey)
        setFabricsKey(
          `${tKey}:${client}:${selectedProject}:${selectedFabric}:${artifact}:${version}:`,
        );
      getProcessFlowApi(selectedVersion).catch((err) => {
        throw err;
      });
    } catch (error) {
      console.error(error);
    }
  }, [
    selectedVersion,
    selectedArtifact,
    selectedProject,
    selectedFabric,
    client,
    setFabricsKey,
    tKey,
  ]);

  // useEffect(() => {
  //   try {
  //     setSelectedProject(new Set([application]));
  //     setArtifactsList([]);
  //     setSelectedArtifact("");
  //     setVersions([]);
  //     setSelectedVersion("");
  //     if(selectedProject){
  //       handleIntialLoad(tKey, client, selectedFabric, Array.from(selectedProject)[0]).catch((err) => {
  //         throw err;
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [selectedFabric, application, client, tKey]);

  // useEffect(() => {
  //   try {
  //     if (selectedProject) {
  //       handleApplicationLoad(
  //         tKey,
  //         client,
  //         selectedFabric,
  //         Array.from(selectedProject)[0]
  //       ).catch((err) => {
  //         throw err;
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [selectedProject, selectedFabric, client, tKey]);

  useEffect(() => {
    try {
      handleGetApplications(tKey, client, selectedFabric).catch((err) => {
        throw err;
      });
    } catch (error) {
      console.error(error);
    }
  }, [selectedFabric, client, tKey]);

  console.log(projectList, "ProductsLists");

  const handleAccordionToggle = (index) => {
    console.log("Accordion toggled to index:", index);
  };

  const handleAccordionContentToggle = (item) => {
    console.log("Accordion content toggled to item:", item);
    handleApplicationName(item);
    setProjectCollectionName(item);
    setArtifactCollectionName(null);
  };

  const accordionItems = [
    {
      title: "My Artifacts",
      content: projectList,
    },
    {
      title: "My Components",

      content: `
          Flowbite is an open-source library of interactive components built on
          top of Tailwind CSS including buttons, dropdowns, modals, navbars, and
          more.`,
    },
    {
      title: "Shared with Me",

      content: {
        "item-1": "item-1",
        "item-2": "item-2",
        "item-3": "item-3",
        "item-4": "item-4",
        "item-5": "item-5",
        "item-6": "item-6",
        "item-7": "item-7",
        "item-8": "item-8",
        "item-9": "item-9",
        "item-10": "item-10",
      },
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center border-b border-slate-300 bg-white dark:border-none dark:bg-[#161616]">
      <div className="flex h-[90%] w-[100%] flex-col items-center justify-center">
        <div className="flex h-[80%]  w-[99%] flex-row items-center">
          <div className="flex w-1/3 justify-start gap-2">
            <TorusLogo />
            <span className=" font-Neue Montreal font-semibold text-black dark:text-white xl:text-lg 2xl:text-lg 3xl:text-2xl 4xl:text-2xl ">
              TORUS
            </span>
          </div>

          <div className=" flex h-full w-1/3 items-center justify-center rounded-md bg-transparent ">
            <TorusPopOver
              parentHeading={
                <div className="flex w-[100%] flex-row items-center justify-center gap-2">
                  <div className="text-sm font-semibold text-black dark:text-white">
                    {(selectedArtifact && selectedArtifact) ||
                      "Select Artifacts"}
                  </div>
                  <div className="rounded-xl  bg-[#0736C4]  px-4 text-white">
                    {(selectedVersion && selectedVersion) || "*"}
                  </div>
                  <div>
                    <IoIosArrowDown className="text-black dark:text-white" />
                  </div>
                </div>
              }
              popbuttonClassNames={selectedFabric === "events" && "w-1/3"}
              children={({ close }) => (
                <div
                  className={`${selectedFabric === "events" ? "h-[400px] w-[380px]" : "h-[400px] w-[450px]"} mt-[3%] flex flex-col justify-between rounded-lg border border-[#E5E9EB] bg-white dark:border-[#212121] dark:bg-[#161616] 2xl:h-[580px] 2xl:w-[700px]`}
                >
                  {selectedFabric !== "events" ? (
                    <>
                      <div className="flex h-[13%] w-[100%] flex-row border-b border-[#E5E9EB] p-2 dark:border-[#212121]">
                        <div className="flex w-full items-center justify-start">
                          <p className="px-2 text-start text-sm font-medium text-black dark:text-white">
                            Library
                          </p>
                        </div>
                        <div className="flex w-full items-center justify-center gap-2">
                          <Input
                            startcontent={<CiSearch />}
                            // value={search}
                            placeholder="Search"
                            className={
                              "flex h-[25px] w-[280px] items-center justify-center rounded-md border border-gray-300 bg-[#F4F5FA]  p-2 text-sm text-black dark:border-[#212121] dark:bg-[#0F0F0F] dark:text-white"
                            }
                          />
                        </div>
                        <div className="flex-r0w flex w-full  items-center justify-end gap-2 ">
                          <TorusButton
                            onPress={() => {
                              selectedVersion && handleTabChange("events");
                            }}
                            Children={<ArtifactOpen />}
                            buttonClassName="flex h-[27px] w-[27px] cursor-pointer items-center justify-center rounded-md bg-[#0736C4] p-[5px]"
                          />

                          <span
                            className="flex h-[27px] w-[27px] cursor-pointer items-center justify-center rounded-md p-[5px] transition-all duration-200  hover:border-red-400 hover:bg-red-200 dark:hover:border-red-500 dark:hover:bg-red-500/30"
                            onClick={() => {
                              close();
                              setProjectCollectionName(null);
                              setArtifactCollectionName(null);
                              setNewArtifact(false);
                            }}
                          >
                            <IoCloseOutline className="text-black dark:text-white" />
                          </span>
                        </div>
                      </div>
                      <div className=" flex h-[74%] w-full items-center  justify-center   ">
                        {/* <TorusDropDown
                      title={
                        (selectedProject &&
                          Array.from(selectedProject)[0]) ||
                        "Projects"
                      }
                      classNames={{
                        buttonClassName:
                          " bg-white dark:bg-[#262626] font-semibold torus-pressed:animate-torusButtonActive ",
                        listBoxClassName: "bg-white text-black ",
                      }}
                      popOverProps={{ offset: 15 }}
                      selectionMode="single"
                      items={
                        projectList &&
                        projectList?.map((obj) => {
                          return {
                            key: obj,
                            label: obj,
                          };
                        })
                      }
                      btncolor={"#f0f0f0"}
                      fontStyle={
                        "font-inter 3xl:text-xs text-black  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
                      }
                      radius={"xl"}
                      size={"lg"}
                      setSelected={handleApplicationName}
                    /> */}

                        <div className="flex h-full w-1/3 flex-col items-center justify-center gap-1 border-r border-[#E5E9EB] dark:border-[#212121]">
                          {/* <div className="flex h-[70px] w-[100%] flex-col  items-center   ">
                            <TorusTab
                              defaultSelectedKey={selectedClient}
                              key="TorusTab"
                              orientation="vertical"
                              classNames={{
                                tabs: "cursor-pointer border",
                                tabList:
                                  "w-full h-[100%] border  flex justify-center items-center",
                                tab: ` p-1.5 h-full w-full flex justify-center items-center torus-pressed:outline-none torus-focus:outline-none  border-2 border-transparent  `,
                              }}
                              tabs={[
                                {
                                  id: "My Artifacts",
                                  content: ({ isSelected }) => (
                                    <TorusButton
                                      btncolor={"primary"}
                                      buttonClassName="bg-[#F4F5FA] dark:bg-[#0F0F0F] w-[80px] h-[30px]  rounded-md flex justify-center items-center"
                                      Children={
                                        <div className="flex h-full w-[100%] flex-row items-center justify-center gap-1">
                                          <ArtifactLogo className="stroke-black dark:stroke-white" />
                                          <p className="text-xs text-black dark:text-white">
                                            New Artifact
                                          </p>
                                        </div>
                                      }
                                    />
                                  ),
                                },
                                {
                                  id: "UF",
                                  content: ({ isSelected }) => (
                                    <TorusButton
                                      btncolor={"primary"}
                                      buttonClassName="bg-[#F4F5FA] dark:bg-[#0F0F0F] w-[80px] h-[30px]  rounded-md flex justify-center items-center"
                                      Children={
                                        <div className="flex h-full w-[100%] flex-row items-center justify-center gap-1">
                                          <ArtifactLogo className="stroke-black dark:stroke-white" />
                                          <p className="text-xs text-black dark:text-white">
                                            New Artifact
                                          </p>
                                        </div>
                                      }
                                    />
                                  ),
                                },
                                {
                                  id: "PF",
                                  content: ({ isSelected }) => (
                                    <TorusButton
                                      btncolor={"primary"}
                                      buttonClassName="bg-[#F4F5FA] dark:bg-[#0F0F0F] w-[80px] h-[30px]  rounded-md flex justify-center items-center"
                                      Children={
                                        <div className="flex h-full w-[100%] flex-row items-center justify-center gap-1">
                                          <ArtifactLogo className="stroke-black dark:stroke-white" />
                                          <p className="text-xs text-black dark:text-white">
                                            New Artifact
                                          </p>
                                        </div>
                                      }
                                    />
                                  ),
                                },
                              ]}
                              // onSelectionChange={handleTabChange}
                            />
                          </div> */}
                          <div className="flex h-full w-[100%] flex-col overflow-scroll  px-0.5 ">
                            {/* {projectList &&
                              projectList?.map((project, index) => (
                                <div
                                  onClick={() => {
                                    handleApplicationName(project);
                                    setNewArtifact(false);
                                    setProjectCollectionName(project);
                                    setArtifactCollectionName(null);
                                  }}
                                  className={`${project == selectedProject ? "font-semibold text-black dark:text-white" : "font-normal text-black/35 dark:text-white/35"} flex w-[100%] flex-row items-center gap-1`}
                                >
                                  <div
                                    className={`w-full cursor-pointer text-sm  `}
                                  >
                                    {project}
                                  </div>
                                </div>
                              ))} */}
                            <TorusAccordion
                              items={accordionItems}
                              onToggle={handleAccordionToggle}
                              onContentToggle={handleAccordionContentToggle}
                            />
                          </div>
                        </div>
                        {/* <TorusModularInput
                      isRequired={true}
                      isReadOnly={false}
                      placeholder="Artifact"
                      // label="Input"
                      variant="bordered"
                      labelColor="text-[#000000]/50"
                      borderColor="border-[#000000]/20"
                      isDisabled={false}
                      // onChange={setModular}
                      radius="lg"
                      textColor="text-[#000000]"
                      bgColor="bg-[#FFFFFF]"
                      value={"this is value from state "}
                      type="text"
                      marginT="mt-3"
                      // startContent={
                      //   <FaSearchLocation size={15} color="#9CA3AF" />
                      // }
                      maxLength={20}
                      discription="This is a hint text to help user."
                      isClearable={true}
                      className="w-[50px] h-[40px] "
                    />

                    <TorusDropDown
                      label={"Select Version"}
                      options={["1.0.0", "2.0.0", "3.0.0"]}
                      onChange={(e) => setSelectedVersion(new Set([e]))}
                      value={Array.from(selectedVersion)[0] || "1.0.0"}
                      className="w-[90%] h-[40px]  border border-[#000000]/15 dark:border-[#212121] dark:bg-[#161616] bg-white rounded-lg"
                    /> */}

                        {/* <ReusableDropDown
                      key={"ApplicationDropdown"}
                      title={
                        (selectedProject &&
                          Array.from(selectedProject)[0]) ||
                        "Projects"
                      }
                      darkMode={darkMode}
                      isDisabled={projectList.length < 0 ? true : false}
                      DropdownMenuClassName={
                        projectList.length > 6
                          ? "h-56 overflow-y-scroll"
                          : ""
                      }
                      items={
                        projectList &&
                        projectList?.map((obj) => {
                          return {
                            key: obj,
                            label: obj,
                          };
                        })
                      }
                      selectedKey={selectedProject}
                      handleSelectedKey={handleApplicationName}
                      handleDelete={(key) => {
                        setSelectedDeletingProjectItem(key);
                        openmodal("project");
                      }}
                    /> */}
                        <div className="flex h-[100%] w-2/3 scroll-m-1  flex-col items-center justify-center gap-1 ">
                          <div className="flex h-[10%] w-[85%] items-center justify-start bg-white dark:bg-[#161616]">
                            <Breadcrumbs
                              isDisabled
                              className="flex flex-row gap-2 text-xs"
                            >
                              <Breadcrumb>
                                <Link className="flex flex-row items-center justify-center gap-1 text-black dark:text-white">
                                  <RiHome5Line size={15} />
                                  {client}
                                  <IoIosArrowForward />
                                </Link>
                              </Breadcrumb>
                              <Breadcrumb>
                                <Link className="flex flex-row items-center justify-center gap-1">
                                  {projectCollectionName}
                                  <IoIosArrowForward />
                                </Link>
                              </Breadcrumb>
                              <Breadcrumb>
                                <Link className="flex flex-row items-center justify-center gap-1">
                                  {artifactCollectionName}
                                </Link>
                              </Breadcrumb>
                            </Breadcrumbs>
                          </div>

                          <div className="flex h-[90%] w-full flex-col items-center justify-center transition-all duration-300 ">
                            {newArtifact === true ? (
                              <div className="flex h-[30%] w-full items-center justify-center border-b border-t border-[#E5E9EB] dark:border-[#212121]  ">
                                <div className="flex  h-full w-[65%] flex-row items-center justify-center p-2">
                                  <Input
                                    defaultValue={newArtifactValue}
                                    placeholder="Enter artifact name"
                                    className="flex h-[30px]  w-full items-center justify-center rounded-md bg-[#F4F5FA] p-2 text-sm text-black dark:bg-[#0F0F0F] dark:text-white"
                                    onChange={(e) => {
                                      setNewArtifactValue(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                  <TorusButton
                                    buttonClassName="text-black w-[80px] dark:text-white bg-[#F4F5FA] hover:bg-[#e1e2e8]  transition-all duration-200 dark:bg-[#0F0F0F]  h-[30px] rounded-md  text-xs  flex justify-center items-center"
                                    onPress={() =>
                                      saveProcessFlow(
                                        "create",
                                        selectedProject,
                                        newArtifactValue,
                                        "v1",
                                        getDataFromFabrics,
                                      ).then(() => setNewArtifact(false))
                                    }
                                    Children={"Create"}
                                  />
                                </div>
                              </div>
                            ) : null}
                            <div
                              className={`${newArtifact ? "h-[75%]" : "h-[100%]"} flex  w-full flex-col items-center justify-start overflow-y-scroll scroll-smooth scrollbar-default `}
                            >
                              {artifactsList && artifactsList.length > 0 ? (
                                <>
                                  {artifactsList.map((obj, index) => {
                                    return (
                                      <div className="flex h-[30%] w-full items-center justify-center">
                                        <div className="flex h-full w-[65%] flex-row items-center justify-center p-2">
                                          <>
                                            {inputchange !== index ? (
                                              <div
                                                onClick={() =>
                                                  handleArtifactsChange(
                                                    obj?.artifact,
                                                  )
                                                }
                                                className="flex h-[30px] w-full flex-row items-center justify-between rounded-md bg-[#F4F5FA] p-2 dark:bg-[#0F0F0F]"
                                              >
                                                <div className="flex w-9/12 items-center justify-start truncate text-sm text-black dark:text-white">
                                                  {obj?.artifact}
                                                </div>
                                                <div className="flex w-2/12 items-center justify-end gap-2">
                                                  <span
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                      setInputchange(index)
                                                    }
                                                  >
                                                    <FiEdit2
                                                      className="text-black dark:text-white"
                                                      size={13}
                                                    />
                                                  </span>
                                                  <span
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                      setInputValue("")
                                                    }
                                                  >
                                                    <BsTrash3
                                                      color="red"
                                                      size={13}
                                                    />
                                                  </span>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="w-full">
                                                <Input
                                                  defaultValue={obj?.artifact}
                                                  placeholder="Enter text"
                                                  className="flex h-[30px] w-full items-center justify-center rounded-md bg-[#F4F5FA] p-2 text-sm text-black dark:bg-[#0F0F0F] dark:text-white "
                                                  onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                      setInputchange(null);
                                                    }
                                                  }}
                                                  onChange={(e) => {
                                                    setInputValue(
                                                      e.target.value,
                                                    );
                                                  }}
                                                />
                                              </div>
                                            )}
                                          </>
                                        </div>
                                        <div className="flex h-full w-[25%] items-center justify-center">
                                          <TorusDropDown
                                            title={
                                              (selectedVersion &&
                                                selectedArtifact ===
                                                  obj?.artifact &&
                                                selectedVersion) ||
                                              "Version"
                                            }
                                            selectionMode="single"
                                            selected={
                                              new Set([selectedVersion])
                                            }
                                            setSelected={(e) => {
                                              setSelectedArtifact(
                                                obj?.artifact,
                                              );
                                              setSelectedVersion(
                                                Array.from(e)[0],
                                              );
                                              setArtifactCollectionName(
                                                obj?.artifact,
                                              );
                                            }}
                                            items={
                                              obj?.versionList &&
                                              obj?.versionList?.map((item) => ({
                                                label: item,
                                                key: item,
                                              }))
                                            }
                                            classNames={{
                                              buttonClassName:
                                                "rounded-lg w-[100px] text-xs h-[30px] font-medium  p-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] text-center dark:text-white",
                                              popoverClassName:
                                                "w-[70px] max-h-[100px] min-h-[50px]",
                                              listBoxClassName:
                                                " min-h-[35px] max-h-[100px] overflow-y-auto",
                                              listBoxItemClassName:
                                                "flex text-sm justify-between",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </>
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  no artifacts
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-span-1 flex h-full flex-col gap-1 border-l px-2 py-3">
                      {artifactsList &&
                        artifactsList?.map((obj) => (
                          <div
                            onClick={() =>
                              handleArtifactsChange(new Set([obj]))
                            }
                            className=" flex w-full flex-row items-center justify-center  "
                          >
                            <div className="w-[60%] text-xs  file:text-black">
                              {obj}
                            </div>
                            <div className="w-[40%]">
                              <ReusableDropDown
                                key={"versionDropdown"}
                                title={
                                  (selectedVersion &&
                                    Array.from(selectedVersion)[0]) ||
                                  "Version"
                                }
                                darkMode={!darkMode}
                                isDisabled={
                                  selectedArtifact &&
                                  Array.from(selectedArtifact)[0]
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
                                selectedKey={selectedVersion}
                                handleSelectedKey={(key) => {
                                  setSelectedVersion(key);
                               
                                }}
                                handleDelete={(key) => {
                                  setSelectedDeletingVersionItem(key);

                                  openmodal("version");
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div> */}

                        {/* <ReusableDropDown
                      key={"artifactsDropdown"}
                      title={
                        (selectedArtifact &&
                          Array.from(selectedArtifact)[0]) ||
                        "Artifacts"
                      }
                      darkMode={darkMode}
                      isDisabled={!selectedProject ? true : false}
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
                      selectedKey={selectedArtifact}
                      handleSelectedKey={handleArtifactsChange}
                      handleDelete={(key) => {
                        setSelectedDeletingArtifactsItem(key);
                        openmodal("artifacts");
                      }}
                    />

                    <ReusableDropDown
                      key={"versionDropdown"}
                      title={
                        (selectedVersion && Array.from(selectedVersion)[0]) ||
                        "Version"
                      }
                      darkMode={darkMode}
                      isDisabled={
                        selectedArtifact &&
                        Array.from(selectedArtifact)[0]
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
                      selectedKey={selectedVersion}
                      handleSelectedKey={(key) => {
                        setSelectedVersion(key);
                     
                      }}
                      handleDelete={(key) => {
                        setSelectedDeletingVersionItem(key);

                        openmodal("version");
                      }}
                    /> */}
                      </div>
                      <div className="flex h-[13%] w-[100%] flex-row space-x-2 border-t border-gray-300 p-2 dark:border-[#212121] ">
                        <div className="flex w-1/3 items-center justify-start">
                          <TorusButton
                            btncolor={"primary"}
                            onPress={() => handleNewArtifact()}
                            buttonClassName={`${newArtifact ? "bg-red-200 dark:bg-red-500/30 w-[80px] h-[30px] text-red-500 dark:text-red-400" : "text-black dark:text-white bg-[#F4F5FA] dark:bg-[#0F0F0F] w-[110px] h-[30px]"}   rounded-md flex justify-center items-center`}
                            Children={
                              <div className="flex h-full w-[100%] flex-row items-center justify-center gap-1">
                                {newArtifact ? (
                                  <></>
                                ) : (
                                  <ArtifactLogo className="stroke-black dark:stroke-white" />
                                )}
                                <p className="text-xs  ">
                                  {newArtifact ? "Cancel" : "New Artifact"}
                                </p>
                              </div>
                            }
                          />
                          {/* <TorusButton
                        onClick={() => {
                          saveProcessFlow(
                            "create",
                            selectedProject,
                            selectedArtifact,
                            selectedVersion,
                            getDataFromFabrics(),
                          );
                        }}
                        buttonClassName=" bg-[#F4F5FA] dark:bg-[#0F0F0F] w-[100px] h-[30px] text-xs text-black dark:text-white rounded-md flex justify-center items-center"
                        Children={"Make a copy"}
                      /> */}
                        </div>

                        <div className="flex w-2/3 items-center justify-end gap-2">
                          <TorusButton
                            buttonClassName=" bg-[#4CAF50]/15  w-[70px] h-[30px] rounded-md text-[#4CAF50] text-xs  flex justify-center items-center"
                            onPress={() =>
                              saveProcessFlow(
                                "update",
                                selectedProject,
                                selectedArtifact,
                                selectedVersion,
                                getDataFromFabrics,
                              )
                            }
                            Children={"Update"}
                          />
                          <TorusButton
                            buttonClassName=" bg-[#0736C4]/15 dark:text-[#3063FF] w-[70px] h-[30px] text-[#0736C4] rounded-md text-xs flex justify-center items-center"
                            onPress={() => {
                              saveProcessFlow(
                                "create",
                                selectedProject,
                                selectedArtifact,
                                selectedVersion,
                                getDataFromFabrics,
                              );
                            }}
                            Children={"Save"}
                          />
                          <TorusButton
                            buttonClassName=" bg-[#0736C4] dark:bg-[#3063FF] w-[80px] h-[30px] text-xs text-white rounded-md flex justify-center items-center"
                            Children={"Save as"}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex h-[12%] w-[100%] flex-row border-b border-[#E5E9EB] p-2 dark:border-[#212121]">
                        <div className="flex w-full items-center justify-start">
                          <p className="px-2 text-start text-sm font-medium text-black dark:text-white">
                            Events
                          </p>
                        </div>
                        <span
                          className="flex h-[27px] w-[27px] cursor-pointer items-center justify-center rounded-md p-[5px] transition-all duration-200 hover:border hover:border-red-400 hover:bg-red-200"
                          onClick={() => {
                            close(), setNewArtifact(false);
                          }}
                        >
                          <IoCloseOutline className="text-black dark:text-white" />
                        </span>
                      </div>
                      <div className="flex h-[87%] w-[100%]">
                        <EventNavbar
                          getDataFromFabrics={getDataFromFabrics}
                          sendDataToFabrics={sendDataToFabrics}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            />

            {selectedFabric === "events" && (
              <TorusButton
                onPress={() => {
                  selectedFabric === "events" && handleTabChange("UF");
                }}
                Children={<ArtifactOpen />}
                buttonClassName="flex h-[27px] w-[27px] cursor-pointer items-center justify-center rounded-md bg-[#0736C4] p-[5px]"
              />
            )}
          </div>

          <div className="flex h-full w-1/3 items-center justify-end gap-3 bg-transparent ">
            <div className=" col-span-4 flex items-center justify-center">
              <div className="flex items-center justify-around gap-[0.8rem] ">
                <div className="flex w-[30%] items-center justify-center">
                  <Debugger className={"stroke-black dark:stroke-white"} />
                </div>
                <div className="flex w-[30%] items-center justify-center">
                  <Preview className={"stroke-black dark:stroke-white"} />
                </div>
                <div className="flex w-[30%] items-center justify-center">
                  <Shared className={"stroke-black dark:stroke-white"} />
                </div>
              </div>
            </div>
            <div className=" col-span-1 flex items-center justify-center">
              <VerticalLine className={"stroke-black dark:stroke-white"} />
            </div>
            <div className=" col-span-3">
              <TorusButton
                Children="Publish"
                size={"md"}
                btncolor={color ? color : "#0736C4"}
                outlineColor="torus-hover:ring-blue-500/50"
                radius={"lg"}
                fontStyle={
                  "font-sfpros text-white text-xs 3xl:text-base font-medium xl:text-sm xl:font-semibold tracking-tighter px-1 py-2"
                }
                color={"white"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
