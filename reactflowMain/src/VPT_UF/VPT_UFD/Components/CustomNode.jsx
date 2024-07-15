import { Handle, Position, NodeResizer, NodeResizeControl } from "reactflow";
import { memo } from "react";
import NavigationBar from "../Custom Components/Navdata/navbar";
import TableItems from "../Custom Components/Tabledata/tableItem";
import FormComponent from "../Custom Components/Form/FormComponent";
import SideNavbar from "../Custom Components/SIdebar/SideNavbar";
import ButtonComponent from "../Custom Components/Button/ButtonComponent";
import InputComponent from "../Custom Components/Input/InputComponent";
import { RadioComponent } from "../Custom Components/radio/RadioComponent";
import { TextareaComponent } from "../Custom Components/textarea/TextareaComponent";
import { TimeInputComponent } from "../Custom Components/Time/TimeInputComponent";
import { DateInputComponent } from "../Custom Components/date/DateInputComponent";
import { SvgResizeIcon } from "../../../asset/SvgsApplication";
import DropdownComponent from "../Custom Components/dropdown/dropdownComponent";

/**
 * Returns a React component that renders an SVG icon for node resizing.
 *
 * @return {React.Component} The SVG icon component.
 */
function ResizeIcon() {
  return (
    <SvgResizeIcon/>
  );
}

/**
 * Renders a custom node with a navigation bar and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the node.
 * @param {Object} props.data - The data of the node.
 * @param {boolean} props.isConnectable - Whether the node is connectable.
 * @param {boolean} props.selected - Whether the node is selected.
 * @return {React.Component} The custom node component.
 */
export const NavBarNode = memo(({ id, data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative " style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={700}
        minHeight={70}
      />
      {selected && (
        <NodeResizeControl
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
 * Renders a custom table node with table items and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the table.
 * @param {boolean} props.isConnectable - Whether the table is connectable.
 * @param {boolean} props.selected - Whether the table is selected.
 * @return {React.Component} The custom table component.
 */
export const Table = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={700}
        minHeight={400}
      />
      {selected && (
        <NodeResizeControl
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
 * Renders a custom form node with a form component and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the form.
 * @param {boolean} props.isConnectable - Whether the form is connectable.
 * @param {boolean} props.selected - Whether the form is selected.
 * @return {React.Component} The custom form component.
 */
export const Form = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={300}
        minHeight={150}
      />
      {selected && (
        <NodeResizeControl
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
 * Renders a custom sidebar navigation node with a sidebar navigation component and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the sidebar navigation.
 * @param {boolean} props.isConnectable - Whether the sidebar navigation is connectable.
 * @param {boolean} props.selected - Whether the sidebar navigation is selected.
 * @return {React.Component} The custom sidebar navigation component.
 */
export const Sidebarnav = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={300}
        minHeight={150}
      />
      {selected && (
        <NodeResizeControl
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
 * Renders a custom button node with a button component and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the button node.
 * @param {boolean} props.isConnectable - Whether the button node is connectable.
 * @param {boolean} props.selected - Whether the button node is selected.
 * @return {React.Component} The custom button node component.
 */
export const ButtonNode = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      {selected && (
        <NodeResizeControl
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
 * Renders a custom input node with an input component and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the input node.
 * @param {boolean} props.isConnectable - Whether the input node is connectable.
 * @param {boolean} props.selected - Whether the input node is selected.
 * @return {React.Component} The custom input node component.
 */
export const InputNode = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      {selected && (
        <NodeResizeControl
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
 * Renders a custom radio group node with a radio component and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the radio group node.
 * @param {boolean} props.isConnectable - Whether the radio group node is connectable.
 * @param {boolean} props.selected - Whether the radio group node is selected.
 * @return {React.Component} The custom radio group node component.
 */
export const radioGroup = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      {selected && (
        <NodeResizeControl
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
 * Renders a custom textarea node with a textarea component and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the textarea node.
 * @param {boolean} props.isConnectable - Whether the textarea node is connectable.
 * @param {boolean} props.selected - Whether the textarea node is selected.
 * @return {React.Component} The custom textarea node component.
 */
export const textarea = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      {selected && (
        <NodeResizeControl
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
 * Renders a custom time input node with a time input component and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the time input node.
 * @param {boolean} props.isConnectable - Whether the time input node is connectable.
 * @param {boolean} props.selected - Whether the time input node is selected.
 * @return {React.Component} The custom time input node component.
 */
export const timeinput = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      {selected && (
        <NodeResizeControl
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
 * Renders a custom date input node with a date input component and handles for source and target connections.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the date input node.
 * @param {boolean} props.isConnectable - Whether the date input node is connectable.
 * @param {boolean} props.selected - Whether the date input node is selected.
 * @return {React.Component} The custom date input node component.
 */
export const dateinput = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      {selected && (
        <NodeResizeControl
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


export const dropdown = memo(({ data, isConnectable, selected }) => {
  return (
    <div className="custom-node-img relative" style={{ height: "100%" }}>
      <NodeResizer
        lineStyle={{ border: "4px solid #ff0071" }}
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      {selected && (
        <NodeResizeControl
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
