/* empty css                                    */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_CtZIaE04.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DbzBsCZn.mjs';
import fs from 'fs';
import path from 'path';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const licensesDir = path.resolve("./src/db");
  const licenses = fs.readdirSync(licensesDir).filter((file) => file.endsWith(".txt")).map((file) => {
    const content = fs.readFileSync(path.join(licensesDir, file), "utf-8");
    const [metadataSection] = content.split("---").filter((section) => section.trim() !== "");
    const metadataLines = metadataSection.trim().split("\n");
    const metadata = {};
    metadataLines.forEach((line) => {
      const [key, value] = line.split(":").map((s) => s.trim());
      if (key && value) {
        metadata[key] = value;
      }
    });
    metadata.file = file;
    return metadata;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <header class="text-center mb-8"> <h1 class="text-4xl font-bold mb-2">License Information</h1> <p class="text-lg">It is important to use a license in your project for many reasons!</p> </header> <div class="relative max-w-xl mx-auto"> <div class="relative"> <button id="dropdown-toggle" class="w-full px-4 py-2 mb-2 border rounded bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center"> <span>Select a license</span> <i class="fas fa-chevron-down"></i> </button> <div id="dropdown" class="hidden absolute w-full mt-1 bg-white dark:bg-gray-800 border rounded shadow-lg z-10"> <input type="text" id="search-input" placeholder="Search for a license..." class="w-full px-4 py-2 border-b focus:outline-none"> <ul id="license-list" class="max-h-60 overflow-y-auto"> ${licenses.map((license) => renderTemplate`<li class="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"${addAttribute(license.file, "data-file")}${addAttribute(`selectLicense('${license.file}')`, "onclick")}>${license.title}</li>`)} </ul> </div> </div> </div> <div id="license-content" class="hidden mt-8"> <div class="flex flex-col lg:flex-row lg:justify-between lg:space-x-4"> <div class="lg:w-1/2 bg-gray-100 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-700 overflow-auto max-h-80"> <pre class="whitespace-pre-wrap"><code id="license-text"></code></pre> </div> <div class="lg:w-1/2 mt-4 lg:mt-0"> <h2 id="license-title" class="text-2xl font-bold mb-2"></h2> <p id="license-description" class="mb-4"></p> <div id="license-details" class="grid grid-cols-1 lg:grid-cols-3 gap-4"> <div> <h3 class="font-semibold">Permissions</h3> <ul id="permissions-list" class="list-disc list-inside"></ul> </div> <div> <h3 class="font-semibold">Limitations</h3> <ul id="limitations-list" class="list-disc list-inside"></ul> </div> <div> <h3 class="font-semibold">Conditions</h3> <ul id="conditions-list" class="list-disc list-inside"></ul> </div> </div> </div> </div> </div> </div>  ` })}`;
}, "/Users/naainz/Documents/Coding/License/src/pages/index.astro", void 0);

const $$file = "/Users/naainz/Documents/Coding/License/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
