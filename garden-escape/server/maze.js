// Server-authoritative maze graph. NOT shown to players as a flat 2D grid UI —
// it is rendered as a real 3D hedge maze on the client. This module only
// stores the logical graph + movement math.

const DIRS = ['N', 'E', 'S', 'W'];
const DX = { N: 0, E: 1, S: 0, W: -1 };
const DZ = { N: -1, E: 0, S: 1, W: 0 };
const OPP = { N: 'S', S: 'N', E: 'W', W: 'E' };

function generateMaze(size = 6) {
  const nodes = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      nodes.push({
        id: r * size + c,
        row: r,
        col: c,
        open: { N: false, E: false, S: false, W: false },
        visited: false
      });
    }
  }
  const idx = (r, c) => r * size + c;

  // Recursive backtracker -> guarantees a solvable path from start to every cell
  const stack = [nodes[0]];
  nodes[0].visited = true;
  while (stack.length) {
    const current = stack[stack.length - 1];
    const options = [];
    for (const d of DIRS) {
      const nr = current.row + DZ[d];
      const nc = current.col + DX[d];
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        const n = nodes[idx(nr, nc)];
        if (!n.visited) options.push({ d, n });
      }
    }
    if (options.length === 0) {
      stack.pop();
      continue;
    }
    const { d, n } = options[Math.floor(Math.random() * options.length)];
    current.open[d] = true;
    n.open[OPP[d]] = true;
    n.visited = true;
    stack.push(n);
  }

  // Add some extra loop connections so junctions often offer 2-3 valid directions
  const extra = Math.floor(size * size * 0.18);
  for (let i = 0; i < extra; i++) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    const d = DIRS[Math.floor(Math.random() * 4)];
    const nr = r + DZ[d], nc = c + DX[d];
    if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
      nodes[idx(r, c)].open[d] = true;
      nodes[idx(nr, nc)].open[OPP[d]] = true;
    }
  }

  nodes.forEach((n) => delete n.visited);
  return { size, nodes, start: 0, finish: size * size - 1 };
}

function rotateCW(d) { return { N: 'E', E: 'S', S: 'W', W: 'N' }[d]; }
function rotateCCW(d) { return { N: 'W', W: 'S', S: 'E', E: 'N' }[d]; }

// Given absolute facing direction, return which RELATIVE directions
// (FORWARD/BACKWARD/LEFT/RIGHT) are actually open at this node.
function availableDirections(maze, nodeId, facing) {
  const node = maze.nodes[nodeId];
  const forward = facing;
  const backward = OPP[facing];
  const right = rotateCW(facing);
  const left = rotateCCW(facing);
  const result = [];
  if (node.open[forward]) result.push('FORWARD');
  if (node.open[backward]) result.push('BACKWARD');
  if (node.open[left]) result.push('LEFT');
  if (node.open[right]) result.push('RIGHT');
  return result;
}

// Move ONE section in a relative direction. Returns null if invalid.
function moveFromDirection(maze, nodeId, facing, relDir) {
  const map = {
    FORWARD: facing,
    BACKWARD: OPP[facing],
    LEFT: rotateCCW(facing),
    RIGHT: rotateCW(facing)
  };
  const absDir = map[relDir];
  if (!absDir) return null;
  const node = maze.nodes[nodeId];
  if (!node.open[absDir]) return null;
  const nr = node.row + DZ[absDir];
  const nc = node.col + DX[absDir];
  const newId = nr * maze.size + nc;
  return { newId, newFacing: absDir };
}

module.exports = { generateMaze, availableDirections, moveFromDirection, OPP };