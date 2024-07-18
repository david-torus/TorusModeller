import React from 'react';
import { Calendar, Button, Heading,  CalendarGrid, CalendarGridHeader, CalendarHeaderCell, CalendarGridBody, CalendarCell } from 'react-aria-components'; // Adjust imports based on your actual components
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface TorusModularCalendarProps {
    ariaLabel: string;
}

const TorusModularCalendar: React.FC<TorusModularCalendarProps> = ({ ariaLabel }) => {
    return (
        <Calendar aria-label={ariaLabel} className="w-[100%]">
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
                        {(day: string) => (
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

export default TorusModularCalendar;
