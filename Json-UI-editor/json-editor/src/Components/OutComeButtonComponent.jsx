import { Button } from "@nextui-org/react";
import React from "react";

export const OutComeButtonComponent = ({
    OutcomeList,
    selectedOutcome,
    setSelectedOutcome 
}) => {
  return (

 
        <div className="ml-2">
          {OutcomeList.map((item) => (
            <Button
              size="sm"
              radius="sm"
              className={` rounded-sm shadow-sm  ${
                item === selectedOutcome ? "bg-red-400" : "bg-slate-400/25"
              } `}
              onClick={() => setSelectedOutcome(item)}
            >
              {item}
            </Button>
          ))}
        </div>
    
    
  );
};
