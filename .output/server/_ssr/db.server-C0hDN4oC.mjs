import { m as mysql } from "../_libs/mysql2.mjs";
let pool;
function getDb() {
  if (!pool) {
    if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
      throw new Error("DB_USER and DB_PASSWORD must be set");
    }
    console.log("[DB] Connecting to:", {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
      // NE PAS logger le password
    });
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "rankplay",
      waitForConnections: true,
      connectionLimit: 10,
      timezone: "+00:00",
      dateStrings: true
    });
  }
  return pool;
}
export {
  getDb as g
};
