import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as LEGAL_CONFIG } from "./legal-config-qxhlTuIw.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold tracking-tight text-foreground border-b border-border/40 pb-2", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground leading-relaxed space-y-1.5", children })
  ] });
}
function Row({
  label,
  value
}) {
  if (!value || value === "") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
      label,
      " :"
    ] }),
    " ",
    value
  ] });
}
function MentionsLegales() {
  const {
    editor,
    publicationDirector,
    frontendHost,
    backendHost,
    site
  } = LEGAL_CONFIG;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.5
  }, className: "space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4", children: "← Retour" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none", children: "Conformément à l'article 6 III de la LCEN (loi n°2004-575 du 21 juin 2004)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight", children: "Mentions légales" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "1. Éditeur du site", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Nom / Raison sociale", value: editor.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Forme juridique", value: editor.legalForm }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Adresse", value: editor.address }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "E-mail", value: editor.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Téléphone", value: editor.phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "SIRET", value: editor.siret }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "RCS", value: editor.rcs }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Capital social", value: editor.capital }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "N° TVA intracommunautaire", value: editor.vatNumber }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Directeur de la publication", value: publicationDirector })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "2. Hébergement (site web)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Le site ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: site.name }),
        " (",
        site.url,
        ") est hébergé par :"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Société", value: frontendHost.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Adresse", value: frontendHost.address }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Téléphone", value: frontendHost.phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Site web :" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: frontendHost.website, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: frontendHost.website })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "3. Hébergement (base de données & authentification)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Les données sont stockées et l'authentification gérée par :" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Société", value: backendHost.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Adresse", value: backendHost.address }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Site web :" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: backendHost.website, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: backendHost.website })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Politique de confidentialité Supabase :" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: backendHost.privacyPolicy, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: backendHost.privacyPolicy })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "4. Propriété intellectuelle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "L'ensemble du contenu de ce site (textes, graphismes, logiciels, interface) est protégé par le droit d'auteur. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, du site ou de l'un quelconque de ses éléments sans l'autorisation expresse de l'éditeur est interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "5. Données personnelles", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "La collecte et le traitement des données personnelles sont décrits dans notre",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/politique-confidentialite", className: "text-primary hover:underline font-medium", children: "Politique de confidentialité" }),
      ", conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "6. Cookies", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement du service (maintien de session d'authentification). Ces cookies sont exemptés de consentement conformément aux recommandations de la CNIL. Pour en savoir plus, consultez notre",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/politique-confidentialite", className: "text-primary hover:underline font-medium", children: "Politique de confidentialité" }),
      "."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "7. Limitation de responsabilité", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, dont il se réserve le droit de corriger le contenu à tout moment et sans préavis. L'éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l'accès à ce site ou de l'utilisation des informations qu'il contient." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "8. Droit applicable", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/50 pt-4 border-t border-border/30", children: [
      "Dernière mise à jour : ",
      (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long"
      })
    ] })
  ] }) }) });
}
export {
  MentionsLegales as component
};
