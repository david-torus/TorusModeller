import React, { useEffect, useState } from "react";
import JsonUiLayout from "./customComponents/jsonUiLayout";
import { TiArrowBackOutline } from "react-icons/ti";
import UFDMain from "../UFDMain";

/**
 * Renders the Builder component.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - stateTrack: The state tracking value.
 *   - nodesj: The nodes JSON data.
 *   - jsonj: The JSON data.
 *   - widthj: The width value.
 *   - heightj: The height value.
 *   - setShowBuilder: The function to set the showBuilder value.
 *   - showbuilder: The showBuilder value.
 * @return {JSX.Element} The rendered Builder component.
 */
export const Builder = ({
  stateTrack,
  nodesj,
  jsonj,
  widthj,
  heightj,
  setShowBuilder,
  showbuilder,
}) => {
  const [nodejson, setnodeJson] = useState([]);
  const [height, setHeight] = useState(null);
  const width = null;

  useEffect(() => {
    setnodeJson(nodesj);
    setHeight(heightj);
  }, [heightj, jsonj, nodesj]);

  const handleClick = () => {
    setShowBuilder(!showbuilder);
  };

  return (
    <div>
      {!showbuilder ? (
        <>
          <UFDMain />
        </>
      ) : (
        <>
          <button
            onClick={handleClick}
            className="fixed top-2 left-4 py-3 px-3 
       bg-gray-500 m-10 text-white rounded  text-center hover:bg-gray-700 cursor-pointer z-50"
          >
            <TiArrowBackOutline />
          </button>

          <JsonUiLayout
            nodejson={nodejson}
            height={height}
            width={width}
            stateTrack={stateTrack}
          />
        </>
      )}
    </div>
  );
};
