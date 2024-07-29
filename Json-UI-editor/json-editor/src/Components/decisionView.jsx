import { Button, Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import React, { useContext, useEffect, useState } from "react";
import { JsonUiEditorContext } from "../Layout";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
 
export default function DecisionView({ setSelectedDecision, setDecision }) {
  const [firstLevelKeys, setFirstLevelkeys] = useState([]);
  const { json, setJson } = useContext(JsonUiEditorContext);
  const [decisionName, setDecisionName] = useState("");
  const [isOpenpop, setIsOpenpop] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
 
  const addDecisionComponent = () => {
    // Create a deep clone of the json object
    const newJson = structuredClone(json);
 
    const targetKey = decisionName;
 
    if (newJson && targetKey) {
      newJson[targetKey] = {};
 
      setIsOpenpop(false);
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
 
  const resetActions = () => {
    setJson({});
  };


  const removeComponent = (fact) => {
    setFirstLevelkeys(prev => prev.filter(key => key !== fact));
    const newJson = structuredClone(json);
 
    delete newJson[fact];
    setJson(newJson);
  }
 
  return (
    <div className="w-full h-full ">
      <div className="w-full flex justify-end">
        <div className="w-[50%] flex flex-row justify-end gap-[1.5rem]">
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
                "w-[30rem] h-[5rem] rounded-md",
                "py-3 px-4 border border-default-200",
                "bg-gradient-to-br from-white to-default-300",
                "dark:from-default-100 dark:to-default-50",
              ],
            }}
            isOpen={isOpenpop}
            onOpenChange={(open) => setIsOpenpop(open)}
          >
            <PopoverTrigger>
              <Button
                size="md"
                isIconOnly
                variant="light"
                color="primary"
                className="border border-[#2563eb]"
              >
                <IoAddCircleOutline
                  size={20}
                  style={{
                    color: "#006FEE",
                  }}
                  className={`transition-transform duration-100 ease-in-out ${
                    isOpenpop ? "rotate-45" : "rotate-0"
                  }`}
                />
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
                        "px-[0.25rem] py-[0.25rem] bg-transparent rounded-md data-[open=true]:border-slate-800 data-[hover=true]:border-slate-800 data-[focus=true]:border-slate-800 border-slate-800  font-bold",
                      innerWrapper:
                        "min-h-[1.5rem] min-w-[1.5rem] bg-transparent border-2 border-blue-100",
                    }}
                  />
                </div>
                <div className="w-[20%] flex justify-center items-center">
                  <Button
                    onClick={addDecisionComponent}
                    size="md"
                    endContent={
                      <IoAddCircleOutline
                        size={20}
                        style={{
                          color: "#006FEE",
                        }}
                      />
                    }
                    variant="light"
                    className="flex justify-center items-center text-primary  text-sm font-bold border border-[#2563eb]"
                    color="primary"
                  >
                    ADD
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            onClick={onOpen}
            size="md"
            className="border border-[#9333ea]"
            isIconOnly
            variant="light"
            color="secondary"
          >
            <GrPowerReset
              size={20}
              style={{
                color: "#9333ea",
              }}
              className={`transition-transform duration-250 ease-in-out ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
 
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Reset Confirmation
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      This action is not revertible and will reset the total
                      number of facts
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => {
                        resetActions();
                        onClose();
                      }}
                    >
                      Reset all Facts
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
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
                   
 
               
               `}
                >
                  <div className="grid grid-cols-12 w-[100%]">
                    <div className="col-span-3 flex justify-center">
                      <div className="w-[50%] flex justify-center items-center font-semibold text-slate-800">
                        {fact}
                      </div>
                    </div>
 
                    <div className="col-span-9 flex justify-end">
                      <div className="w-[30%] flex justify-center gap-2">
                        <div className="w-[80%] flex justify-between gap-1">
                          <Button
                            onClick={() => {
                              setSelectedDecision(fact);
                              setDecision(prev => !prev);
                            }}
                            endContent={
                              <FiEdit
                                size={20}
                                color="#818181"
                                style={{
                                  color: "white",
                                }}
                              />
                            }
                            variant="faded"
                            className="flex justify-center items-center bg-blue-500 text-sm font-bold text-white"
                          >
                            EDIT
                          </Button>
                          <Button
                            variant="faded"
                            className="flex justify-center items-center bg-red-500 text-sm font-bold text-white"
                            endContent={
                              <MdDeleteOutline
                                size={23}
                                color="#818181"
                                style={{
                                  color: "white",
                                }}
                              />
                            }
                            onClick={() => removeComponent(fact)}
                          >
                            DELETE
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
        <p>No Decisions available</p>
      )}
    </div>
  );
}
 
 