/* empty css                                    */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_CtZIaE04.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DbzBsCZn.mjs';
import fs from 'fs';
import path from 'path';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const licensesDir = path.resolve("./src/db");
  const licenses = fs.readdirSync(licensesDir).filter((file) => file.endsWith(".txt")).map((file) => {
    const content = fs.readFileSync(path.join(licensesDir, file), "utf-8");
    const [metadataSection, bodySection] = content.split("---").filter((section) => section.trim() !== "");
    const metadataLines = metadataSection.trim().split("\n");
    const metadata = {};
    metadataLines.forEach((line) => {
      const [key, value] = line.split(":").map((s) => s.trim());
      if (key && value) {
        metadata[key] = value;
      }
    });
    metadata.body = bodySection.trim();
    metadata.file = file;
    return metadata;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <header class="text-center mb-8"> <h1 class="text-4xl font-bold mb-2">Available Licenses</h1> </header> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> ${licenses.map((license) => renderTemplate`<a${addAttribute(`/licenses/${license.file.replace(".txt", "")}`, "href")} class="block p-4 border rounded bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"> <h2 class="text-xl font-bold">${license.title}</h2> </a>`)} </div> </div> ` })}`;
}, "/Users/naainz/Documents/Coding/License/src/pages/licenses/index.astro", void 0);

const $$file = "/Users/naainz/Documents/Coding/License/src/pages/licenses/index.astro";
const $$url = "/licenses";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
