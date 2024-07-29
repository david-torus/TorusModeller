import { Button, Input } from "@nextui-org/react";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import React, { useContext, useEffect, useState } from "react";
import { JsonUiEditorContext } from "../Layout";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

export default function DecisionView({ setSelectedDecison, setDecision }) {
  const [firstLevelKeys, setFirstLevelkeys] = useState([]);
  const { json, setJson } = useContext(JsonUiEditorContext);
  const [decisionName, setDecisionName] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const addDecisionComponent = () => {
    // Create a deep clone of the json object
    const newJson = structuredClone(json);

    const targetKey = decisionName;

    if (newJson && targetKey) {
      newJson[targetKey] = {};

      setIsOpen(false);
      setDecisionName("");

      setJson((prev) => ({
        ...prev,
        ...newJson,
      }));
    }

    console.log(newJson, "DecisionView==>");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDecisionName(value);
  };

  useEffect(() => {
    setFirstLevelkeys(Object.keys(json));
  }, [json]);

  return (
    <div className="w-full h-full ">
      <div className="w-full flex justify-end">
        <div className="w-[50%] flex flex-row justify-end">
          <Popover
            showArrow
            backdrop="opaque"
            placement="right"
            classNames={{
              base: [
                // arrow color
                "before:bg-default-200",
              ],
              content: [
                "w-[30rem] h-[10rem] rounded-none",
                "py-3 px-4 border border-default-200",
                "bg-gradient-to-br from-white to-default-300",
                "dark:from-default-100 dark:to-default-50",
              ],
            }}
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
          >
            <PopoverTrigger>
              <Button
                size="md"
                endContent={<p>+</p>}
                className="w-[30%] rounded-none border border-[#1F2937] text-blue-400 text-sm font-bold hover:bg-blue-500 hover:text-blue-800"
              >
                ADD
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-[100%] flex items-center justify-between gap-[0.5rem] px-1 py-2">
                <div className="w-[80%]">
                  <Input
                    placeholder="Enter decision name"
                    clearable
                    labelPlacement="inside"
                    variant="bordered"
                    className="w-[100%]"
                    name={"decisionName"}
                    value={decisionName}
                    onChange={handleChange}
                    classNames={{
                      inputWrapper:
                        "px-[0.25rem] py-[0.25rem] rounded-none data-[open=true]:border-slate-800 data-[hover=true]:border-slate-800 data-[focus=true]:border-slate-800 border-slate-800  font-bold",
                      innerWrapper:
                        "min-h-[1.5rem] min-w-[1.5rem] bg-transparent border-2 border-blue-100",
                    }}
                  />
                </div>
                <div className="w-[20%] flex justify-center items-center">
                  <Button
                    size="md"
                    onClick={addDecisionComponent}
                    className="w-[30%] rounded-none border border-[#1F2937] text-blue-400 text-sm font-bold hover:bg-blue-500 hover:text-blue-800"
                  >
                    ADD
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            className="w-[30%] rounded-none border border-[#1F2937] text-teal-400  text-sm font-bold hover:bg-teal-500 hover:text-teal-800"
            // onClick={onOpen}
          >
            RESET
          </Button>
        </div>
      </div>
      {firstLevelKeys.length > 0 ? (
        <div className="w-full h-[100%] p-2">
          <div className="w-full max-h-[500px] overflow-y-auto scrollbar-hide">
            {firstLevelKeys.map((fact, index) => (
              <div key={fact}>
                <div
                  className={`mt-3 w-[100%] flex justify-center items-center h-20 border-1 border-slate-800 rounded-sm shadow-md *:
                    ${index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"}

               ${
                 fact.type === "string"
                   ? "border-l-blue-500 border-l-4"
                   : fact.type === "number"
                   ? "border-l-green-500 border-l-4"
                   : fact.type === "boolean"
                   ? "border-l-red-500 border-l-4"
                   : fact.type === "array"
                   ? "border-l-yellow-500 border-l-4"
                   : fact.type === "object"
                   ? "border-l-pink-500 border-l-4"
                   : "border-l-slate-500 border-l-4"
               }
               
               `}
                >
                  <div className="grid grid-cols-12 w-[100%]">
                    <div className="col-span-3 flex justify-center">
                      <div className="w-[50%] flex justify-center items-center font-semibold ">
                        {fact}
                      </div>
                    </div>

                    <div className="col-span-9 flex justify-end">
                      <div className="w-[30%] flex justify-center gap-2">
                        <div className="w-[80%] flex justify-between gap-1">
                          <Button
                            onClick={() => {
                              setSelectedDecison(fact);
                              setDecision(true);
                            }}
                            className="w-[50%] border-purple-400 text-white text-sm font-bold hover:border-purple-500 hover:text-purple-800"
                            isIconOnly
                            variant="bordered"
                          >
                            <FiEdit size={20} color="purple" />
                          </Button>
                          <Button
                            className="w-[50%] border-red-400 text-white text-sm font-bold hover:border-red-500 hover:text-red-800"
                            // onClick={() => removeComponent(fact.id)}
                            variant="bordered"
                          >
                            <FiDelete size={20} color="red" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No keys available</p>
      )}
    </div>
  );
}
