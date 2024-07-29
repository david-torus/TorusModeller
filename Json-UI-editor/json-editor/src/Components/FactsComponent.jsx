import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";

export default function FactsComponent({ factsVariables, setFactsVariables }) {
  const [selectedType, setSelectedType] = useState("");
  const [editingFactId, setEditingFactId] = useState(null);

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
    }
  };

  const removeComponent = (id) => {
    setFactsVariables(factsVariables.filter((fact) => fact.id !== id));
  };

  const resetActions = () => {
    setFactsVariables([]);
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
          <div className="w-[50%] flex flex-row justify-end">
            <Button
              size="md"
              endContent={<p>+</p>}
              onClick={addComponent}
              className="w-[30%] rounded-none bg-blue-400 text-white text-sm font-bold hover:bg-blue-500 hover:text-blue-800"
            >
              ADD
            </Button>
            <Button
              className="w-[30%] rounded-none bg-teal-400 text-white text-sm font-bold hover:bg-teal-500 hover:text-teal-800"
              onClick={resetActions}
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

                    ${
                      fact.type === "string"
                        ? "border-l-blue-500 border-l-4"
                        : fact.type === "number"
                        ? "border-l-green-500 border-l-4"
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
                              className={`w-[100%] flex justify-center items-center font-bold ${
                                fact.type === "string"
                                  ? "text-blue-800 bg-blue-400/75  p-1"
                                  : fact.type === "number"
                                  ? "text-green-800 bg-green-400/75  p-1"
                                  : fact.type === "array"
                                  ? "text-yellow-800 bg-yellow-400/75  p-1"
                                  : fact.type === "object"
                                  ? "text-pink-800 bg-pink-400/75  p-1"
                                  : "text-slate-800 bg-slate-400/75  p-1"
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
                                  className="w-[50%] rounded-none border-purple-400 text-white text-sm font-bold hover:border-purple-500 hover:text-purple-800"
                                  isIconOnly
                                  variant="bordered"
                                >
                                  <FiEdit size={20} color="purple" />
                                </Button>
                                <Button
                                  className="w-[50%] rounded-none border-red-400 text-white text-sm font-bold hover:border-red-500 hover:text-red-800"
                                  onClick={() => removeComponent(fact.id)}
                                  variant="bordered"
                                >
                                  <FiDelete size={20} color="red" />
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
