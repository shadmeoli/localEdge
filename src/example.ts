import { createLocalStore, dbManager } from "./lib";

const useLocalStore = createLocalStore();
await useLocalStore.getState().initialize();
const isInitialized = useLocalStore.getState().isInitialized;

console.log("Is store initialized:", isInitialized);
