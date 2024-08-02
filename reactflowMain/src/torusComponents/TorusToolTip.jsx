import React from "react";
import {
  Button,
  OverlayArrow,
  Tooltip,
  TooltipTrigger,
} from "react-aria-components";
export default function TorusToolTip({
  hoverContent,
  tooltipContent,
  color,
  setShowObj,
  setActiveTab,
  setPath,
  fg,
  ele,
  tooltipFor,
  setLabel,
  setCheckActivestatus,
  obj,
  setExpandedItem
}) {
  return (
    <TooltipTrigger className="">
      <Button
        onPress={()=>{
          if (tooltipFor === "arr") {
            setShowObj(fg);
            setActiveTab(fg);
            setPath(fg);
            setLabel(tooltipContent)
            setCheckActivestatus(obj)
            setExpandedItem([])
        } else if (tooltipFor === "obj") {
            setShowObj(ele);
            setActiveTab(ele);
            setPath(ele);
            setLabel(tooltipContent)
        }

        }
         
        }
        className="border-none outline-none"
      >
        {hoverContent}
      </Button>
      <Tooltip
        style={{ backgroundColor: color }}
        className={
          " px-3 py-1   rounded-lg shadow-sm mb-2 text-white font-bold"
        }
      >
        <OverlayArrow>
          <svg width={8} height={8} viewBox="0 0 8 8">
            <path d="M0 0 L4 4 L8 0" fill={color} />
          </svg>
        </OverlayArrow>
        {tooltipContent}
      </Tooltip>
    </TooltipTrigger>
  );
}
