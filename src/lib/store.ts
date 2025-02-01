import { create } from "zustand";
import { StoreState } from "./interfaces/app.types";
import { dbManager } from "./db";

const initialState: Omit<StoreState, "initialize" | "isOnline"> = {
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

export const createLocalStore = () =>
  create<StoreState>((set) => ({
    ...initialState,
    isOnline: navigator.onLine,
    initialize: async () => {
      await dbManager.initialize();
      set({ isInitialized: true });

      setupNetworkListeners(set);
    },
  }));

export const useStore = createLocalStore();
