"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/lib/animations";
import { CheckCircle, ArrowRight } from "lucide-react";

const { demo } = content;

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
    <Section id="demo" className="bg-white">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeInUp}
          className="relative overflow-hidden border border-violet-100 bg-white p-8 shadow-xl shadow-violet-100/10 lg:p-12"
        >
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <motion.p variants={fadeInLeft} className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600">
                {demo.label}
              </motion.p>
              <motion.h2 variants={fadeInLeft} className="mb-4 text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
                {demo.headline}
              </motion.h2>
              <motion.p variants={fadeInLeft} className="mb-8 text-base text-gray-500">
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

            <motion.div variants={fadeInRight}>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="flex flex-col items-center gap-4 border border-green-200 bg-green-50 p-8 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-green-100 keep-round">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{demo.successMessage}</p>
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
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex items-center justify-center gap-2 bg-violet-600 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : demo.cta}
                    {!loading && <ArrowRight size={16} />}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
