declare interface DijstraNode {
  dist: number;
  parent: string | null;
  visited: boolean;
}

const dijstra = (airport: Airport, from: string, to: string): string[] => {
  const nodes: { [key: string]: DijstraNode } = {};
  for (const poi in airport.points) {
    nodes[poi] = { dist: -1, parent: null, visited: false };
  }
  nodes[from] = {
    dist: 0,
    parent: null,
    visited: false
  };
  for (const _ in nodes) {
    // Select the smallest distance node that has not been visited
    const { minNodeIndex, minNode } = dijstraSelectMin(nodes);
    // Update all of the adjacent nodes
    const minNodePoi = airport.points[minNodeIndex];
    nodes[minNodeIndex].visited = true;
    console.log(minNodeIndex, minNode);
    if (minNode) {
      for (const nodeIndex of minNodePoi.connected) {
        const currentNodePoi = airport.points[nodeIndex];
        const oldDist = nodes[nodeIndex].dist;
        const xDiff = minNodePoi.x - currentNodePoi.x;
        const yDiff = minNodePoi.y - currentNodePoi.y;
        const newDist = minNode.dist + xDiff * xDiff + yDiff * yDiff;
        if (oldDist < 0 || oldDist > newDist) {
          nodes[nodeIndex] = {
            dist: newDist,
            parent: minNodeIndex,
            visited: nodes[nodeIndex].visited
          };
        }
      }
    }
  }
  console.log(nodes);
  return [];
};

const dijstraSelectMin = (nodes: {
  [key: string]: DijstraNode;
}): { minNodeIndex: string; minNode: DijstraNode | null } => {
  let minNodeIndex: string = "";
  let minNode: DijstraNode | null = null;
  for (const nodeIndex in nodes) {
    const node = nodes[nodeIndex];
    if (!node.visited) {
      if (node.dist > -1) {
        if (!minNode || minNode.dist > node.dist) {
          minNodeIndex = nodeIndex;
          minNode = node;
        }
      }
    }
  }
  return { minNodeIndex, minNode };
};

export const findPath = dijstra;
