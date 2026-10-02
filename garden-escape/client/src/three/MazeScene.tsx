import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Maze, PlayerRole, PlayersState } from '../types';

const CELL = 4;
const WALL_H = 3;

const ROLE_COLORS: Record<PlayerRole, string> = {
  HR: '#22c55e', MARKETING: '#3b82f6', FINANCE: '#eab308', OPERATIONS: '#ef4444'
};
const FORWARD_VEC: Record<string, [number, number, number]> = {
  N: [0, 0, -1], S: [0, 0, 1], E: [1, 0, 0], W: [-1, 0, 0]
};

function nodePos(maze: Maze, id: number): [number, number, number] {
  const n = maze.nodes[id];
  return [n.col * CELL, 0, n.row * CELL];
}

function Ground({ maze }: { maze: Maze }) {
  const size = maze.size * CELL;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[size / 2 - CELL / 2, -0.01, size / 2 - CELL / 2]} receiveShadow>
      <planeGeometry args={[size + CELL, size + CELL]} />
      <meshStandardMaterial color="#5fae4c" />
    </mesh>
  );
}

function Hedges({ maze }: { maze: Maze }) {
  const walls = useMemo(() => {
    const segs: { pos: [number, number, number]; rotY: number }[] = [];
    maze.nodes.forEach((n) => {
      const cx = n.col * CELL, cz = n.row * CELL;
      if (!n.open.N) segs.push({ pos: [cx, WALL_H / 2, cz - CELL / 2], rotY: 0 });
      if (!n.open.S) segs.push({ pos: [cx, WALL_H / 2, cz + CELL / 2], rotY: 0 });
      if (!n.open.E) segs.push({ pos: [cx + CELL / 2, WALL_H / 2, cz], rotY: Math.PI / 2 });
      if (!n.open.W) segs.push({ pos: [cx - CELL / 2, WALL_H / 2, cz], rotY: Math.PI / 2 });
    });
    return segs;
  }, [maze]);

  return (
    <group>
      {walls.map((w, i) => (
        <mesh key={i} position={w.pos} rotation={[0, w.rotY, 0]} castShadow receiveShadow>
          <boxGeometry args={[CELL, WALL_H, 0.4]} />
          <meshStandardMaterial color="#2f6b2f" />
        </mesh>
      ))}
    </group>
  );
}

function StartFinishMarkers({ maze }: { maze: Maze }) {
  const s = nodePos(maze, maze.start);
  const f = nodePos(maze, maze.finish);
  return (
    <>
      <mesh position={[s[0], 0.02, s[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 32]} /><meshStandardMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[f[0], 0.02, f[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 32]} /><meshStandardMaterial color="#fbbf24" />
      </mesh>
    </>
  );
}

function PlayerMarker({ pos, color }: { pos: [number, number, number]; color: string }) {
  return (
    <mesh position={[pos[0], 0.6, pos[2]]}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
}

function AdminCamera({ maze }: { maze: Maze }) {
  const { camera } = useThree();
  const size = maze.size * CELL;
  camera.position.set(size / 2, size * 1.1, size / 2 + 2);
  camera.lookAt(size / 2, 0, size / 2);
  return null;
}

function FirstPersonRig({ maze, node, facing }: { maze: Maze; node: number; facing: string }) {
  const { camera } = useThree();
  const anim = useRef({
    from: new THREE.Vector3(...nodePos(maze, node)),
    to: new THREE.Vector3(...nodePos(maze, node)),
    fromF: new THREE.Vector3(...FORWARD_VEC[facing]),
    toF: new THREE.Vector3(...FORWARD_VEC[facing]),
    start: performance.now(), dur: 800
  });
  const lastNode = useRef(node);
  const lastFacing = useRef(facing);

  if (lastNode.current !== node || lastFacing.current !== facing) {
    const prevForward = FORWARD_VEC[lastFacing.current];
    anim.current.from.copy(anim.current.to);
    anim.current.fromF.set(...prevForward);
    anim.current.to.set(...nodePos(maze, node));
    anim.current.toF.set(...FORWARD_VEC[facing]);
    anim.current.start = performance.now();
    lastNode.current = node;
    lastFacing.current = facing;
  }

  useFrame(() => {
    const a = anim.current;
    const t = Math.min(1, (performance.now() - a.start) / a.dur);
    const pos = new THREE.Vector3().lerpVectors(a.from, a.to, t);
    pos.y = 1.6;
    camera.position.copy(pos);
    const fwd = new THREE.Vector3().lerpVectors(a.fromF, a.toF, t).normalize();
    camera.lookAt(pos.clone().add(fwd));
  });
  return null;
}

export default function MazeScene({
  maze, players, mode, selfRole
}: { maze: Maze; players: PlayersState; mode: 'admin' | 'player'; selfRole?: PlayerRole }) {
  return (
    <Canvas shadows camera={{ fov: 70 }} style={{ position: 'absolute', inset: 0 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} castShadow />
      <Ground maze={maze} />
      <Hedges maze={maze} />
      <StartFinishMarkers maze={maze} />

      {mode === 'admin' && (
        <>
          <AdminCamera maze={maze} />
          <OrbitControls />
          {Object.values(players).map((p) => (
            <PlayerMarker key={p.role} pos={nodePos(maze, p.currentNode)} color={ROLE_COLORS[p.role]} />
          ))}
        </>
      )}

      {mode === 'player' && selfRole && (
        <FirstPersonRig maze={maze} node={players[selfRole].currentNode} facing={players[selfRole].facing} />
      )}
    </Canvas>
  );
}