import { Label } from "react-aria-components";
import TorusCheckBox from "./torusComponents/TorusCheckBox";
import TorusTimePicker, {
  TorusDatePicker,
} from "./torusComponents/TorusDate&TimePickers";
import TorusUnderLinedInput, {
  TorusFadedInput,
} from "./torusComponents/TorusInput";
import TorusModifiedInput from "./torusComponents/TorusInput";
import { useState } from "react";
import TorusRadio from "./torusComponents/TorusRadio";
import TorusButton from "./torusComponents/TorusButton";
import TorusModifiedInput1 from "./torusComponents/TorusInput";
import TorusInput from "./torusComponents/TorusInput";
import TorusDropDown from "./torusComponents/TorusDropDown";
import { BsClockHistory } from "react-icons/bs";
import TorusSelector from "./torusComponents/TorusSelector";

export default function SignIn() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleChange = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((val) => val !== value)
        : [...prev, value]
    );
  };

  const finalValues = {
    firstName,
    lastName,
  };

  const outPutFn = () => {
    console.log(finalValues);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-fuchsia-500 to-teal-300 flex justify-center items-center">
      <div className="w-[30%] flex flex-col items-center justify-start bg-slate-200 rounded-xl shadow-xl py-3">
        <h1 className="text-3xl font-bold text-center">Sign In Page</h1>

        <div className="w-[80%]  flex flex-col justify-center items">
          <TorusInput
            variant="bordered"
            label="Framerwork"
            labelColor="text-[#000000]/50"
            borderColor="[#000000]/50"
            outlineColor="torus-focus:ring-[#000000]/50"
            placeholder=""
            isDisabled={false}
            onChange={setLastName}
            radius="lg"
            width="xl"
            height="xl"
            textColor="text-[#000000]"
            bgColor="bg-[#FFFFFF]"
            value={"React-Aria"}
          />

          <div className="w-[100%] grid grid-cols-2 gap-2">
            <div className="grid grid-cols-1">
              <TorusInput
                variant="bordered"
                label="Framerwork version"
                labelColor="text-[#000000]/50"
                borderColor="[#000000]/50"
                outlineColor="torus-focus:ring-[#000000]/50"
                placeholder=""
                isDisabled={false}
                onChange={setLastName}
                radius="lg"
                width="xl"
                height="xl"
                textColor="text-[#000000]"
                bgColor="bg-[#FFFFFF]"
                value={"1.0.0"}
              />
            </div>
            <div className="grid grid-cols-1">
              <TorusInput
                variant="bordered"
                label="Component"
                labelColor="text-[#000000]/50"
                borderColor="[#000000]/50"
                outlineColor="torus-focus:ring-[#000000]/50"
                placeholder=""
                isDisabled={false}
                onChange={setLastName}
                radius="lg"
                width="xl"
                height="xl"
                textColor="text-[#000000]"
                bgColor="bg-[#FFFFFF]"
                value={"Input"}
              />
            </div>
          </div>

          <TorusDatePicker label="Date" slot="end" openBtn="true" />

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
          label="Type"
          />

          <TorusCheckBox
            marginT="mt-6"
            content={["Male", "Female", "Others"]}
            orientation="horizontal"
            label="Gender"
          />

          <TorusRadio
            content={[
              "Frontend developer",
              "Backend developer",
              "UI/UX designer",
              "Others",
            ]}
            marginT="mt-5"
            label="Select your profession"
          />

          <TorusDropDown title="Select your country" />

          <div className="w-[100%] flex justify-center items-center h-14 ">
            <TorusButton
              gap={"p-3"}
              Children="Submit"
              onPress={outPutFn}
              width={"full"}
              bgColor={"bg-fuchsia-500"}
              outlineColor="torus-hover:ring-fuchsia-500/50"
              radius="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
