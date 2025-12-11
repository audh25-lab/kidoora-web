import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// KidooraMV Vite config (VERSION A)
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      babel: {
        plugins: ["@babel/plugin-transform-react-jsx"],
      },
    }),
  ],

  server: {
    port: 5173,
    open: true,
  },

  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
      "@data": "/src/data",
      "@store": "/src/store",
      "@api": "/src/api",
    },
  },
});