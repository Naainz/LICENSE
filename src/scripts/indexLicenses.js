import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('src/db');
const cacheFile = path.resolve('src/db/licenseCache.json');

function indexLicenses() {
  const files = fs.readdirSync(dbPath);
  const licenses = files.filter(file => file.endsWith('.txt')).map(file => {
    const content = fs.readFileSync(path.join(dbPath, file), 'utf8');
    const lines = content.split('\n');
    const titleLine = lines.find(line => line.startsWith('title: '));
    const title = titleLine ? titleLine.split(': ')[1] : file;
    return {
      file,
      title
    };
  });

  fs.writeFileSync(cacheFile, JSON.stringify(licenses, null, 2));
  return licenses;
}

export function getLicenses() {
  if (fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  }
  return indexLicenses();
}
