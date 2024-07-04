import React from "react";
import {
  Button,
  OverlayArrow,
  Tooltip,
  TooltipTrigger,
} from "react-aria-components";
export default function TorusToolTip({
    
}) {
  return (
    <TooltipTrigger>
      <Button>✏️</Button>
      <Tooltip>
        <OverlayArrow>
          <svg width={8} height={8} viewBox="0 0 8 8">
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        Edit
      </Tooltip>
    </TooltipTrigger>
  );
}
