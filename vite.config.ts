import path from "path"; // Import path
import react from "@vitejs/plugin-react"; // Import the React plugin
import { defineConfig } from "vite"; // Import defineConfig
import Sitemap from "vite-plugin-sitemap";
import Pages from "vite-plugin-pages";
import generateSitemap from "vite-plugin-pages-sitemap";

export default defineConfig({
  plugins: [
    react(),
    Sitemap({ hostname: "https://green-bounty.vercel.app/" }),
    Pages({
      onRoutesGenerated: (routes) =>
        generateSitemap({
          routes,
          hostname: "https://green-bounty.vercel.app/",
          changefreq: "daily", // Set desired options
          priority: 1.0,
        }),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Set up path alias
    },
  },
  server: {
    port: 3000, // Define the development server port
  },
});
