import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useContext, useEffect } from "react";
import { IoAddCircle } from "@react-icons/all-files/io5/IoAddCircle";
import { JsonUiEditorContext } from "../Layout";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
export const DisplayAddFactsPopup = ({
  isOpen,
  onOpenChange,
  handleAddNode,
}) => {
  const { factsVariables, setFactsVariables } = useContext(JsonUiEditorContext);
  const operators = [
    { key: "equal", label: "equal" },
    { key: "notEqual", label: "notEqual" },
    { key: "greaterThan", label: "greaterThan" },
    { key: "lessThan", label: "lessThan" },
    { key: "greaterThanInclusive", label: "greaterThanInclusive" },
    { key: "lessThanInclusive", label: "lessThanInclusive" },
  ];

  const [factName, setFactName] = React.useState(null);
  const [operator, setOperator] = React.useState(null);
  const [value, setSelectedValue] = React.useState(null);
  const [operatorList, setOperatorList] = React.useState([]);

  const factsData = {
    factName,
    operator,
    value,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedValue(value);
  };

  const handleFactSelection = (e) => {
    if (Array.from(e)[0]) {
      setFactName(Array.from(e)[0]);
    } else {
      setFactName(null);
    }
  };

  const saveChanges = (onClose) => {
    if (factsData.factName && factsData.operator && factsData.value) {
      console.log(factsData);
      handleAddNode(factName, { operator, value, path: "." + factName });
      onClose();
      removeComponent();
    } else {
      alert("Please fill all the fields to continue");
    }
  };

  const removeComponent = () => {
    if (factName || operator || value) {
      setFactName(null);
      setOperator(null);
      setSelectedValue("");
    }
  };

  useEffect(() => {
    if (factName) {
      const factObj = factsVariables.find((fact) => fact.name == factName);
      switch (factObj.type) {
        case "string":
          setOperatorList([
            { key: "equal", label: "equal" },
            { key: "notEqual", label: "notEqual" },
          ]);
          break;
        case "number":
          setOperatorList(operators);
          break;
        case "array":
          setOperatorList([
            { key: "contains", label: "contains" },
            { key: "notContains", label: "notContains" },
            { key: "in", label: "in" },
            { key: "notIn", label: "notIn" },
          ]);
          break;
        default:
          setOperatorList([
            ...operators,
            { key: "contains", label: "contains" },
            { key: "notContains", label: "notContains" },
            { key: "in", label: "in" },
            { key: "notIn", label: "notIn" },
          ]);
          break;
      }
    } else {
      setOperatorList([]);
    }
  }, [factName]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Facts</ModalHeader>
            <ModalBody>
              <div className="w-[100%]  py-3 px-2">
                <div className="w-[100%] flex justify-end px-2">
                  <Button
                    className="w-[10%] rounded-none  px-2 bg-blue-400 text-white text-sm font-bold
        hover:bg-blue-500 hover:text-blue-800"
                    startContent={<IoAddCircle size={20} color="white" />}
                  >
                    ADD PATH
                  </Button>
                </div>
                <div className="w-[100%] grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <div className="flex w-full flex-wrap flex-col justify-end md:flex-nowrap gap-4">
                      <Select
                        label="Facts"
                        placeholder="Select a type"
                        labelPlacement="outside"
                        className="w-[80%]"
                        variant="bordered"
                        selectedKeys={factName ? [factName] : []}
                        onSelectionChange={handleFactSelection}
                        items={factsVariables}
                        classNames={{
                          trigger:
                            "min-h-10 rounded-none data-[open=true]:border-slate-800 data-[hover=true]:border-slate-800 data-[focus=true]:border-slate-800 border-slate-800 text-purple-800 font-bold",
                        }}
                      >
                        {(type) => (
                          <SelectItem key={type.name} value={type.name}>
                            {type.name}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="flex w-full flex-wrap justify-end md:flex-nowrap gap-4">
                      <Select
                        label="Operators"
                        placeholder="Select a type"
                        labelPlacement="outside"
                        className="w-[80%]"
                        variant="bordered"
                        selectedKeys={operator ? [operator] : []}
                        onSelectionChange={(e) => setOperator(Array.from(e)[0])}
                        items={operatorList}
                        classNames={{
                          trigger:
                            "min-h-10 rounded-none data-[open=true]:border-slate-800 data-[hover=true]:border-slate-800 data-[focus=true]:border-slate-800 border-slate-800 text-purple-800 font-bold",
                        }}
                      >
                        {(type) => (
                          <SelectItem key={type.key} value={type.label}>
                            {type.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="w-[100%] mt-4 grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <div className="flex w-full flex-wrap flex-col justify-end md:flex-nowrap gap-4">
                      <Input
                        placeholder="Enter name"
                        clearable
                        label="Value"
                        labelPlacement="inside"
                        variant="bordered"
                        className="w-[80%]"
                        name={"value"}
                        value={value}
                        onChange={handleChange}
                        classNames={{
                          inputWrapper:
                            "rounded-none data-[open=true]:border-slate-800 data-[hover=true]:border-slate-800 data-[focus=true]:border-slate-800 border-slate-800 text-purple-800 font-bold",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="flex w-full flex-wrap justify-end md:flex-nowrap gap-4">
                      {/* <Select
              label="Favorite type"
              placeholder="Select a type"
              labelPlacement="outside"
              className="w-[80%]"
              variant="bordered"
              selectedKeys={selectedType ? [selectedType] : []}
              onSelectionChange={(e) => setSelectedType(Array.from(e)[0])}
              items={factsVariables}
              classNames={{
                trigger:
                  "min-h-10 rounded-none data-[open=true]:border-slate-800 data-[hover=true]:border-slate-800 data-[focus=true]:border-slate-800 border-slate-800 text-purple-800 font-bold",
              }}
            >
              {(type) => (
                <SelectItem key={type.name} value={type.name}>
                  {type.name}
                </SelectItem>
              )}
            </Select> */}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="success"
                radius="md"
                onClick={() => {
                  saveChanges(onClose);
                }}
                className="w-[30%] rounded-none bg-blue-400 text-white text-sm font-bold hover:bg-blue-500 hover:text-blue-800"
              >
                Save Changes
              </Button>
              <Button
                size="sm"
                color="default"
                radius="md"
                onClick={() => {
                  removeComponent();
                  onClose();
                }}
                className="w-[30%] rounded-none bg-red-400 text-white text-sm font-bold hover:bg-red-500 hover:text-red-800"
              >
                Clear
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
