import { create } from "zustand";
import { StoreState } from "./interfaces/app.types";
import { dbManager } from "./db";

const initialState: Omit<StoreState, 'initialize'> = {
  isInitialized: false,
  syncInfo: {
    lastSynced: 0,
    version: 0,
  },
};

export const createLocalStore = () => create<StoreState>((set) => ({
  ...initialState,
  initialize: async () => {
    await dbManager.initialize();
    set({ isInitialized: true });
  },
}));

export const useStore = createLocalStore();
