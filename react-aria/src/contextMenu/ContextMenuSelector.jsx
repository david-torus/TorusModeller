import DataFabricContextMenu from "./dataFabric/DataFabricContextMenu";
import UserFabricContextMenu from "./userFabric/UserFabricContextMenu";
import ProcessFabricContextMenu from "./processFabric/ProcessFabricContextMenu";
import SecurityFabricContextMenu from "./securityFabric/SecurityFabricContextMenu";

export default function ContextMenuSelector(props) {
  const cycleContextMenu = (fabric) => {
    switch (fabric) {
      case "DF":
        return <DataFabricContextMenu {...props} />;
      case "UF":
        return <UserFabricContextMenu {...props} />;
      case "PF":
        return <ProcessFabricContextMenu {...props} />;
      case "SF":
        return <SecurityFabricContextMenu {...props} />;
      default:
        return null;
    }
  };
  return cycleContextMenu(props.fabric);
}
