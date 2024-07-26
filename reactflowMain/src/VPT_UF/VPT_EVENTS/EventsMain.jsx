import React, { useEffect, useState } from "react";
import {EventDisplay} from "./components/EventDisplay";

import EventNavbar from "../../commonComponents/layout/ActionBar/EventNavbar";
import { gettingValues, transformNodesToProps } from "./utils/utils";

export default function EventsMain({
  nodes,
  nodeConfig,
  sideBarData,
  setToggleReactflow,
  tenant,
  appGroup,
  application,
  fabrics,
  mainArtifacts,
  mainVersion,
  currentDrawing,
  selecetedWholeVersion,
  setSelectedWholeVersion,
}) {
  const [controlJson, setControlJson] = useState({});
  const [data, setData] = useState({
    nodes: [],
    nodeEdges: [],
    nodeProperty: {},
  });

  const [getdata, setGetData] = useState({
    nodes: [],
    nodeEdges: [],
    nodeProperty: {},
  });
  const [selectedControlEvents, setSelectedControlEvents] = useState(null);

  const [compCon, setComcon] = useState(null);

  useEffect(() => {
    if (nodes) setControlJson(transformNodesToProps(nodes));
  }, [nodes]);

  useEffect(() => {
    if (gettingValues(nodes)) {
      setComcon(gettingValues(nodes));
    }
  }, [nodes]);

  return (
    <div className="h-[100%] overflow-hidden">
      <div className="h-[8%]">
        {/* <EventNavbar
          data={getdata}
          setData={setData}
          setToggleReactflow={setToggleReactflow}
          tenant={tenant}
          appGroup={appGroup}
          application={application}
          fabrics={fabrics}
          mainArtifacts={mainArtifacts}
          mainVersion={mainVersion}
          dataum={compCon}
          setSelectedControlEvents={setSelectedControlEvents}
          selecetedWholeVersion={selecetedWholeVersion}
          setSelectedWholeVersion={setSelectedWholeVersion}
        /> */}
      </div>
      <div className="h-[92%]">
        <EventDisplay
          datas={data}
          setData={setData}
          sendData={setGetData}
          currentDrawing={currentDrawing}
          controlJson={controlJson}
          selectedControlEvents={selectedControlEvents}
        />
      </div>
    </div>
  );
}
