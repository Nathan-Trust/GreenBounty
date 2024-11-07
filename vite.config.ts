import path from "path"; // Import path
import react from "@vitejs/plugin-react"; // Import the React plugin
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Set up path alias
    },
  },
  server: {
    port: 3000, // Define the development server port
  },
});
