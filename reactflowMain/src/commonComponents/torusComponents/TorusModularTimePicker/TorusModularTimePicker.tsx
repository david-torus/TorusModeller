import React, { useState, useEffect } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import TorusModularTimeField from './TorusModularTimeField.tsx';

interface TorusModularTimePickerProps {
    label: string;
}

const TorusModularTimePicker: React.FC<TorusModularTimePickerProps> = ({ label }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState({
        hour: "06",
        minute: "28",
        second: "55",
        period: "PM",
    });

    const [visibleHours, setVisibleHours] = useState<string[]>([]);
    const [visibleMinutes, setVisibleMinutes] = useState<string[]>([]);
    const [visibleSeconds, setVisibleSeconds] = useState<string[]>([]);

    const [hourIndex, setHourIndex] = useState(0);
    const [minuteIndex, setMinuteIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(0);

    const [hrsDiv, setHrsDiv] = useState(false);
    const [minsDiv, setMinsDiv] = useState(false);
    const [secDiv, setSecDiv] = useState(false);

    const hours =["01","02","03","04","05","06","07","08","09","10","11","12"];
    const minutes = Array.from({ length: 60 }, (_, i) => String(i + 1).padStart(2, "0"));
    const seconds = Array.from({ length: 60 }, (_, i) => String(i + 1).padStart(2, "0"));
    const meridiem = ["AM", "PM"];

    useEffect(() => {
        setVisibleHours(hours.slice(0, 3));
        setVisibleMinutes(minutes.slice(0, 3));
        setVisibleSeconds(seconds.slice(0, 3));
    }, []);

    const togglePopover = () => {
        setIsPopoverOpen(prevIsPopoverOpen => !prevIsPopoverOpen);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    const handleTimeSelect = (type: string, value: string) => {
        setSelectedTime(prev => ({ ...prev, [type]: value }));
    };

    const handleScroll = (type: string, direction: 'up' | 'down') => {
        let newIndex;
        const increment = direction === 'up' ? -1 : 1;
    
        if (type === "hour") {
            newIndex = (hourIndex + increment + hours.length) % hours.length;
            setHourIndex(newIndex);
            setVisibleHours(hours.slice(newIndex, newIndex + 3));
        } else if (type === "minute") {
            newIndex = (minuteIndex + increment + minutes.length) % minutes.length;
            setMinuteIndex(newIndex);
            setVisibleMinutes(minutes.slice(newIndex, newIndex + 3));
        } else if (type === "second") {
            newIndex = (secondIndex + increment + seconds.length) % seconds.length;
            setSecondIndex(newIndex);
            setVisibleSeconds(seconds.slice(newIndex, newIndex + 3));
        }
    };

    return (
        <div className="flex justify-between items-center">
            <div>
                {/* Replace TorusModularTimeField with your actual component */}
                <TorusModularTimeField slot="" openBtn={true} label={label} values={selectedTime} />
            </div>
            <div className="relative">
                <button
                    className="w-full p-2 border rounded bg-blue-600 text-white flex items-center justify-center"
                    onClick={togglePopover}
                >
                    <BsClockHistory size={18} />
                </button>
                {isPopoverOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-80 bg-white border rounded shadow-lg">
                        <div className="p-4">
                            <p className="text-center font-semibold mb-4">Select Time</p>
                            <div className="grid grid-cols-4 gap-2">
                                <div
                                    className="overflow-hidden flex flex-col justify-around items-center"
                                    id="hoursContainer"
                                    onMouseEnter={() => setHrsDiv(true)}
                                    onMouseLeave={() => setHrsDiv(false)}
                                >
                                    <button
                                        className={` ${hrsDiv ? "block" : "hidden"} bg-gray-200 hover:bg-gray-300 z-20`}
                                        onClick={() => handleScroll("hour", 'up')}
                                    >
                                        ▲
                                    </button>
                                    <div className="overflow-y-scroll scrollbar-hide" style={{ height: "6rem" }}>
                                        {visibleHours.map((hr, index) => (
                                            <div
                                                key={index}
                                                className={`py-1 text-center cursor-pointer ${hr === selectedTime.hour ? "bg-blue-200" : ""}`}
                                                onClick={() => handleTimeSelect("hour", hr)}
                                                style={{ fontWeight: index === 1 ? "bold" : "normal", backgroundColor: index === 1 ? "#f0f0f0" : "transparent" }}
                                            >
                                                {visibleHours[index]}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className={` ${hrsDiv ? "block" : "hidden"} bg-gray-200 hover:bg-gray-300 z-20`}
                                        onClick={() => handleScroll("hour", 'down')}
                                    >
                                        ▼
                                    </button>
                                </div>

                                <div
                                    className="overflow-hidden flex flex-col justify-around items-center"
                                    id="minutesContainer"
                                    onMouseEnter={() => setMinsDiv(true)}
                                    onMouseLeave={() => setMinsDiv(false)}
                                >
                                    <button
                                        className={`${minsDiv ? "block" : "hidden"} bg-gray-200 hover:bg-gray-300 z-20`}
                                        onClick={() => handleScroll("minute", 'up')}
                                    >
                                        ▲
                                    </button>
                                    <div className="overflow-y-scroll scrollbar-hide" style={{ height: "6rem" }}>
                                        {visibleMinutes.map((min, index) => (
                                            <div
                                                key={min}
                                                className={`py-1 text-center cursor-pointer ${min === selectedTime.minute ? "bg-blue-200" : ""}`}
                                                onClick={() => handleTimeSelect("minute", min)}
                                                style={{ fontWeight: index === 1 ? "bold" : "normal", backgroundColor: index === 1 ? "#f0f0f0" : "transparent" }}
                                            >
                                                {min}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className={`${minsDiv ? "block" : "hidden"} bg-gray-200 hover:bg-gray-300 z-20`}
                                        onClick={() => handleScroll("minute", 'down')}
                                    >
                                        ▼
                                    </button>
                                </div>

                                <div
                                    className="overflow-hidden flex flex-col justify-around items-center"
                                    id="secondsContainer"
                                    onMouseEnter={() => setSecDiv(true)}
                                    onMouseLeave={() => setSecDiv(false)}
                                >
                                    <button
                                        className={` ${secDiv ? "block" : "hidden"} bg-gray-200 hover:bg-gray-300 z-20`}
                                        onClick={() => handleScroll("second", 'up')}
                                    >
                                        ▲
                                    </button>
                                    <div className="overflow-y-scroll scrollbar-hide" style={{ height: "6rem" }}>
                                        {visibleSeconds.map((sec, index) => (
                                            <div
                                                key={sec}
                                                className={`py-1 text-center cursor-pointer ${sec === selectedTime.second ? "bg-blue-200" : ""}`}
                                                onClick={() => handleTimeSelect("second", sec)}
                                                style={{ fontWeight: index === 1 ? "bold" : "normal", backgroundColor: index === 1 ? "#f0f0f0" : "transparent" }}
                                            >
                                                {sec}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className={` ${secDiv ? "block" : "hidden"} bg-gray-200 hover:bg-gray-300 z-20`}
                                        onClick={() => handleScroll("second", 'down')}
                                    >
                                        ▼
                                    </button>
                                </div>

                                <div className="overflow-y-scroll scrollbar-hide flex flex-col justify-center items-center" style={{ height: "6rem" }}>
                                    {meridiem.map((md) => (
                                        <div
                                            key={md}
                                            className={`py-1 text-center cursor-pointer ${md === selectedTime.period ? "bg-blue-200" : ""}`}
                                            onClick={() => handleTimeSelect("period", md)}
                                        >
                                            {md}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={closePopover}>
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

export default TorusModularTimePicker;
