"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

export function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`py-24 lg:py-32 ${className}`}
      style={{ contain: "layout style paint" }}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </motion.section>
  );
}
