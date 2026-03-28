"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/lib/animations";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

const { demo } = content;

function MagneticButton({ children, loading, type, disabled }: { children: React.ReactNode; loading: boolean; type?: "submit" | "button"; disabled?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200 });
  const springY = useSpring(y, { damping: 15, stiffness: 200 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      className="group relative mt-2 flex items-center justify-center gap-2 bg-violet-600 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30 disabled:opacity-50 animate-shimmer overflow-hidden"
    >
      {children}
    </motion.button>
  );
}

export function DemoCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="demo" className="relative bg-[#f8f8fc] overflow-hidden">
      {/* Animated floating orbs */}
      <div className="pointer-events-none absolute top-[10%] left-[5%] h-64 w-64 bg-violet-200/20 keep-round blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-[10%] right-[10%] h-48 w-48 bg-indigo-200/20 keep-round blur-3xl animate-float-delayed" />
      <div className="pointer-events-none absolute top-[40%] right-[30%] h-32 w-32 bg-purple-200/15 keep-round blur-2xl animate-float-slow" />

      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeInUp}
          className="relative overflow-hidden border border-violet-100 bg-white p-8 shadow-xl shadow-violet-100/10 lg:p-12"
        >
          {/* Decorative corner accents */}
          <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-violet-50 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 bg-gradient-to-tr from-indigo-50 to-transparent" />

          {/* Animated border */}
          <div className="pointer-events-none absolute inset-0 animate-border-glow" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Copy */}
            <div>
              <motion.p
                variants={fadeInLeft}
                className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600"
              >
                {demo.label}
              </motion.p>

              <motion.h2
                variants={fadeInLeft}
                className="mb-4 text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl"
              >
                {demo.headline}
              </motion.h2>

              <motion.p
                variants={fadeInLeft}
                className="mb-8 text-base text-gray-500"
              >
                {demo.description}
              </motion.p>

              <motion.div variants={fadeInLeft} className="space-y-3">
                {["24-hour turnaround", "No commitment required", "Your data stays secure"].map((point, i) => (
                  <motion.div
                    key={point}
                    className="flex items-center gap-3 text-sm text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <CheckCircle size={16} className="text-violet-500 flex-shrink-0" />
                    {point}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Form */}
            <motion.div variants={fadeInRight}>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="flex flex-col items-center gap-4 border border-green-200 bg-green-50 p-8 text-center"
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center bg-green-100 keep-round"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={24} className="text-green-600" />
                  </motion.div>
                  <p className="text-sm font-medium text-gray-700">
                    {demo.successMessage}
                  </p>
                  {/* Celebration sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-violet-400"
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                        opacity: 1,
                      }}
                      animate={{
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    >
                      <Sparkles size={16} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  {demo.fields.map((field, i) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          placeholder={field.label}
                          required={field.required}
                          rows={3}
                          className="w-full border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:border-violet-400 focus:bg-white focus:shadow-md focus:shadow-violet-100/50 focus:outline-none"
                        />
                      ) : (
                        <input
                          name={field.name}
                          type={field.type}
                          placeholder={field.label}
                          required={field.required}
                          className="w-full border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:border-violet-400 focus:bg-white focus:shadow-md focus:shadow-violet-100/50 focus:outline-none"
                        />
                      )}
                    </motion.div>
                  ))}
                  <MagneticButton type="submit" disabled={loading} loading={loading}>
                    {loading ? "Sending..." : demo.cta}
                    {!loading && (
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </MagneticButton>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
