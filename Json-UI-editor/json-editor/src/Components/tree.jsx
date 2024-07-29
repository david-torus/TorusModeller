import { useState } from "react";
import Tree from "react-d3-tree";
import { v4 as uuidv4 } from "uuid";
 
function Tree() {
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
 
  const [data, setData] = useState(initialData);
  const [nodeData, setNodeData] = useState(null);
 
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
    setData(prevData => ({
      ...prevData,
      name: newName,
      nodeSvgShape: prevData.nodeSvgShape,
      children: prevData.children
    }));
  };
 
  console.log(data, nodeData, "nnn");
 
  return (
    <>
      <div className="flex">
        <div>
        <button onClick={() => handleRoot("all")}>All</button>
        <button onClick={() => handleRoot("any")}>Any</button>
        </div>
        <div className="flex w-[300px] justify-between">
          <button onClick={() => handleAddNode("factname", { lessThan: 10 })}>
            Add Facts
          </button>
          <button onClick={() => handleAddNode("all")}>Add All</button>
          <button onClick={() => handleAddNode("any")}>Add Any</button>
          <button onClick={handleRemoveNode}>Remove</button>
        </div>
      </div>
      <div className="tree-container" style={{ height: "100vh" }}>
        <Tree
          data={data}
          orientation="vertical"
          onNodeClick={(node) => setNodeData(node)}
        />
      </div>
    </>
  );
}
 
export default Tree;
 
 