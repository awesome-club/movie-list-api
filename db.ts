import { InMemoryDb } from "./env.ts";
import { DB } from "./deps.ts";
import { DatabaseName } from "./env.ts";

export const DbInstance = new DB(DatabaseName, { memory: InMemoryDb });

export function initDb() {
  DbInstance.query(`
    CREATE TABLE IF NOT EXISTS movie_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id CHARACTER(50),
      list_id CHARACTER(50),
      list_name TEXT,
      is_public INTEGER,
      movies TEXT 
    )
  `);
}
