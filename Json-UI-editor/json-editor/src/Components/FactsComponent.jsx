import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function FactsComponent() {
  const [facts, setFacts] = useState([{ id: 1 }]); // Initialize with one component
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    console.log(facts, "FACTSt"); // Initialize facts state if needed
  }, [facts]);

  const handleTypeSelection = (e) => {
    console.log(e, "Events");
    setSelectedType(e);
  };

  const dataTypes = ["string", "number", "boolean", "array", "object"];

  const addComponent = () => {
    if (facts.length === 0) {
      setFacts([...facts, { id: facts.length + 1 }]); // Add a new component
    }
  };

  const removeComponent = (id) => {
    setFacts(facts.filter((fact) => fact.id !== id)); // Remove a specific component
  };

  const resetActions = () => {
    setFacts([]);
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
              <div className="w-[30%]">
                <Input
                  clearable
                  label="Search"
                  labelPlacement="inside"
                  variant="bordered"
                  className="w-[100%]"
                  classNames={{
                    inputWrapper: ["h-[30px] w-[100%]"],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {facts.length === 0 ? (
          <div className="w-full h-[100%] p-2 flex justify-center items-center">
            <div className="w-full bg-red-500/40 border-dashed border-spacing-1 border-2 border-red-600  p-2">
              <div>
                <h2 className="text-lg font-semibold text-black">No Facts</h2>
                <div className="flex justify-between ">
                  <div className="w-[50%] flex justify-start text-black font-normal">
                    There is no facts available in the selected ruleset
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
            <div className="w-full  overflow-y-auto scrollbar-hide">
              <div
                className="mt-2 w-[100%] flex flex-col gap-[0.5rem] bg-slate-400/10 p-2"
                id="repeatedComponent"
              >
                {facts.map((fact) => (
                  <div
                    key={fact.id}
                    className="w-[100%] grid grid-cols-12 gap-4 p-2 border-b border-divider"
                  >
                    <div className="col-span-6">
                      <Input
                        placeholder="Name"
                        clearable
                        label="Name"
                        labelPlacement="inside"
                        variant="bordered"
                        className="w-[80%]"
                      />
                      <div className="w-[100%] flex justify-around gap-[0.5rem] pt-10">
                        <Button size="sm" color="success" radius="md">
                          Add Facts{" "}
                        </Button>
                        <Button
                          size="sm"
                          color="default"
                          radius="md"
                          onClick={() => removeComponent(fact.id)}
                        >
                          Cancel{" "}
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
                          selectedKeys={selectedType}
                          onSelectionChange={handleTypeSelection}
                        >
                          {dataTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
