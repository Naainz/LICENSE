// astro.config.mjs
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
dotenv.config();


// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapters: [vercel()],
  vite: {
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "./src/styles/global.css";`
        }
      }
    }
  },
  integrations: [tailwind()]
});