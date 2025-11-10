import initSqlJs, { Database } from "sql.js";

export class DatabaseManager {
  private db: Database | null = null;

  async initialize(): Promise<void> {
    const SQL = await initSqlJs({
      locateFile: (fileName: string) =>
        `./node_modules/sql.js/dist/${fileName}`,
    });

    try {
      this.db = new SQL.Database();

      /**
       * INFO: these are store relevant tables
       *       you can add more tables as you need
       *
       * These ones will be used for logging and
       *       syncing the data across devices.
       *
       * Also for batching if need be
       */
      this.db.run(`
        CREATE TABLE IF NOT EXISTS entities (
          id TEXT PRIMARY KEY,
          data TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        )
      `);
      this.db.run(`
        CREATE TABLE IF NOT EXISTS sync_info (
          id INTEGER PRIMARY KEY,
          last_synced INTEGER NOT NULL,
          version INTEGER NOT NULL
        )
      `);
    } catch (error) {
      throw new Error(`Failed to initialize database: ${error}`);
    }
  }

  close(): Promise<void> {
    return new Promise((resolve) => {
      if (this.db) {
        this.db.close();
        this.db = null;
      }
      resolve();
    });
  }

  getDb(): Database {
    if (!this.db) {
      throw new Error("Database not initialized");
    }
    return this.db;
  }

  /**
   * TODO:
   *  - setup pooling to multi connection the store/db
   *  - setup a context to handle the db connection and listen for cancelation -> like Go
   *  - listen for batching and distribute loading to workers (idle workers and also check connectivity)
   */
  contentPooling() { }
}

export const dbManager = new DatabaseManager();