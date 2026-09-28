import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LEGAL_CONFIG } from "@/lib/legal-config";

export const Route = createFileRoute("/politique-confidentialite")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — RankPlay" },
      {
        name: "description",
        content:
          "Politique de confidentialité et de protection des données personnelles de RankPlay, conformément au RGPD et à la loi Informatique et Libertés.",
      },
    ],
  }),
  component: PolitiqueConfidentialite,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight text-foreground border-b border-border/40 pb-2">
        {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

function Table({
  rows,
}: {
  rows: { col1: string; col2: string; col3: string; col4?: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-border/60">
            <th className="text-left py-2 pr-4 font-semibold text-foreground">Donnée</th>
            <th className="text-left py-2 pr-4 font-semibold text-foreground">Finalité</th>
            <th className="text-left py-2 pr-4 font-semibold text-foreground">Base légale</th>
            {rows[0]?.col4 !== undefined && (
              <th className="text-left py-2 font-semibold text-foreground">Conservation</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/30">
              <td className="py-2 pr-4 text-foreground font-medium">{row.col1}</td>
              <td className="py-2 pr-4">{row.col2}</td>
              <td className="py-2 pr-4">{row.col3}</td>
              {row.col4 !== undefined && <td className="py-2">{row.col4}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PolitiqueConfidentialite() {
  const { editor, rgpd, backendHost, site } = LEGAL_CONFIG;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Header */}
          <div className="space-y-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              ← Retour
            </Link>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none">
              Conformément au RGPD (UE) 2016/679 et à la loi Informatique et Libertés
            </p>
            <h1 className="text-4xl font-bold tracking-tight">Politique de confidentialité</h1>
          </div>

          {/* 1. Responsable du traitement */}
          <Section title="1. Responsable du traitement">
            <p>
              Le responsable du traitement des données personnelles collectées via le site{" "}
              <strong>{site.name}</strong> ({site.url}) est :
            </p>
            <div className="rounded-lg border border-border/50 bg-card/40 px-4 py-3 space-y-1">
              <p>
                <span className="font-medium text-foreground">Identité :</span> {editor.name}
                {editor.legalForm ? ` (${editor.legalForm})` : ""}
              </p>
              <p>
                <span className="font-medium text-foreground">Adresse :</span> {editor.address}
              </p>
              <p>
                <span className="font-medium text-foreground">E-mail :</span>{" "}
                <a href={`mailto:${rgpd.contactEmail}`} className="text-primary hover:underline">
                  {rgpd.contactEmail}
                </a>
              </p>
            </div>
          </Section>

          {/* 2. Données collectées */}
          <Section title="2. Données collectées et finalités">
            <p>
              Nous collectons uniquement les données strictement nécessaires au fonctionnement du
              service. Voici le détail des traitements effectués :
            </p>
            <Table
              rows={[
                {
                  col1: "Adresse e-mail",
                  col2: "Création et gestion du compte, authentification, récupération de mot de passe",
                  col3: "Exécution du contrat (art. 6.1.b RGPD)",
                  col4: `Durée du compte + ${rgpd.retentionMonths} mois d'inactivité`,
                },
                {
                  col1: "Nom d'affichage (optionnel)",
                  col2: "Personnalisation du profil dans l'application",
                  col3: "Exécution du contrat (art. 6.1.b RGPD)",
                  col4: `Durée du compte + ${rgpd.retentionMonths} mois d'inactivité`,
                },
                {
                  col1: "Données de notation (jeux, films, séries)",
                  col2: "Fonctionnalité principale de l'application (classements, visualisations)",
                  col3: "Exécution du contrat (art. 6.1.b RGPD)",
                  col4: "Durée du compte",
                },
                {
                  col1: "Logs de connexion (horodatage, IP)",
                  col2: "Sécurité, prévention des fraudes",
                  col3: "Intérêt légitime (art. 6.1.f RGPD)",
                  col4: "90 jours",
                },
              ]}
            />
            <p className="text-xs">
              <strong>Aucune donnée sensible</strong> (santé, origine ethnique, opinions politiques,
              etc.) n'est collectée ou traitée.
            </p>
          </Section>

          {/* 3. Destinataires */}
          <Section title="3. Destinataires des données">
            <p>
              Vos données personnelles sont traitées par les sous-traitants suivants, dans le cadre
              strict de la fourniture du service :
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-border/50 bg-card/40 px-4 py-3">
                <p className="font-medium text-foreground">
                  {backendHost.name} — Base de données & authentification
                </p>
                <p className="text-xs mt-1">
                  Adresse : {backendHost.address}
                </p>
                <p className="text-xs">
                  Politique de confidentialité :{" "}
                  <a
                    href={backendHost.privacyPolicy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {backendHost.privacyPolicy}
                  </a>
                </p>
              </div>
            </div>
            <p>
              Aucune donnée n'est vendue, louée ou transmise à des tiers à des fins commerciales ou
              publicitaires.
            </p>
          </Section>

          {/* 4. Transferts hors UE */}
          <Section title="4. Transferts de données hors Union européenne">
            <p>
              Supabase Inc. est une société américaine. Les données peuvent être hébergées sur des
              serveurs situés aux États-Unis ou à Singapour. Ces transferts sont encadrés par les{" "}
              <strong>
                Clauses Contractuelles Types (CCT) de la Commission européenne
              </strong>
              , garantissant un niveau de protection adéquat conformément à l'art. 46 du RGPD.
            </p>
            <p>
              Pour plus de détails, consultez la politique de confidentialité de Supabase :{" "}
              <a
                href={backendHost.privacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {backendHost.privacyPolicy}
              </a>
            </p>
          </Section>

          {/* 5. Droits des utilisateurs */}
          <Section title="5. Vos droits">
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits
              suivants sur vos données personnelles :
            </p>
            <ul className="space-y-1.5 pl-4 list-disc">
              <li>
                <strong className="text-foreground">Droit d'accès</strong> (art. 15 RGPD) — obtenir
                une copie des données vous concernant
              </li>
              <li>
                <strong className="text-foreground">Droit de rectification</strong> (art. 16 RGPD) —
                corriger des données inexactes ou incomplètes
              </li>
              <li>
                <strong className="text-foreground">Droit à l'effacement</strong> (art. 17 RGPD) —
                demander la suppression de votre compte et de vos données
              </li>
              <li>
                <strong className="text-foreground">Droit à la limitation</strong> (art. 18 RGPD) —
                suspendre le traitement dans certains cas
              </li>
              <li>
                <strong className="text-foreground">Droit d'opposition</strong> (art. 21 RGPD) —
                s'opposer à certains traitements fondés sur l'intérêt légitime
              </li>
              <li>
                <strong className="text-foreground">Droit à la portabilité</strong> (art. 20 RGPD) —
                recevoir vos données dans un format structuré et lisible par machine
              </li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à l'adresse :{" "}
              <a href={`mailto:${rgpd.contactEmail}`} className="text-primary hover:underline font-medium">
                {rgpd.contactEmail}
              </a>
            </p>
            <p>
              Nous répondrons dans un délai de <strong>{rgpd.responseDelay} jours</strong> à compter
              de la réception de votre demande. Si vous estimez que vos droits ne sont pas respectés,
              vous pouvez introduire une réclamation auprès de la{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CNIL
              </a>{" "}
              (Commission Nationale de l'Informatique et des Libertés).
            </p>
          </Section>

          {/* 6. Cookies */}
          <Section title="6. Cookies et traceurs">
            <p>
              Ce site utilise <strong>uniquement des cookies strictement nécessaires</strong> à son
              fonctionnement. Aucun cookie publicitaire, de suivi comportemental ou analytique tiers
              n'est déposé.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left py-2 pr-4 font-semibold text-foreground">Cookie</th>
                    <th className="text-left py-2 pr-4 font-semibold text-foreground">Émetteur</th>
                    <th className="text-left py-2 pr-4 font-semibold text-foreground">Finalité</th>
                    <th className="text-left py-2 font-semibold text-foreground">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30">
                    <td className="py-2 pr-4 text-foreground font-mono">sb-*-auth-token</td>
                    <td className="py-2 pr-4">Supabase</td>
                    <td className="py-2 pr-4">Maintien de la session d'authentification</td>
                    <td className="py-2">Session / 1 semaine</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-2 pr-4 text-foreground font-mono">rankplay-cookie-notice</td>
                    <td className="py-2 pr-4">{site.name}</td>
                    <td className="py-2 pr-4">Mémorisation de la prise de connaissance du bandeau cookies</td>
                    <td className="py-2">6 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Les cookies d'authentification sont <strong>exemptés de consentement</strong>{" "}
              conformément aux recommandations de la CNIL (délibération n°2020-091, liste des cookies
              exemptés : cookies de session d'authentification). Vous pouvez désactiver les cookies
              dans les paramètres de votre navigateur, mais cela empêchera l'accès au service.
            </p>
          </Section>

          {/* 7. Sécurité */}
          <Section title="7. Sécurité des données">
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
              protéger vos données contre tout accès non autorisé, perte ou divulgation :
            </p>
            <ul className="pl-4 list-disc space-y-1">
              <li>Chiffrement des mots de passe (bcrypt via Supabase Auth)</li>
              <li>Communications chiffrées via HTTPS (TLS)</li>
              <li>Authentification par jeton sécurisé (JWT)</li>
              <li>Accès aux données limité au strict nécessaire (row-level security)</li>
            </ul>
          </Section>

          {/* 8. Modification */}
          <Section title="8. Modification de cette politique">
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité à tout moment. La date de
              dernière mise à jour est indiquée ci-dessous. En continuant à utiliser le service après
              une modification, vous en acceptez les nouvelles conditions.
            </p>
          </Section>

          {/* Footer */}
          <p className="text-xs text-muted-foreground/50 pt-4 border-t border-border/30">
            Dernière mise à jour :{" "}
            {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
            {" · "}
            <Link to="/mentions-legales" className="hover:text-muted-foreground transition-colors">
              Mentions légales
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
