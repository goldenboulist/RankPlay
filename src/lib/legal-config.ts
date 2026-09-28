/**
 * ⚠️  CONFIGURATION LÉGALE — À COMPLÉTER AVANT MISE EN PRODUCTION
 *
 * Ce fichier centralise toutes les informations légales requises par :
 * - la LCEN (loi n°2004-575, art. 6 III) → mentions légales
 * - le RGPD / loi Informatique et Libertés → politique de confidentialité
 *
 * Remplacez chaque valeur marquée [À REMPLIR] par vos informations réelles.
 */

export const LEGAL_CONFIG = {
  /** ── Identité de l'éditeur ── */
  editor: {
    /** Prénom et nom (personne physique) OU dénomination sociale (société) */
    name: "[À REMPLIR — ex : Jean Dupont]",

    /** Forme juridique si société (ex : "SAS", "SARL", "Auto-entrepreneur") */
    legalForm: "[À REMPLIR — ex : Particulier / Auto-entrepreneur]",

    /** Adresse postale complète (obligatoire LCEN) */
    address: "[À REMPLIR — ex : 12 rue de la Paix, 75001 Paris]",

    /** Adresse e-mail de contact (obligatoire LCEN) */
    email: "[À REMPLIR — ex : contact@rankplay.fr]",

    /** Numéro de téléphone (obligatoire LCEN) */
    phone: "[À REMPLIR — ex : +33 6 00 00 00 00]",

    /** Numéro SIRET si inscrit au registre (laissez vide si non applicable) */
    siret: "[À REMPLIR — ex : 123 456 789 00010 — ou laisser vide]",

    /** Numéro RCS + ville si société (ex : "RCS Paris B 123 456 789") */
    rcs: "",

    /** Capital social si société (ex : "1 000 €") */
    capital: "",

    /** Numéro de TVA intracommunautaire si applicable */
    vatNumber: "",
  },

  /** ── Directeur de la publication ── */
  /** Généralement le dirigeant ou l'auteur du site */
  publicationDirector: "[À REMPLIR — ex : Jean Dupont]",

  /** ── Hébergeur du site (frontend) ── */
  frontendHost: {
    /** Nom de la société hébergeur */
    name: "[À REMPLIR — ex : Vercel Inc. / OVH SAS / Netlify Inc.]",
    address: "[À REMPLIR — ex : 440 N Barranca Ave #4133, Covina, CA 91723, USA]",
    website: "[À REMPLIR — ex : https://vercel.com]",
    phone: "[À REMPLIR — ou laisser vide si indisponible]",
  },

  /** ── Hébergeur base de données / backend (Supabase) ── */
  backendHost: {
    name: "Supabase Inc.",
    address: "970 Toa Payoh North, #07-04, Singapore 318992",
    website: "https://supabase.com",
    /** Politique de confidentialité Supabase */
    privacyPolicy: "https://supabase.com/privacy",
  },

  /** ── Données de contact RGPD ── */
  rgpd: {
    /** E-mail dédié aux demandes d'exercice de droits */
    contactEmail: "[À REMPLIR — ex : privacy@rankplay.fr ou même email qu'editor]",

    /** Délai de réponse (jours) */
    responseDelay: 30,

    /** Durée de conservation des comptes inactifs (mois) */
    retentionMonths: 36,
  },

  /** ── Nom et URL du site ── */
  site: {
    name: "RankPlay",
    url: "[À REMPLIR — ex : https://rankplay.fr]",
  },
} as const;
