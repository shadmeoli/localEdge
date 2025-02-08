export interface Entity {
  id: string;
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
  syncInfo: {
    lastSynced: number;
    version: number;
  };
  initialize: () => Promise<void>;
  writeEntity: (id: string, data: any) => Promise<{
    id: string;
    data: any;
    createdAt: number;
    updatedAt: number;
  }>;
  deleteEntity: (id: string) => Promise<void>;
}
