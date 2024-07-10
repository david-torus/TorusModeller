import { Label } from "react-aria-components";
import TorusCheckBox from "./torusComponents/TorusCheckBox";
import TorusTimePicker, {
  TorusDatePicker,
} from "./torusComponents/TorusDate&TimePickers";
import TorusUnderLinedInput, {
  TorusFadedInput,
} from "./torusComponents/TorusInput";
import TorusModifiedInput from "./torusComponents/TorusInput";
import { useEffect, useState } from "react";
import TorusRadio from "./torusComponents/TorusRadio";
import TorusButton from "./torusComponents/TorusButton";
import TorusModifiedInput1 from "./torusComponents/TorusInput";
import TorusInput from "./torusComponents/TorusInput";
import TorusDropDown from "./torusComponents/TorusDropDown";
import { BsClockHistory } from "react-icons/bs";
import TorusSelector from "./torusComponents/TorusSelector";
import TorusSwitch from "./torusComponents/TorusSwitch";
import { FaTextHeight, FaWeight } from "react-icons/fa";
import { FaHouseFloodWaterCircleArrowRight } from "react-icons/fa6";

export default function SignIn() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [fullName, setFullName] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [checked, setChecked] = useState(false);
  const [selector, setSelector] = useState(new Set([]));
  const [checkboxValues, setCheckboxValues] = useState("");
  const [radioValues, setRadioValues] = useState("");

  const handleChange = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((val) => val !== value)
        : [...prev, value]
    );
  };

 

  const finalValues = {
    fullName,
    height,
    weight,
    selector,
    checkboxValues,
    checked,
    radioValues
  };

  const outPutFn = () => {
    console.log(finalValues);
  };


  return (
    <div className="w-full  flex-col h-screen bg-gradient-to-tr from-fuchsia-500 to-teal-300 flex justify-center items-center">
      <h1 className="text-3xl font-bold text-center">Sign In Page</h1>
      <div className="w-[30%] flex flex-col items-center justify-start bg-slate-200 rounded-xl shadow-xl py-3 overflow-y-scroll scrollbar-hide">
        <div className="w-[80%]  flex flex-col justify-center items">
          <TorusInput
            variant="bordered"
            label="Full Name"
            labelColor="text-[#000000]/50"
            borderColor="[#000000]/50"
            outlineColor="torus-focus:ring-[#000000]/50"
            placeholder=""
            isDisabled={false}
            onChange={setFullName}
            radius="lg"
            width="xl"
            height="xl"
            textColor="text-[#000000]"
            bgColor="bg-[#FFFFFF]"
            value={fullName}
            type="text"
          />

          <div className="w-[100%] grid grid-cols-2 gap-2">
            <div className="grid grid-cols-1">
              <TorusInput
                variant="bordered"
                label="Height"
                labelColor="text-[#000000]/50"
                borderColor="[#000000]/50"
                outlineColor="torus-focus:ring-[#000000]/50"
                placeholder=""
                isDisabled={false}
                onChange={setHeight}
                radius="lg"
                width="xl"
                height="xl"
                textColor="text-[#000000]"
                bgColor="bg-[#FFFFFF]"
                value={height}
                type="number"
                endContent={
                  <FaHouseFloodWaterCircleArrowRight
                    size={15}
                    color="[#000000]"
                  />
                }
              />
            </div>
            <div className="grid grid-cols-1">
              <TorusInput
                variant="bordered"
                label="Weight"
                labelColor="text-[#000000]/50"
                borderColor="[#000000]/50"
                outlineColor="torus-focus:ring-[#000000]/50"
                placeholder=""
                isDisabled={false}
                onChange={setWeight}
                radius="lg"
                width="xl"
                height="xl"
                textColor="text-[#000000]"
                bgColor="bg-[#FFFFFF]"
                value={weight}
                type="number"
                startContent={<FaWeight size={15} color="[#000000]" />}
              />
            </div>
          </div>

          <TorusDatePicker label="Date of Birth" slot="end" openBtn="true" />

          {/* <TorusTimePicker
            label="Time"
            slot="end"
            openBtn="true"
            classNames={{
              buttonClassName:
                " bg-white dark:bg-[#262626] flex items-center justify-center  rounded-md font-semibold   w-[30px] h-[24px] torus-pressed:animate-torusButtonActive ",
            }}
            fontStyle={
              "font-sfpromedium  3xl:text-xs  3xl:font-medium xl:text-sm xl:font-[400] tracking-tighter"
            }
            gap={"px-[15px]"}
          /> */}

          <TorusSelector
            items={[
              { key: " String", label: " String" },
              { key: " Boolean", label: " Boolean" },
              { key: " Number", label: " Number" },
              { key: " Array", label: " Array" },
              { key: " Object", label: " Object" },
            ]}
            label="Type"
            marginT="mt-5"
            selected={selector}
            setSelected={setSelector}
            key={selector}
          />

          <TorusCheckBox
            marginT="mt-6"
            content={[
              "Frontend developer",
              "Backend developer",
              "UI/UX designer",
              "Bussiness analyst",
              "Data analyst",
              "Data scienntist",
              "Others",
            ]}
            orientation="horizontal"
            label="Professions"
            value={checkboxValues}
            onChange={setCheckboxValues}
          />

          <TorusRadio
            content={["True", "False", "Null"]}
            marginT="mt-5"
            label="Defaults"
            value={radioValues}
            onChange={setRadioValues}
            key={radioValues}
          />

          <div className="w-[100%] flex flex-col justify-center items-center mt-5  gap-0.5 bg-white rounded-md px-2 py-3">
            <h2 className="w-[100%] text-xs text-[#000000]/50">Defaults</h2>

            <div className="w-[100%] flex items-center ">
              <div className="w-[80%] flex justify-start">
                {!checked ? (
                  <p className="text-sm text-[#000000]">Unchecked</p>
                ) : (
                  <p className="text-sm text-[#000000]">Checked</p>
                )}
              </div>
              <div className="w-[20%] flex justify-end">
                <TorusSwitch
                  label={"Remember me"}
                  isChecked={checked}
                  setIsChecked={setChecked}
                />
              </div>
            </div>
          </div>

          <div className="w-[100%] flex justify-center items-center h-14 ">
            <TorusButton
              Children="Submit"
              onPress={outPutFn}
              width={"full"}
              btncolor={"bg-fuchsia-500"}
              outlineColor="torus-hover:ring-fuchsia-500/50"
              radius={"lg"}
              pressFunc={outPutFn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
