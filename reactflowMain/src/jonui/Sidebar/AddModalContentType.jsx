import React from "react";
import TorusDropDown from "../../torusComponents/TorusDropDown";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import TorusInput from "../../torusComponents/TorusInput";

const AddTypes = ["input", "Dropdown", "object"];
export const AddModalContentType = ({
  close,
  obj,
  showObj,
  handleAddjs,
  type,
  path,
}) => {
  const [value, setValue] = useState(null);

  const [keyinput, setkeyinput] = useState(null);
  const [valueinput, setvalueinput] = useState(null);

  const handleAdd = (selectedValue) => {
    if (selectedValue == "input" && keyinput && valueinput) {
      handleAddjs(showObj, keyinput, valueinput, type, path,selectedValue);

      close();
    }
    if(selectedValue == "object" && keyinput){
      handleAddjs(showObj, keyinput, valueinput, type, path,selectedValue);
    }
  };

  console.log(obj, showObj, keyinput, valueinput, path, "df");
  return (
    <div className="mb-3 flex  h-[100%]  w-[100%] flex-col items-center rounded dark:bg-[#070707]">
      <p className="dark:text-white">Add key-values</p>
      <div className=" h-[80%] w-[50%] p-2">
        <div className="flex w-[100%] flex-col ">
          <TorusDropDown
            renderEmptyState={() => "No Items..."}
            classNames={{
              buttonClassName: `bg-white dark:bg-[#161616] w-[100%] h-[40px] text-black dark:text-white  mb-2`,
              listBoxClassName:
                "bg-white dark:bg-[#161616] text-black dark:text-white",
            }}
            title={
              <div className="flex w-[100%] flex-row  items-center">
                <div
                  className={
                    "font-sfpro w-[80%] whitespace-nowrap tracking-tighter text-black dark:text-white xl:text-sm xl:font-normal 3xl:text-sm"
                  }
                >
                  {value ? value : "Add Content Type"}
                </div>
                <div className="w-[10%]">
                  <IoIosArrowDown className="text-black dark:text-white" />
                </div>
              </div>
            }
            fontStyle={
              "font-plexsans 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
            }
            selected={value}
            setSelected={setValue}
            selectionMode="single"
            items={AddTypes.map((ele) => ({
              key: ele,
              label: ele,
            }))}
            btWidth={"md"}
          />
        </div>

        <div
          className=""
          style={{
            display:
              value && Array.from(value)[0] === "input" ? "block" : "none",
          }}
        >
          <TorusInput
            label="Key"
            variant="fade"
            labelColor="text-[#000000]/50"
            borderColor="[#000000]/50"
            isDisabled={false}
            onChange={(e) => {
              setkeyinput(e);
            }}
            radius="lg"
            width="md"
            height="md"
            textColor="text-[#000000] dark:text-[#FFFFFF]"
            bgColor="bg-[#FFFFFF] dark:bg-[#161616]"
            value={keyinput}
          />

          <TorusInput
            label="Value"
            variant="fade"
            labelColor="text-[#000000]/50"
            borderColor="[#000000]/50"
            placeholder=""
            isDisabled={false}
            onChange={(e) => {
              setvalueinput(e);
            }}
            radius="lg"
            width="md"
            height="md"
            textColor="text-[#000000] dark:text-[#FFFFFF]"
            bgColor="bg-[#FFFFFF] dark:bg-[#161616]"
            value={valueinput}
          />
        </div>

        <div
          className=""
          style={{
            display:
              value && Array.from(value)[0] === "object" ? "block" : "none",
          }}
        >
          <TorusInput
            label="Key"
            variant="fade"
            labelColor="text-[#000000]/50"
            borderColor="[#000000]/50"
            isDisabled={false}
            onChange={(e) => {
              setkeyinput(e);
            }}
            radius="lg"
            width="md"
            height="md"
            textColor="text-[#000000] dark:text-[#FFFFFF]"
            bgColor="bg-[#FFFFFF] dark:bg-[#161616]"
            value={keyinput}
          />

         
        </div>
      </div>
      <div className=" flex h-[20%] w-[100%] justify-around ">
        <div className="items-center">
          {value && (
            <button
              className="rounded-md bg-violet-600 px-3 py-1 dark:text-white"
              onClick={() => handleAdd(Array.from(value)[0])}
            >
              Add
            </button>
          )}
        </div>
        <div className="justify-end">
          <button
            className="rounded-md bg-violet-600  px-3 py-1 dark:text-white"
            onClick={close}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};
