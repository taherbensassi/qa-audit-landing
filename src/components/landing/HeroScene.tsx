"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Float, Stars, Line } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Neural Network Globe — nodes on a sphere + animated connections   */
/* ------------------------------------------------------------------ */

const NODE_COUNT = 120;
const CONNECTIONS = 180;
const GLOBE_RADIUS = 2.8;
const PARTICLE_COUNT = 300;

function generateSpherePoints(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    pts.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )
    );
  }
  return pts;
}

/* ----------  Nodes (pulsing dots on the sphere)  ---------- */
function Nodes({ points }: { points: THREE.Vector3[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const baseScales = useMemo(
    () => points.map(() => 0.6 + Math.random() * 0.8),
    [points]
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    points.forEach((p, i) => {
      dummy.position.copy(p);
      const pulse = 1 + Math.sin(t * 2 + i * 0.5) * 0.3;
      const s = 0.025 * baseScales[i] * pulse;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, points.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.9} />
    </instancedMesh>
  );
}

/* ----------  Connections (animated lines between nearby nodes)  ---------- */
function Connections({ points }: { points: THREE.Vector3[] }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const { positions, pairs } = useMemo(() => {
    const pairs: [number, number][] = [];
    const dists: { i: number; j: number; d: number }[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        dists.push({ i, j, d: points[i].distanceTo(points[j]) });
      }
    }
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < Math.min(CONNECTIONS, dists.length); k++) {
      pairs.push([dists[k].i, dists[k].j]);
    }
    const positions = new Float32Array(pairs.length * 6);
    pairs.forEach(([a, b], idx) => {
      positions[idx * 6] = points[a].x;
      positions[idx * 6 + 1] = points[a].y;
      positions[idx * 6 + 2] = points[a].z;
      positions[idx * 6 + 3] = points[b].x;
      positions[idx * 6 + 4] = points[b].y;
      positions[idx * 6 + 5] = points[b].z;
    });
    return { positions, pairs };
  }, [points]);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.12 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.15} />
    </lineSegments>
  );
}

/* ----------  Floating particles around the globe  ---------- */
function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const arr = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = GLOBE_RADIUS + 0.5 + Math.random() * 2.5;
      const speed = 0.1 + Math.random() * 0.4;
      const offset = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr.push({ radius, speed, offset, phi });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    data.forEach((p, i) => {
      const theta = t * p.speed + p.offset;
      dummy.position.set(
        p.radius * Math.sin(p.phi) * Math.cos(theta),
        p.radius * Math.sin(p.phi) * Math.sin(theta),
        p.radius * Math.cos(p.phi)
      );
      const s = 0.008 + Math.sin(t * 3 + i) * 0.004;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#c4b5fd" transparent opacity={0.6} />
    </instancedMesh>
  );
}

/* ----------  Data flow arcs (audio waveform-like arcs)  ---------- */
function DataArcs() {
  const groupRef = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const result: { curve: THREE.CatmullRomCurve3; speed: number; delay: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const startPhi = Math.random() * Math.PI;
      const startTheta = Math.random() * Math.PI * 2;
      const endPhi = Math.random() * Math.PI;
      const endTheta = Math.random() * Math.PI * 2;
      const r = GLOBE_RADIUS;
      const start = new THREE.Vector3(
        r * Math.sin(startPhi) * Math.cos(startTheta),
        r * Math.sin(startPhi) * Math.sin(startTheta),
        r * Math.cos(startPhi)
      );
      const end = new THREE.Vector3(
        r * Math.sin(endPhi) * Math.cos(endTheta),
        r * Math.sin(endPhi) * Math.sin(endTheta),
        r * Math.cos(endPhi)
      );
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(r * 1.4);
      result.push({
        curve: new THREE.CatmullRomCurve3([start, mid, end]),
        speed: 0.3 + Math.random() * 0.5,
        delay: Math.random() * 5,
      });
    }
    return result;
  }, []);

  return (
    <group ref={groupRef}>
      {arcs.map((arc, i) => (
        <ArcLine key={i} curve={arc.curve} speed={arc.speed} delay={arc.delay} />
      ))}
    </group>
  );
}

function ArcLine({ curve, speed, delay }: { curve: THREE.CatmullRomCurve3; speed: number; delay: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const totalPoints = 64;
  const points = useMemo(() => curve.getPoints(totalPoints).map(p => [p.x, p.y, p.z] as [number, number, number]), [curve]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = ((clock.getElapsedTime() - delay) * speed) % 1;
    if (t < 0) return;
    groupRef.current.children.forEach(child => {
      const mat = (child as THREE.Mesh).material as THREE.Material;
      if (mat) mat.opacity = 0.4 * Math.sin(t * Math.PI);
    });
  });

  return (
    <group ref={groupRef}>
      <Line points={points} color="#a78bfa" transparent opacity={0.3} lineWidth={1} />
    </group>
  );
}

/* ----------  Globe wrapper with rotation + mouse follow  ---------- */
function GlobeGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const points = useMemo(() => generateSpherePoints(NODE_COUNT, GLOBE_RADIUS), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // slow auto-rotation
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    // mouse follow
    groupRef.current.rotation.y += pointer.x * 0.15;
    groupRef.current.rotation.x += pointer.y * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.05, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.03} wireframe />
      </mesh>
      <Nodes points={points} />
      <Connections points={points} />
      <Particles />
      <DataArcs />
    </group>
  );
}

/* ----------  Main scene export  ---------- */
export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#a78bfa" />
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
          <GlobeGroup />
        </Float>
        <Stars
          radius={15}
          depth={30}
          count={1500}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
}
