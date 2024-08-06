// astro.config.mjs
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import vercel from '@astrojs/vercel/server';
import tailwind from "@astrojs/tailwind";
dotenv.config();

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
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