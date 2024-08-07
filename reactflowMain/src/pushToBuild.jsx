import React, { useEffect, useState } from "react";
import TorusButton from "./torusComponents/TorusButton";
import TorusDropDown from "./torusComponents/TorusDropDown";
import TorusTab from "./torusComponents/TorusTab";
import {
  getDataPushToBuild,
  postDataPushToBuild,
} from "./commonComponents/api/pushToBuildApi";
import {
  PushToBuild,
  TorusPushToBuildFail,
  TorusPushToBuildSucess,
} from "./SVG_Application";
import TorusAvatar from "./torusComponents/TorusAvatar";
import { useContext } from "react";
import { TorusModellerContext } from "./Layout";
import { toast, ToastContainer } from "react-toastify";
import TorusToast from "./torusComponents/TorusToaster/TorusToast";

export default function Builder({ mappedTeamItems, clientLoginId }) {
  console.log("mappedTeamItems", mappedTeamItems);
  const {
    selectedArtifactGroup,
    selectedTkey,
    selectedFabric,
    selectedArtifact,
    selectedVersion,
    selectedProject,
    client,
  } = useContext(TorusModellerContext);

  console.log(
    `TCL:${selectedTkey}:${selectedFabric}:${selectedProject}:${selectedArtifactGroup}:${selectedArtifact}:${selectedVersion}`,
    clientLoginId,
    "NEW API======>><<<",
  );

  const [selectedTab, setSelectedTab] = useState("me");
  const [pushToBuildData, setPushToBuildData] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [tenants, setTenants] = useState(null);
  const [selectedAppGroup, setSelectedAppGroup] = useState("");
  const [appGroups, setAppGroups] = useState(null);
  const [apps, setApps] = useState(null);
  const [selectedApp, setSelectedApp] = useState("");
  const [notificationDetails, setNotificationDetails] = useState(null);
  const [wordLength, setWordLength] = useState(0);
  const [sucessBtn, setSucessBtn] = useState(false);
  const [failureBtn, setFailureBtn] = useState(false);

  const getTenants = (data) => {
    return data?.map((item) => ({
      key: item.name,
      label: item.name,
    }));
  };

  const getAppGroups = (data, tenant) => {
    const tenantData = data?.find((item) => item.name === tenant);
    if (tenantData) {
      return tenantData?.appGroups?.map((item) => ({
        key: item.name,
        label: item.name,
      }));
    }
  };

  const getApps = (data, tenant, appGroup) => {
    const tenantData = data?.find((item) => item.name === tenant);
    if (tenantData) {
      const appGroupData = tenantData?.appGroups?.find(
        (item) => item.name === appGroup,
      );
      if (appGroupData) {
        return appGroupData?.apps?.map((item) => ({
          key: item.name,
          label: item.name,
        }));
      }
    }
  };

  const handlePushToBuild = async () => {
    try {
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoidGVzdCIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwibW9iaWxlIjoiNTc4NDExNDk0OSIsIjJGQUZsYWciOiJOIiwiY2xpZW50IjoiQUJDIiwiYXV0aCI6eyJvcmdHcnAiOlsiRlQiLCJJVCJdLCJvcmdzIjpbIkZUTzEiLCJGVE8yIiwiSVRPMiJdLCJyb2xlR3JwIjpbIlJHMSIsIlJHMiJdLCJyb2xlcyI6WyJSMSJdLCJwc0dycCI6WyJUT1JVU1NNRSJdLCJwcyI6W1t7Im5hbWUiOiJBQkMiLCJhcHBHcnAiOlt7Im5hbWUiOiJNU1AiLCJhcHAiOlt7Im5hbWUiOiJNRSJ9XX0seyJuYW1lIjoiQ0ciLCJhcHAiOlt7Im5hbWUiOiJNRSJ9LHsibmFtZSI6Im12cCJ9XX0seyJuYW1lIjoiVE0iLCJhcHAiOlt7Im5hbWUiOiJ0ZXN0In1dfV19LHsibmFtZSI6IkdTUyIsImFwcEdycCI6W3sibmFtZSI6Ik5ld0FwcEdyb3VwIiwiYXBwIjpbeyJuYW1lIjoibmV3QVBwIn1dfV19XSxbeyJuYW1lIjoiQUJDIiwiYXBwR3JwIjpbeyJuYW1lIjoiTVNQIiwiYXBwIjpbeyJuYW1lIjoiTUUifV19LHsibmFtZSI6IkNHIiwiYXBwIjpbeyJuYW1lIjoiTUUifV19LHsibmFtZSI6IlRNIiwiYXBwIjpbeyJuYW1lIjoidGVzdCJ9XX1dfSx7Im5hbWUiOiJHU1MiLCJhcHBHcnAiOlt7Im5hbWUiOiJOZXdBcHBHcm91cCIsImFwcCI6W3sibmFtZSI6Im5ld0FQcCJ9XX1dfV0sW3sibmFtZSI6IkFCQyIsImFwcEdycCI6W3sibmFtZSI6Ik1TUCIsImFwcCI6W3sibmFtZSI6Ik1FIn1dfSx7Im5hbWUiOiJDRyIsImFwcCI6W3sibmFtZSI6Ik1FIn1dfSx7Im5hbWUiOiJUTSIsImFwcCI6W3sibmFtZSI6InRlc3QifV19XX0seyJuYW1lIjoiR1NTIiwiYXBwR3JwIjpbeyJuYW1lIjoiTmV3QXBwR3JvdXAiLCJhcHAiOlt7Im5hbWUiOiJuZXdBUHAifV19XX1dXX0sImlhdCI6MTcyMjU4NjE1OCwiZXhwIjoxNzIyNTg5NzU4fQ.xj3csO7AflHLoAtLATzFmq33SHoGigkLp2bMjFM8-wk";

      const res = await getDataPushToBuild(token);
      if (res) {
        console.log(res, "ResponseonPUSHBUILD");
        setPushToBuildData(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function denormalizeFn1(data) {
    return (
      data?.map(
        ({
          artifactKeyPrefix,
          buildKeyPrefix,
          artifactName,
          timestamp,
          version,
          loginId,
        }) => {
          const [, , fabrics] = artifactKeyPrefix.split(":");
          const [, , , tennant, app] = buildKeyPrefix.split(":");

          const pathArr = [tennant, app];

          const fabricsNameFn = (fab) => {
            switch (fab) {
              case "PF":
                return "PROCESS FABRIC";
              case "UF":
                return "USER FABRIC";
              case "SF":
                return "SECURITY FABRIC";
              case "DF":
                return "DATA FABRIC";
              default:
                return fab;
            }
          };

          const versionFn = (ver) => `${ver}.0`;

          const dateConverter = (ver) => {
            const date = new Date(ver);

            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            };

            let dateTime = date.toLocaleString("en-US", options);

            var timeStamp = dateTime.replace("at", " ");

            return timeStamp;
          };

          const firstLetterUpperCase = (str) => {
            const firstLetter = str.charAt(0).toUpperCase() + str.slice(1);
            return firstLetter;
          };

          return {
            artifactsName: artifactName,
            artifactsKeyArr: artifactKeyPrefix.split(":"),
            fabrics,
            fabricsName: fabricsNameFn(fabrics),
            buildKeyPrefixArr: buildKeyPrefix.split(":"),
            tennant,
            app,
            timeStamp: dateConverter(timestamp),
            loginId,
            updatedVersion: versionFn(version),
            text: pathArr.join(" > "),
            heading: `${firstLetterUpperCase(loginId)} pushed the ${fabricsNameFn(fabrics).toLowerCase()} of ${tennant} ${versionFn(version)}`,
          };
        },
      ) || []
    );
  }

  useEffect(() => {
    handlePushToBuild();

    if (mappedTeamItems && mappedTeamItems.length > 0) {
      setNotificationDetails(denormalizeFn1(mappedTeamItems));
    }
  }, [mappedTeamItems]);

  const handelbuldPush = async () => {
    try {
      const res = await postDataPushToBuild({
        artifactKeyPrefix: `TCL:${selectedTkey}:${selectedFabric}:${selectedProject}:${selectedArtifactGroup}:${selectedArtifact}:${selectedVersion}`,
        loginId: clientLoginId,
        tenant: selectedTenant,
        app: selectedApp,
      });

      console.log(res, "ResponseonPUSHBUILD");

      if (res === "error") {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "error",
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            title: "Error",
            text: `Error found during push to build`,
            closeButton: false,
          },
        );
        setFailureBtn(true);
        setTimeout(() => {
          setFailureBtn(false);
        }, 3000);
      } else {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "success",
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            title: "Success",
            text: `Pushed to build successfully`,
            closeButton: false,
          },
        );

        setSucessBtn(true);
        setTimeout(() => {
          setSucessBtn(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pushToBuildData && pushToBuildData.length > 0) {
      setTenants(getTenants(pushToBuildData));
    }
  }, [pushToBuildData]);

  useEffect(() => {
    if (selectedTenant) {
      setAppGroups(getAppGroups(pushToBuildData, selectedTenant));
      setSelectedAppGroup("");
      setApps(null);
    }
  }, [selectedTenant]);

  useEffect(() => {
    if (selectedAppGroup) {
      setApps(getApps(pushToBuildData, selectedTenant, selectedAppGroup));
    }
  }, [selectedAppGroup]);

  console.log(tenants, "tenants");
  console.log(selectedTenant, "selectedTenant");
  console.log(appGroups, "appGroups");
  console.log(selectedAppGroup, "selectedAppGroup");
  console.log(apps, "apps");
  console.log(pushToBuildData, "pushToBuildData");

  const finalValue = () => {
    if (selectedTenant && selectedAppGroup && selectedApp) {
      console.log({ selectedTenant, selectedAppGroup, selectedApp }, "fields");
    } else {
      console.log("Please select all the fields");
    }
  };

  return (
    <>
      <ToastContainer
        newestOnTop
        icon={false}
        pauseOnHover={false}
        hideProgressBar={true}
        className={`z-[999] flex min-h-11 min-w-[0%] max-w-[85%] flex-col items-center justify-end`}
      />
      <div className="flex h-[13%] w-[100%] flex-row border border-b-[#E5E9EB]  p-2 dark:border-[#212121]">
        <div className="flex w-full items-center justify-start">
          <div className="flex w-[95%] items-center justify-start">
            <div className="flex w-[20%] items-center justify-start">
              <PushToBuild className={"stroke-black dark:stroke-white"} />
            </div>
            <div className="flex w-[80%] items-center justify-start ">
              <p className="px-2 text-start text-sm font-semibold text-black dark:text-white">
                Push to Build
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row  items-center justify-end gap-2 ">
          <div className="flex w-[60%] items-center justify-end">
            {!sucessBtn && !failureBtn ? (
              <TorusButton
                Children="Push Artifact"
                size={"md"}
                btncolor={"#0736C4"}
                outlineColor="torus-hover:ring-blue-500/50"
                radius={"lg"}
                fontStyle={
                  "font-inter text-white text-xs 3xl:text-base font-medium xl:text-sm xl:font-semibold tracking-tighter px-[1rem] py-2"
                }
                color={"white"}
                onPress={() => {
                  handelbuldPush();
                }}
              />
            ) : sucessBtn && !failureBtn ? (
              <>
                <TorusButton
                  Children="Sucess"
                  btncolor={"#4CAF50"}
                  outlineColor="torus-hover:ring-[#4CAF50]/50"
                  radius={"lg"}
                  fontStyle={
                    "font-inter text-white text-xs 3xl:text-base font-medium xl:text-sm xl:font-semibold tracking-tighter px-[1rem] "
                  }
                  color={"white"}
                  startContent={
                    <TorusPushToBuildSucess className={"fill-[#FFFFFF]"} />
                  }
                />
              </>
            ) : !sucessBtn && failureBtn ? (
              <>
                <TorusButton
                  Children="Failed"
                  btncolor={"#F14336"}
                  outlineColor="torus-hover:ring-[#F14336]/50"
                  radius={"lg"}
                  fontStyle={
                    "font-inter text-white text-xs 3xl:text-base font-medium xl:text-sm xl:font-semibold tracking-tighter px-[1rem] "
                  }
                  color={"white"}
                  startContent={
                    <TorusPushToBuildFail className={"fill-[#FFFFFF]"} />
                  }
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className=" flex h-[87%] w-full items-center  justify-center   ">
        <div className="flex h-[100%] w-[100%] scroll-m-1 flex-col items-center  justify-center ">
          <div className="mt-[0.75rem] flex h-[13%] w-[100%] items-center justify-start bg-white dark:bg-[#161616]">
            <div className="mt-[1rem] grid w-[100%] grid-cols-9 gap-[0.5rem] px-2">
              <div className="col-span-3  ">
                <TorusDropDown
                  title={selectedTenant ? selectedTenant : "Tenant"}
                  selectionMode="single"
                  selected={""}
                  setSelected={(e) => {
                    setSelectedTenant(Array.from(e)[0]);
                  }}
                  classNames={{
                    buttonClassName:
                      "rounded-lg w-[100%] flex justify-center items-center text-xs h-[30px] font-medium  p-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] text-center dark:text-white",

                    popoverClassName: "w-[70px] max-h-[100px] min-h-[50px]",
                    listBoxClassName:
                      " min-h-[35px] max-h-[100px] overflow-y-auto max-w-[9rem] min-w-[6.8rem] absolute right-0",
                    listBoxItemClassName: "flex text-sm justify-between",
                  }}
                  isDropDown={true}
                  items={tenants}
                  onPress={() => {
                    setSelectedAppGroup("");
                    setSelectedApp(null);
                  }}
                />
              </div>
              <div className="col-span-3  ">
                <TorusDropDown
                  title={selectedAppGroup ? selectedAppGroup : "App Group"}
                  selectionMode="single"
                  selected={""}
                  setSelected={(e) => {
                    setSelectedAppGroup(Array.from(e)[0]);
                  }}
                  classNames={{
                    buttonClassName:
                      "rounded-lg w-[100%] flex justify-center items-center text-xs h-[30px] font-medium  p-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] text-center dark:text-white",

                    popoverClassName: "w-[70px] max-h-[100px] min-h-[50px]",
                    listBoxClassName:
                      " min-h-[35px] max-h-[100px] overflow-y-auto max-w-[9rem] min-w-[6.8rem] absolute right-0",
                    listBoxItemClassName: "flex text-sm justify-between",
                  }}
                  isDropDown={true}
                  items={appGroups}
                  onPress={() => {
                    setSelectedApp(null);
                  }}
                />
              </div>
              <div className="col-span-3  ">
                <TorusDropDown
                  title={selectedApp ? selectedApp : "App"}
                  selectionMode="single"
                  selected={""}
                  setSelected={(e) => {
                    setSelectedApp(Array.from(e)[0]);
                    finalValue();
                  }}
                  classNames={{
                    buttonClassName:
                      "rounded-lg w-[100%] flex justify-center items-center text-xs h-[30px] font-medium  p-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] text-center dark:text-white",

                    popoverClassName: "w-[70px] max-h-[100px] min-h-[50px]",
                    listBoxClassName:
                      " min-h-[35px] max-h-[100px] overflow-y-auto max-w-[9rem] min-w-[6.8rem] absolute right-0",
                    listBoxItemClassName: "flex text-sm justify-between",
                  }}
                  isDropDown={true}
                  items={apps}
                />
              </div>
            </div>
          </div>

          <div className="flex h-[90%] w-full flex-col pt-2 ">
            <div className="flex h-[15%] w-full items-center justify-start p-4">
              <p className="flex w-[50%] items-center justify-start text-xs font-semibold tracking-[0.45px]">
                DEVELOPMENT HISTORY
              </p>
            </div>
            <div className="flex h-[85%] w-full flex-col items-center gap-[0.5rem]">
              <div className="w-[100%] px-[0.8rem]">
                <TorusTab
                  defaultSelectedKey={selectedTab}
                  key="TorusTab"
                  orientation="horizontal"
                  onSelectionChange={(e) => setSelectedTab(e)}
                  classNames={{
                    tabs: "cursor-pointer w-[100%] rounded-lg bg-[#F4F5FA] dark:bg-[#0F0F0F]",
                    tabList:
                      "w-full h-[100%]  flex justify-center items-center  p-2 rounded-lg",
                    tab: `rounded-lg h-full w-full flex justify-center items-center 
                                        torus-pressed:outline-none torus-focus:outline-none torus-pressed:ring-0 torus-focus:ring-0  border-2 border-transparent  text-center  text-xs font-semibold tracking-[0.45px]`,
                  }}
                  tabs={[
                    {
                      id: "Me",
                      content: ({ isSelected }) => (
                        <div
                          className={` h-[100%] w-[100%] rounded-lg  py-[0.5rem] text-sm font-medium torus-focus:outline-none torus-focus:ring-0 torus-pressed:ring-0  
                                                  ${isSelected ? "bg-[#FFFFFF] text-black" : ""}
                                                  `}
                        >
                          Me
                        </div>
                      ),
                    },
                    {
                      id: "Teams",
                      content: ({ isSelected }) => (
                        <div
                          className={`  h-[100%] w-[100%] rounded-lg  py-[0.5rem] text-sm font-medium torus-focus:outline-none torus-focus:ring-0 torus-pressed:ring-0 
                                                  ${isSelected ? "bg-[#FFFFFF] text-black" : ""}
                                                  `}
                        >
                          Teams
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
              <div className="h-[70%] w-[100%] overflow-y-scroll px-[1.25rem] ">
                {notificationDetails &&
                  notificationDetails?.map((obj) => (
                    <TeamsNotificationComponent
                      // src={obj.src}
                      heading={obj.heading}
                      text={obj.text}
                      timeStamp={obj.timeStamp}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const TeamsNotificationComponent = ({ src, heading, text, timeStamp }) => {
  return (
    <div className="grid w-[100%] grid-cols-12 pt-4">
      <div className="col-span-1 w-[100%] flex justify-center items-center">
        <div className="flex w-[100%] justify-start">
          <TorusAvatar
            // src={src}
            color={"#0736C4"}
            borderColor={"#0736C4"}
            radius={"full"}
            size={"full"}
          />
        </div>
      </div>
      <div className="col-span-11">
        <div className="flex w-[100%] flex-col">
          <div className="grid grid-cols-8">
            <div className="col-span-6">
              <p className="text-[0.83rem] font-medium text-[#344054]">
                {heading}
              </p>
            </div>
            <div className="col-span-2">
              <div className="flex w-[100%] items-center justify-end">
                <p className="whitespace-nowrap text-[0.65rem] font-normal text-[#667085]">
                  {timeStamp}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[100%]">
            <p className="text-xs font-normal text-[#667085]">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
