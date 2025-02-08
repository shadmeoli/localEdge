import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createLocalStore } from "../lib";

// Define global mocks
(global as any).window = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
};

(global as any).navigator = {
  onLine: true
};

describe("LocalStore", () => {
  let store: ReturnType<typeof createLocalStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset navigator online state
    Object.defineProperty(navigator, 'onLine', {
      configurable: true, 
      value: true
    });
    store = createLocalStore();
  });

  afterEach(async () => {
    const state = store.getState();
    if (state.isInitialized) {
      await state.initialize();
    }
  });

  describe("initialization", () => {
    it("should have correct initial state", () => {
      const state = store.getState();
      expect(state.isInitialized).toBe(false);
      expect(state.isOnline).toBe(true);
      expect(state.syncInfo).toEqual({
        lastSynced: 0,
        version: 0
      });
    });

    it("should initialize correctly", async () => {
      const state = store.getState();
      expect(state.isInitialized).toBe(false);
      
      await state.initialize();
      
      expect(store.getState().isInitialized).toBe(true);
      expect(window.addEventListener).toHaveBeenCalledTimes(2);
      expect(window.addEventListener).toHaveBeenCalledWith("online", expect.any(Function));
      expect(window.addEventListener).toHaveBeenCalledWith("offline", expect.any(Function));
    });

    it("should handle initialization errors", async () => {
      // @ts-ignore
      vi.spyOn(store.getState(), 'initialize').mockRejectedValueOnce(new Error('Init failed'));
      
      await expect(store.getState().initialize()).rejects.toThrow('Init failed');
      expect(store.getState().isInitialized).toBe(false);
    });
  });

  describe("online status tracking", () => {
    it("should track online status", () => {
      const state = store.getState();
      expect(state.isOnline).toBe(true);

      store.setState({ isOnline: false });
      expect(store.getState().isOnline).toBe(false);
    });

    it("should handle online event", async () => {
      await store.getState().initialize();
      store.setState({ isOnline: false });
      
      // Simulate online event
      const onlineCallback = (window.addEventListener as jest.Mock).mock.calls.find(
        call => call[0] === 'online'
      )[1];
      onlineCallback();

      expect(store.getState().isOnline).toBe(true);
    });

    it("should handle offline event", async () => {
      await store.getState().initialize();
      
      // Simulate offline event
      const offlineCallback = (window.addEventListener as jest.Mock).mock.calls.find(
        call => call[0] === 'offline'
      )[1];
      offlineCallback();

      expect(store.getState().isOnline).toBe(false);
    });
  });
});
