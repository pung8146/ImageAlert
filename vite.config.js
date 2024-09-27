// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: "public/popup.html",
        options: "public/options.html",
      },
      output: {
        entryFileNames: "dist/[name].js",
        chunkFileNames: "dist/[name].js",
        assetFileNames: "dist/[name].[ext]",
      },
    },
  },
});
