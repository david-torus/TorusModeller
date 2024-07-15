import { Handle, Position } from "reactflow";
import { useContext } from "react";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { VscCode } from "react-icons/vsc";
import { GiHumanPyramid } from "react-icons/gi";
import { GrMysql } from "react-icons/gr";
import { SiApachekafka, SiPostgresql } from "react-icons/si";
import { FaDocker, FaRegStopCircle } from "react-icons/fa";
import { RxInput } from "react-icons/rx";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { MdOutlineNotStarted } from "react-icons/md";
import { AiOutlineApartment } from "react-icons/ai";
import { SvgApiCustomNode } from "../../../asset/SvgsApplication";

//Custom-Nodes for VPT-PF-PFD

/**
 * Renders a custom node component with a given data object. The component includes a React icon,
 * handles for connecting, and a label. The appearance of the component is determined by the
 * 'data' object, which includes properties for the node color, label, and connectability.
 *
 * @param {Object} props - The properties for the custom node component.
 * @param {Object} props.data - The data object for the custom node.
 * @param {string} props.data.nodeColor - The color of the node.
 * @param {string} props.data.label - The label of the node.
 * @param {boolean} props.isConnectable - Whether the node is connectable.
 * @param {boolean} props.selected - Whether the node is selected.
 * @return {JSX.Element} The custom node component.
 */

export function ApiNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div
      className={`custom-node  ${selected && " ring-2"} `}
      style={{
        border: "1px solid" + (data.nodeColor || "#ccc"),
        backgroundColor: darkmode ? "transparent" : "#F0EEED",
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
        <SvgApiCustomNode nodeColor={data.nodeColor} />
      </span>

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
          color: darkmode ? "white" : "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            textAlign: "center",
            fontSize: "8px",
            color: darkmode ? "white" : "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
}
export function DecisionNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);

  return (
    <div
      className={`custom-node  ${selected && " ring-2"} `}
      style={{
        border: "1px solid" + (data.nodeColor || "#ccc"),
        backgroundColor: darkmode ? "transparent" : "#F0EEED",
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
          <AiOutlineApartment color={darkmode ? "#CCCCCC" : "gray"} size={22} />
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
          backgroundColor: data.nodeColor || "#ccc",
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
          backgroundColor: data.nodeColor || "#ccc",
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
          backgroundColor: data.nodeColor || "#ccc",
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
          backgroundColor: data.nodeColor || "#ccc",
        }}
        isConnectable={isConnectable}
      />
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: darkmode ? "white" : "black",
          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            textAlign: "center",
            fontSize: "8px",
            color: darkmode ? "white" : "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {data.label}
        </label>
      </div>
    </div>
  );
}
export function EndNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);

  return (
    <div className="custom-node-img">
      <div
        className={`custom-node  ${selected && " ring-2"} `}
        style={{
          border: `1px solid #FFA09A`,
          backgroundColor: darkmode ? "transparent" : "#F0EEED",
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
            <FaRegStopCircle color={darkmode ? "white" : "gray"} size={22} />
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
            backgroundColor: data.nodeColor || "#ccc",
          }}
        />
        <div
          style={{
            fontSize: "8px",
            color: darkmode ? "white" : "black",
            fontFamily: "monospace",
          }}
        >
          <label title="End" htmlFor="text">
            End
          </label>
        </div>
      </div>
    </div>
  );
}
export function StartNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className={`custom-node  ${selected && " ring-2"} `}
        style={{
          backgroundColor: darkmode ? "transparent" : "#F0EEED",

          border: `1px solid #83E283`,
        }}
      >
        <MdOutlineNotStarted color={darkmode ? "white" : "gray"} size={22} />

        <label
          title={"Start"}
          style={{
            fontSize: "8px",
            color: darkmode ? "white" : "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          Start
        </label>

        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            position: "absolute",

            borderRadius: "50%",
            backgroundColor: data.nodeColor || "#ccc",
          }}
        />
      </div>
    </div>
  );
}
export function DefaultNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div
      className={`custom-node  ${selected && " ring-2"} `}
      style={{
        backgroundColor: darkmode ? "transparent" : "#F0EEED",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="custom-node-handle"
        style={{
          position: "absolute",

          borderRadius: "50%",
          backgroundColor: data.nodeColor || "#ccc",
        }}
      />
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
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {data.label}
          </label>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="custom-node-handle"
        style={{
          position: "absolute",

          borderRadius: "50%",
          backgroundColor: data.nodeColor || "#ccc",
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
}
export function DatabaseNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className="custom-node "
        style={{
          border: "1px solid" + (data.nodeColor || "#ccc"),
          backgroundColor: darkmode ? "transparent" : "#F0EEED",
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
          <GrMysql color={darkmode ? "white" : "gray"} size={22} />
        </span>

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
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
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
export function KafkaNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className={`custom-node  ${selected && " ring-2"} `}
        style={{
          border: "1px solid" + (data.nodeColor || "#ccc"),
          backgroundColor: darkmode ? "transparent" : "#F0EEED",
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
            <SiApachekafka color={darkmode ? "#CCCCCC" : "gray"} size={22} />
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
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
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
export function PostgresNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className={`custom-node  ${selected && " ring-2"} `}
        style={{
          boxShadow: `  0 0 1px 1px ${data.nodeColor || "#ccc"}`,
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
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
            <SiPostgresql color={darkmode ? "white" : "gray"} size={22} />
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
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
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
export function DockerNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className={`custom-node  ${selected && " ring-2"} `}
        style={{
          border: "1px solid" + (data.nodeColor || "#ccc"),
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
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
            <FaDocker color={darkmode ? "#CCCCCC" : "gray"} size={22} />
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
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
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
export function InputNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className={`custom-node  ${selected && " ring-2"} `}
        style={{
          border: "1px solid" + (data.nodeColor || "#ccc"),
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
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
            <RxInput color={darkmode ? "white" : "gray"} size={22} />
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
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
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
export function OutputNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className={`custom-node  ${selected && " ring-2"} `}
        style={{
          border: "1px solid" + (data.nodeColor || "#ccc"),
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
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
            <LiaLaptopCodeSolid
              color={darkmode ? "#CCCCCC" : "gray"}
              size={22}
            />
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
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              fontSize: "8px",
              color: darkmode ? "white" : "black",
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

export function CustomCode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className={`custom-node  ${selected && " ring-2"} `}
        style={{
          border: "1px solid" + (data.nodeColor || "#ccc"),
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
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
            <VscCode color={data.nodeColor || "#ccc"} size={20} />
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
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              fontSize: "8px",
              color: darkmode ? "white" : "black",
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
export function HumanTaskNode({ data, isConnectable, selected }) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className={`custom-node  ${selected && " ring-2"} `}
        style={{
          border: "1px solid" + (data.nodeColor || "#ccc"),
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
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
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={data.label}
            style={{
              fontSize: "8px",
              color: darkmode ? "white" : "black",
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
