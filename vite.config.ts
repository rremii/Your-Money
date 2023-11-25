import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import svgr from "vite-plugin-svgr"


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@widgets": path.resolve(__dirname, "./src/widgets")
    }
  },
  plugins: [svgr(), react()] //https://github.com/pd4d10/vite-plugin-svgr?tab=readme-ov-file#usage
})
