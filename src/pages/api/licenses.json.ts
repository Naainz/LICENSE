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

const loadLicenses = () => {
  const licensesDir = path.resolve('./src/db');
  return fs.readdirSync(licensesDir).filter(file => file.endsWith('.txt')).map(file => {
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
};

const calculateMatchPercentage = (text1: string, text2: string) => {
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);
  const totalWords = Math.max(words1.length, words2.length);
  let matchCount = 0;
  
  words1.forEach(word => {
    if (words2.includes(word)) {
      matchCount++;
    }
  });

  return (matchCount / totalWords) * 100;
};

export const GET: APIRoute = async ({ request }) => {
  const licenses = loadLicenses();

  return new Response(JSON.stringify(licenses), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { name, permissions, limitations, text } = await request.json();

  const licenses = loadLicenses();

  if (text) {
    const normalizedText = text.replace(/[^\w\s]/g, '').toLowerCase();
    const matchedLicenses = licenses.map(license => {
      const normalizedLicenseBody = license.body.replace(/[^\w\s]/g, '').toLowerCase();
      const matchPercentage = calculateMatchPercentage(normalizedText, normalizedLicenseBody);
      return { ...license, matchPercentage };
    }).filter(license => license.matchPercentage > 50);

    if (matchedLicenses.length > 0) {
      const bestMatch = matchedLicenses.reduce((max, license) => max.matchPercentage > license.matchPercentage ? max : license);
      const currentYear = new Date().getFullYear();
      const processedBody = bestMatch.body
        .replace(/\[fullname\]/g, name)
        .replace(/\[year\]/g, currentYear);
      return new Response(JSON.stringify({ matched: true, license: { ...bestMatch, body: processedBody } }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ matched: false }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } else {
    const matchedLicenses = licenses.filter(license => {
      const matchPermissions = arraysEqual(permissions, license.permissions || []);
      const matchLimitations = arraysEqual(limitations, license.limitations || []);
      return matchPermissions && matchLimitations;
    });

    const currentYear = new Date().getFullYear();
    const processedLicenses = matchedLicenses.map(license => {
      const processedBody = license.body
        .replace(/\[fullname\]/g, name)
        .replace(/\[year\]/g, currentYear);
      return { ...license, body: processedBody };
    });

    return new Response(JSON.stringify(processedLicenses), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
