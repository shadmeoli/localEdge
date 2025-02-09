declare module 'localedge' {
  export * from './interfaces/app.types';
  
  export function createLocalStore(): import('zustand').StoreApi<StoreState>;
  export const dbManager: DatabaseManager;
  
  export class DatabaseManager {
    private db: import('sql.js').Database | null;
    initialize(config?: DatabaseConfig): Promise<void>;
    close(): Promise<void>;
    getDb(): import('sql.js').Database;
  }
}