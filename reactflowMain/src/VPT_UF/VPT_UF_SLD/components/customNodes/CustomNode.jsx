/* eslint-disable */
import {
  Handle,
  Position,
  NodeResizer,
  useReactFlow,
  NodeResizeControl,
} from "reactflow";
import { useEffect } from "react";
import { memo } from "react";
import NavigationBar from "../customComponents/Navdata/navbar";
import TableItems from "../customComponents/Tabledata/tableItem";
import FormComponent from "../customComponents/Form/FormComponent";
import SideNavbar from "../customComponents/SIdebar/SideNavbar";
import ButtonComponent from "../customComponents/Button/ButtonComponent";
import InputComponent from "../customComponents/Input/InputComponent";
import { SvgResizeIcon } from "../../../../asset/SvgsApplication";
import { RadioComponent } from "../customComponents/radio/RadioComponent";
import { TextareaComponent } from "../customComponents/textarea/TextareaComponent";
import { TimeInputComponent } from "../customComponents/Time/TimeInputComponent";
import { DateInputComponent } from "../customComponents/date/DateInputComponent";
import DropdownComponent from "../../../VPT_UFD/Custom Components/dropdown/dropdownComponent";

/**
 * Returns a React component that renders an SVG icon for node resizing.
 *
 * @return {React.Component} The SVG icon component.
 */
function ResizeIcon() {
  return <SvgResizeIcon />;
}

/**
 * Renders a custom node for the react flow visualization.
 *
 * @param {Object} props - The props object containing the id, data, isConnectable and selected properties.
 * @param {string} props.id - The id of the node.
 * @param {Object} props.data - The data associated with the node.
 * @param {boolean} props.isConnectable - Indicates whether the node is connectable.
 * @param {boolean} props.selected - Indicates whether the node is selected.
 * @return {React.Component} The custom node component.
 */
export const NavBarNode = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 70,
                width: 700,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  /**
   * Updates the position of a node in the flow based on the mouse event coordinates.
   *
   * @param {Object} e - The mouse event object containing the x and y coordinates.
   * @param {string} id - The ID of the node to be resized.
   * @return {void} This function does not return anything.
   */
  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={700}
        minHeight={70}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={700}
          minHeight={70}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <NavigationBar />
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
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});

/**
 * Table component for rendering a table node in React Flow.
 * @param {string} id - The unique identifier for the node.
 * @param {Object} data - The data object for the node.
 * @param {boolean} isConnectable - Whether the node is connectable.
 * @param {boolean} selected - Whether the node is selected.
 * @returns {JSX.Element} The rendered table node.
 */
export const Table = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 400,
                width: 700,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={700}
        minHeight={400}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={700}
          minHeight={400}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div>
        <TableItems />
      </div>
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
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});

/**
 * Form component for custom node.
 *
 * @param {string} id - The id of the node.
 * @param {object} data - The data of the node.
 * @param {boolean} isConnectable - Whether the node is connectable or not.
 * @param {boolean} selected - Whether the node is selected or not.
 * @returns {JSX.Element} The rendered form component.
 */
export const Form = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 150,
                width: 300,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={300}
        minHeight={150}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={300}
          minHeight={150}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div>
        <FormComponent />
      </div>
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
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});

/**
 * Sidebarnav component which renders the sidebar navigation.
 *
 * @param {string} id - The id of the node.
 * @param {object} data - The data of the node.
 * @param {boolean} isConnectable - Indicates if the node is connectable.
 * @param {boolean} selected - Indicates if the node is selected.
 * @returns {JSX.Element} The rendered sidebar navigation.
 */
export const Sidebarnav = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 150,
                width: 300,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={300}
        minHeight={150}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={300}
          minHeight={150}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div>
        <SideNavbar />
      </div>
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
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});

/**
 * Render a button node.
 *
 * @param {string} id - The id of the node.
 * @param {object} data - The data of the node.
 * @param {boolean} isConnectable - Whether the node is connectable.
 * @param {boolean} selected - Whether the node is selected.
 * @returns {JSX.Element} The rendered button node.
 */
export const ButtonNode = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 50,
                width: 100,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={100}
          minHeight={50}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div>
        <ButtonComponent />
      </div>
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
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
        isConnectable={isConnectable}
      />
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            // width:"100%",
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});

/**
 * A memoized component representing an input node.
 *
 * @param {string} id - The id of the node.
 * @param {object} data - The data of the node.
 * @param {boolean} isConnectable - Whether the node is connectable.
 * @param {boolean} selected - Whether the node is selected.
 * @returns {JSX.Element} The input node component.
 */
export const InputNode = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 50,
                width: 100,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={100}
          minHeight={50}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div>
        <InputComponent />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
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
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
        isConnectable={isConnectable}
      />
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            // width:"100%",
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});

/**
 * Radio group component
 *
 * @param {Object} props - The props for the component
 * @param {string} props.id - The id of the component
 * @param {Object} props.data - The data of the component
 * @param {boolean} props.isConnectable - The connectable status of the component
 * @param {boolean} props.selected - The selected status of the component
 * @returns {JSX.Element} - The rendered component
 */
export const radioGroup = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 50,
                width: 100,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={100}
          minHeight={50}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div>
        <RadioComponent />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
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
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
        isConnectable={isConnectable}
      />
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            // width:"100%",
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});

/**
 * Textarea component for custom node.
 *
 * @param {string} id - The id of the node.
 * @param {Object} data - The data of the node.
 * @param {boolean} isConnectable - Whether the node is connectable.
 * @param {boolean} selected - Whether the node is selected.
 * @return {JSX.Element} The textarea component.
 */
export const textarea = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 50,
                width: 100,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={100}
          minHeight={50}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div>
        <TextareaComponent />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
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
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
        isConnectable={isConnectable}
      />
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            // width:"100%",
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});

/**
 * React component for time input node.
 *
 * @param {string} id - The id of the node.
 * @param {object} data - The data of the node.
 * @param {boolean} isConnectable - Is the node connectable.
 * @param {boolean} selected - Is the node selected.
 * @returns {JSX.Element} - The time input node.
 */
export const timeinput = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 50,
                width: 100,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={100}
          minHeight={50}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div>
        <TimeInputComponent />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
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
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
        isConnectable={isConnectable}
      />
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            // width:"100%",
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});

/**
 * dateinput component
 * @param {string} id - id of the node
 * @param {object} data - data of the node
 * @param {boolean} isConnectable - whether the node is connectable
 * @param {boolean} selected - whether the node is selected
 * @returns {JSX.Element} - dateinput component
 */
export const dateinput = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 50,
                width: 100,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={100}
          minHeight={50}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div>
        <DateInputComponent />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
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
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
        isConnectable={isConnectable}
      />
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            // width:"100%",
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});



export const dropdown = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 50,
                width: 100,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={100}
          minHeight={50}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <div >
        <DropdownComponent />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
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
          // transform: "translate(0px,-1px) ",
          position: "absolute",
          // width: "1px",
          // height: "40%",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
        isConnectable={isConnectable}
      />
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            // width:"100%",
            textAlign: "center",
            fontSize: "8px",
            color: "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
});


/**
 * Render a TextUpdaterNode component.
 *
 * @param {string} id - The id of the node.
 * @param {object} data - The data of the node.
 * @param {boolean} isConnectable - Whether the node is connectable.
 * @param {boolean} selected - Whether the node is selected.
 * @returns {ReactNode} The rendered TextUpdaterNode component.
 */
export const TextUpdaterNode = memo(({ id, data, isConnectable, selected }) => {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  useEffect(() => {
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...node.flowToScreenPosition,
                height: 50,
                width: 100,
              },
            };
          }
          return node;
        })
      );
    });
  }, []);

  const handleReize = (e, id) => {
    const position = flowToScreenPosition({ x: e.x, y: e.y });
    setNodes((nds) => {
      return (
        nds &&
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              flowToScreenPosition: {
                ...e,
                ...position,
              },
            };
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
        onResizeEnd={(e, params) => {
          handleReize(params, id);
        }}
      />
      {selected && (
        <NodeResizeControl
          onResizeEnd={(e, params) => {
            handleReize(params, id);
          }}
          style={{
            display: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            background: "transparent",
            border: "none",
          }}
          minWidth={100}
          minHeight={50}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
});
