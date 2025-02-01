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
  syncInfo: SyncInfo;
  initialize: () => Promise<void>;
}
