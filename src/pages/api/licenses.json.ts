import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async ({ request }) => {
  const licensesDir = path.resolve('./src/db');
  const licenses = fs.readdirSync(licensesDir).filter(file => file.endsWith('.txt')).map(file => {
    const content = fs.readFileSync(path.join(licensesDir, file), 'utf-8');
    const [metadataSection, bodySection] = content.split('---').filter(section => section.trim() !== '');
    const metadataLines = metadataSection.trim().split('\n');
    const metadata: { [key: string]: any } = {};
    metadataLines.forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        if (key === 'permissions' || key === 'conditions' || key === 'limitations') {
          metadata[key] = value.split(',').map(item => item.trim());
        } else {
          metadata[key] = value;
        }
      }
    });
    metadata.body = bodySection.trim();
    metadata.file = file;
    return metadata;
  });

  return new Response(JSON.stringify(licenses), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
