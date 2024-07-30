/* eslint-disable */
import React, { useState } from "react";
import { DecisionGraph, JdmConfigProvider } from "@gorules/jdm-editor";
import "@gorules/jdm-editor/dist/style.css";
import { TiArrowBackOutline } from "react-icons/ti";

import { useEffect } from "react";
import { useReactFlow } from "reactflow";

export const Gorule = ({
  sideBarData,
  nodeConfig,
  updatedNodeConfig,
  setToggleReactflow,
}) => {
  const [json, setJson] = useState({});
  const { getNode, getNodes } = useReactFlow();

  let id = sideBarData.id;

  const node = getNode(id);

  useEffect(() => {
    if (sideBarData) {
      if (sideBarData) {
        if (sideBarData?.data?.nodeProperty.hasOwnProperty("rule")) {
          setJson(sideBarData.data.nodeProperty["rule"]);
        } else {
          setJson(sideBarData.data.nodeProperty["rule"] || {});
        }
      } else {
        if (sideBarData?.defaults?.["rule"]) {
          setJson(sideBarData?.defaults["rule"] || {});
        } else {
          setJson({});
        }
      }
    }
  }, [nodeConfig, sideBarData]);

  const handleClick = () => {
    try {
      updatedNodeConfig(
        sideBarData.id,
        {
          nodeId: sideBarData.id,
          nodeName: sideBarData.data.label,
          nodeType: sideBarData.type,
        },
        {
          rule: json,
        },
      );

      setToggleReactflow((prev) => ({
        ...prev,
        rule: false,
        flow: true,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  console.log(node, "json");

  return (
    <div className="h-[100%]">
      <div className="h-[5%]   bg-[#FFFFFF]">
        <p
          className=" z-50 ml-2 mt-0 w-[33px] rounded bg-[#4095FD]  p-2  text-center text-white hover:cursor-pointer"
          onClick={handleClick}
        >
          <TiArrowBackOutline />
        </p>
      </div>
      <div className="h-[95%]">
        {
          <JdmConfigProvider>
            <DecisionGraph value={json} onChange={(val) => setJson(val)} />
          </JdmConfigProvider>
        }
      </div>
    </div>
  );
};
