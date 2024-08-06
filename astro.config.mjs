// astro.config.mjs
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
dotenv.config();


// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercelServerless(),
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