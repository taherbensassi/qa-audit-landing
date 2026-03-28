"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated brand mark */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute keep-round border border-violet-500/30"
                initial={{ width: 40, height: 40, opacity: 0 }}
                animate={{
                  width: [40, 120 + i * 40],
                  height: [40, 120 + i * 40],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Center logo dot */}
            <motion.div
              className="relative h-4 w-4 bg-violet-500 keep-round"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            {/* Loading bar */}
            <motion.div
              className="mt-12 h-0.5 bg-violet-500/50 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="h-full bg-violet-400"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <motion.p
              className="font-mono text-xs tracking-widest uppercase text-violet-400/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Initializing AI
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
