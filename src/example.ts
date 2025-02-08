import { createLocalStore, dbManager } from "./lib";

async function checkInitilization() {
  const useLocalStore = createLocalStore();
  await useLocalStore.getState().initialize();
  const isInitialized = useLocalStore.getState().isInitialized;
  console.log("Is store initialized:", isInitialized);
}


checkInitilization().then(response => console.log(response)).catch((err) => console.error(err))
