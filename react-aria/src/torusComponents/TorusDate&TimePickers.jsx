import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateField,
  DateInput,
  DatePicker,
  DateRangePicker,
  DateSegment,
  Dialog,
  DialogTrigger,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
  TimeField,
} from "react-aria-components";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { FaCaretDown, FaClock } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SlCalender, SlClock } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import TorusButton from "./TorusButton";
import { merger } from "../utils/utils";
import { BsClockHistory } from "react-icons/bs";

const defaultTropdownClassNames = {
  buttonClassName: `torus-pressed:animate-torusButtonActive 
  `,
  popoverClassName:
    "torus-entering:animate-torusPopOverOpen torus-exiting:animate-torusPopOverClose w-40",
  dialogClassName: "outline-none w-full",
  listBoxClassName:
    "w-full bg-slate-200 border-2 border-gray-300 transition-all p-1 rounded-md gap-1 flex flex-col items-center",
  listBoxItemClassName:
    "p-1 w-full torus-focus:outline-none torus-hover:bg-blue-300 rounded-md cursor-pointer transition-colors duration-300",
};

const TorusCalendar = (props) => {
  return (
    <Calendar aria-label="Appointment date " className="w-[100%]">
      <header className="flex justify-center w-[100%]">
        <div className="flex justify-between gap-2 w-[100%]">
          <Button
            slot="previous"
            className={
              "bg-[#F4F5FA] p-[3px] rounded-md torus-focus:border-transparent torus-pressed:border-transparent"
            }
          >
            <IoChevronBack size={15} color="#64748B" />
          </Button>
          <Heading className="text-center font-semibold" />
          <Button
            slot="next"
            className={
              "bg-[#F4F5FA] p-[3px] rounded-md torus-focus:border-transparent torus-pressed:border-transparent"
            }
          >
            <IoChevronForward size={15} color="#64748B" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-9 justify-between mt-2">
        <div className="  col-span-3 flex justify-center items-center ">
          <div className=" bg-[#F4F5FA] flex justify-center items-center rounded-sm text-xs whitespace-nowrap px-2 py-1">
            3 months Ago
          </div>
        </div>
        <div className="  col-span-3 flex justify-center items-center ">
          <div className=" bg-[#F4F5FA] flex justify-center items-center rounded-sm text-xs whitespace-nowrap px-2 py-1">
            6 months Ago
          </div>
        </div>
        <div className="  col-span-3 flex justify-center items-center ">
          <div className=" bg-[#F4F5FA] flex justify-center items-center rounded-sm text-xs whitespace-nowrap px-2 py-1">
            1 year Ago
          </div>
        </div>
      </div>

      <hr className="mt-4" />

      <div className="mt-4 flex justify-center items-center">
        <CalendarGrid className="react-aria-CalendarGridHeader:font-thin">
          <CalendarGridHeader>
            {(day) => (
              <CalendarHeaderCell
                className="text-sm font-light"
                children={day}
              />
            )}
          </CalendarGridHeader>
          <CalendarGridBody className="w-full">
            {(date) => (
              <CalendarCell
                className={`w-9 h-9 flex border-transparent  items-center justify-center p-2 
                  torus-pressed:border-transparent
                  torus-hover:bg-blue-400 
                  torus-pressed:bg-blue-500
              torus-focus:border-transparent
               torus-focus:bg-[#0736C4]  
               torus-focus:text-white
             transition-all ease-in-out duration-300 data-[outside-visible-range]:text-[#D0D5DD] 
            text-base font-normal
             `}
                style={{
                  borderRadius: "10%",
                }}
                date={date}
              />
            )}
          </CalendarGridBody>
        </CalendarGrid>
      </div>
    </Calendar>
  );
};

const TorusDateField = (props) => {
  return (
    <DateInput
      className="flex justify-around gap-2 w-1/2 text-sm font-normal  torus-focus:outline-none  torus-focus:ring-1 torus-focus:ring-[#000000]/50
"
      slot={props.slot}
    >
      {(segment) => (
        <DateSegment
          className="torus-focus-within:border-transparent torus-focus:border-transparent torus-pressed:border-transparent"
          segment={segment}
        />
      )}
    </DateInput>
  );
};
export function TorusDatePicker({
  label,
  slot,
  openBtn,
  setValues,
  defaultValue,
}) {
  const [rotate, setRotate] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
    setRotate(!rotate);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
    setRotate(false);
  };

  return (
    <DatePicker onChange={setValues} defaultValue={defaultValue}>
      <div className="flex justify-start w-[100%]">
        <div
          className="w-full py-3 px-2 pl-[1rem]
 flex flex-col justify-between gap-0.5 items-center bg-white rounded-lg "
        >
          <div className="w-full flex justify-start">
            <Label className="text-start text-xs text-[#000000]/50">
              {label}
            </Label>
          </div>

          <Group className="flex justify-around gap-2 w-full">
            <div className="w-[50%]">
              <TorusDateField slot={slot} />
            </div>
            <div className="w-[50%] flex justify-end">
              {openBtn && (
                <Button
                  className="w-6 h-6 bg-transparent p-[3px] rounded-md flex justify-center items-center torus-focus:outline-none"
                  onClick={togglePopover}
                >
                  <SlCalender
                    size={15}
                    color="#1C274C"
                    className={`transition-all ease-in-out duration-150 
                    torus-pressed:border-transparent torus-focus:border-transparent
                    torus-focus:bg-blue-700 torus-focus:text-white
                 `}
                  />
                </Button>
              )}
            </div>
          </Group>
        </div>
      </div>

      {isPopoverOpen && openBtn && (
        <Popover className="py-5 flex-col items-center w-[20%] bg-[#FFFFFF] rounded-md shadow-xl flex justify-center px-3">
          <TorusCalendar />

          <div className="w-[80%] flex justify-center mt-4">
            <div className="w-[100%] flex justify-center">
              <div className="w-[50%] flex justify-center items-center">
                <button className="w-[100%] bg-transparent font-semibold p-[3px] rounded-md flex justify-center items-center">
                  {" "}
                  Cancel
                </button>
              </div>

              <div className="w-[50%] flex justify-center items-center">
                <button className="w-[100%] bg-blue-600 p-[3px] rounded-md flex justify-center items-center text-white">
                  Save
                </button>
              </div>
            </div>
          </div>
        </Popover>
      )}
    </DatePicker>
  );
}

const TorusDateRange = () => {
  return (
    <DateRangePicker>
      <div>
        <TorusDatePicker slot="start" />
        <TorusDatePicker slot="end" />
      </div>
    </DateRangePicker>
  );
};

const TorusDateRangePicker = () => {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <Group>
        <TorusDateRange />
        <Button>▼</Button>
      </Group>
      <Popover>
        <Dialog>
          <TorusCalendar />
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
};

const TorusRangeCalender = () => {
  return (
    <RangeCalendar aria-label="Trip dates">
      <header>
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>
      <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
    </RangeCalendar>
  );
};

const TorusTimeField = ({ slot, openBtn, label }) => {
  return (
    <TimeField>
      <div className="w-full flex flex-col justify-start items-start">
        <DateInput className="w-full py-1 px-[0.5rem] flex justify-around gap-2">
          {(segment) => (
            <div className="flex justify-around gap-2 w-full py-1 px-[0.5rem]">
              <DateSegment
                className={
                  "data-[type='hour']:data-[focused]:bg-blue-500 data-[type='hour']:data-[focused]:text-white data-[type='hour']:data-[focused]:border-transparent data-[type='hour']:px-2 data-[type='hour']:py-1  data-[type='hour']:rounded-md  data-[type='minute']:data-[focused]:bg-blue-500 data-[type='minute']:data-[focused]:text-white data-[type='minute']:data-[focused]:border-transparent data-[type='minute']:px-2 data-[type='minute']:py-1  data-[type='minute']:rounded-md  data-[type='dayPeriod']:data-[focused]:bg-blue-500 data-[type='dayPeriod']:data-[focused]:text-white data-[type='dayPeriod']:data-[focused]:border-none data-[type='dayPeriod']:px-2 data-[type='dayPeriod']:py-1  data-[type='dayPeriod']:rounded-md  "
                }
                segment={segment}
              />
            </div>
          )}
        </DateInput>
      </div>
    </TimeField>
  );
};

const TorusTimePicker = ({ label }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState({
    hour: "06",
    minute: "28",
    second: "55",
    period: "PM",
  });

  const [visibleHours, setVisibleHours] = useState(8);
  const [visibleMinutes, setVisibleMinutes] = useState(8);
  const [visibleSeconds, setVisibleSeconds] = useState(8);

  const togglePopover = () => {
    setIsPopoverOpen((prevIsPopoverOpen) => !prevIsPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleTimeSelect = (type, value) => {
    setSelectedTime((prev) => ({ ...prev, [type]: value }));
  };

  const handleScroll = (e, type) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (type === "hour") setVisibleHours((prev) => Math.min(prev + 3, 12));
      else if (type === "minute")
        setVisibleMinutes((prev) => Math.min(prev + 3, 60));
      else if (type === "second")
        setVisibleSeconds((prev) => Math.min(prev + 3, 60));
    }
  };

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const seconds = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const meridiem = ["AM", "PM"];

  useEffect(() => {
    if (isPopoverOpen) {
      const hoursContainer = document.getElementById("hoursContainer");
      const minutesContainer = document.getElementById("minutesContainer");
      const secondsContainer = document.getElementById("secondsContainer");

      if (hoursContainer) {
        const selectedIndex = hours.indexOf(selectedTime.hour);
        const centerPosition = selectedIndex * 36;
        hoursContainer.scrollTop =
          centerPosition - hoursContainer.clientHeight / 2 + 18;
      }
      if (minutesContainer) {
        const selectedIndex = minutes.indexOf(selectedTime.minute);
        const centerPosition = selectedIndex * 36;
        minutesContainer.scrollTop =
          centerPosition - minutesContainer.clientHeight / 2 + 18;
      }
      if (secondsContainer) {
        const selectedIndex = seconds.indexOf(selectedTime.second);
        const centerPosition = selectedIndex * 36;
        secondsContainer.scrollTop =
          centerPosition - secondsContainer.clientHeight / 2 + 18;
      }
    }
  }, [isPopoverOpen, selectedTime, hours, minutes, seconds]);

  return (
    <div className="flex flex-col items-start">
      <label className="mb-2">{label}</label>
      <div className="relative">
        <button
          className="w-full p-2 border rounded bg-blue-600 text-white flex items-center justify-center"
          onClick={togglePopover}
        >
          <BsClockHistory size={18} />
        </button>
        {isPopoverOpen && (
          <div className="absolute z-10 mt-2 w-80 bg-white border rounded shadow-lg">
            <div className="p-4">
              <p className="text-center font-semibold mb-4">Select Time</p>
              <div className="grid grid-cols-4 gap-2">
                <div
                  className="h-40 overflow-y-scroll scrollbar-hide"
                  id="hoursContainer"
                  onScroll={(e) => handleScroll(e, "hour")}
                >
                  {hours.slice(0, visibleHours).map((hr) => (
                    <div
                      key={hr}
                      className={`py-1 text-center cursor-pointer ${
                        hr === selectedTime.hour ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleTimeSelect("hour", hr)}
                    >
                      {hr}
                    </div>
                  ))}
                </div>
                <div class="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 pointer-events-none border border-blue-600"></div>
                <div class="absolute top-1/3 left-0 right-0 transform -translate-y-1/2 pointer-events-none border border-blue-600"></div>
                <div
                  className="h-40 overflow-y-scroll scrollbar-hide relative"
                  id="minutesContainer"
                  onScroll={(e) => handleScroll(e, "minute")}
                >
                  {minutes.slice(0, visibleMinutes).map((min) => (
                    <div
                      key={min}
                      className={`py-1 text-center cursor-pointer ${
                        min === selectedTime.minute ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleTimeSelect("minute", min)}
                    >
                      {min}
                    </div>
                  ))}
                </div>

                <div
                  className="h-40 overflow-y-scroll scrollbar-hide relative"
                  id="secondsContainer"
                  onScroll={(e) => handleScroll(e, "second")}
                >
                  {seconds.slice(0, visibleSeconds).map((sec) => (
                    <div
                      key={sec}
                      className={`py-1 text-center cursor-pointer ${
                        sec === selectedTime.second ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleTimeSelect("second", sec)}
                    >
                      {sec}
                    </div>
                  ))}
                </div>

                <div className="h-40 overflow-y-scroll scrollbar-hide">
                  {meridiem.map((md) => (
                    <div
                      key={md}
                      className={`py-1 text-center cursor-pointer ${
                        md === selectedTime.period ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleTimeSelect("period", md)}
                    >
                      {md}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={closePopover}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TorusTimePicker;
