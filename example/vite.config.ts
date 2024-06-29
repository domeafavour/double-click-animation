import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // for github pages
  base: "/double-click-animation",
  plugins: [react()],
});
