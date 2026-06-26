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

// Ignore ALL SIGTERM until server is ready
process.on("SIGTERM", function() {});

const path = require("path");
const entryPath = path.join(__dirname, "server", "index.mjs");

import(entryPath).then(function() {
  process.removeAllListeners("SIGTERM");
  console.log("[entrypoint] ready");
}).catch(function(e) {
  if (e.code !== "EEXIST") {
    console.error(e);
    process.exit(1);
  }
});
`;

writeFileSync(".output/entrypoint.cjs", entry);
console.log("✓ entrypoint.cjs generated");