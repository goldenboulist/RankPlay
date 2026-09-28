import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@/lib/icons";

const STORAGE_KEY = "rankplay-cookie-notice";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà vu le bandeau
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      // Délai léger pour ne pas bloquer le rendu initial
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Information sur les cookies"
          aria-live="polite"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl"
        >
          <div className="rounded-2xl border border-border/60 bg-card/90 px-5 py-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              {/* Icône cookie */}
              <span className="mt-0.5 text-xl select-none" aria-hidden="true">🍪</span>

              <div className="flex-1 space-y-1.5">
                <p className="text-sm font-semibold text-foreground">
                  Cookies — uniquement ce qui est nécessaire
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ce site utilise <strong>uniquement des cookies d'authentification</strong>,
                  indispensables au fonctionnement du service (maintien de votre session).
                  Aucun cookie publicitaire ni de tracking tiers n'est utilisé.{" "}
                  <Link
                    to="/politique-confidentialite"
                    className="text-primary hover:underline"
                  >
                    En savoir plus
                  </Link>
                </p>
              </div>

              <button
                onClick={dismiss}
                aria-label="Fermer le bandeau cookies"
                id="cookie-banner-close"
                className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-end">
              <button
                onClick={dismiss}
                id="cookie-banner-accept"
                className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Compris
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
