/* empty css                                    */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_CtZIaE04.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DbzBsCZn.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Generate = createComponent(async ($$result, $$props, $$slots) => {
  const permissions = [
    "commercial-use",
    "modifications",
    "distribution",
    "private-use",
    "patent-use"
  ];
  const limitations = [
    "liability",
    "trademark-use",
    "warranty"
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-3liy6dkl": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-4 dark:bg-gray-900 dark:text-white" data-astro-cid-3liy6dkl> <h1 class="text-3xl font-bold mb-4" data-astro-cid-3liy6dkl>License Generator</h1> <div id="content" data-astro-cid-3liy6dkl> <p class="mb-6" data-astro-cid-3liy6dkl>Select the permissions and limitations you want in your license and click "Generate License".</p> <div class="mb-6" data-astro-cid-3liy6dkl> <label for="name" class="block text-lg font-semibold mb-2" data-astro-cid-3liy6dkl>Enter your name:</label> <input type="text" id="name" class="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" placeholder="Your name" data-astro-cid-3liy6dkl> </div> <h2 class="text-2xl font-bold mb-2" data-astro-cid-3liy6dkl>Permissions</h2> <div id="permissionsForm" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6" data-astro-cid-3liy6dkl> ${permissions.map((permission) => renderTemplate`<button type="button"${addAttribute(permission, "id")} class="toggle-btn bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors duration-300" data-astro-cid-3liy6dkl> ${permission} </button>`)} </div> <h2 class="text-2xl font-bold mb-2" data-astro-cid-3liy6dkl>Limitations</h2> <div id="limitationsForm" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6" data-astro-cid-3liy6dkl> ${limitations.map((limitation) => renderTemplate`<button type="button"${addAttribute(limitation, "id")} class="toggle-btn bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors duration-300" data-astro-cid-3liy6dkl> ${limitation} </button>`)} </div> <button type="button" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none" id="generate-button" data-astro-cid-3liy6dkl>Generate License</button> </div> <div id="loading" class="hidden text-center mt-8" data-astro-cid-3liy6dkl> <i class="fas fa-spinner fa-spin text-4xl text-blue-500" data-astro-cid-3liy6dkl></i> <p class="mt-4 text-xl" id="loading-text" data-astro-cid-3liy6dkl></p> </div> <div id="license-selection" class="hidden mt-8" data-astro-cid-3liy6dkl> <div class="relative max-w-xl mx-auto" data-astro-cid-3liy6dkl> <div class="relative" data-astro-cid-3liy6dkl> <button id="dropdown-toggle" class="w-full px-4 py-2 mb-2 border rounded bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center" data-astro-cid-3liy6dkl> <span data-astro-cid-3liy6dkl>Select a license</span> <i class="fas fa-chevron-down" data-astro-cid-3liy6dkl></i> </button> <div id="dropdown" class="hidden absolute w-full mt-1 bg-white dark:bg-gray-800 border rounded shadow-lg z-10" data-astro-cid-3liy6dkl> <input type="text" id="search-input" placeholder="Search for a license..." class="w-full px-4 py-2 border-b focus:outline-none" data-astro-cid-3liy6dkl> <ul id="license-list" class="max-h-60 overflow-y-auto" data-astro-cid-3liy6dkl></ul> </div> </div> </div> </div> <div id="license-content" class="hidden mt-8" data-astro-cid-3liy6dkl> <div class="flex flex-col lg:flex-row lg:justify-between lg:space-x-4" data-astro-cid-3liy6dkl> <div class="lg:w-1/2 bg-gray-100 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-700 overflow-auto max-h-80" data-astro-cid-3liy6dkl> <pre class="whitespace-pre-wrap" data-astro-cid-3liy6dkl><code id="license-text" data-astro-cid-3liy6dkl></code></pre> </div> <div class="lg:w-1/2 mt-4 lg:mt-0" data-astro-cid-3liy6dkl> <h2 id="license-title" class="text-2xl font-bold mb-2" data-astro-cid-3liy6dkl></h2> <p id="license-description" class="mb-4" data-astro-cid-3liy6dkl></p> <div id="license-details" class="grid grid-cols-1 lg:grid-cols-3 gap-4" data-astro-cid-3liy6dkl> <div data-astro-cid-3liy6dkl> <h3 class="font-semibold" data-astro-cid-3liy6dkl>Permissions</h3> <ul id="permissions-list" class="list-disc list-inside" data-astro-cid-3liy6dkl></ul> </div> <div data-astro-cid-3liy6dkl> <h3 class="font-semibold" data-astro-cid-3liy6dkl>Limitations</h3> <ul id="limitations-list" class="list-disc list-inside" data-astro-cid-3liy6dkl></ul> </div> <div data-astro-cid-3liy6dkl> <h3 class="font-semibold" data-astro-cid-3liy6dkl>Conditions</h3> <ul id="conditions-list" class="list-disc list-inside" data-astro-cid-3liy6dkl></ul> </div> </div> </div> </div> </div> </div>   ` })}`;
}, "/Users/naainz/Documents/Coding/License/src/pages/generate.astro", void 0);

const $$file = "/Users/naainz/Documents/Coding/License/src/pages/generate.astro";
const $$url = "/generate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Generate,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
