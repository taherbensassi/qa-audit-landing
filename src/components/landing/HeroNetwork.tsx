"use client";

import { useEffect, useRef, useCallback } from "react";

/*
  Animated network visualization — pure Canvas 2D (no Three.js, no lag).
  Shows a world-map-like constellation of nodes (call centers) connected
  by animated data-flow lines. Nodes pulse, connections glow, particles
  stream along edges — all at 60fps with requestAnimationFrame.
*/

interface Node {
  x: number;
  y: number;
  baseRadius: number;
  phase: number;
  speed: number;
  brightness: number;
}

interface Connection {
  from: number;
  to: number;
  progress: number;
  speed: number;
  delay: number;
  active: boolean;
}

interface Particle {
  connectionIndex: number;
  t: number;
  speed: number;
  size: number;
}

const NODE_COUNT = 60;
const CONNECTION_COUNT = 45;
const PARTICLE_COUNT = 25;
const ACCENT = { r: 139, g: 92, b: 246 }; // violet-500
const ACCENT2 = { r: 99, g: 102, b: 241 }; // indigo-500
const ACCENT_RED = { r: 167, g: 139, b: 250 }; // violet-400

function generateNodes(w: number, h: number): Node[] {
  const nodes: Node[] = [];
  // Create a world-map-like distribution (denser in center, sparser at edges)
  for (let i = 0; i < NODE_COUNT; i++) {
    // Gaussian-ish distribution centered in the canvas
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 0.45 + 0.05; // 5-50% from center
    const cx = w * 0.5;
    const cy = h * 0.5;
    nodes.push({
      x: cx + Math.cos(angle) * radius * w * (0.6 + Math.random() * 0.4),
      y: cy + Math.sin(angle) * radius * h * (0.5 + Math.random() * 0.5),
      baseRadius: 1.2 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5,
      brightness: 0.3 + Math.random() * 0.7,
    });
  }
  return nodes;
}

function generateConnections(nodes: Node[]): Connection[] {
  const connections: Connection[] = [];
  // Connect nearby nodes
  const dists: { i: number; j: number; d: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      dists.push({ i, j, d: Math.sqrt(dx * dx + dy * dy) });
    }
  }
  dists.sort((a, b) => a.d - b.d);
  for (let k = 0; k < Math.min(CONNECTION_COUNT, dists.length); k++) {
    connections.push({
      from: dists[k].i,
      to: dists[k].j,
      progress: 0,
      speed: 0.2 + Math.random() * 0.5,
      delay: Math.random() * 5,
      active: Math.random() > 0.3,
    });
  }
  return connections;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    connectionIndex: Math.floor(Math.random() * CONNECTION_COUNT),
    t: Math.random(),
    speed: 0.003 + Math.random() * 0.008,
    size: 1 + Math.random() * 1.5,
  }));
}

export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);
  const stateRef = useRef<{
    nodes: Node[];
    connections: Connection[];
    particles: Particle[];
    animId: number;
    mouse: { x: number; y: number };
  } | null>(null);

  /* Visibility gating — pause canvas draw loop when off-screen */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        // Resume loop when scrolling back into view
        if (entry.isIntersecting && stateRef.current) {
          stateRef.current.animId = requestAnimationFrame(draw);
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;

    // Skip drawing when off-screen
    if (!isVisibleRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const t = time * 0.001;

    ctx.clearRect(0, 0, w, h);

    const { nodes, connections, particles, mouse } = state;

    // Draw connections
    connections.forEach((conn) => {
      if (!conn.active) return;
      const a = nodes[conn.from];
      const b = nodes[conn.to];
      const pulse = 0.08 + Math.sin(t * conn.speed + conn.delay) * 0.04;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${pulse})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    // Draw particles flowing along connections
    particles.forEach((p) => {
      if (p.connectionIndex >= connections.length) return;
      const conn = connections[p.connectionIndex];
      if (!conn.active) return;
      const a = nodes[conn.from];
      const b = nodes[conn.to];

      p.t += p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.connectionIndex = Math.floor(Math.random() * connections.length);
      }

      const x = a.x + (b.x - a.x) * p.t;
      const y = a.y + (b.y - a.y) * p.t;
      const isRed = p.connectionIndex % 4 === 0; // alternate violet variants
      const col = isRed ? ACCENT_RED : ACCENT2;

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${0.4 + Math.sin(p.t * Math.PI) * 0.4})`;
      ctx.fill();
    });

    // Draw nodes (some violet-tinted for visual variety)
    nodes.forEach((node, idx) => {
      const pulse = Math.sin(t * node.speed + node.phase) * 0.5 + 0.5;
      const radius = node.baseRadius + pulse * 1.2;

      // Mouse proximity glow
      const dx = node.x - mouse.x;
      const dy = node.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / 200);

      // Pick color — alternate between violet variants
      const col = idx % 5 === 0 ? ACCENT_RED : ACCENT;

      // Outer glow
      if (proximity > 0 || pulse > 0.6) {
        const glowRadius = radius * 3;
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        const alpha = (proximity * 0.3 + pulse * 0.1) * node.brightness;
        grad.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`);
        grad.addColorStop(1, `rgba(${col.r}, ${col.g}, ${col.b}, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      const coreAlpha = (0.3 + pulse * 0.5 + proximity * 0.3) * node.brightness;
      ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${coreAlpha})`;
      ctx.fill();
    });

    state.animId = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      // Regenerate nodes for new size
      if (stateRef.current) {
        stateRef.current.nodes = generateNodes(rect.width, rect.height);
        stateRef.current.connections = generateConnections(stateRef.current.nodes);
      }
    };

    const rect = canvas.getBoundingClientRect();
    const nodes = generateNodes(rect.width, rect.height);
    stateRef.current = {
      nodes,
      connections: generateConnections(nodes),
      particles: generateParticles(),
      animId: 0,
      mouse: { x: -1000, y: -1000 },
    };

    resize();

    const handleMouse = (e: MouseEvent) => {
      if (!stateRef.current) return;
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouse.x = e.clientX - rect.left;
      stateRef.current.mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouse);
    stateRef.current.animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      if (stateRef.current) cancelAnimationFrame(stateRef.current.animId);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6, willChange: "transform" }}
    />
  );
}
