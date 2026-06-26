import { writeFileSync } from "fs";

const entry = `
process.on("uncaughtException", function(e) {
  if (e.code === "EEXIST") return;
  console.error(e);
  process.exit(1);
});

process.on("SIGTERM", function() {
  console.log("[entrypoint] SIGTERM reçu");
  console.trace();
});

process.on("SIGINT", function() {
  console.log("[entrypoint] SIGINT reçu");
  console.trace();
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