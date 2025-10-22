// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()   , tailwindcss()
// ]
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000, // Quiet the warning for now (adjust if needed)
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React ecosystem into a shared vendor chunk (~100-200 kB)
          vendor: ["react", "react-dom", "react-router-dom"], // Add more React libs if you use them (e.g., '@tanstack/react-query')
       
        },
      },
    },
  },
});