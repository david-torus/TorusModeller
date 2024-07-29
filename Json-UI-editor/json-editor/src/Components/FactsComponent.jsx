import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function FactsComponent() {
  const [facts, setFacts] = useState([{ id: 1, name: "", type: "" }]);
  const [selectedType, setSelectedType] = useState("number");
  const [editingFactId, setEditingFactId] = useState(null);

  useEffect(() => {
    console.log(facts, "FACTS");
    console.log(selectedType, "selected type");
  }, [facts, selectedType]);

  const dataTypes = [
    { key: "string", label: "string" },
    { key: "number", label: "number" },
    { key: "boolean", label: "boolean" },
    { key: "array", label: "array" },
    { key: "object", label: "object" },
  ];

  const addComponent = () => {
    setFacts([...facts, { id: facts.length + 1, name: "", type: "" }]);
  };

  const removeComponent = (id) => {
    setFacts(facts.filter((fact) => fact.id !== id));
  };

  const resetActions = () => {
    setFacts([]);
    setEditingFactId(null);
  };

  const handleTypeSelection = (e) => {
    setSelectedType(Array.from(e)[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacts((prevFacts) =>
      prevFacts.map((fact) =>
        fact.id === parseInt(name) ? { ...fact, name: value } : fact
      )
    );
  };

  const saveChanges = (id) => {
    const updatedFacts = facts.map((fact) => {
      if (fact.id === id) {
        return {
          ...fact,
          type: selectedType,
        };
      }
      return fact;
    });
    setFacts(updatedFacts);
    setEditingFactId(null); // Exit edit mode
  };

  const startEditing = (id) => {
    setEditingFactId(id);
  };

  return (
    <div className="w-full h-[100%] p-2">
      <div className="bg-slate-400/25 max-h-[100%] rounded-md shadow-sm p-2">
        <div className="w-full flex justify-end">
          <div className="w-[50%] flex flex-col justify-end">
            <div className="w-[100%] flex justify-around gap-[0.5rem] bg-slate-400/15 p-2">
              <Button
                size="md"
                color="transparent"
                radius="md"
                endContent={<p>+</p>}
                onClick={addComponent}
              >
                ADD
              </Button>
              <Button onClick={resetActions}>RESET</Button>
            </div>
          </div>
        </div>
        {facts.length === 0 ? (
          <div className="w-full h-[100%] p-2 flex justify-center items-center">
            <div className="w-full bg-red-500/40 border-dashed border-spacing-1 border-2 border-red-600 p-2">
              <div>
                <h2 className="text-lg font-semibold text-black">No Facts</h2>
                <div className="flex justify-between">
                  <div className="w-[50%] flex justify-start text-black font-normal">
                    There are no facts available in the selected ruleset
                  </div>
                  <div className="w-[50%] flex justify-end">
                    <Button onClick={addComponent}>Create Facts</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[100%] p-2">
            <div className="w-full overflow-y-auto scrollbar-hide">
              {facts.map((fact) => (
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
                    <div className="mt-3 w-[100%] flex justify-center items-center h-20 border-1 border-slate-800 rounded-sm shadow-md border-l-blue-500 border-l-4">
                      <div className="grid grid-cols-12 w-[80%]">
                        <div className="col-span-3 flex justify-center">
                          <div className="w-[50%] flex justify-center items-center">
                            {fact.id}
                          </div>
                        </div>

                        <div className="col-span-3 flex justify-center">
                          <div className="w-[50%] flex justify-center items-center">
                            {fact.name || "Name"}
                          </div>
                        </div>

                        <div className="col-span-3 flex justify-center">
                          <div className="w-[50%] flex justify-center items-center">
                            {fact.type || "Type"}
                          </div>
                        </div>

                        <div className="col-span-3 flex justify-center">
                          <div className="w-[90%] flex justify-end gap-2">
                            <div className="w-[80%] flex justify-between gap-1">
                              <Button onClick={() => startEditing(fact.id)}>
                                Edit
                              </Button>
                              <Button onClick={() => removeComponent(fact.id)}>
                                Delete
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
    <div className="w-[100%] grid grid-cols-12 gap-4 p-2 border-b border-divider">
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
        />
        <div className="w-[100%] flex justify-around gap-[0.5rem] pt-10">
          <Button
            size="sm"
            color="success"
            radius="md"
            onClick={() => saveChanges(fact.id)}
          >
            Save Changes
          </Button>
          <Button
            size="sm"
            color="default"
            radius="md"
            onClick={() => removeComponent(fact.id)}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="col-span-6">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Select
            label="Favorite type"
            placeholder="Select a type"
            className="w-[80%]"
            variant="bordered"
            selectedKeys={selectedType ? [selectedType] : []}
            onSelectionChange={(e) => setSelectedType(Array.from(e)[0])}
            items={dataTypes}
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
