import mysql from "mysql2/promise";

let pool: mysql.Pool | undefined;

export function getDb(): mysql.Pool {
  if (!pool) {
    console.log("[DB] Connecting to:", {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      // NE PAS logger le password
    });
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "rankplay",
      waitForConnections: true,
      connectionLimit: 10,
      timezone: "+00:00",
      dateStrings: true,
    });
  }
  return pool;
}