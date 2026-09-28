import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LEGAL_CONFIG } from "@/lib/legal-config";

export const Route = createFileRoute("/mentions-legales")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mentions légales — RankPlay" },
      {
        name: "description",
        content: "Mentions légales du site RankPlay conformément à la LCEN (loi n°2004-575 du 21 juin 2004).",
      },
    ],
  }),
  component: MentionsLegales,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight text-foreground border-b border-border/40 pb-2">
        {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-1.5">
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value || value === "") return null;
  return (
    <p>
      <span className="font-medium text-foreground">{label} :</span>{" "}
      {value}
    </p>
  );
}

function MentionsLegales() {
  const { editor, publicationDirector, frontendHost, backendHost, site } = LEGAL_CONFIG;

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
              Conformément à l'article 6 III de la LCEN (loi n°2004-575 du 21 juin 2004)
            </p>
            <h1 className="text-4xl font-bold tracking-tight">Mentions légales</h1>
          </div>

          {/* 1. Éditeur */}
          <Section title="1. Éditeur du site">
            <Row label="Nom / Raison sociale" value={editor.name} />
            <Row label="Forme juridique" value={editor.legalForm} />
            <Row label="Adresse" value={editor.address} />
            <Row label="E-mail" value={editor.email} />
            <Row label="Téléphone" value={editor.phone} />
            <Row label="SIRET" value={editor.siret} />
            <Row label="RCS" value={editor.rcs} />
            <Row label="Capital social" value={editor.capital} />
            <Row label="N° TVA intracommunautaire" value={editor.vatNumber} />
            <Row label="Directeur de la publication" value={publicationDirector} />
          </Section>

          {/* 2. Hébergement frontend */}
          <Section title="2. Hébergement (site web)">
            <p>
              Le site <strong>{site.name}</strong> ({site.url}) est hébergé par :
            </p>
            <Row label="Société" value={frontendHost.name} />
            <Row label="Adresse" value={frontendHost.address} />
            <Row label="Téléphone" value={frontendHost.phone} />
            <p>
              <span className="font-medium text-foreground">Site web :</span>{" "}
              <a
                href={frontendHost.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {frontendHost.website}
              </a>
            </p>
          </Section>

          {/* 3. Hébergement backend */}
          <Section title="3. Hébergement (base de données & authentification)">
            <p>
              Les données sont stockées et l'authentification gérée par :
            </p>
            <Row label="Société" value={backendHost.name} />
            <Row label="Adresse" value={backendHost.address} />
            <p>
              <span className="font-medium text-foreground">Site web :</span>{" "}
              <a
                href={backendHost.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {backendHost.website}
              </a>
            </p>
            <p>
              <span className="font-medium text-foreground">Politique de confidentialité Supabase :</span>{" "}
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

          {/* 4. Propriété intellectuelle */}
          <Section title="4. Propriété intellectuelle">
            <p>
              L'ensemble du contenu de ce site (textes, graphismes, logiciels, interface) est protégé
              par le droit d'auteur. Toute reproduction, représentation, modification ou exploitation,
              totale ou partielle, du site ou de l'un quelconque de ses éléments sans l'autorisation
              expresse de l'éditeur est interdite et constituerait une contrefaçon sanctionnée par les
              articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </Section>

          {/* 5. Données personnelles */}
          <Section title="5. Données personnelles">
            <p>
              La collecte et le traitement des données personnelles sont décrits dans notre{" "}
              <Link
                to="/politique-confidentialite"
                className="text-primary hover:underline font-medium"
              >
                Politique de confidentialité
              </Link>
              , conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              Informatique et Libertés.
            </p>
          </Section>

          {/* 6. Cookies */}
          <Section title="6. Cookies">
            <p>
              Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement du
              service (maintien de session d'authentification). Ces cookies sont exemptés de
              consentement conformément aux recommandations de la CNIL. Pour en savoir plus, consultez
              notre{" "}
              <Link
                to="/politique-confidentialite"
                className="text-primary hover:underline font-medium"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </Section>

          {/* 7. Responsabilité */}
          <Section title="7. Limitation de responsabilité">
            <p>
              L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées
              sur ce site, dont il se réserve le droit de corriger le contenu à tout moment et sans
              préavis. L'éditeur ne saurait être tenu responsable des dommages directs ou indirects
              résultant de l'accès à ce site ou de l'utilisation des informations qu'il contient.
            </p>
          </Section>

          {/* 8. Droit applicable */}
          <Section title="8. Droit applicable">
            <p>
              Le présent site est soumis au droit français. En cas de litige, les tribunaux français
              seront seuls compétents.
            </p>
          </Section>

          {/* Footer */}
          <p className="text-xs text-muted-foreground/50 pt-4 border-t border-border/30">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
