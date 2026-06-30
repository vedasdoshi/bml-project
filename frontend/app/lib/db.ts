import mysql from "mysql2/promise";

if (!process.env.MYSQL_URL) {
  throw new Error("Missing MYSQL_URL in environment");
}

export const pool = mysql.createPool(process.env.MYSQL_URL);
