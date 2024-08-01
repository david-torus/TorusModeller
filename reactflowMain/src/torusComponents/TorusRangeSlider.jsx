import React, { useState, useEffect } from "react";
// import './index.css'; // Import your Tailwind CSS file

const TorusRangeSlider = ({ orientation ,sliderValue,setSliderValue,keys }) => {

  useEffect(() => {
    applyFill(sliderValue);
  }, [sliderValue]);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const applyFill = (value) => {
    const slider = document.getElementById("slider");
    const percentage = (100 * (value - slider.min)) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, #0B1EDF ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage + 0.1}%)`;
    slider.style.background = bg;
  };

  return (
    <div
      className={`"flex w-full items-center  justify-center 
    ${orientation === "vertical" ? "rotate-[-90deg]" : ""}`}
        
    >
      <div className="relative flex h-[100%] w-full items-center justify-center rounded-lg">
        {/* <div className="absolute top-0 left-2 text-white text-sm font-bold">4</div>
        <div className="absolute top-0 right-2 text-white text-sm font-bold">32</div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-bold">
          length: <span>{sliderValue}</span>
        </div> */}
        <input
          id="slider"
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className={` "appearance-none 
          h-1  w-full cursor-pointer appearance-none rounded-lg
          
          bg-transparent outline-none 
          [&::-webkit-slider-runnable-track]:rounded-full 
          [&::-webkit-slider-runnable-track]:bg-transparent
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-[#0736C4]
          [&::-webkit-slider-thumb]:torus-pressed:ring-1 
          [&::-webkit-slider-thumb]:torus-pressed:ring-[#0736C4]
          [&::-webkit-slider-thumb]:torus-pressed:ring-offset-1
          [&::-webkit-slider-thumb]:torus-pressed:ring-offset-[#0736C4]
          [&::-webkit-slider-thumb]:torus-focus:ring-1
          [&::-webkit-slider-thumb]:torus-focus:ring-[#0736C4]
          [&::-webkit-slider-thumb]:torus-focus:ring-offset-1
          [&::-webkit-slider-thumb]:torus-focus:ring-offset-[#0736C4]
          `}
          key={keys}
        />
      </div>
    </div>
  );
};

export default TorusRangeSlider;
