import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const failures = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function countMatches(content, regex) {
  return [...content.matchAll(regex)].length;
}

const files = await walk(dist);

for (const file of files) {
  const html = await readFile(file, 'utf8');
  if (!/<title>[^<]{20,}<\/title>/.test(html)) failures.push(`${file}: missing useful title`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) failures.push(`${file}: missing useful meta description`);
  if (countMatches(html, /<h1[\s>]/g) !== 1) failures.push(`${file}: expected exactly one h1`);
  if (/<img\b(?![^>]*\balt=)/.test(html)) failures.push(`${file}: image without alt`);
  if (/<img\b[^>]*src="[^"]+\.(png|jpg|jpeg|svg)"/i.test(html)) failures.push(`${file}: non-WebP image referenced`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`SEO validation passed for ${files.length} HTML files.`);
