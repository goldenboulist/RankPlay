// Run a .sql migration file against the database configured in .env
// Usage: node --env-file=.env scripts/migrate.mjs migrations/<file>.sql
import { readFileSync } from "node:fs";
import mysql from "mysql2/promise";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node --env-file=.env scripts/migrate.mjs <file.sql>");
  process.exit(1);
}

const sql = readFileSync(file, "utf8");
const conn = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "rankplay",
  multipleStatements: true,
});

try {
  console.log(`Applying ${file} to ${process.env.DB_NAME}@${process.env.DB_HOST}…`);
  await conn.query(sql);
  console.log("Done.");
} catch (e) {
  console.error("Migration failed:", e.message);
  process.exitCode = 1;
} finally {
  await conn.end();
}
