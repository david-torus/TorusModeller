import React, { useState } from 'react';
import { Label, Group, Button, Popover, DatePicker } from 'react-aria-components'; // Adjust imports based on your actual components
import { SlCalender } from 'react-icons/sl'; // Example import, adjust as needed
import TorusDateField from './TorusModularDateField.tsx'; // Adjust the path as needed
import TorusModularCalendar from './TorusModularCalender.tsx';

interface TorusModularDatePickerProps {
    label: string;
    slot: string;
    openBtn: boolean;
    setValues: (values: any) => void;
    defaultValue?: any;
}

const TorusModularDatePicker: React.FC<TorusModularDatePickerProps> = ({
    label,
    slot,
    openBtn,
    setValues,
    defaultValue,
}) => {
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
                <div className="w-full py-3 px-2 pl-[1rem] flex flex-col justify-between gap-0.5 items-center bg-white rounded-lg">
                    <div className="w-full flex justify-start">
                        <Label className="text-start text-xs text-[#000000]/50">{label}</Label>
                    </div>

                    <Group className="flex justify-around gap-2 w-full">
                        <div className="w-[50%]">
                            <TorusDateField slot={slot} />
                        </div>
                        <div className="w-[50%] flex justify-end">
                            {openBtn && (
                                <Button
                                    className="w-6 h-6 bg-transparent p-[3px] rounded-md flex justify-center items-center torus-focus:outline-none"
                                    onPress={togglePopover}
                                >
                                    <SlCalender
                                        size={15}
                                        color="#1C274C"
                                        className={`transition-all ease-in-out duration-150 
                    torus-pressed:border-transparent torus-focus:border-transparent
                    torus-focus:bg-blue-700 torus-focus:text-white`}
                                    />
                                </Button>
                            )}
                        </div>
                    </Group>
                </div>
            </div>

            {isPopoverOpen && openBtn && (
                <Popover className="py-5 flex-col items-center w-[20%] bg-[#FFFFFF] rounded-md shadow-xl flex justify-center px-3">
                    <TorusModularCalendar ariaLabel='Calendar' />
                    <div className="w-full flex justify-center mt-4">
                        <div className="w-[100%] flex justify-center">
                            <div className="w-[50%] flex justify-center items-center">
                                <button className="w-[100%] bg-transparent font-semibold p-[3px] rounded-md flex justify-center items-center">
                                    {' '}
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
};

export default TorusModularDatePicker;
