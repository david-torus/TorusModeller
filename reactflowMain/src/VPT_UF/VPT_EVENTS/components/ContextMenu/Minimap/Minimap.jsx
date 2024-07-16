import { useContext } from "react";
import { DarkmodeContext } from "../../../../../commonComponents/context/DarkmodeContext";

export const MinimapComponent = ({ x, y, width }) => {
  const { darkmode } = useContext(DarkmodeContext);

  return (
    <circle
      cx={x}
      cy={y}
      r={width / 2 + 10}
      strokeWidth={1}
      color={darkmode ? "white" : "black"}
      fill={darkmode ? "#333334" : "#E4E3E3"}
    />
  );
};
