import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createLocalStore } from "../lib";

// Mock window and navigator
const mockWindow = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
} as unknown as typeof window;

global.window = mockWindow;

describe("LocalStore", () => {
  let store: ReturnType<typeof createLocalStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the navigator.onLine state before each test
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

  it("should initialize correctly", async () => {
    const state = store.getState();
    expect(state.isInitialized).toBe(false);
    expect(state.isOnline).toBe(true);

    await state.initialize();
    expect(store.getState().isInitialized).toBe(true);
    expect(window.addEventListener).toHaveBeenCalledTimes(2);
  });

  it("should track online status", () => {
    const state = store.getState();
    expect(state.isOnline).toBe(true);

    // Simulate offline event
    store.setState({ isOnline: false });
    expect(store.getState().isOnline).toBe(false);
  });
});
