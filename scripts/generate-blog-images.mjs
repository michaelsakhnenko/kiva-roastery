import { access } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const sourceDir = fileURLToPath(new URL('../output/imagegen/blog-ai/', import.meta.url));
const targetDir = fileURLToPath(new URL('../public/blog/', import.meta.url));

const images = [
  {
    source: '001-editorial-hand-drawn-illustration-for-a-specialty-coffee-blo.png',
    target: 'choose-coffee-cover.webp'
  },
  {
    source: '002-hand-drawn-editorial-illustration-about-choosing-coffee-brew.png',
    target: 'choose-coffee-methods.webp'
  },
  {
    source: '003-hand-drawn-editorial-illustration-about-coffee-flavor-notes-.png',
    target: 'choose-coffee-flavor.webp'
  },
  {
    source: '004-editorial-hand-drawn-illustration-comparing-light-roast-filt.png',
    target: 'roast-profile-cover.webp'
  },
  {
    source: '005-hand-drawn-illustration-showing-the-difference-between-pour-.png',
    target: 'roast-profile-filter-espresso.webp'
  },
  {
    source: '006-hand-drawn-editorial-illustration-about-omniroast-flexibilit.png',
    target: 'roast-profile-omniroast.webp'
  },
  {
    source: '007-editorial-hand-drawn-illustration-about-storing-coffee-beans.png',
    target: 'storage-cover.webp'
  },
  {
    source: '008-hand-drawn-editorial-illustration-of-coffee-stored-in-a-clos.png',
    target: 'storage-cupboard.webp'
  },
  {
    source: '009-hand-drawn-editorial-illustration-about-keeping-coffee-fresh.png',
    target: 'storage-freshness.webp'
  }
];

for (const image of images) {
  const sourcePath = join(sourceDir, image.source);
  await access(sourcePath);
  await sharp(sourcePath).webp({ quality: 90 }).toFile(join(targetDir, image.target));
  console.log(`Converted AI image ${image.source} -> ${image.target}`);
}
