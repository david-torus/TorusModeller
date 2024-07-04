import React from "react";
import {
  Button,
  OverlayArrow,
  Tooltip,
  TooltipTrigger,
} from "react-aria-components";
export default function TorusToolTip({
  hoverContent,
  tooltipContent
}) {
  return (
    <TooltipTrigger>
      <Button>{hoverContent}</Button>
      <Tooltip>
       
        {tooltipContent}
      </Tooltip>
    </TooltipTrigger>
  );
}
