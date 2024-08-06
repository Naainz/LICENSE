/* empty css                                       */
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_CtZIaE04.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DbzBsCZn.mjs';
import fs from 'fs';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$license = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$license;
  const licenseName = Astro2.params.license;
  const licensesDir = path.resolve("./src/db");
  const licenses = fs.readdirSync(licensesDir).filter((file) => file.endsWith(".txt")).map((file) => {
    const content = fs.readFileSync(path.join(licensesDir, file), "utf-8");
    const [metadataSection] = content.split("---").filter((section) => section.trim() !== "");
    const metadataLines = metadataSection.trim().split("\n");
    const metadata2 = {};
    metadataLines.forEach((line) => {
      const [key, value] = line.split(":").map((s) => s.trim());
      if (key && value) {
        metadata2[key] = value;
      }
    });
    metadata2.file = file;
    return metadata2;
  });
  const license = licenses.find((license2) => license2.file.includes(licenseName));
  const licenseContent = fs.readFileSync(path.join(licensesDir, license.file), "utf-8");
  const parseLicenseContent = (content) => {
    const sections = content.split("---").filter((section) => section.trim() !== "");
    const metadataSection = sections[0].trim();
    const body2 = sections[1].trim();
    const lines = metadataSection.split("\n");
    const metadata2 = {};
    for (const line of lines) {
      if (line.startsWith("title:")) {
        metadata2.title = line.replace("title: ", "").trim();
      } else if (line.startsWith("description:")) {
        metadata2.description = line.replace("description: ", "").trim();
      } else if (line.startsWith("permissions:")) {
        metadata2.permissions = parseList(lines, lines.indexOf(line));
      } else if (line.startsWith("conditions:")) {
        metadata2.conditions = parseList(lines, lines.indexOf(line));
      } else if (line.startsWith("limitations:")) {
        metadata2.limitations = parseList(lines, lines.indexOf(line));
      }
    }
    return { metadata: metadata2, body: body2 };
  };
  const parseList = (lines, startIndex) => {
    const list = [];
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("- ")) {
        list.push(line.replace("- ", "").trim());
      } else {
        break;
      }
    }
    return list;
  };
  const { metadata, body } = parseLicenseContent(licenseContent);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <header class="text-center mb-8"> <h1 class="text-4xl font-bold mb-2">${metadata.title}</h1> <p class="text-lg italic">${metadata.description}</p> </header> <div class="relative max-w-xl mx-auto"> <div id="license-content" class="mt-8"> <div class="flex flex-col lg:flex-row lg:justify-between lg:space-x-4"> <div class="lg:w-1/2 bg-gray-100 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-700 overflow-auto max-h-80"> <pre class="whitespace-pre-wrap"><code>${body}</code></pre> </div> <div class="lg:w-1/2 mt-4 lg:mt-0"> <h2 class="text-2xl font-bold mb-2">License Details</h2> <div id="license-details" class="grid grid-cols-1 lg:grid-cols-1 gap-8"> <div> <h3 class="font-semibold">Permissions</h3> <ul id="permissions-list" class="list-disc list-inside"> ${metadata.permissions.length > 0 ? metadata.permissions.map((permission) => renderTemplate`<li class="flex justify-between items-center">${permission} <i class="fas fa-check"></i></li>`) : renderTemplate`<li>None</li>`} </ul> </div> <div> <h3 class="font-semibold">Limitations</h3> <ul id="limitations-list" class="list-disc list-inside"> ${metadata.limitations.length > 0 ? metadata.limitations.map((limit) => renderTemplate`<li class="flex justify-between items-center">${limit} <i class="fas fa-times"></i></li>`) : renderTemplate`<li>None</li>`} </ul> </div> <div> <h3 class="font-semibold">Conditions</h3> <ul id="conditions-list" class="list-disc list-inside"> ${metadata.conditions.length > 0 ? metadata.conditions.map((condition) => renderTemplate`<li class="flex justify-between items-center"> ${condition} ${condition === "include-copyright" && renderTemplate`<i class="fas fa-copyright"></i>`} ${condition === "disclose-source" && renderTemplate`<i class="fas fa-code-branch"></i>`} ${condition === "document-changes" && renderTemplate`<i class="fas fa-file-alt"></i>`} ${condition === "network-use-disclose" && renderTemplate`<i class="fas fa-wifi"></i>`} ${condition === "same-license" && renderTemplate`<i class="fas fa-dollar-sign"></i>`} </li>`) : renderTemplate`<li>None</li>`} </ul> </div> </div> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/naainz/Documents/Coding/License/src/pages/licenses/[license].astro", void 0);

const $$file = "/Users/naainz/Documents/Coding/License/src/pages/licenses/[license].astro";
const $$url = "/licenses/[license]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$license,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
