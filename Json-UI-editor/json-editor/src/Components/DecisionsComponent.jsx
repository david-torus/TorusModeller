import { Button, Input } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FactButtonComponent } from "./FactButtonComponent";
import { v4 as uuidv4 } from "uuid";
import Tree from "react-d3-tree";

import {
  AllAnyButtonComponent,
  AllAnyComponent,
} from "./AllAnyButtonComponent";
import { AddOutComeComponent } from "./AddOutComeComponent";
import { OutComeButtonComponent } from "./OutComeButtonComponent";
import { JsonUiEditorContext } from "../Layout";

const initialData = {
  name: "all",
  id: uuidv4(),
  nodeSvgShape: {
    shape: "circle",
    shapeProps: {
      fill: "#1ABB9C",
      r: 10,
    },
  },
  children: [],
};

export default function DecisionsComponent({ selectedDecison, setDecision }) {
  const { json, setJson } = useContext(JsonUiEditorContext);
  const [params, setParams] = useState([{ key: "", value: "" }]);
  const [type, setType] = useState(null);
  const [selectedFacts, setSelectedFacts] = useState("");
  const TopLevel = ["All", "Any"];
  const [selectedTopLevel, setSelectedTopLevel] = useState(TopLevel[0]);
  const FactList = ["AddFacts", "AddAll", "AddAny", "Remove"];
  const OutcomeList = ["Diagram", "Outcome"];
  const [selectedOutcome, setSelectedOutcome] = useState("Diagram");
  const treeContainerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const [data, setData] = useState(initialData);
  const [nodeData, setNodeData] = useState(null);

  const [outCome, setOutcome] = useState(null);

  const handleKeyChange = (index, value) => {
    const newParams = [...params];
    newParams[index].key = value;
    setParams(newParams);
  };

  const handleValueChange = (index, value) => {
    const newParams = [...params];
    newParams[index].value = value;
    setParams(newParams);
  };

  const addKeyValue = () => {
    setParams([...params, { key: "", value: "" }]);
  };

  const handleOutcome = () => {
    setOutcome({
      type: type,
      params: params.reduce((acc, obj) => {
        acc[obj.key] = obj.value;
        return acc;
      }, {}),
    });
  };

  const createNode = (name, attributes) => ({
    name: name,
    id: uuidv4(),
    nodeSvgShape: {
      shape: "circle",
      shapeProps: {
        fill: "#1ABB9C",
        r: 10,
      },
    },
    attributes,
    children: [],
  });

  const handleAddNode = (type, attributes) => {
    if (
      nodeData &&
      !(nodeData.data.name === "all" || nodeData.data.name === "any")
    ) {
      alert("Cannot add a new node under facts");
      return;
    }
    const newNode = createNode(type, attributes);
    if (nodeData) {
      const updatedData = { ...data };
      const nodeToUpdate = findNodeById(updatedData, nodeData.data.id);
      if (nodeToUpdate) {
        nodeToUpdate.children.push(newNode);
      }
      setData(updatedData);
    } else {
      setData((prevData) => ({
        ...prevData,
        children: [...prevData.children, newNode],
      }));
    }
  };

  const findNodeById = (node, id) => {
    if (node.id === id) return node;
    if (node.children) {
      for (let child of node.children) {
        const result = findNodeById(child, id);
        if (result) return result;
      }
    }
    return null;
  };

  const handleRemoveNode = () => {
    if (nodeData) {
      const updatedData = { ...data };
      const newTree = removeNodeById(updatedData, nodeData.data.id);
      setData(newTree);
      setNodeData(null);
    }
  };

  const removeNodeById = (node, id) => {
    if (!node.children) return node;
    node.children = node.children
      .map((child) => (child.id === id ? null : removeNodeById(child, id)))
      .filter((child) => child !== null);
    return node;
  };

  const handleRoot = (newName) => {
    setData((prevData) => ({
      ...prevData,
      name: newName,
      nodeSvgShape: prevData.nodeSvgShape,
      children: prevData.children,
    }));
  };

  console.log(data, selectedDecison, json, "nnn");

  useEffect(() => {
    if (treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 4,
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(json[selectedDecison]).length > 0) {
      setData(json[selectedDecison].condition);
      setType(json[selectedDecison].type);
      setParams(json[selectedDecison].params);
    } else {
      setData(initialData);
    }
  }, [json, selectedDecison]);

  return (
    <div className="w-full h-[100%] p-2">
      <div className="bg-slate-400/25 h-90 rounded-md shadow-sm p-2">
        <div className="w-full flex justify-end mb-4">
          <div className="w-[100%] flex items-center  justify-between">
            <div>
              <OutComeButtonComponent
                OutcomeList={OutcomeList}
                selectedOutcome={selectedOutcome}
                setSelectedOutcome={setSelectedOutcome}
              />
            </div>
            <div>{selectedDecison}</div>
            <div className="flex items-center  justify-between gap-2 border border-gray-600/50 rounded-md">
              <div>
                <Button
                  size="md"
                  color="transparent"
                  radius="md"
                  onClick={() => {
                    setJson({
                      ...json,
                      [selectedDecison]: {
                        ...json[selectedDecison],
                        condition: data,
                        events: outCome,
                        params: params,
                        type: type,
                      },
                    });
                    setDecision(false);
                  }}
                >
                  Save
                </Button>
              </div>
              {/* <div>
                <Button>RESET</Button>
              </div>
              <div className="w-[30%] p-1 ">
                <Input
                  size="md"
                  clearable
                  // label="Search"
                  labelPlacement="inside"
                  variant="bordered"
                  className="w-[100%]"
                  classNames={{
                    inputWrapper: ["h-[20px] w-[100%]"],
                  }}
                />
              </div> */}
            </div>
          </div>
        </div>
        <hr className="border-dashed border-2 border-slate-800/50" />

        <div className="mt-2 w-full h-[380px] p-3 mb-3">
          <div>
            <div className="flex mb-4 gap-3 items-start justify-between">
              <div
                style={{
                  display: selectedOutcome == "Diagram" ? "block" : "none",
                }}
              >
                <AllAnyButtonComponent
                  handleRoot={handleRoot}
                  TopLevel={TopLevel}
                  selectedTopLevel={selectedTopLevel}
                  setSelectedTopLevel={setSelectedTopLevel}
                />
              </div>

              <div
                style={{
                  display: selectedOutcome == "Diagram" ? "block" : "none",
                }}
              >
                <FactButtonComponent
                  FactList={FactList}
                  setSelectedFacts={setSelectedFacts}
                  selectedFacts={selectedFacts}
                  handleAddNode={handleAddNode}
                  handleRemoveNode={handleRemoveNode}
                />
              </div>
            </div>
          </div>

          {selectedTopLevel && selectedOutcome == "Outcome" && (
            <AddOutComeComponent
              addKeyValue={addKeyValue}
              setType={setType}
              type={type}
              params={params}
              handleKeyChange={handleKeyChange}
              handleValueChange={handleValueChange}
              handleOutcome={handleOutcome}
            />
          )}
          {selectedTopLevel && selectedOutcome == "Diagram" && (
            <div
              ref={treeContainerRef}
              className="w-full h-[300px] bg-slate-200"
            >
              <Tree
                translate={translate}
                data={data}
                orientation="vertical"
                onNodeClick={(node) => setNodeData(node)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
