import { create } from "zustand";
import { StoreState } from "./interfaces/app.types";
import { dbManager } from "./db";

const initialState: Omit<
  StoreState,
  "initialize" | "isOnline" | "writeEntity" | "deleteEntity"
> = {
  isInitialized: false,
  syncInfo: {
    lastSynced: 0,
    version: 0,
  },
};

function setupNetworkListeners(
  setStatus: (status: { isOnline: boolean }) => void
) {
  window.addEventListener("online", () => setStatus({ isOnline: true }));
  window.addEventListener("offline", () => setStatus({ isOnline: false }));
}

async function handleWriteEntity(id: string, data: any) {
  const db = dbManager.getDb();
  const now = Date.now();

  db.run(
    "INSERT OR REPLACE INTO entities (id, data, created_at, updated_at) VALUES (?, ?, ?, ?)",
    [id, JSON.stringify(data), now, now]
  );

  return { id, data, createdAt: now, updatedAt: now };
}

async function handleDeleteEntity(id: string) {
  const db = dbManager.getDb();
  db.run("DELETE FROM entities WHERE id = ?", [id]);
}

export const createLocalStore = () =>
  create<StoreState>((set) => ({
    ...initialState,
    isOnline: navigator.onLine,
    initialize: async () => {
      await dbManager.initialize();
      set({ isInitialized: true });
      setupNetworkListeners(set);
    },
    writeEntity: async (id: string, data: any) => {
      return await handleWriteEntity(id, data);
    },
    deleteEntity: async (id: string) => {
      await handleDeleteEntity(id);
    },
  }));

export const useStore = createLocalStore();
