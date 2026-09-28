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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground leading-relaxed space-y-2", children })
  ] });
}
function Table({
  rows
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs border-collapse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 font-semibold text-foreground", children: "Donnée" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 font-semibold text-foreground", children: "Finalité" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 font-semibold text-foreground", children: "Base légale" }),
      rows[0]?.col4 !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 font-semibold text-foreground", children: "Conservation" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground font-medium", children: row.col1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: row.col2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: row.col3 }),
      row.col4 !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: row.col4 })
    ] }, i)) })
  ] }) });
}
function PolitiqueConfidentialite() {
  const {
    editor,
    rgpd,
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none", children: "Conformément au RGPD (UE) 2016/679 et à la loi Informatique et Libertés" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight", children: "Politique de confidentialité" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "1. Responsable du traitement", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Le responsable du traitement des données personnelles collectées via le site",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: site.name }),
        " (",
        site.url,
        ") est :"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/50 bg-card/40 px-4 py-3 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Identité :" }),
          " ",
          editor.name,
          ` (${editor.legalForm})`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Adresse :" }),
          " ",
          editor.address
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "E-mail :" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${rgpd.contactEmail}`, className: "text-primary hover:underline", children: rgpd.contactEmail })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "2. Données collectées et finalités", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nous collectons uniquement les données strictement nécessaires au fonctionnement du service. Voici le détail des traitements effectués :" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { rows: [{
        col1: "Adresse e-mail",
        col2: "Création et gestion du compte, authentification, récupération de mot de passe",
        col3: "Exécution du contrat (art. 6.1.b RGPD)",
        col4: `Durée du compte + ${rgpd.retentionMonths} mois d'inactivité`
      }, {
        col1: "Nom d'affichage (optionnel)",
        col2: "Personnalisation du profil dans l'application",
        col3: "Exécution du contrat (art. 6.1.b RGPD)",
        col4: `Durée du compte + ${rgpd.retentionMonths} mois d'inactivité`
      }, {
        col1: "Données de notation (jeux, films, séries)",
        col2: "Fonctionnalité principale de l'application (classements, visualisations)",
        col3: "Exécution du contrat (art. 6.1.b RGPD)",
        col4: "Durée du compte"
      }, {
        col1: "Logs de connexion (horodatage, IP)",
        col2: "Sécurité, prévention des fraudes",
        col3: "Intérêt légitime (art. 6.1.f RGPD)",
        col4: "90 jours"
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Aucune donnée sensible" }),
        " (santé, origine ethnique, opinions politiques, etc.) n'est collectée ou traitée."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "3. Destinataires des données", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Vos données personnelles sont traitées par les sous-traitants suivants, dans le cadre strict de la fourniture du service :" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/50 bg-card/40 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
          backendHost.name,
          " — Base de données & authentification"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-1", children: [
          "Adresse : ",
          backendHost.address
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
          "Politique de confidentialité :",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: backendHost.privacyPolicy, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: backendHost.privacyPolicy })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Aucune donnée n'est vendue, louée ou transmise à des tiers à des fins commerciales ou publicitaires." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "4. Transferts de données hors Union européenne", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Supabase Inc. est une société américaine. Les données peuvent être hébergées sur des serveurs situés aux États-Unis ou à Singapour. Ces transferts sont encadrés par les",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Clauses Contractuelles Types (CCT) de la Commission européenne" }),
        ", garantissant un niveau de protection adéquat conformément à l'art. 46 du RGPD."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Pour plus de détails, consultez la politique de confidentialité de Supabase :",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: backendHost.privacyPolicy, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: backendHost.privacyPolicy })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "5. Vos droits", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 pl-4 list-disc", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Droit d'accès" }),
          " (art. 15 RGPD) — obtenir une copie des données vous concernant"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Droit de rectification" }),
          " (art. 16 RGPD) — corriger des données inexactes ou incomplètes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Droit à l'effacement" }),
          " (art. 17 RGPD) — demander la suppression de votre compte et de vos données"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Droit à la limitation" }),
          " (art. 18 RGPD) — suspendre le traitement dans certains cas"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Droit d'opposition" }),
          " (art. 21 RGPD) — s'opposer à certains traitements fondés sur l'intérêt légitime"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Droit à la portabilité" }),
          " (art. 20 RGPD) — recevoir vos données dans un format structuré et lisible par machine"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Pour exercer ces droits, contactez-nous à l'adresse :",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${rgpd.contactEmail}`, className: "text-primary hover:underline font-medium", children: rgpd.contactEmail })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Nous répondrons dans un délai de ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          rgpd.responseDelay,
          " jours"
        ] }),
        " à compter de la réception de votre demande. Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.cnil.fr/fr/plaintes", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "CNIL" }),
        " ",
        "(Commission Nationale de l'Informatique et des Libertés)."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "6. Cookies et traceurs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Ce site utilise ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "uniquement des cookies strictement nécessaires" }),
        " à son fonctionnement. Aucun cookie publicitaire, de suivi comportemental ou analytique tiers n'est déposé."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs border-collapse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 font-semibold text-foreground", children: "Cookie" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 font-semibold text-foreground", children: "Émetteur" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 font-semibold text-foreground", children: "Finalité" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 font-semibold text-foreground", children: "Durée" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground font-mono", children: "sb-*-auth-token" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "Supabase" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "Maintien de la session d'authentification" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: "Session / 1 semaine" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground font-mono", children: "rankplay-cookie-notice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: site.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "Mémorisation de la prise de connaissance du bandeau cookies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: "6 mois" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Les cookies d'authentification sont ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "exemptés de consentement" }),
        " ",
        "conformément aux recommandations de la CNIL (délibération n°2020-091, liste des cookies exemptés : cookies de session d'authentification). Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela empêchera l'accès au service."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "7. Sécurité des données", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation :" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "pl-4 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Chiffrement des mots de passe (bcrypt via Supabase Auth)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Communications chiffrées via HTTPS (TLS)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Authentification par jeton sécurisé (JWT)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Accès aux données limité au strict nécessaire (row-level security)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "8. Modification de cette politique", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nous pouvons mettre à jour cette politique de confidentialité à tout moment. La date de dernière mise à jour est indiquée ci-dessous. En continuant à utiliser le service après une modification, vous en acceptez les nouvelles conditions." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/50 pt-4 border-t border-border/30", children: [
      "Dernière mise à jour :",
      " ",
      (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long"
      }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mentions-legales", className: "hover:text-muted-foreground transition-colors", children: "Mentions légales" })
    ] })
  ] }) }) });
}
export {
  PolitiqueConfidentialite as component
};
