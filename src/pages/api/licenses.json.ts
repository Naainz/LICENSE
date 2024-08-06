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

export const POST: APIRoute = async ({ request }) => {
  const { permissions, limitations, conditions } = await request.json();

  console.log('Received criteria:');
  console.log('Permissions:', permissions);
  console.log('Limitations:', limitations);
  console.log('Conditions:', conditions);

  const licensesDir = path.resolve('./src/db');
  const licenses = fs.readdirSync(licensesDir).filter(file => file.endsWith('.txt')).map(file => {
    const content = fs.readFileSync(path.join(licensesDir, file), 'utf-8');
    const [metadataSection, bodySection] = content.split('---').filter(section => section.trim() !== '');
    const metadataLines = metadataSection.trim().split('\n');
    const metadata: { [key: string]: any } = {};
    let currentKey: string | null = null;
    metadataLines.forEach(line => {
      if (line.startsWith('permissions:') || line.startsWith('conditions:') || line.startsWith('limitations:')) {
        const [key, value] = line.split(':').map(s => s.trim());
        currentKey = key;
        metadata[key] = value ? value.split(',').map(item => item.trim()) : [];
      } else if (currentKey && line.startsWith('- ')) {
        metadata[currentKey].push(line.replace('- ', '').trim());
      } else {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) {
          metadata[key] = value;
        }
        currentKey = null;
      }
    });
    metadata.body = bodySection.trim();
    metadata.file = file;
    return metadata;
  });

  console.log('Total licenses found:', licenses.length);

  const matchedLicenses = licenses.filter(license => {
    const matchPermissions = permissions.every(permission => license.permissions && license.permissions.includes(permission));
    const matchLimitations = limitations.every(limitation => license.limitations && license.limitations.includes(limitation));
    const matchConditions = conditions.every(condition => license.conditions && license.conditions.includes(condition));

    const matches = matchPermissions && matchLimitations && matchConditions;

    if (!matches) {
      console.log(`License "${license.title}" did not match:`);
      console.log('Permissions:', license.permissions);
      console.log('Limitations:', license.limitations);
      console.log('Conditions:', license.conditions);
    }

    return matches;
  });

  console.log('Matched licenses:', matchedLicenses.length);

  return new Response(JSON.stringify(matchedLicenses), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
