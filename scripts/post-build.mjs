import { writeFileSync } from "fs";

// Fichier chargé AVANT tout via --require
const patch = `
const Module = require("module");
const orig = Module._resolveFilename;
const EventEmitter = require("events");

// Patch net.Socket pour ignorer EEXIST sur fd=0
const binding = process.binding("tcp_wrap");
const orig_TCP = binding.TCP;
`;

const entry = `
process.on("uncaughtException", function(e) {
  if (e.code === "EEXIST") return;
  console.error(e);
  process.exit(1);
});

// Patch stdin AVANT l'import ESM
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