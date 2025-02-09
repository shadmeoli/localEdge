import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "localedge",
      fileName: (format) => `localedge.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "zustand", "sql.js"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          zustand: "zustand",
          "sql.js": "initSqlJs"
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__tests__/setup.ts"],
  },
});
