import { vi } from "vitest";

// Mock browser APIs
global.navigator = {
  onLine: true,
  userAgent: "node",
  language: "en-US",
} as Partial<Navigator>;

global.window = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  innerWidth: 1024,
  innerHeight: 768,
  location: {
    href: "http://localhost",
    ancestorOrigins: {} as DOMStringList,
    hash: "",
    host: "localhost",
    hostname: "localhost",
    origin: "http://localhost",
    pathname: "/",
    port: "",
    protocol: "http:",
    search: "",
    assign: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
  },
} as unknown as Partial<Window> & typeof globalThis;
