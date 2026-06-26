import { writeFileSync } from "fs";

const entry = `
process.on("uncaughtException", function(e) {
  if (e.code === "EEXIST") return;
  console.error(e);
  process.exit(1);
});

// LiteSpeed sends SIGTERM as a health-check probe — ignore it
let startTime = Date.now();
process.on("SIGTERM", function() {
  if (Date.now() - startTime < 10000) {
    console.log("[entrypoint] SIGTERM ignoré (trop tôt)");
    return; // ignore pendant les 10 premières secondes
  }
  process.exit(0);
});

Object.defineProperty(process, "stdin", {
  get: function() { return null; },
  configurable: true,
});

const path = require("path");
const entry = path.join(__dirname, "server", "index.mjs");

import(entry).catch(function(e) {
  if (e.code !== "EEXIST") {
    console.error(e);
    process.exit(1);
  }
});
`;

writeFileSync(".output/entrypoint.cjs", entry);
console.log("✓ entrypoint.cjs generated");