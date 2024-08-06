import { c as createComponent, r as renderTemplate, e as renderHead, f as renderSlot } from './astro/server_CtZIaE04.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                            */

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" class="transition-colors duration-500"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>License Info</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">${renderHead()}</head> <body class="bg-gray-100 text-gray-900 transition-colors duration-500 dark:bg-gray-900 dark:text-gray-100 font-satoshi"> <nav class="bg-white dark:bg-gray-800 shadow mb-4 transition-colors duration-500 py-4"> <div class="container mx-auto px-4 flex justify-between items-center"> <a href="/" class="text-2xl font-bold text-gray-900 dark:text-white">LICENSE</a> <div> <a href="/info" class="text-lg">Information</a>
&nbsp;&nbsp;
<a href="/generate" class="text-lg">Generate</a> </div> <button id="theme-toggle" class="focus:outline-none text-2xl"> <i id="theme-toggle-icon" class="fas"></i> </button> </div> </nav> <main> ${renderSlot($$result, $$slots["default"])} </main>  </body> </html>`;
}, "/Users/naainz/Documents/Coding/License/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
