import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { JsonUiEditorContext } from "../Layout";
import { IoAddCircleOutline, IoSaveOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function FactsComponent() {
  const { factsVariables, setFactsVariables } = useContext(JsonUiEditorContext);
  const [selectedType, setSelectedType] = useState("");
  const [editingFactId, setEditingFactId] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    console.log(factsVariables, "FACTS");
    console.log(selectedType, "selected type");
    setFactsVariables(factsVariables);
  }, [factsVariables, selectedType]);

  const dataTypes = [
    { key: "string", label: "string" },
    { key: "number", label: "number" },
    { key: "array", label: "array" },
    { key: "object", label: "object" },
  ];

  const addComponent = () => {
    if (
      factsVariables[factsVariables.length - 1].name !== "" ||
      factsVariables[factsVariables.length - 1].type !== ""
    ) {
      setFactsVariables([
        ...factsVariables,
        { id: factsVariables.length + 1, name: "", type: "" },
      ]);

      console.log("Trueeee=====>>>");
    } else {
      Swal.fire("Warning", "Please enter fact name and type", "warning");
    }
  };

  const removeComponent = (id) => {
    if (factsVariables.length === 1) {
      Swal.fire("Error", "There should be atleast one fact", "error");
    } else {
      setFactsVariables(factsVariables.filter((fact) => fact.id !== id));
    }
  };

  const resetActions = () => {
    setFactsVariables([{ id: 1, name: "", type: "" }]);
    setEditingFactId(null);
  };

  const handleTypeSelection = (e) => {
    setSelectedType(Array.from(e)[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactsVariables((prevFacts) =>
      prevFacts.map((fact) =>
        fact.id === parseInt(name) ? { ...fact, name: value } : fact
      )
    );
  };

  const saveChanges = (id) => {
    const updatedFacts = factsVariables.map((fact) => {
      if (fact.id === id) {
        return {
          ...fact,
          type: selectedType,
        };
      }
      return fact;
    });
    setFactsVariables(updatedFacts);
    setEditingFactId(null); // Exit edit mode
  };

  const startEditing = (id) => {
    setEditingFactId(id);
  };

  return (
    <div className="w-full h-[100%] p-2">
      <div className="bg-transparent  scrollbar-hide rounded-md shadow-sm p-2">
        <div className="w-full flex justify-end px-2">
          

          <div className="w-[50%] flex flex-row justify-end gap-[0.5rem]">
            <Button
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
              className="flex justify-center items-center text-primary  text-sm font-bold border-[#2563eb] border"
              color="primary"
              onClick={addComponent}
            >
              ADD
            </Button>
            <Button
              endContent={
                <GrPowerReset
                  size={20}
                  color="#818181"
                  style={{
                    color: "white",
                  }}
                />
              }
              onClick={onOpen}
              variant="faded"
              className="flex justify-center items-center bg-blue-500 text-sm font-bold text-white"
            >
              RESET
            </Button>
          </div>
        </div>
        <div className="max-h-[425px] overflow-y-scroll scrollbar-hide">
          {factsVariables.length === 0 ? (
            <div className="w-full p-2 flex justify-center items-center">
              <div className="w-full bg-red-500/40 border-dashed border-spacing-1 border-2 border-red-600 p-2">
                <div>
                  <h2 className="text-lg font-semibold text-black">No Facts</h2>
                  <div className="flex justify-between">
                    <div className="w-[50%] flex justify-start text-black font-normal">
                      There are no factsVariables available in the selected
                      ruleset
                    </div>
                    <div className="w-[50%] flex justify-end">
                      <Button
                        onClick={addComponent}
                        className="w-[30%]  text-white text-sm font-bold hover:bg-red-500/60 hover:text-red-800"
                        variant="bordered"
                      >
                        Create Facts
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-[100%] p-2">
              <div className="w-full overflow-y-auto scrollbar-hide">
                {factsVariables.map((fact) => (
                  <div key={fact.id}>
                    {editingFactId === fact.id ? (
                      <EditComponent
                        fact={fact}
                        handleChange={handleChange}
                        saveChanges={saveChanges}
                        removeComponent={removeComponent}
                        dataTypes={dataTypes}
                        setSelectedType={setSelectedType}
                        selectedType={selectedType}
                      />
                    ) : (
                      <div
                        className={`mt-3 w-[100%] flex justify-center items-center h-20 border-1 border-slate-800 rounded-sm shadow-md *:
                    ${fact.id % 2 === 0 ? "bg-slate-200" : "bg-slate-300"}

                  
                    
                    `}
                      >
                        <div className="grid grid-cols-12 w-[100%]">
                          <div className="col-span-3 flex justify-center">
                            <div className="w-[50%] flex justify-center items-center font-semibold ">
                              {fact.id}
                            </div>
                          </div>

                          <div className="col-span-3 flex justify-center">
                            <div
                              className={`w-[100%] flex justify-center items-center font-bold text-sm
                            text-slate-800
                            `}
                            >
                              {fact.name || "Name"}
                            </div>
                          </div>

                          <div className="col-span-3 flex justify-center">
                            <div
                              className={`w-[100%] flex justify-center items-center font-bold border-b border-[#818181] ${
                                fact.type === "string"
                                  ? "text-blue-800   p-1"
                                  : fact.type === "number"
                                  ? "text-green-800  p-1"
                                  : fact.type === "array"
                                  ? "text-yellow-800   p-1"
                                  : fact.type === "object"
                                  ? "text-pink-800  p-1"
                                  : "text-slate-800   p-1"
                              }`}
                            >
                              {fact.type || "Type"}
                            </div>
                          </div>

                          <div className="col-span-3 flex justify-center">
                            <div className="w-[90%] flex justify-center gap-2">
                              <div className="w-[80%] flex ">
                                <Button
                                  onClick={() => startEditing(fact.id)}
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
                                  onClick={() => removeComponent(fact.id)}
                                >
                                  DELETE
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  This action is not revertible and will reset the total number
                  of facts
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
  );
}

const EditComponent = ({
  fact,
  handleChange,
  saveChanges,
  removeComponent,
  dataTypes,
  setSelectedType,
  selectedType,
}) => {
  return (
    <div className="w-[100%] grid grid-cols-12 gap-4 py-3 px-2 border border-slate-800">
      <div className="col-span-6">
        <Input
          placeholder="Enter name"
          clearable
          label="Name"
          labelPlacement="inside"
          variant="bordered"
          className="w-[80%]"
          name={fact.id.toString()}
          value={fact.name}
          onChange={handleChange}
          classNames={{
            inputWrapper:
              "rounded-none data-[open=true]:border-slate-800 data-[hover=true]:border-slate-800 data-[focus=true]:border-slate-800 border-slate-800 text-purple-800 font-bold",
          }}
        />
        <div className="w-[100%] flex pt-10">
          <Button
            size="sm"
            color="success"
            radius="md"
            onClick={() => saveChanges(fact.id)}
            className="w-[30%] rounded-none bg-blue-400 text-white text-sm font-bold hover:bg-blue-500 hover:text-blue-800"
          >
            Save Changes
          </Button>
          <Button
            size="sm"
            color="default"
            radius="md"
            onClick={() => removeComponent(fact.id)}
            className="w-[30%] rounded-none bg-red-400 text-white text-sm font-bold hover:bg-red-500 hover:text-red-800"
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="col-span-6">
        <div className="flex w-full flex-wrap justify-end md:flex-nowrap gap-4">
          <Select
            label="Favorite type"
            placeholder="Select a type"
            className="w-[80%]"
            variant="bordered"
            selectedKeys={selectedType ? [selectedType] : []}
            onSelectionChange={(e) => setSelectedType(Array.from(e)[0])}
            items={dataTypes}
            classNames={{
              trigger:
                "rounded-none data-[open=true]:border-slate-800 data-[hover=true]:border-slate-800 data-[focus=true]:border-slate-800 border-slate-800 text-purple-800 font-bold",
            }}
          >
            {(type) => (
              <SelectItem key={type.key} value={type.key}>
                {type.label}
              </SelectItem>
            )}
          </Select>
        </div>
      </div>
    </div>
  );
};
