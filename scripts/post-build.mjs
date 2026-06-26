import { writeFileSync } from "fs";

const content = `process.on("uncaughtException", function(e) {
  if (e.code === "EEXIST") return;
  console.error(e);
  process.exit(1);
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

writeFileSync(".output/entrypoint.cjs", content);
console.log("✓ entrypoint.cjs generated");