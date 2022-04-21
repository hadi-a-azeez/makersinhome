import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import macrosPlugin from "vite-plugin-babel-macros";

export default defineConfig({
  plugins: [react(), macrosPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: {},
  },
});
