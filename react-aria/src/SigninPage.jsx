import { Input, Label, TextField } from "react-aria-components";
import TorusCheckBox from "./torusComponents/TorusCheckBox";
import TorusTimePicker, {
  TorusDatePicker,
} from "./torusComponents/TorusDate&TimePickers";
import { parseDate } from "@internationalized/date";
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
import {
  FaSearch,
  FaSearchLocation,
  FaTextHeight,
  FaWeight,
} from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import {
  FaHouseFloodWaterCircleArrowRight,
  FaTicketSimple,
} from "react-icons/fa6";
import TorusSearch from "./torusComponents/TorusSearch";
import TorusPhoneNumberInput from "./torusComponents/TorusPhoneNumberInput";
import TorusModularInput from "./torusComponents/TorusModularInput.tsx";
import TorusTextArea from "./torusComponents/TorusModularTextArea.tsx";
import TorusModularTextArea from "./torusComponents/TorusModularTextArea.tsx";
import PortalDropdown from "./torusComponents/PortalDropdown.jsx";
import TorusModularDatePicker from "./torusComponents/TorusDatePicker/TorusModularDatePicker.tsx";
import TorusModularTimePicker from "./torusComponents/TorusModularTimePicker/TorusModularTimePicker.tsx";

export default function SignIn() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [modular, setModular] = useState("");
  const [fullName, setFullName] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState(parseDate("2022-01-01"));
  const [checked, setChecked] = useState(false);
  const [selector, setSelector] = useState(new Set([]));
  const [checkboxValues, setCheckboxValues] = useState("");
  const [radioValues, setRadioValues] = useState("");
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [textArea, setTextArea] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleTexAreaChange = (value) => {
    setTextValue(value);
  };

  const handleHeightChange = (height) => {
    console.log("TextArea height:", height);
  };

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
    date: { date: `${date.day}/${date.month}/${date.year}` },
    selector,
    checkboxValues,
    checked,
    radioValues,
    modular,
  };

  console.log(date, "date");

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

          <TorusDatePicker
            label="Date of Birth"
            slot="end"
            openBtn="true"
            setValues={setDate}
            defaultValue={date}
          />

          <TorusModularDatePicker
          label="Date of Birth"
          slot="end"
          openBtn="true"
          setValues={setDate}
          defaultValue={date}
          />

          <TorusModularTimePicker/>

          <TorusSearch
            variant="bordered"
            labelColor="text-[#000000]/50"
            borderColor="border-[#000000]/20"
            outlineColor="torus-focus:ring-[#000000]/50"
            placeholder="Search"
            isDisabled={false}
            onChange={setSearch}
            radius="lg"
            textColor="text-[#000000]"
            bgColor="bg-[#FFFFFF]"
            value={search}
            type="text"
            marginT="mt-3"
          />

          <TorusModularInput
            label="Enter Text"
            defaultValue="Initial Value" // Default value for the input
            value={inputValue}
            onChange={handleInputChange}
            isRequired={true} // This makes the field required
            maxLength={10} // Maximum length of the input
            type="text" // Type of the input
            placeholder="Type here..."
            bgColor="bg-transparent" // Background color
            borderColor="border-gray-500/30" // Border color
            labelColor="text-gray-400/60" // Label color
            textColor="text-black" // Text color
            radius="md" // Border radius
            size="sm" // Height of the input
            startContent={
              <span>
                <FaSearch size={15} color="#9CA3AF" />
              </span>
            } // Optional start content (like an icon)
            endContent={
              <span>
                <BsApple size={15} color="#9CA3AF" />
              </span>
            } // Optional end content (like an icon)
            isReadOnly={false} // Whether the input is read-only
            isDisabled={false} // Whether the input is disabled
            errorShown={true} // Whether to show error messages
            description="This is a hint text." // Description or help text
            isClearable={true} // Makes the input clearable
          />

          <TorusModularInput
            isRequired={true}
            isReadOnly={false}
            placeholder="Modular input"
            label="Input"
            variant="bordered"
            labelColor="text-[#000000]/50"
            borderColor="border-[#000000]/20"
            isDisabled={false}
            onChange={setModular}
            radius="lg"
            textColor="text-[#000000]"
            bgColor="bg-[#FFFFFF]"
            value={"this is value from state "}
            type="text"
            marginT="mt-3"
            startContent={<FaSearchLocation size={15} color="#9CA3AF" />}
            maxLength={20}
            discription="This is a hint text to help user."
            isClearable={true}
          />

          <TorusModularTextArea
            // Label for the TextArea
            label="Description"
            // Controlled value for the TextArea
            value={textValue}
            // Handler for value change
            onChange={handleTexAreaChange}
            // Placeholder text for the TextArea
            placeholder="Enter your text here"
            // Background color for the TextArea container
            bgColor="bg-gray-100"
            // Border color when the TextArea is focused or in an error state
            borderColor="border-blue-500"
            // Color of the label text
            labelColor="text-blue-500"
            // Color of the TextArea text
            textColor="text-gray-700"
            // Size of the TextArea (height)
            size="md"
            // Border radius of the TextArea container
            radius="md"
            // Top margin of the TextArea container
            marginT="mt-4"
            // Indicates if the TextArea is read-only
            isReadOnly={false}
            // Indicates if the TextArea is required
            isRequired={true}
            // Indicates if the TextArea is disabled
            isDisabled={false}
            // Indicates if the clear button should be shown
            isClearable={true}
            // Description text below the TextArea
            // description="Please provide a detailed description."
            // Enables automatic resizing of the TextArea based on content
            autoSize={true}
            // Handler for when the height of the TextArea changes
            onHeightChange={handleHeightChange}
            // Placement of the label (e.g., top, side)
            labelPlacement="top"
            // Indicates if the TextArea value is invalid (for validation purposes)
            isInvalid={textValue.length < 10}
          />

          <TorusPhoneNumberInput
            variant="bordered"
            labelColor="text-[#000000]/50"
            borderColor="border-[#000000]/20"
            outlineColor="torus-focus:ring-[#000000]/50"
            isDisabled={false}
            onChange={setSearch}
            radius="md"
            textColor="text-[#000000]"
            bgColor="bg-[#F4F5FA]"
            value={search}
            type="number"
            marginT="mt-3"
          />

          {/* <TorusSelector
            items={[
              { key: " String", label: " String" },
              { key: " Boolean", label: " Boolean" },
              { key: " Number", label: " Number" },
              { key: " Array", label: " Array" },
              { key: " Object", label: " Object" },
            ]}
            // label="Type"
            marginT="mt-5"
            selected={selector}
            setSelected={setSelector}
            key={selector}
            placeholder={"Select"}
          /> */}

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
            type="group"
          />

          <TorusRadio
            content={[
              "True",
              "False",
              "Backend developer",
              "UI/UX designer",
              "Bussiness analyst",
              "Data analyst",
              "Data scienntist",
              "Others",
            ]}
            marginT="mt-5"
            label="Defaults"
            value={radioValues}
            onChange={setRadioValues}
            key={radioValues}
            size="md"
            className=""
          />

          <TorusDropDown
            title={"None"}
            classNames={{
              buttonClassName:
                " bg-white dark:bg-[#262626] font-semibold torus-pressed:animate-torusButtonActive ",

              listBoxClassName: "bg-white text-black ",
            }}
            popOverProps={{ offset: 15 }}
            selectionMode="single"
            items={[
              { key: "v1", label: "v1" },
              { key: "v2", label: "v2" },
            ]}
            btncolor={"#D54CEE"}
            fontStyle={
              "font-inter 3xl:text-xs text-black  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
            }
            radius={"xl"}
            size={"lg"}
            
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
                <TorusSwitch isChecked={checked} setIsChecked={setChecked} />
              </div>
            </div>
          </div>

          <div className="w-[100%] flex justify-center items-center">
            <TorusButton
              Children="Submit"
              onPress={outPutFn}
              width={"full"}
              btncolor={"#D54CEE"}
              outlineColor="torus-hover:ring-fuchsia-500/50"
              radius={"lg"}
              pressFunc={outPutFn}
              color={"#000000"}
              gap={"py-4"}
              marginT="mt-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
