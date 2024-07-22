import { Dialog } from "primereact/dialog";
import React, { useId, useState, useContext, useRef } from "react";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { BuilderContext } from "../../builder";
import { Toast } from "primereact/toast";
import ReusableInput from "../../../commonComponents/reusableComponents/ReusableInput";
import ReusableDropDown from "../../../commonComponents/reusableComponents/ReusableDropDown";
import { Button } from "@nextui-org/react";
import { IoMdCloseCircle } from "react-icons/io";

export const PopupAddElements = ({
  type = null,
  json,
  options,
  arrIndex = null,
  setVisble,
  visible,
  path,
}) => {
  const divkey = useId();
  const { functionality } = useContext(BuilderContext);

  const [keys, setKey] = useState(null);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(null);
  const [inputValues, setInputValues] = useState([""]);
  const [dropvalues, setDropValues] = useState([""]);
  const [radiovalues, setRadioValues] = useState([""]);
  const { darkMode } = useContext(DarkmodeContext);

  const toast = useRef(null);

  const handleObj = () => {
    try {
      if (keys && selected) {
        if (selected === "checkbox") {
          functionality("add", path, {
            key: keys ?? json.length,
            values: {
              type: selected,
              selectionChoice: inputValues,
              selectedChoices: [],
            },
          });
        }

        if (selected === "dropdown") {
          functionality("add", path, {
            key: keys ?? json.length,
            values: {
              type: selected,
              selectionList: dropvalues,
              selectedValue: "",
            },
          });
        }

        if (selected === "radio") {
          functionality("add", path, {
            key: keys ?? json.length,
            values: {
              type: selected,
              selectionRadioList: radiovalues,
              selectedRadioValue: "",
            },
          });
        }

        if (selected === "array") {
          functionality("add", path, {
            key: keys ?? json.length,
            values: [],
          });
        }
        if (selected === "object") {
          functionality("add", path, {
            key: keys ?? json.length,
            values: {},
          });
        }
        if (selected === "string") {
          functionality("add", path, {
            key: keys ?? Object.keys(json).length,
            values: value,
          });
        }
        if (selected === "number") {
          functionality("add", path, {
            key: keys ?? Object.keys(json).length,
            values: Number(value),
          });
        }
        if (selected === "input") {
          functionality("add", path, {
            key: keys ?? Object.keys(json).length,
            values: value,
          });
        }
        if (selected === "textarea") {
          functionality("add", path, {
            key: keys ?? Object.keys(json).length,
            values: {
              type: selected,
              values: value,
            },
          });
        }
        setSelected(null);
        setKey(null);
        setValue(null);
        setVisble(false);
      } else if (!keys && !selected && !value) {
        showErrorss("value");
      } else if (keys && !selected) {
        showErrorss("selected");
      } else if (!keys && selected && value) {
        showErrorss("Key");
      } else {
        showErrorss();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleArr = () => {
    try {
      if (selected) {
        functionality("add", path, {
          key: json.length,
          values:
            selected === "array" ? [] : selected === "object" ? {} : value,
        });
        setSelected(null);
        setKey(null);
        setValue(null);
        setVisble(false);
      } else if (!selected) {
        showErrorss("selected");
      } else {
        showErrorss();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (type, index, event) => {
    try {
      if (type === "dropdown") {
        const values = [...dropvalues];
        values[index] = event.target.value;
        setDropValues(values);
      }
      if (type === "radio") {
        const values = [...radiovalues];
        values[index] = event.target.value;
        setRadioValues(values);
      }
      if ((type = "checkbox")) {
        const values = [...inputValues];
        values[index] = event.target.value;
        setInputValues(values);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddInput = (type) => {
    try {
      if (type === "dropdown") {
        setDropValues([...dropvalues, ""]);
      }
      if (type === "radio") {
        setRadioValues([...radiovalues, ""]);
      }
      if (type === "checkbox") {
        setInputValues([...inputValues, ""]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveInput = (type, index) => {
    if (type === "dropdown") {
      const values = [...dropvalues];
      values.splice(index, 1);
      setDropValues(values);
    }
    if (type === "radio") {
      const values = [...radiovalues];
      values.splice(index, 1);
      setRadioValues(values);
    }
    if (type === "checkbox") {
      const values = [...inputValues];
      values.splice(index, 1);
      setInputValues(values);
    }
  };

  const showErrorss = (type) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail:
        type === "key"
          ? "Key should not be empty"
          : type === "value"
            ? "Value should not be empty"
            : type === "selected"
              ? "selected should not be empty"
              : "please select key and value",
      life: 3000,
    });
  };
  return (
    <Dialog
      className={
        darkMode
          ? `border-2 border-[#4b4b4b] shadow-lg rounded-md w-96 bg-[#363636]  backdrop-blur-sm min-h-[200px] max-h-[600px] `
          : `border-2 border-[#cfcfcf] shadow-lg rounded-md w-96 bg-[#ffffff]  backdrop-blur-sm min-h-[200px] max-h-[600px]`
      }
      header="Add Elements"
      headerStyle={{
        backgroundColor: darkMode ? "#363636" : "#E1E1E1",
        color: darkMode ? "white" : "black",
      }}
      contentStyle={{
        backgroundColor: darkMode ? "#363636" : "#E1E1E1",
      }}
      visible={visible}
      onHide={() => setVisble(false)}
    >
      <div className=" " key={divkey}>
        <Toast ref={toast} />
        <div
          className="mt-3 popupmode w-[88%] items-center justify-center m-auto "
          style={{
            display: "flex",
            flexDirection: "column",
            top: "0%",
            gap: "20px",
          }}
        >
          <div
            classname="inputcontainer"
            style={{
              display: type === "object" ? "block" : "none",
              // gap: "6px",
              // border: "1px solid #CCC",
              // borderRadius: "20px",
              // padding: "5px",
              width: "100%",
            }}
          >
            <ReusableInput
              type="text"
              key="Popupkey"
              label={"Key"}
              darkMode={darkMode}
              handleChange={(e) => setKey(e.target.value)}
              labelPlacement="outside"
              placeholder={"Enter Key"}
            />
          </div>

          <div
            style={{
              width: "100%",
            }}
          >
            <ReusableDropDown
              className="rounded-2xl "
              id="dropdown"
              selectionMode="single"
              darkMode={darkMode}
              buttonProps={{
                size: "xl",
                style: {
                  width: "100%",
                },
                radius: "sm",
              }}
              selectedKey={new Set([selected])}
              title={selected || "Select an Option"}
              handleSelectedKey={(e) => setSelected(Array.from(e)[0])}
              // style={{
              //   backgroundColor: darkMode ? "#363636" : "#ffffff ",
              //   color: darkMode ? "white" : "#999999",
              //   border: "none",
              //   minWidth: "100%",
              //   padding: "5px",
              //   boxShadow: "none",
              // }}
              items={
                options &&
                options.length > 0 &&
                options.map((option) => {
                  return { label: option.value, key: option.value };
                })
              }
            />
            {/* <option value="">Select an Option</option>
            {options &&
              options.length > 0 &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))} */}
          </div>

          {selected === "string" && (
            <div
              classname="inputcontainer"
              style={{
                width: "100%",
              }}
            >
              <ReusableInput
                key="popupString"
                darkMode={darkMode}
                defaultValue=""
                type="text"
                id="value"
                handleChange={(e) => setValue(e.target.value)}
                placeholder="Value"
              />
            </div>
          )}

          {selected === "input" && (
            <div
              classname="inputcontainer"
              style={{
                width: "100%",
              }}
            >
              <ReusableInput
                defaultValue=""
                key="popupInput"
                darkMode={darkMode}
                type="text"
                id="value"
                handleChange={(e) => setValue(e.target.value)}
                placeholder="Value"
              />
            </div>
          )}

          {selected === "textarea" && (
            <div
              classname="inputcontainer"
              style={{
                display: "flex",
                gap: "6px",
                border: "1px solid #CCC",
                borderRadius: "20px",
                padding: "5px",
                width: "100%",
              }}
            >
              <input
                className="rounded-2xl w-full"
                type="text"
                id="value"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Value"
                style={{
                  border: "none",
                  padding: "5px",
                  boxShadow: "none",
                  backgroundColor: darkMode ? "#363636" : "#ffffff",
                  color: "white",
                }}
              />
            </div>
          )}

          {selected === "number" && (
            <div
              classname="inputcontainer"
              style={{
                width: "100%",
              }}
            >
              <ReusableInput
                defaultValue={1}
                key={"popupNumber"}
                darkMode={darkMode}
                type="number"
                id="value"
                handleChange={(e) => setValue(e.target.value)}
                placeholder="Value"
              />
            </div>
          )}

          {selected === "dropdown" && (
            <>
              {dropvalues &&
                dropvalues.length > 0 &&
                dropvalues.map((value, index) => (
                  <div className="flex flex-row w-full" key={index}>
                    <div
                      classname="inputcontainer"
                      style={{
                        width: "100%",
                      }}
                    >
                      <ReusableInput
                        defaultValue={""}
                        key={index + "popupDropdown"}
                        darkMode={darkMode}
                        type="text"
                        id="key"
                        value={value}
                        placeholder="Value"
                        handleChange={(e) =>
                          handleInputChange("dropdown", index, e)
                        }
                        isClearable={false}
                        endContent={
                          <Button
                            size="sm"
                            isIconOnly
                            className="text-red-500/30 hover:text-red-500/80"
                            onClick={() => handleRemoveInput("dropdown", index)}
                            variant="outline"
                          >
                            <IoMdCloseCircle size={20} />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                ))}

              <button
                onClick={() => handleAddInput("dropdown")}
                className={
                  darkMode
                    ? `mr-56 text-white text-sm min-h-[30px] min-w-[90px]  p-2 rounded-xl font-bold  bg-[#363636] cursor-pointer
                  border border-gray-300/60 hover:bg-[#609AF8] `
                    : `mr-56 text-black text-sm min-h-[30px] min-w-[90px]  p-2 rounded-xl font-bold  bg-[#D3D3D3] cursor-pointer
                     border border-gray-300/60 `
                }
              >
                Add more
              </button>
            </>
          )}

          {selected === "checkbox" && (
            <>
              {inputValues &&
                inputValues.length > 0 &&
                inputValues.map((value, index) => (
                  <div className="flex flex-row w-full" key={index}>
                    <div
                      classname="inputcontainer"
                      style={{
                        width: "100%",
                      }}
                    >
                      <ReusableInput
                        defaultValue={""}
                        key={index + "popupCheckbox"}
                        darkMode={darkMode}
                        type="text"
                        id="key"
                        value={value}
                        placeholder="Value"
                        handleChange={(e) =>
                          handleInputChange("checkbox", index, e)
                        }
                        isClearable={false}
                        endContent={
                          <Button
                            size="sm"
                            isIconOnly
                            className="text-red-500/30 hover:text-red-500/80"
                            onClick={() => handleRemoveInput("checkbox", index)}
                            variant="outline"
                          >
                            <IoMdCloseCircle size={20} />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                ))}

              <button
                onClick={() => handleAddInput("checkbox")}
                className={
                  darkMode
                    ? `mr-56 text-white text-sm min-h-[30px] min-w-[90px]  p-2 rounded-xl font-bold  bg-[#363636] cursor-pointer
                   border border-gray-300/60 hover:bg-[#609AF8] `
                    : `mr-56 text-black text-sm min-h-[30px] min-w-[90px]  p-2 rounded-xl font-bold  bg-[#D3D3D3] cursor-pointer
                      border border-gray-300/60 `
                }
              >
                Add more
              </button>
            </>
          )}

          {selected === "radio" && (
            <>
              {radiovalues &&
                radiovalues.length > 0 &&
                radiovalues.map((value, index) => (
                  <div key={index}>
                    <div
                      classname="inputcontainer"
                      style={{
                        width: "100%",
                      }}
                    >
                      <ReusableInput
                        defaultValue={""}
                        key={index + "popupRadio"}
                        darkMode={darkMode}
                        type="text"
                        id="key"
                        value={value}
                        placeholder="Value"
                        handleChange={(e) =>
                          handleInputChange("radio", index, e)
                        }
                        isClearable={false}
                        endContent={
                          <Button
                            size="sm"
                            isIconOnly
                            className="text-red-500/30 hover:text-red-500/80"
                            onClick={() => handleRemoveInput("radio", index)}
                            variant="outline"
                          >
                            <IoMdCloseCircle size={20} />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                ))}

              <button
                onClick={() => handleAddInput("radio")}
                className="text-black"
              >
                Add more
              </button>
            </>
          )}

          {selected === "boolean" && <></>}

          <div className="model-buttons">
            <span
              className={
                darkMode
                  ? `ml-[265px] bg-[#363636] rounded-md cursor-pointer border text-white  border-gray-300/40 hover:bg-[#609AF8] transition-all duration-200`
                  : `ml-[265px] bg-[#D3D3D3] rounded-md cursor-pointer border text-gray-600  border-gray-300/40 hover:bg-[#609AF8] transition-all duration-200`
              }
              style={{
                borderRadius: "10px",
                padding: "5px",
                height: "10%",
              }}
              onClick={() => {
                if (type === "object") {
                  handleObj();
                }
                if (type === "array") {
                  handleArr();
                }
              }}
            >
              <span className=" min-h-[30px] min-w-[70px] p-3 font-bold">
                Save
              </span>
            </span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
