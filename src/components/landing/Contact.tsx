"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideInFromLeft, slideInFromRight, blurIn, staggerContainer } from "@/lib/animations";
import { Mail, MapPin, ExternalLink, CheckCircle, X, ArrowRight } from "lucide-react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/maqdarny", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submit failed");

      form.reset();
      setSubmitSuccess(true);
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitSuccess(false), 6000);
    } catch {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--dark-bg)] py-24 lg:py-32"
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.4) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto max-w-6xl px-6"
      >
        <motion.p
          variants={blurIn}
          className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-500"
        >
          Commencer
        </motion.p>
        <motion.h2
          variants={blurIn}
          className="mb-4 text-3xl font-bold tracking-tight text-white lg:text-5xl"
          style={{ lineHeight: 1.15 }}
        >
          Envoyez-nous un appel.
          <br />
          <span className="text-violet-400">On vous retourne l&apos;audit en 24h.</span>
        </motion.h2>
        <motion.p
          variants={blurIn}
          className="mb-16 max-w-xl text-base text-zinc-400 lg:text-lg"
        >
          Gratuit, sans engagement. Voyez la différence sur vos propres données — avec vos critères d&apos;évaluation.
        </motion.p>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — contact info */}
          <motion.div variants={slideInFromLeft} className="space-y-8">
            <div className="border border-white/[0.06] bg-white/[0.02] p-8 space-y-6 hover:border-violet-500/15 transition-colors duration-500">
              <h3 className="text-base font-semibold text-white lg:text-lg">
                Informations de contact
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center bg-violet-600/15 text-violet-400 shrink-0">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Email</p>
                    <a
                      href="mailto:contact@nouraisolutions.tn"
                      className="mt-1 block text-sm text-zinc-400 transition-colors hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                    >
                      contact@nouraisolutions.tn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center bg-violet-600/15 text-violet-400 shrink-0">
                    <MapPin size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Adresse</p>
                    <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                      13, rue Taher Memmi<br />
                      Manzeh 6, Ariana<br />
                      Tunisie
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* evaVoc by NourAI */}
            <div className="border border-violet-500/20 bg-violet-600/[0.04] p-6 flex items-start gap-4">
              <div className="flex items-end gap-[3px] h-[18px] shrink-0 mt-0.5">
                <div className="w-[3px] h-[8px] bg-violet-500" />
                <div className="w-[3px] h-[16px] bg-violet-400" />
                <div className="w-[3px] h-[11px] bg-violet-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">
                  evaVoc est un produit NourAI Solutions
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  Intelligence qualité propulsée par l&apos;IA pour les centres
                  d&apos;appels. Conçu et développé en Tunisie.
                </p>
                <a
                  href="https://nouraisolutions.tn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                >
                  nouraisolutions.tn
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={slideInFromRight}
            className="border border-white/[0.06] bg-white/[0.02] p-8 hover:border-violet-500/15 transition-colors duration-500"
          >
            <h3 className="mb-2 text-base font-semibold text-white lg:text-lg">
              Demandez votre audit gratuit
            </h3>
            <p className="mb-6 text-sm text-zinc-400">
              Remplissez le formulaire et recevez votre audit sous 24h.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Nom complet
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Votre nom"
                    className="slight-round w-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 input-glow"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Email professionnel
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="votre@email.com"
                    className="slight-round w-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 input-glow"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-company" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Entreprise
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  placeholder="Nom de votre entreprise"
                  className="slight-round w-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 input-glow"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Décrivez vos enjeux qualité
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Nombre d'agents, volume d'appels, enjeux de conformité..."
                  className="slight-round w-full resize-none border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 input-glow"
                />
              </div>

              <input
                type="hidden"
                name="_subject"
                value="Nouveau message depuis evaVoc"
              />

              {submitError && (
                <p className="text-xs text-red-400" role="alert">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500 disabled:opacity-50 btn-shine cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    Obtenir mon audit gratuit
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Success toast */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-[100] max-w-sm border border-emerald-400/30 bg-[var(--dark-bg)] shadow-2xl shadow-emerald-900/30 p-4"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-400 shrink-0">
                <CheckCircle size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  Message envoyé
                </p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Merci, nous vous recontacterons sous 24 heures avec votre audit.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                aria-label="Fermer"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
