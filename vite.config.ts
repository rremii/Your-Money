import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

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
  plugins: [react()],
  server: {
    host: true,
    port: 8000,

    // add the next lines if you're using windows and hot reload doesn't work
    watch: {
      usePolling: true
    }
  }
})
