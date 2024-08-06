// astro.config.mjs
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
dotenv.config();


// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
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