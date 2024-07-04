import { Label } from "react-aria-components";
import TorusCheckBox from "./torusComponents/TorusCheckBox";
import TorusDateTimePickers from "./torusComponents/TorusDate&TimePickers";
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
            label="testing"
            labelColor="text-fuchsia-600"
            borderColor="fuchsia-500/100"
            outlineColor="torus-focus:ring-fuchsia-500/50"
            placeholder=""
            isDisabled={false}
            onChange={setLastName}
            radius="lg"
            width="xl"
            height="xl"
            textColor="text-black"
            bgColor="bg-fuchsia-500/50"
          />

          <TorusInput
            variant="fade"
            label="testing"
            placeholder=""
            isDisabled={false}
            onChange={setLastName}
            width="full"
            height="xl"
            radius="lg"
            textColor="text-white"
            bgColor="bg-fuchsia-500/100"
            hoverColor="torus-hover:bg-fuchsia-500/50"
          />

          <TorusInput
            variant="underline"
            label="testing"
            labelColor="text-fuchsia-600"
            placeholder=""
            isDisabled={false}
            onChange={setLastName}
            width="full"
            height="xl"
            textColor="text-black"
            borderColor="torus-focus:border-b-fuchsia-600/50"
            marginT="mt-7"
          />

          <TorusDateTimePickers
            marginT="mt-6"
            openBtn={true}
            label="Date of Birth"
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
