import React, { useState, useEffect } from 'react';
import { TimeField, DateInput, DateSegment } from 'react-aria-components'; // Adjust imports based on your actual components
import { BsClockHistory } from 'react-icons/bs'; // Adjust imports based on your actual components

interface TorusModularTimeFieldProps {
    slot: string;
    openBtn?: boolean;
    label?: string;
    values?: object;
}

const TorusModularTimeField: React.FC<TorusModularTimeFieldProps> = ({ slot, openBtn, label,values }) => {
    return (
        <TimeField>
            <div className="w-full flex flex-col justify-start items-start">
                <DateInput className="w-full py-1 px-[0.5rem] flex justify-around gap-2">
                    {(segment) => (
                        <div className="flex justify-around gap-2 w-full py-1 px-[0.5rem]">
                            <DateSegment
                                className={
                                    "data-[type='hour']:data-[focused]:bg-blue-500 data-[type='hour']:data-[focused]:text-white data-[type='hour']:data-[focused]:border-transparent data-[type='hour']:px-2 data-[type='hour']:py-1 data-[type='hour']:rounded-md data-[type='minute']:data-[focused]:bg-blue-500 data-[type='minute']:data-[focused]:text-white data-[type='minute']:data-[focused]:border-transparent data-[type='minute']:px-2 data-[type='minute']:py-1 data-[type='minute']:rounded-md data-[type='dayPeriod']:data-[focused]:bg-blue-500 data-[type='dayPeriod']:data-[focused]:text-white data-[type='dayPeriod']:data-[focused]:border-none data-[type='dayPeriod']:px-2 data-[type='dayPeriod']:py-1 data-[type='dayPeriod']:rounded-md"
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

export default TorusModularTimeField;