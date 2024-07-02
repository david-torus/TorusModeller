import { Label } from "react-aria-components";
import TorusCheckBox from "./torusComponents/TorusCheckBox";
import TorusDateTimePickers from "./torusComponents/TorusDate&TimePickers";
import TorusUnderLinedInput from "./torusComponents/TorusInput";
import TorusModifiedInput from "./torusComponents/TorusInput";
import { useState } from "react";
import TorusRadio from "./torusComponents/TorusRadio";
import TorusButton from "./torusComponents/TorusButton";

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

  const finalValues= {
    firstName,
    lastName,

  }

  const outPutFn = () => {
    console.log(finalValues);
  }

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-fuchsia-500 to-teal-300 flex justify-center items-center">
      <div className="w-[30%] flex flex-col items-center justify-start bg-slate-200 rounded-xl shadow-xl py-3">
        <h1 className="text-3xl font-bold text-center">Sign In Page</h1>

        <div className="w-[80%]  flex flex-col justify-center items">
          <TorusUnderLinedInput
            label="First Name"
            placeholder="enter your First name"
            value=""
            marginT="mt-8"
            labelColor="text-teal-600"
            borderColor="torus-focus:border-b-teal-600/50"
            onChange={setFirstName}
            
          />

          <TorusUnderLinedInput
            label="Last Name"
            placeholder="enter your Last name"
            value=""
            marginT="mt-6"
            labelColor="text-teal-600"
            borderColor="torus-focus:border-b-teal-600/50"
            onChange={setLastName}
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
          

          <TorusButton gap={"p-3"} Children="Submit" marginT="mt-6" onPress={outPutFn} />
        </div>
      </div>
    </div>
  );
}
