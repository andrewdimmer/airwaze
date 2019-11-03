declare interface DijstraNode {
  dist: number;
  parent: string | null;
  visited: boolean;
}

const dijstra = (
  airport: Airport,
  fromId: string,
  toName: string
): string[] => {
  if (!fromId || !toName) {
    return [];
  }
  const nodes: { [key: string]: DijstraNode } = {};
  for (const poi in airport.points) {
    nodes[poi] = { dist: -1, parent: null, visited: false };
  }
  nodes[fromId] = {
    dist: 0,
    parent: null,
    visited: false
  };
  console.log(nodes);
  for (const _ in nodes) {
    // Select the smallest distance node that has not been visited
    const { minNodeIndex, minNode } = dijstraSelectMin(nodes);
    // Update all of the adjacent nodes
    if (minNode) {
      const minNodePoi = airport.points[minNodeIndex];
      nodes[minNodeIndex].visited = true;
      for (const nodeIndex of minNodePoi.connected) {
        // TODO: Add if for transit lines here
        const currentNodePoi = airport.points[nodeIndex];
        const oldDist = nodes[nodeIndex].dist;
        let newDist = minNode.dist;
        if (
          minNodePoi.x >= 0 &&
          minNodePoi.x >= 0 &&
          currentNodePoi.x >= 0 &&
          currentNodePoi.y >= 0
        ) {
          const xDiff = minNodePoi.x - currentNodePoi.x;
          const yDiff = minNodePoi.y - currentNodePoi.y;
          newDist += (xDiff * xDiff + yDiff * yDiff) ** (1 / 2);
        }
        if (oldDist < 0 || oldDist > newDist) {
          nodes[nodeIndex] = {
            dist: newDist,
            parent: minNodeIndex,
            visited: nodes[nodeIndex].visited
          };
        }
      }
    }
    console.log(minNodeIndex + " Success");
  }
  let toId: string | null = null;
  for (const poiIndex in airport.points) {
    const poiData = airport.points[poiIndex];
    if (poiData.name === toName) {
      if (!toId || nodes[toId].dist < nodes[poiIndex].dist) {
        toId = poiIndex;
      }
    } else if (poiData.category === toName) {
      if (!toId || nodes[toId].dist > nodes[poiIndex].dist) {
        toId = poiIndex;
      }
    }
  }
  let currentNodeIndex: string | null = toId;
  const path: string[] = [];
  while (currentNodeIndex) {
    path.unshift(currentNodeIndex);
    currentNodeIndex = nodes[currentNodeIndex].parent;
  }
  return path;
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
