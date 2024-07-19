import { Handle, Position } from "reactflow";
import { useContext } from "react";
import { VscCode } from "react-icons/vsc";
import { GiHumanPyramid } from "react-icons/gi";
import { AiOutlineApartment } from "react-icons/ai";
import { FaDocker, FaRegStopCircle } from "react-icons/fa";
import { MdOutlineNotStarted } from "react-icons/md";
import { GrMysql } from "react-icons/gr";
import { SiApachekafka, SiPostgresql } from "react-icons/si";
import { RxInput } from "react-icons/rx";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { SvgApiCustomNode } from "../../../asset/SvgsApplication";

/**
 * Renders an custom node with customizable appearance and behavior.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.data - The data object containing node information.
 * @param {boolean} props.isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered API node.
 */
export function ApiNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);
  return (
    <div
      className="custom-node"
      style={{
        border: "1px solid" + data.nodeColor,
        backgroundColor: darkMode ? "transparent" : "#F0EEED",
      }}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3px",
          marginBottom: "-5px",
        }}
      >
        <SvgApiCustomNode nodeColor={data.nodeColor}/>
      </span>

      {isConnectable && (
        <>
          <Handle
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
            className="custom-node-handle"
            style={{
              position: "absolute",

              borderRadius: "50%",
              backgroundColor: data.nodeColor,
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
              backgroundColor: data.nodeColor,
            }}
            isConnectable={isConnectable}
          />
        </>
      )}
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: darkMode ? "white" : "black",
          textAlign: "center",
        }}
      >
        <label
          title={isConnectable ? data.label : data?.nodeType}
          style={{
            textAlign: "center",
            fontSize: "8px",
            color: darkMode ? "white" : "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {isConnectable ? data.label : data?.nodeType}
        </label>
      </div>
    </div>
  );
}

/**
 * Renders a decision node with customizable appearance and behavior.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.data - The data object containing node information.
 * @param {boolean} props.isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered decision node.
 */
export function DecisionNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div
      className="custom-node"
      style={{
        border: "1px solid" + data.nodeColor,
        backgroundColor: darkMode ? "transparent" : "#F0EEED",
      }}
    >
      {
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3px",
            marginBottom: "-5px",
          }}
        >
          <AiOutlineApartment color={darkMode ? "#CCCCCC" : "gray"} size={22} />
        </span>
      }
      {isConnectable && (
        <>
          <Handle
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
            className="custom-node-handle"
            style={{
              position: "absolute",

              borderRadius: "50%",
              backgroundColor: data?.nodeColor,
            }}
          />

          <Handle
            type="source"
            position={Position.Right}
            id="a"
            className="custom-node-handle"
            style={{
              position: "absolute",

              borderRadius: "50%",
              backgroundColor: data?.nodeColor,
            }}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            className="custom-node-handle"
            style={{
              position: "absolute",

              borderRadius: "50%",
              backgroundColor: data?.nodeColor,
            }}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position={Position.Top}
            id="c"
            className="custom-node-handle"
            style={{
              position: "absolute",

              borderRadius: "50%",
              backgroundColor: data?.nodeColor,
            }}
            isConnectable={isConnectable}
          />
        </>
      )}
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: darkMode ? "white" : "black",
          textAlign: "center",
        }}
      >
        <label
          title={isConnectable ? data.label : data?.nodeType}
          style={{
            textAlign: "center",
            fontSize: "8px",
            color: darkMode ? "white" : "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {isConnectable ? data.label : data?.nodeType}
        </label>
      </div>
    </div>
  );
}

/**
 * Renders an EndNode component with customizable appearance and behavior.
 *
 * @param {Object} data - The data object containing node information.
 * @param {boolean} isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered EndNode component.
 */
export function EndNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: `1px solid #FFA09A`,
          backgroundColor: darkMode ? "transparent" : "#F0EEED",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: data.label !== "" ? "3px" : "",
              marginBottom: data.label !== "" ? "-5px" : "",
            }}
          >
            <FaRegStopCircle color={darkMode ? "white" : "gray"} size={22} />
          </span>
        }
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            position: "absolute",
            borderRadius: "50%",
            backgroundColor: data.nodeColor,
          }}
        />
        <div
          style={{
            fontSize: "8px",
            color: darkMode ? "white" : "black",
            fontFamily: "monospace",
          }}
        >
          <label title={isConnectable ? "End" : data?.nodeType} htmlFor="text">
            {isConnectable ? "End" : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a StartNode component with customizable appearance and behavior.
 *
 * @param {Object} data - The data object containing node information.
 * @param {boolean} isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered StartNode component.
 */
export function StartNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          backgroundColor: darkMode ? "transparent" : "#F0EEED",

          border: `1px solid #83E283`,
        }}
      >
        {<MdOutlineNotStarted color={darkMode ? "white" : "gray"} size={22} />}
        <label
          title={isConnectable ? "Start" : data?.nodeType}
          style={{
            fontSize: "8px",
            color: darkMode ? "white" : "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {isConnectable ? "Start" : data?.nodeType}
        </label>

        {isConnectable && (
          <Handle
            type="source"
            position={Position.Right}
            id="b"
            isConnectable={isConnectable}
            className="custom-node-handle"
            style={{
              position: "absolute",

              borderRadius: "50%",
              backgroundColor: data.nodeColor,
            }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Renders a DefaultNode component with customizable appearance and behavior.
 *
 * @param {Object} data - The data object containing node information.
 * @param {boolean} isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered DefaultNode component.
 */
export function DefaultNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div
      className="custom-node"
      style={{
        backgroundColor: darkMode ? "transparent" : "#F0EEED",
      }}
    >
      {isConnectable && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            position: "absolute",

            borderRadius: "50%",
            backgroundColor: data.nodeColor,
          }}
        />
      )}
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: "10px",
        }}
      >
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkMode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkMode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>

      {isConnectable && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          className="custom-node-handle"
          style={{
            position: "absolute",

            borderRadius: "50%",
            backgroundColor: data.nodeColor,
          }}
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
}

/**
 * Renders a custom database node component with customizable appearance and behavior.
 *
 * @param {Object} props - The properties object containing the data and isConnectable parameters.
 * @param {Object} props.data - The data object containing node information.
 * @param {boolean} props.isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered custom database node component.
 */
export function DatabaseNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node "
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkMode ? "transparent" : "#F0EEED",
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: data.label !== "" ? "3px" : "",
            marginBottom: data.label !== "" ? "-5px" : "",
          }}
        >
          <GrMysql color={darkMode ? "white" : "gray"} size={22} />
        </span>
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                position: "absolute",

                borderRadius: "50%",
                backgroundColor: data.nodeColor,
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
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkMode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkMode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a custom Kafka node component with customizable appearance and behavior.
 *
 * @param {Object} props - The properties object containing the data and isConnectable parameters.
 * @param {Object} props.data - The data object containing node information.
 * @param {boolean} props.isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered custom Kafka node component.
 */
export function KafkaNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkMode ? "transparent" : "#F0EEED",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: data.label !== "" ? "3px" : "",
              marginBottom: data.label !== "" ? "-5px" : "",
            }}
          >
            <SiApachekafka color={darkMode ? "#CCCCCC" : "gray"} size={22} />
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                position: "absolute",

                borderRadius: "50%",
                backgroundColor: data.nodeColor,
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
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkMode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkMode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a custom Postgres node component with customizable appearance and behavior.
 *
 * @param {Object} data - The data object containing node information.
 * @param {boolean} isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered custom Postgres node component.
 */
export function PostgresNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          boxShadow: `  0 0 1px 1px ${data.nodeColor}`,
          backgroundColor: darkMode ? "transparent" : "#F1EFEF",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginBottom: "-5px",
            }}
          >
            <SiPostgresql color={darkMode ? "white" : "gray"} size={22} />
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                position: "absolute",

                borderRadius: "50%",
                backgroundColor: data.nodeColor,
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
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkMode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkMode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a custom Docker node component with customizable appearance and behavior.
 *
 * @param {Object} data - The data object containing node information.
 * @param {boolean} isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered custom Docker node component.
 */
export function DockerNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkMode ? "transparent" : "#F1EFEF",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: data.label !== "" ? "3px" : "",
              marginBottom: data.label !== "" ? "-5px" : "",
            }}
          >
            <FaDocker color={darkMode ? "#CCCCCC" : "gray"} size={22} />
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                position: "absolute",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
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
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkMode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkMode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders an InputNode component with custom styling and behavior.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.data - The data object containing information about the node.
 * @param {boolean} props.isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered InputNode component.
 */
export function InputNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkMode ? "transparent" : "#F1EFEF",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginBottom: "-5px",
            }}
          >
            <RxInput color={darkMode ? "white" : "gray"} size={22} />
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                position: "absolute",

                borderRadius: "50%",
                backgroundColor: data.nodeColor,
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
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkMode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkMode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a custom Output node component with customizable appearance and behavior.
 *
 * @param {Object} data - The data object containing node information.
 * @param {boolean} isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered custom Output node component.
 */
export function OutputNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkMode ? "transparent" : "#F1EFEF",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginBottom: "-5px",
            }}
          >
            <LiaLaptopCodeSolid
              color={darkMode ? "#CCCCCC" : "gray"}
              size={22}
            />
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                position: "absolute",

                borderRadius: "50%",
                backgroundColor: data.nodeColor,
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
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkMode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              fontSize: "8px",
              color: darkMode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a custom code node component with customizable appearance and behavior.
 *
 * @param {Object} data - The data object containing node information.
 * @param {boolean} isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered custom code node component.
 */
export function CustomCode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkMode ? "transparent" : "#F1EFEF",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: data.label !== "" ? "3px" : "",
              marginBottom: data.label !== "" ? "-5px" : "",
            }}
          >
            <VscCode color={data.nodeColor} size={20} />
          </span>
        }
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            position: "absolute",

            borderRadius: "50%",
            backgroundColor: data.nodeColor,
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
            backgroundColor: data.nodeColor,
          }}
          isConnectable={isConnectable}
        />
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkMode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              fontSize: "8px",
              color: darkMode ? "white" : "black",
            }}
            htmlFor=""
          >
            {data.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a custom human task node component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data object containing node information.
 * @param {boolean} props.isConnectable - Indicates if the node is connectable.
 * @return {JSX.Element} The rendered custom human task node component.
 */
export function HumanTaskNode({ data, isConnectable }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + (data.nodeColor || "#ccc"),
          backgroundColor: darkMode ? "transparent" : "#F1EFEF",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: data.label !== "" ? "3px" : "",
              marginBottom: data.label !== "" ? "-5px" : "",
            }}
          >
            <GiHumanPyramid color={data.nodeColor || "#ccc"} size={20} />
          </span>
        }
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            position: "absolute",

            borderRadius: "50%",
            backgroundColor: data.nodeColor || "#ccc",
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
            backgroundColor: data.nodeColor || "#ccc",
          }}
          isConnectable={isConnectable}
        />
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkMode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              fontSize: "8px",
              color: darkMode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {data.label}
          </label>
        </div>
      </div>
    </div>
  );
}
