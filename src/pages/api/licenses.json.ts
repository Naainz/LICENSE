import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

const parseList = (lines: string[], startIndex: number) => {
  const list = [];
  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('- ')) {
      list.push(line.replace('- ', '').trim());
    } else {
      break;
    }
  }
  return list;
};

const arraysEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  arr1.sort();
  arr2.sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export const GET: APIRoute = async ({ request }) => {
  const licensesDir = path.resolve('./src/db');
  const licenses = fs.readdirSync(licensesDir).filter(file => file.endsWith('.txt')).map(file => {
    const content = fs.readFileSync(path.join(licensesDir, file), 'utf-8');
    const [metadataSection, bodySection] = content.split('---').filter(section => section.trim() !== '');
    const metadataLines = metadataSection.trim().split('\n');
    const metadata: { [key: string]: any } = {};
    metadataLines.forEach((line, index) => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key) {
        if (key === 'permissions' || key === 'conditions' || key === 'limitations') {
          metadata[key] = value ? value.split(',').map(item => item.trim()) : parseList(metadataLines, index);
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
    metadataLines.forEach((line, index) => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key) {
        if (key === 'permissions' || key === 'conditions' || key === 'limitations') {
          metadata[key] = value ? value.split(',').map(item => item.trim()) : parseList(metadataLines, index);
        } else {
          metadata[key] = value;
        }
      }
    });
    metadata.body = bodySection.trim();
    metadata.file = file;
    return metadata;
  });

  console.log('Total licenses found:', licenses.length);

  const matchedLicenses = licenses.filter(license => {
    const matchPermissions = arraysEqual(permissions, license.permissions || []);
    const matchLimitations = arraysEqual(limitations, license.limitations || []);
    const matchConditions = arraysEqual(conditions, license.conditions || []);

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
