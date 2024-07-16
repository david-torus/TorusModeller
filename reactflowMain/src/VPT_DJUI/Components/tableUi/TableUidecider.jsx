/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";

import { BuilderContext } from "../../builder";
import { RenderTooltip } from "../utils/RenderTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "@nextui-org/react";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import Tableui from "./tableui";
import ReusableDropDown from "../../../commonComponents/reusableComponents/ReusableDropDown";
import ReusableInput from "../../../commonComponents/reusableComponents/ReusableInput";
import { handlepath } from "../utils/utils";

const CustomInput = ({ keyJson, Objkey, value, path }) => {
  const { editedValues, setEditedValues } = useContext(BuilderContext);
  const [toogleInput, setToogleInput] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);

  return (
    <div className="w-full h-full flex items-start">
      {!toogleInput ? (
        <div className="flex gap-2">
          <span className={darkmode ? "text-white" : "text-grey-700"}>
            {Objkey}:
          </span>
          {keyJson &&
            keyJson.hasOwnProperty(handlepath(path + "." + Objkey)) && (
              <Tooltip
                content={
                  <RenderTooltip
                    tooltip={keyJson[handlepath(path + "." + Objkey)]}
                  />
                }
              >
                <div className="flex gap-2 items-center">
                  <span>
                    <AiOutlineInfoCircle color={darkmode ? "white" : "black"} />
                  </span>
                </div>
              </Tooltip>
            )}
          <span
            className={darkmode ? "text-white" : "text-grey-700"}
            onDoubleClick={() => setToogleInput(true)}
          >
            {value || "Double Click to Edit"}
          </span>
        </div>
      ) : (
        <div className="flex g-2">
          <span className={darkmode ? "text-white" : "text-grey-700"}>
            {Objkey}:
          </span>
          <div className=" ">
            <ReusableInput
              key={path + "." + Objkey}
              type="text"
              darkmode={darkmode}
              defaultValue={value}
              className={`border-gray-600/80 ${darkmode ? "text-white" : "text-grey-700"}  border-2  rounded-2xl outline-none shadow-none h-[100%] w-[80%] bg-transparent`}
              value={editedValues[path + "." + Objkey]}
              handleChange={(e) =>
                setEditedValues((prev) => ({
                  ...prev,
                  [path + "." + Objkey]: e.target.value,
                }))
              }
              label={Objkey}
              inputProps={{
                onBlur: () => setToogleInput(false),
                onKeyDown: (e) => e.key === "Enter" && setToogleInput(false),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function Tableuidecider({ data, path, keyJson }) {
  const [newData, setNewData] = useState({});
  const { darkmode } = useContext(DarkmodeContext);

  const { functionality, editedValues, setEditedValues } =
    useContext(BuilderContext);
  const handleDropDownDupilcate = (data) => {
    try {
      if (data && data.type == "singleSelect") {
        if (data.selectionList.includes(data.selectedValue[0])) {
          return data.selectedValue;
        } else {
          functionality("update", path + "." + "selectedValue", {
            value: [],
          });
        }
      } else if (data && data.type == "multipleSelect") {
        if (
          data.selectedValue.every((item) => data.selectionList.includes(item))
        ) {
          return data.selectedValue.join(", ");
        } else {
          functionality("update", path + "." + "selectedValue", {
            value: [
              ...data.selectedValue.filter((item) =>
                data.selectionList.includes(item)
              ),
            ],
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    try {
      setNewData(data);
    } catch (e) {
      console.error(e);
    }
  }, [data]);

  if (
    newData &&
    Object.keys(newData).length > 0 &&
    newData.hasOwnProperty("type") &&
    newData?.type == "singleSelect"
  ) {
    return (
      <div className="bg-transparent">
        <ReusableDropDown
          darkmode={darkmode}
          key={path}
          title={
            editedValues[path + "." + "selectedValue"] ||
            newData.selectedValue ||
            "Select"
          }
          selectedKey={new Set([newData.selectedValue])}
          handleSelectedKey={(e) => {
            setEditedValues((prev) => ({
              ...prev,
              [path + "." + "selectedValue"]: Array.from(e)[0],
            }));
          }}
          items={
            newData.selectionList && newData.selectionList.length > 0
              ? newData.selectionList.map((item) => {
                  return {
                    label: item,
                    value: item,
                    key: item,
                  };
                })
              : []
          }
        />
      </div>
    );
  }

  if (
    newData &&
    Object.keys(newData).length > 0 &&
    newData.hasOwnProperty("type") &&
    newData?.type == "multipleSelect"
  ) {
    return (
      <div>
        <ReusableDropDown
          darkmode={darkmode}
          key={path}
          title={
            <span className=" truncate">
              {(editedValues[path + "." + "selectedValue"] &&
                editedValues[path + "." + "selectedValue"].join(", ")) ||
                (newData.selectedValue && newData.selectedValue.join(", ")) ||
                "Select"}
            </span>
          }
          buttonClassName={`${
            darkmode
              ? " border border-slate-400/30 text-[#F4F4F5] "
              : " border border-slate-400/30 text-black "
          } w-[100px]`}
          selectedKey={
            new Set(
              editedValues[path + "." + "selectedValue"] ??
                newData.selectedValue
            )
          }
          handleSelectedKey={(e) => {
            functionality("update", path + "." + "selectedValue", {
              value: Array.from(e),
            });
          }}
          selectionMode="multiple"
          items={
            newData.selectionList && newData.selectionList.length > 0
              ? newData.selectionList.map((item, index) => {
                  return {
                    label: item,
                    value: item,
                    key: item,
                  };
                })
              : []
          }
        />
      </div>
    );
  }

  if (
    newData &&
    Object.keys(newData).length > 0 &&
    !newData.hasOwnProperty("type")
  ) {
    return (
      <ul className="flex flex-col gap-2">
        {typeof newData === "object" && !Array.isArray(newData) ? (
          <>
            {Object.keys(newData) &&
              Object.keys(newData).length > 0 &&
              Object.keys(newData)?.map((key) => {
                if (typeof newData[key] == "object") {
                  return (
                    <li key={key} className="flex flex-row gap-2">
                      <label className={darkmode ? "text-white" : "text-black"}>
                        {key}:
                      </label>
                      <Tableuidecider
                        key={key}
                        data={newData[key]}
                        path={path + "." + key}
                      />
                    </li>
                  );
                }
                if (Array.isArray(newData[key])) {
                  return (
                    <li key={key} className="flex flex-row gap-2">
                      <Tableui
                        ArrayJson={newData[key]}
                        functionality={functionality}
                      />
                    </li>
                  );
                }
                return (
                  <div key={key}>
                    <CustomInput
                      keyJson={keyJson}
                      Objkey={key}
                      value={newData[key]}
                      path={path}
                    />
                  </div>
                );
              })}
          </>
        ) : (
          <li key={path} className="flex flex-row gap-2">
            <Tableui
              toogleFunctionality={false}
              ArrayJson={newData}
              functionality={functionality}
              path={path}
            />
          </li>
        )}
      </ul>
    );
  }

  if (
    newData &&
    Object.keys(newData).length > 0 &&
    newData.hasOwnProperty("type") &&
    newData?.type == "checkbox"
  ) {
    return (
      <div
        key={path + "." + "value"}
        className="flex justify-center items-center gap-2 mb-1"
      >
        <input
          key={path + "." + "value"}
          type="checkbox"
          className="  w-[20px] h-[20px] rounded-md transition-all duration-100 border-slate-500"
          defaultChecked={
            editedValues?.[path + "." + "value"] ?? newData?.value
          }
          onChange={(e) => {
            setEditedValues((prev) => ({
              ...prev,
              [path + "." + "value"]: e.target.checked,
            }));
            // functionality("update", path + "." + "value", {
            //   value: e.target.checked,
            // });
          }}
        />
        {newData.hasOwnProperty("label") && <label>{newData.label}</label>}
      </div>
    );
  }
}
