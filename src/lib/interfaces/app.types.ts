export interface Entity {
  id: string;
  data: any;
  createdAt: number;
  updatedAt: number;
}

export interface SyncInfo {
  lastSynced: number;
  version: number;
}

export interface StoreState {
  isInitialized: boolean;
  isOnline: boolean;
  syncInfo: SyncInfo;
  initialize: () => Promise<void>;
  writeEntity: (id: string, data: any) => Promise<Entity>;
  deleteEntity: (id: string) => Promise<void>;
}

export interface DatabaseConfig {
  wasm?: string;
  locateFile?: (fileName: string) => string;
}

export interface DatabaseError extends Error {
  code?: string;
  details?: any;
}

export type EntityData = Record<string, any>;

export interface QueryResult {
  columns: string[];
  values: any[][];
}
