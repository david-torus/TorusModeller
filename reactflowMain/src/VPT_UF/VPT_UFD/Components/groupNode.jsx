import { memo } from "react";
import {
  NodeToolbar,
  useReactFlow,
  useStore,
  useStoreApi,
  NodeResizer,
} from "reactflow";
import useDetachNodes from "../../../commonComponents/react-flow-pro/dynamicGrouping/useDetachNodes";
import { getRelativeNodesBounds } from "../../../commonComponents/react-flow-pro/dynamicGrouping/utils";

const lineStyle = { borderColor: "white" };

function GroupNode({ id }) {
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();
  const { minWidth, minHeight, hasChildNodes } = useStore((store) => {
    const childNodes = Array.from(store.nodeInternals.values()).filter(
      (n) => n.parentNode === id
    );
    const rect = getRelativeNodesBounds(childNodes);
    return {
      minWidth: rect.x + rect.width,
      minHeight: rect.y + rect.height,
      hasChildNodes: childNodes.length > 0,
    };
  }, isEqual);

  /**
   * Deletes a single node with the specified ID.
   *
   * @param {Object} id - The ID of the node to delete.
   * @return {void}
   */
  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  /**
   * Detaches the group node and its child nodes from the store.
   *
   * @return {void} This function does not return anything.
   */
  const onDetach = () => {
    const childNodeIds = Array.from(store.getState().nodeInternals.values())
      .filter((n) => n.parentNode === id)
      .map((n) => n.id);
    detachNodes(childNodeIds, id);
  };

  return (
    <div>
      <NodeResizer
        lineStyle={lineStyle}
        minHeight={minHeight}
        minWidth={minWidth}
      />
      <NodeToolbar className="flex gap-2">
        <button className="text-white" onClick={onDelete}>
          Delete
        </button>
        {hasChildNodes && (
          <button className="text-white" onClick={onDetach}>
            Ungroup
          </button>
        )}
      </NodeToolbar>
    </div>
  );
}

/**
 * Compares two objects and checks if their minWidth, minHeight, and hasChildNodes properties are equal.
 *
 * @param {Object} prev - The previous object to compare.
 * @param {Object} next - The next object to compare.
 * @return {boolean} Returns true if the minWidth, minHeight, and hasChildNodes properties of the two objects are equal, otherwise returns false.
 */
function isEqual(prev, next) {
  return (
    prev.minWidth === next.minWidth &&
    prev.minHeight === next.minHeight &&
    prev.hasChildNodes === next.hasChildNodes
  );
}

export default memo(GroupNode);
