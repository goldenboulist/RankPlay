import { writeFileSync } from "fs";

const entry = `
process.on("uncaughtException", function(e) {
  if (e.code === "EEXIST") return;
  console.error(e);
  process.exit(1);
});

Object.defineProperty(process, "stdin", {
  get: function() { return null; },
  configurable: true,
});

const path = require("path");
const entryPath = path.join(__dirname, "server", "index.mjs");

import(entryPath).then(function() {
  // Nitro vient d'enregistrer ses handlers — on les supprime tous
  process.removeAllListeners("SIGTERM");
  process.removeAllListeners("SIGINT");
  console.log("[entrypoint] SIGTERM/SIGINT handlers cleared");
  
  // Remet un handler propre pour un vrai arrêt
  process.on("SIGTERM", function() {
    console.log("[entrypoint] SIGTERM reçu — arrêt propre");
    process.exit(0);
  });
}).catch(function(e) {
  if (e.code !== "EEXIST") {
    console.error(e);
    process.exit(1);
  }
});
`;

writeFileSync(".output/entrypoint.cjs", entry);
console.log("✓ entrypoint.cjs generated");