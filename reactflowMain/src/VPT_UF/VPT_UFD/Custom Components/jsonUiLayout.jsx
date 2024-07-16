import React from "react";
import NavigationBar from "./Navdata/navbar";
import TableItems from "./Tabledata/tableItem";
import { getWidth } from "./utils";
import FormComponent from "./Form/FormComponent";
import SideNavbar from "./SIdebar/SideNavbar";
import InputComponent from "./Input/InputComponent";
import ButtonComponent from "./Button/ButtonComponent";

const JsonUiLayout = ({ nodejson, width, height, stateTrack, json }) => {
  const CalculatePercent = (x, y) => {
    return (x / y) * 100 + "%";
  };

  const RenderComp = ({ item }) => {
    switch (item.type) {
      case "navbar":
        return (
          <NavigationBar
            height={item.height}
            stateTrack={stateTrack}
            json={item.data.json}
          />
        );
      case "table":
        return (
          <TableItems
            height={item.height}
            stateTrack={stateTrack}
            json={json}
          />
        );
      case "form":
        return (
          <FormComponent
            height={item.height}
            width={item.width}
            stateTrack={stateTrack}
            json={json}
          />
        );
      case "sidebarnav":
        return (
          <SideNavbar
            height={item.height}
            width={item.width}
            stateTrack={stateTrack}
            json={json}
          />
        );
      case "button":
        return (
          <ButtonComponent
            height={item.height}
            width={item.width}
            stateTrack={stateTrack}
            json={json}
          />
        );
      case "input":
        return (
          <InputComponent
            height={item.height}
            width={item.width}
            stateTrack={stateTrack}
            json={json}
          />
        );
      default:
        return <p>D E F A U L T</p>;
    }
  };

  return (
    <div className="h-screen relative" style={{ width: width }}>
      {nodejson &&
        nodejson.length > 0 &&
        nodejson.map((item, index) => {
          return (
            <div
              style={{
                position: "absolute",
                left: CalculatePercent(item.position.x, width),
                top: item.position.y,
                width: CalculatePercent(item.width, width),
                height: item.height,
              }}
            >
              <RenderComp item={item} />
            </div>
          );
        })}
    </div>
  );
};

export default JsonUiLayout;
