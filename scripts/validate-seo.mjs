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

const blogImageKeywordPattern = /\b(kawa|kawy|ziarnista|espresso|filtra|parzenia|smakowy|przechowyw|swieza)\b/i;
const files = await walk(dist);
const expectedPages = [
  'kategorie/filter/index.html',
  'kategorie/espresso/index.html',
  'kategorie/omniroast/index.html'
];
const fileSet = new Set(files.map((file) => file.slice(dist.length)));

for (const expectedPage of expectedPages) {
  if (!fileSet.has(expectedPage)) failures.push(`${expectedPage}: expected generated category page`);
}

for (const file of files) {
  const html = await readFile(file, 'utf8');
  if (!/<title>[^<]{20,}<\/title>/.test(html)) failures.push(`${file}: missing useful title`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) failures.push(`${file}: missing useful meta description`);
  if (countMatches(html, /<h1[\s>]/g) !== 1) failures.push(`${file}: expected exactly one h1`);
  if (/<img\b(?![^>]*\balt=)/.test(html)) failures.push(`${file}: image without alt`);
  if (/<img\b[^>]*src="[^"]+\.(png|jpg|jpeg|svg)"/i.test(html)) failures.push(`${file}: non-WebP image referenced`);
  for (const match of html.matchAll(/<img\b[^>]*src="\/blog\/([^"]+\.webp)"/gi)) {
    const filename = match[1].replace(/\.webp$/i, '');
    if (!blogImageKeywordPattern.test(filename)) failures.push(`${file}: blog image filename lacks SEO keyword: ${match[1]}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`SEO validation passed for ${files.length} HTML files.`);
