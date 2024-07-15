import React from "react";
import { memo } from "react";
import { Handle, Position } from "reactflow";

export const GroupNode = memo(
  ({ id, data, isConnectable, selected, itemKey }) => {
    return (
      <div
        className="flex items-center justify-center rounded-lg   "
        style={{
          height: "150px",
          width: "150px",
          fontSize: "25px",
          borderWidth: "4px",
          borderColor: "#E74C3C",
          backgroundColor: "#F5B7B1",
        }}
      >
        {data.nodeName || data.nodeType}
        <br />({data.sequence})
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          className="custom-node-handle"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
          isConnectable={isConnectable}
        />
      </div>
    );
  }
);

export const InputNode = memo(
  ({ id, data, isConnectable, selected, itemKey }) => {
    return (
      <div
        className="flex items-center justify-center  "
        style={{
          borderStyle: "solid",
          borderRadius: "50%",
          height: "100px",
          width: "200px",
          fontSize: "25px",
          borderWidth: "4px",
          borderColor: "#CB4335",
          backgroundColor: "#F5B7B1",
        }}
      >
        {data.label}
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          className="custom-node-handle"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          
          }}
          isConnectable={isConnectable}
        />
      </div>
    );
  }
);

export const ControlNode = memo(
  ({ id, data, isConnectable, selected, itemKey }) => {
    return (
      <div
        className="flex items-center justify-center rounded-lg   "
        style={{
          height: "90px",
          width: "250px",
          fontSize: "25px",
          borderWidth: "4px",

          borderColor: "#17A589",
          backgroundColor: "#A3E4D7",
        }}
      >
        {data.nodeName || data.nodeType}
        <br />({data.sequence})
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          className="custom-node-handle"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
          isConnectable={isConnectable}
        />
      </div>
    );
  }
);

export const EventNode = memo(({ id, data, isConnectable, selected }) => {
  return (
    <div
      className="flex items-center justify-center min-w-[155px] h-[155px] rounded-full text-md  "
      style={{
        borderColor: "#F1C40F",
        borderWidth: "4px",
        backgroundColor: "#F9E79F",
      }}
    >
      {data.label}
      <br />({data.sequence})
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        className="custom-node-handle"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export const HandlerNode = memo(({ id, data, isConnectable, selected }) => {
  return (
    <div
      className="flex items-center justify-center min-w-[120px] h-[120px] rounded-full text-xl  "
      style={{
        borderColor: "#707B7C",
        borderWidth: "4px",
        backgroundColor: "#CCD1D1",
      }}
    >
      {data.label}
      <br />({data.sequence})
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        className="custom-node-handle"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export const ResponseNode = memo(({ id, data, isConnectable, selected }) => {
  return (
    <div
      className="flex items-center justify-center min-w-[120px] h-[120px] rounded-full text-xl  "
      style={{
        borderColor: data?.responseType === "success" ? "#2ECC71" : "#E74C3C",
        borderWidth: "4px",
        backgroundColor:
          data?.responseType === "success" ? "#DFF0D8" : "#F2DEDE",
      }}
    >
      {data.label}
      <br />({data.sequence})
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        className="custom-node-handle"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export const onSubmit = memo(({ id, data, isConnectable, selected }) => {
  return (
    <div
      className="flex items-center justify-center  "
      style={{
        borderStyle: "solid",
        borderRadius: "50%",
        height: "200px",
        width: "200px",
        fontSize: "25px",
        borderWidth: "4px",
        borderColor: "#ff66aa",
        backgroundColor: "#ffdfed",
      }}
    >
      onSubmit
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          position: "absolute",
          borderRadius: "50%",
          backgroundColor: "green",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        className="custom-node-handle"
        style={{
          position: "absolute",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
