import { useEffect } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
} from "d3-force";
import {
  useReactFlow,
  useStore,
} from "reactflow";


/**
 * Returns the total count of elements in the state, which includes the number of nodes and edges.
 *
 * @param {Object} state - The state object containing the nodeInternals and edges arrays.
 * @return {number} The total count of elements in the state.
 */
const elementCountSelector = (state) =>
  state.nodeInternals.size + state.edges.length;

/**
 * Returns whether all nodes in the state have width and height properties.
 *
 * @param {Object} state - The state object containing the nodeInternals array.
 * @return {boolean} True if all nodes have width and height, false otherwise.
 */
const nodesInitializedSelector = (state) =>
  Array.from(state.nodeInternals.values()).every(
    (node) => node.width && node.height
  ) && state.nodeInternals.size;

/**
 * Initializes and runs a force-directed layout simulation for a given set of nodes and edges.
 *
 * @param {Object} options - The options object for the force layout.
 * @param {number} options.strength - The strength of the charge force.
 * @param {number} options.distance - The ideal distance between linked nodes.
 * @param {Array<Object>} options.nodes - The array of nodes to be laid out.
 * @param {Array<Object>} options.edges - The array of edges connecting nodes.
 * @return {void}
 */
function useForceLayout({ strength, distance, nodes, edges }) {
  const elementCount = useStore(elementCountSelector);
  const nodesInitialized = useStore(nodesInitializedSelector);
  const { setNodes, getNodes, getEdges } = useReactFlow();

  useEffect(() => {
    if (!nodes.length || !nodesInitialized) {
      return;
    }
    const simulationNodes =nodes && nodes.length > 0 && nodes.map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));
    const simulationLinks = edges && edges.length > 0 && edges.map((edge) => edge);
    const simulation = forceSimulation()
      .nodes(simulationNodes)
      .force("charge", forceManyBody().strength(strength))
      .force(
        "link",
        forceLink(simulationLinks)
          .id((d) => d.id)
          .strength(0.05)
          .distance(distance)
      )
      .force("x", forceX().x(0).strength(0.08))
      .force("y", forceY().y(0).strength(0.08))
      .on("tick", () => {
        setNodes((nodes) =>
          nodes && nodes.length > 0 && nodes.map((node, i) => {
            const { x, y } = simulationNodes[i];

            if (node.dragging) {
              simulationNodes[i].fx = node.position.x;
              simulationNodes[i].fy = node.position.y;
            }

            return { ...node, position: { x: x ?? 0, y: y ?? 0 } };
          })
        );
      });

    return () => {
      simulation.stop();
    };
  }, [
    elementCount,
    getNodes,
    getEdges,
    setNodes,
    strength,
    distance,
    nodesInitialized,
  ]);
}

export default useForceLayout;
