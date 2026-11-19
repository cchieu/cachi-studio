import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Compile JSX with the automatic runtime (react/jsx-runtime). Without this,
  // the built-in esbuild transform falls back to the classic
  // `React.createElement` output without a React import, crashing with
  // "React is not defined".
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
});
