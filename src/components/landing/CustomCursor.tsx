"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setVisible(true);

    function onMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setHovering(true);
      }
    }

    function onOut() {
      setHovering(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* outer glow ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] keep-round"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: hovering ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-full w-full keep-round border border-violet-400/50 bg-violet-400/10 backdrop-blur-sm" />
      </motion.div>
      {/* inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] keep-round"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 6 : 4,
          height: hovering ? 6 : 4,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="h-full w-full keep-round bg-violet-500" />
      </motion.div>
    </>
  );
}
