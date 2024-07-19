import { useContext } from "react";
import { DarkmodeContext } from "../../commonComponents/context/DarkmodeContext";
import { Handle, Position } from "reactflow";
import { SiAwsorganizations } from "react-icons/si";
import { GoOrganization } from "react-icons/go";
import { RoleNameIcon, RoleNodeIcon } from "../../asset/SvgsApplication";

export function OrgNode({ data, isConnectable, selected }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div
      className={`new-custom-node ${selected && " ring-2"} ${darkMode ? "bg-[#99ffdd]/30" : "bg-[#99ffdd]/40"} `}
      style={{
        border: darkMode
          ? "1px solid" + (data.nodeColor || "#a8f0e2")
          : "1px solid" + (data.nodeColor || "#82E0AA"),

        borderRadius: "50%",
        width: "60px",
        height: "60px",
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
          <GoOrganization size={25} color={darkMode ? "white" : "#616A6B"} />
        </span>
      }

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="new-custom-node-handle size-1"
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />

      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginTop: data.label !== "" ? "3px" : "",
          marginBottom: data.label !== "" ? "-5px" : "",
          right: "50%",
          left: "50%",

          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            fontSize: "8px",
            color: darkMode ? "white" : "#616A6B",
            fontFamily: "sans-serif",
          }}
        >
          {data.label}
        </label>
      </div>
    </div>
  );
}

export function OrgName({ data, isConnectable, selected }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div
      className={`new-custom-node ${selected && " ring-2"} bg-[#ccffee]/20 `}
      style={{
        border: "1px solid" + (data.nodeColor || "#a8f0e2"),

        borderRadius: "50%",
        width: "60px",
        height: "60px",
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
          <SiAwsorganizations
            size={25}
            color={darkMode ? "white" : "#616A6B"}
          />
        </span>
      }

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="new-custom-node-handle size-1"
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        position={Position.Top}
        id="b"
        className="new-custom-node-handle size-1"
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />

      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginTop: data.label !== "" ? "3px" : "",
          marginBottom: data.label !== "" ? "-5px" : "",
          right: "50%",
          left: "50%",

          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            fontSize: "8px",
            color: darkMode ? "white" : "#616A6B",
            fontFamily: "sans-serif",
          }}
        >
          {data.label}
        </label>
      </div>
    </div>
  );
}

export function RoleNode({ data, isConnectable, selected }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div
      className={`new-custom-node ${selected && " ring-2"} bg-[#ffffb3]/30 `}
      style={{
        border: darkMode
          ? "1px solid" + (data.nodeColor || "#ffff99")
          : "1px solid" + (data.nodeColor || "#F7DC6F"),

        borderRadius: "50%",
        width: "60px",
        height: "60px",
      }}
    >
      {
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: data.label !== "" ? "10px" : "",
            marginBottom: data.label !== "" ? "-5px" : "",
          }}
        >
          <RoleNodeIcon />
        </span>
      }

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="new-custom-node-handle size-1"
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        position={Position.Top}
        id="b"
        className="new-custom-node-handle size-1"
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />

      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginTop: data.label !== "" ? "3px" : "",
          marginBottom: data.label !== "" ? "-5px" : "",
          right: "50%",
          left: "50%",

          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            fontSize: "8px",
            color: darkMode ? "white" : "#616A6B",
            fontFamily: "sans-serif",
          }}
        >
          {data.label}
        </label>
      </div>
    </div>
  );
}

export function RoleName({ data, isConnectable, selected }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div
      className={`new-custom-node ${selected && " ring-2"} bg-[#ffffb3]/20 `}
      style={{
        border: "1px solid" + (data.nodeColor || "#ffff99"),
        // borderWidth: "2px",
        // backgroundColor: darkMode ? "	 #ffffb3" : "	 #ffffb3",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
      }}
    >
      {
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: data.label !== "" ? "5px" : "",
            marginBottom: data.label !== "" ? "-5px" : "",
          }}
        >
          <RoleNameIcon />
        </span>
      }

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="new-custom-node-handle size-1"
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        position={Position.Top}
        id="b"
        className="new-custom-node-handle size-1"
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />

      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginTop: data.label !== "" ? "3px" : "",
          marginBottom: data.label !== "" ? "-5px" : "",
          right: "50%",
          left: "50%",

          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            fontSize: "6px",
            color: darkMode ? "white" : "black",
            fontFamily: "sans-serif",
          }}
        >
          {data.label}
        </label>
      </div>
    </div>
  );
}

export function PsNode({ data, isConnectable, selected }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div
      className={`new-custom-node ${selected && " ring-2"} bg-[#ffb3d9]/30 `}
      style={{
        border: "1px solid " + (data.nodeColor || " #ff99cc"),

        // backgroundColor: darkMode ? " #ffb3d9" : " #ffb3d9",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
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
          <SiAwsorganizations
            size={25}
            color={darkMode ? "white" : "#616A6B"}
          />
        </span>
      }

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="new-custom-node-handle size-1"
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        className="new-custom-node-handle  size-1 "
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />

      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginTop: data.label !== "" ? "3px" : "",
          marginBottom: data.label !== "" ? "-5px" : "",
          right: "50%",
          left: "50%",

          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            fontSize: "8px",
            color: darkMode ? "white" : "#616A6B",
            fontFamily: "sans-serif",
          }}
        >
          {data.label}
        </label>
      </div>
    </div>
  );
}

export function PsName({ data, isConnectable, selected }) {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div
      className={`new-custom-node ${selected && " ring-2"} bg-[#ffcce6]/20 `}
      style={{
        border: "1px solid" + (data.nodeColor || " #ff99cc"),

        // backgroundColor: darkMode ? "#ffcce6" : " #ffcce6",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
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
          <SiAwsorganizations
            size={25}
            color={darkMode ? "white" : "#616A6B"}
          />
        </span>
      }

      <Handle
        type="target"
        position={Position.Top}
        id="a"
        className="new-custom-node-handle size-1"
        style={{
          position: "absolute",

          borderRadius: "50%",
        }}
        isConnectable={isConnectable}
      />

      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginTop: data.label !== "" ? "3px" : "",
          marginBottom: data.label !== "" ? "-5px" : "",
          right: "50%",
          left: "50%",

          textAlign: "center",
        }}
      >
        <label
          title={data.label}
          style={{
            fontSize: "8px",
            color: darkMode ? "white" : "#616A6B",
            fontFamily: "sans-serif",
          }}
        >
          {data.label}
        </label>
      </div>
    </div>
  );
}
