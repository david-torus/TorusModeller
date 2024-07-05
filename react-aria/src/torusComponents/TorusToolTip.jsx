import React from "react";
import {
  Button,
  OverlayArrow,
  Tooltip,
  TooltipTrigger,
} from "react-aria-components";
export default function TorusToolTip({ hoverContent, tooltipContent , color }) {
  return (
    <TooltipTrigger className="">
      <Button>{hoverContent}</Button>
      <Tooltip
      style={{ backgroundColor: color }}
        className={
          " px-3 py-1   rounded-lg shadow-sm mb-2 text-white font-bold"
        }
      >
        <OverlayArrow>
          <svg width={8} height={8} viewBox="0 0 8 8">
            <path d="M0 0 L4 4 L8 0" fill={color}/>
          </svg>
        </OverlayArrow>
        {tooltipContent}
      </Tooltip>
    </TooltipTrigger>
  );
}
