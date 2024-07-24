/*eslint-disable*/
import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  Debugger,
  Line,
  Preview,
  Saved,
  Shared,
  TorusLogo,
  VerticalLine,
  ZoomIn,
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

import ReusableDropDown from "./commonComponents/reusableComponents/ReusableDropDown";
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
} from "./commonComponents/api/fabricsApi";

import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import {
  getDomainList,
  getVersionList,
  getartifactList,
  getDefaultJson,
} from "./commonComponents/api/DefaultsApi";
import TorusAvatar from "./torusComponents/TorusAvatar";

export default function Navbar({
  color,
  setFabricsKey = null,
  setUpIdKey = null,
  fabrics,
  tKey,
  client,
  project,
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
  const [selectededArtifacts, setSelectedArtifacts] = useState(new Set());

  const [selectedVersion, setSelectedVersion] = useState(new Set());

  const [openArtifactsCreate, setOpenArtifactsCreate] = useState(false);
  const [openProjectCreate, setOpenProjectCreate] = useState(false);
  const [openSaveAsArtifacts, setOpenSaveAsArtifacts] = useState(false);
  const [open, setOpen] = useState(true);

  const [artifactsList, setArtifactsList] = useState([]);
  const [applicationArtifactsName, setApplicationArtifactsName] = useState([]);
  const [projectList, setApplicationList] = useState([]);
  const [selectedApplictionName, setSelectedApplictionName] = useState(null);

  // const [selectededArtifacts, setSelectedArtifacts] = useState("");
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
  const [inputchange, setInputchange] = useState(false);
  const [inputValue, setInputValue] = useState("");
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
        toast.success("created successfully", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Error while creating", {
          position: "bottom-right",
          autoClose: 2000,
        });
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
          toast.success("saveAs successfully", {
            position: "bottom-right",
            autoClose: 2000,
          });
        } else {
          toast.error("Error while saveAs", {
            position: "bottom-right",
            autoClose: 2000,
          });
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
          toast.success("created successfully", {
            position: "bottom-right",
            autoClose: 2000,
          });
        } else {
          toast.error("Error while creating", {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleProcessEngine = async () => {
    try {
      const version = [...selectedVerison][0];
      const artifact = [...selectededArtifacts][0];
      await fetch(`${process.env.REACT_APP_API_URL}pe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "Admin",
        },
        body: JSON.stringify({
          key: `${tKey}:${client}:${project}:${fabrics}:${artifact}:${version}:`,
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

            toast.success("data send to process engine", {
              position: "bottom-right",
              autoClose: 2000,
            });
          } else if (data && data.data) {
            toast.success("data send to process engine", {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        })
        .catch((err) => {
          toast.error("Error sending key to process engine", {
            position: "bottom-right",
            autoClose: 2000,
          });
        });
    } catch (error) {
      toast.error("Error sending key to process engine", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };
  const handleDebug = async () => {
    try {
      const version = [...selectedVerison][0];
      const artifact = [...selectededArtifacts][0];

      await fetch(`${process.env.REACT_APP_API_URL}pe/debugExecution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "Admin",
        },
        body: JSON.stringify({
          key: `${tKey}:${client}:${project}:${fabrics}:${artifact}:${version}:`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            toast.success(
              "upId found in process engine - " + data.formjson.url,
              {
                position: "bottom-right",
                autoClose: 2000,
              },
            );
            const { key, upId, nodeId, nodeName, url, mode } = data.formjson;
            setUrl(
              `${url}?key=${key}&upId=${upId}&nodeId=${nodeId}&nodeName=${nodeName}&mode=${mode}`,
            );
            setUpIdKey(data.formjson.upId);
            setUrlOpen(true);
          } else if (data.hasOwnProperty("err")) {
            toast.success(" Error found in process engine - " + data.err, {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        })
        .catch((err) => {
          toast.error("Error in process engine", {
            position: "bottom-right",
            autoClose: 2000,
          });
        });
    } catch (error) {
      toast.error("Error sending key to process engine", {
        position: "bottom-right",
        autoClose: 2000,
      });
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
      toast.error("Cannot create artifacts", {
        position: "bottom-right",
        autoClose: 2000,
      });
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
      toast.error("Cannot create artifacts", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const getVersion = async (artifact) => {
    try {
      if (Array.from(artifact)[0]) {
        const version = await versionList(
          tKey,
          client,
          Array.from(selectedApplictionName)[0],
          artifact,
          fabrics,
        );
        if (version && version?.status === 200) setVersions(version?.data);
        else
          toast.error("Cannot get version details", {
            position: "bottom-right",
            autoClose: 2000,
          });
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
      // if (Array.from(e)[0]) {
      //   getVersion(Array.from(e)[0]);
      // } else {
      //   setVersions([]);
      // }
      sendDataToFabrics({});
      setSelectedArtifacts(e);
      setMainArtifacts && setMainArtifacts(Array.from(e)[0]);
    } catch (err) {
      toast.error("Cannot get artifacts details", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleArtifactsNameChange = (e) => {
    try {
      setSelectedArtifactsname(e);
    } catch (err) {
      toast.error("Cannot get artifacts details", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleDomainNameChange = (e) => {
    try {
      setSelectedDomainLIst(e);
      setdomain(e);
      setSelectedDefaultArtifacts("");
      setSelectedDefaultVersion("");
    } catch (err) {
      toast.error("Cannot set Domain", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleDefaultArtifactsChange = (e) => {
    try {
      setSelectedDefaultArtifacts(e);
      setartifact(e);
    } catch (err) {
      setSelectedDefaultVersion("");
      toast.error("Cannot set selected artifacts", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleDefaultVersionChange = (e) => {
    try {
      setSelectedDefaultVersion(e);
    } catch (err) {
      toast.error("Cannot set selected Default Version", {
        position: "bottom-right",
        autoClose: 2000,
      });
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
      toast.error("Cannot load Default FLow details", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleApplicationName = async (e) => {
    try {
      setSelectedArtifacts([]);
      setSelectedVerison([]);
      setSelectedApplictionName(e);

      if (e) {
        handleIntialLoad(tKey, client, fabrics, Array.from(e)[0]).catch(
          (err) => {
            throw err;
          },
        );
      }
    } catch (err) {
      toast.error("Cannot set selected Application", {
        position: "bottom-right",
        autoClose: 2000,
      });
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
            fabrics,
          );

          if (response && response?.status === 200) {
            setApplicationArtifactsName(response.data);
          }
        } catch (error) {
          toast.error("Cannot get artifacts details", {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
    } catch (err) {
      toast.error("Cannot set selected Application", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleGetApplications = async (tKey, client, fabrics) => {
    try {
      console.log("handleGetApplications", tKey, client, fabrics);
      const response = await applicationLists(tKey, client, fabrics);

      if (response && response.status === 200) {
        setApplicationList(response.data);
      }
    } catch (error) {
      toast.error("Cannot save application details", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };
  console.log("projectList", projectList);

  const handleIntialLoad = async (tKey, client, fabrics, applications) => {
    try {
      console.log("handleIntialLoad", applications);
      const response = await artifactList(tKey, client, applications, fabrics);
      if (response && response?.status === 200) {
        setArtifactsList(response.data);
      }
    } catch (error) {
      toast.error("Cannot get artifacts details", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  // const handleApplicationLoad = async (
  //   tKey,
  //   client,
  //   fabrics,
  //   selectedApplication
  // ) => {
  //   try {
  //     console.log("handleApplicationLoad", selectedApplication )
  //     const response = await artifactList(
  //       tKey,
  //       client,
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
        tKey,
        client,
        fabrics,
      );
      if (response && response.status === 200) {
        if (type === "create") {
          await handleIntialLoad(
            tKey,
            client,
            fabrics,
            Array.from(selectedApplictionNames)[0] || selectedApplication,
          );
          setNewArtifactsName("");
          setSelectedApplictionName(selectedApplictionNames);
          setSelectedArtifacts(selectedArtifactss);
          setMainArtifacts &&
            setMainArtifacts(Array.from(selectedArtifactss)[0]);
          handleIntialLoad(
            tKey,
            client,
            fabrics,
            Array.from(selectedApplictionNames)[0],
          );
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
            toast.info(`${fabrics} Fabrics updated successfully`, {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        }
      }

      return response;
    } catch (error) {
      toast.error("Cannot save artifacts details", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const getProcessFlowApi = useCallback(
    async (event) => {
      try {
        if (Array.from(selectedVerison)[0]) {
          const response = await getJson(
            Array.from(selectedApplictionName)[0],
            Array.from(selectedVerison)[0],
            Array.from(selectededArtifacts)[0],
            tKey,
            client,
            fabrics,
          );

          if (response && typeof response === "object" && response) {
            sendDataToFabrics({
              ...response.data,
            });
          } else {
            toast.error("no data found", {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        } else {
          sendDataToFabrics({});
        }
      } catch (error) {
        toast.error("Cannot load Flow details", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    },
    [
      fabrics,
      client,
      selectedApplictionName,
      selectededArtifacts,
      selectedVerison,
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
      toast.error(`cannot get ${type}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
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
        setSelectedApplictionName("");
        setSelectedArtifacts("");
        setVersions([]);

        sendDataToFabrics({
          nodes: [],
          nodeEdges: [],
          nodeProperty: {},
        });
        toast.success(`${e} Deleted Successfully`, {
          position: "bottom-right",
          autoClose: 2000,
        });

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
        `${BASE_URL}/deleteFlowArtifact?tKey=${tKey}&appGroup=${client}&applicationName=${project}&fabrics=${fabrics}&artifact=${e}`,
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
        toast.success(`${e} Deleted Successfully`, {
          position: "bottom-right",
          autoClose: 2000,
        });

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
        `${BASE_URL}/deleteFlowVersion?tKey=${tKey}&appGroup=${client}&applicationName=${project}&fabrics=${fabrics}&artifact=${Array.from(selectededArtifacts)[0]}&version=${e}`,
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

        toast.success(`${e} Deleted Successfully`, {
          position: "bottom-right",
          autoClose: 2000,
        });
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
      const artifact = [...selectededArtifacts][0];

      if (setFabricsKey)
        setFabricsKey(
          `${tKey}:${client}:${Array.from(selectedApplictionName)[0]}:${fabrics}:${artifact}:${version}:`,
        );
      getProcessFlowApi(selectedVerison).catch((err) => {
        throw err;
      });
    } catch (error) {
      console.error(error);
    }
  }, [
    selectedVerison,
    selectededArtifacts,
    selectedApplictionName,
    fabrics,
    client,
    setFabricsKey,
    tKey,
  ]);

  // useEffect(() => {
  //   try {
  //     setSelectedApplictionName(new Set([application]));
  //     setArtifactsList([]);
  //     setSelectedArtifacts("");
  //     setVersions([]);
  //     setSelectedVerison("");
  //     if(selectedApplictionName){
  //       handleIntialLoad(tKey, client, fabrics, Array.from(selectedApplictionName)[0]).catch((err) => {
  //         throw err;
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [fabrics, application, client, tKey]);

  // useEffect(() => {
  //   try {
  //     if (selectedApplictionName) {
  //       handleApplicationLoad(
  //         tKey,
  //         client,
  //         fabrics,
  //         Array.from(selectedApplictionName)[0]
  //       ).catch((err) => {
  //         throw err;
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [selectedApplication, fabrics, client, tKey]);

  useEffect(() => {
    try {
      handleGetApplications(tKey, client, fabrics).catch((err) => {
        throw err;
      });
    } catch (error) {
      console.error(error);
    }
  }, [fabrics, client, tKey]);

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
                    {(selectededArtifacts &&
                      Array.from(selectededArtifacts)[0]) ||
                      "Select Artifacts"}
                  </div>
                  <div className="rounded-xl  bg-[#0736C4]  px-4 text-white">
                    {(selectedVersion && Array.from(selectedVersion)[0]) || "*"}
                  </div>
                  <div>
                    <IoIosArrowDown className="text-black dark:text-white" />
                  </div>
                </div>
              }
              children={
                <div className="mt-[4%] flex h-[365px] w-[330px] flex-col justify-between rounded-lg border border-[#000000]/15 bg-white dark:border-[#212121] dark:bg-[#161616]">
                  <div className="flex w-[100%] flex-row border-b border-gray-300 p-2 dark:border-[#212121]">
                    <div className="flex w-1/3 justify-start">
                      <p className="px-2 text-start text-sm font-medium text-black dark:text-white">
                        Artifact
                      </p>
                    </div>
                    <div className="flex w-2/3 justify-end gap-2">
                      <CiSquarePlus />
                      <CiSearch />
                      <IoCloseOutline />
                    </div>
                  </div>
                  <div className=" flex h-[95%] w-full   items-center justify-center  ">
                    {/* <TorusDropDown
                      title={
                        (selectedApplictionName &&
                          Array.from(selectedApplictionName)[0]) ||
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
                    <div className=" flex h-full w-1/3 flex-col gap-1 border-r py-4">
                      {projectList &&
                        projectList?.map((project, index) => (
                          <div
                            onClick={() =>
                              handleApplicationName(new Set([project]))
                            }
                            className="flex w-[100%] flex-row items-center gap-1"
                          >
                            <IoIosArrowForward
                              size={15}
                              className={`cursor-pointer p-[1px] text-black transition-all delay-75 duration-200 ease-in-out dark:text-white `}
                            />
                            <div className="w-full cursor-pointer text-xs font-semibold text-black">
                              {project}
                            </div>
                          </div>
                        ))}
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
                        (selectedApplictionName &&
                          Array.from(selectedApplictionName)[0]) ||
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
                      selectedKey={selectedApplictionName}
                      handleSelectedKey={handleApplicationName}
                      handleDelete={(key) => {
                        setSelectedDeletingProjectItem(key);
                        openmodal("project");
                      }}
                    /> */}
                    <div className=" flex h-full w-2/3 flex-row items-center justify-center gap-1 px-1 py-1 ">
                      {artifactsList && artifactsList.length > 0 ? (
                        <>
                          {artifactsList.map((obj, index) => {
                            return (
                              <>
                                <div className="flex h-full w-[65%] flex-row p-2 ">
                                  <>
                                    {inputchange !== index ? (
                                      <div
                                        onClick={() =>
                                          handleArtifactsChange(
                                            new Set([obj?.artifact]),
                                          )
                                        }
                                        className="flex h-[30px] w-full flex-row rounded-md bg-[#F4F5FA] dark:bg-[#0F0F0F]"
                                      >
                                        <div className="flex w-10/12 items-center justify-start p-2 text-sm ">
                                          {obj?.artifact}
                                        </div>
                                        <div className="flex w-2/12 items-center justify-end gap-2 p-2">
                                          <span
                                            className="cursor-pointer"
                                            onClick={() =>
                                              setInputchange(index)
                                            }
                                          >
                                            <FiEdit2 color="black" size={13} />
                                          </span>
                                          <span
                                            className="cursor-pointer"
                                            onClick={() => setInputValue("")}
                                          >
                                            <BsTrash3 color="red" size={13} />
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="w-full">
                                        <Input
                                          value={inputValue ?? obj}
                                          placeholder="Enter text"
                                          className={
                                            "flex h-[30px] w-[100%] items-center justify-center rounded-md  bg-[#F4F5FA] p-2 text-sm text-black dark:bg-[#0F0F0F] dark:text-white"
                                          }
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                              setInputchange(null);
                                            }
                                          }}
                                          onChange={(e) => {
                                            setInputValue(e.target.value);
                                          }}
                                        />
                                      </div>
                                    )}
                                  </>
                                </div>
                                <div className="h-full w-[25%] ">
                                  <TorusDropDown
                                    title={
                                      (selectedVerison &&
                                        Array.from(selectedVerison)[0]) ||
                                      "Version"
                                    }
                                    selectionMode="single"
                                    selected={selectedVerison}
                                    setSelected={(e) => {
                                      setSelectedArtifacts(
                                        new Set([obj?.artifact]),
                                      );
                                      setSelectedVerison(e);
                                    }}
                                    // selectedKeys={selectedVersion}
                                    // setSelectedKeys={setSelectedVerison}
                                    items={
                                      obj?.versionList &&
                                      obj?.versionList?.map((item) => ({
                                        label: item,
                                        key: item,
                                      }))
                                    }
                                    classNames={{
                                      buttonClassName:
                                        " rounded-lg w-[100%] text-xs h-[30px] font-medium mt-2 p-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] text-center dark:text-white",
                                      popoverClassName: "w-[5%]",
                                      listBoxClassName: "overflow-y-auto",
                                      listBoxItemClassName:
                                        "flex text-sm justify-between",
                                    }}
                                  />
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <div classNames="flex h-full w-full items-center justify-center">
                          no artifacts
                        </div>
                      )}
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
                                  (selectedVerison &&
                                    Array.from(selectedVerison)[0]) ||
                                  "Version"
                                }
                                darkMode={!darkMode}
                                isDisabled={
                                  selectededArtifacts &&
                                  Array.from(selectededArtifacts)[0]
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
                                  setMainVersion &&
                                    setMainVersion(Array.from(key)[0]);
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
                        (selectededArtifacts &&
                          Array.from(selectededArtifacts)[0]) ||
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
                      selectedKey={selectededArtifacts}
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
                        selectededArtifacts &&
                        Array.from(selectededArtifacts)[0]
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
                    /> */}
                  </div>
                  <div className="flex w-[100%] flex-row space-x-2 border-t border-gray-300 p-2 dark:border-[#212121] ">
                    <div className="flex w-1/3 justify-start">
                      <TorusButton
                        onClick={() => {
                          saveProcessFlow(
                            "create",
                            selectedApplictionName,
                            selectededArtifacts,
                            selectedVerison,
                            getDataFromFabrics(),
                          );
                        }}
                        buttonClassName=" bg-[#F4F5FA] dark:bg-[#0F0F0F] w-[100px] h-[30px] text-xs text-black dark:text-white rounded-md flex justify-center items-center"
                        Children={"Make a copy"}
                      />
                    </div>

                    <div className="flex w-2/3 justify-end gap-4">
                      <TorusButton
                        buttonClassName=" bg-transparent w-[40px] text-[#0736C4] text-xs dark:text-white flex justify-center items-center"
                        Children={"Save"}
                      />
                      <TorusButton
                        buttonClassName=" bg-[#0736C4] w-[80px] h-[30px] text-xs text-white rounded-md flex justify-center items-center"
                        Children={"Save as"}
                      />
                    </div>
                  </div>
                </div>
              }
            />
          </div>

          <div className="flex h-full w-1/3 items-center justify-end gap-3 bg-transparent ">
            <div className=" col-span-3 flex items-center justify-center rounded-md">
              <TorusAvatar
                radius={"full"}
                size={"lg"}
                borderColor={"#A59E92"}
                src={[
                  " https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                  "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                  "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
                  " https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                  "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                  "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
                  " https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                  "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                  "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
                  ,
                  " https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                  "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                  "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
                ]}
              />
            </div>
            <div className=" col-span-1 flex items-center justify-center">
              <VerticalLine className={"stroke-black dark:stroke-white"} />
            </div>
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
