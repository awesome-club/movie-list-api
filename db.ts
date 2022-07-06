import { DB } from "./deps.ts";
import { DatabaseName } from "./env.ts";

export const DbInstance = new DB(DatabaseName, { memory: true });

export function initDb() {
  DbInstance.query(`
    CREATE TABLE IF NOT EXISTS movie_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id CHARACTER(50),
      list_id CHARACTER(50),
      list_name TEXT, 
      movies TEXT 
    )
  `);
}
