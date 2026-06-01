import { access } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const sourceDir = fileURLToPath(new URL('../output/imagegen/blog-ai/', import.meta.url));
const targetDir = fileURLToPath(new URL('../public/blog/', import.meta.url));

const images = [
  {
    source: '001-editorial-hand-drawn-illustration-for-a-specialty-coffee-blo.png',
    target: 'jak-wybrac-kawe-ziarnista-cover.webp'
  },
  {
    source: '002-hand-drawn-editorial-illustration-about-choosing-coffee-brew.png',
    target: 'metody-parzenia-kawy-w-domu.webp'
  },
  {
    source: '003-hand-drawn-editorial-illustration-about-coffee-flavor-notes-.png',
    target: 'profil-smakowy-kawy-ziarnistej.webp'
  },
  {
    source: '004-editorial-hand-drawn-illustration-comparing-light-roast-filt.png',
    target: 'kawa-jasno-palona-espresso-cover.webp'
  },
  {
    source: '005-hand-drawn-illustration-showing-the-difference-between-pour-.png',
    target: 'kawa-do-filtra-a-espresso.webp'
  },
  {
    source: '006-hand-drawn-editorial-illustration-about-omniroast-flexibilit.png',
    target: 'kawa-omniroast-do-filtra-i-espresso.webp'
  },
  {
    source: '007-editorial-hand-drawn-illustration-about-storing-coffee-beans.png',
    target: 'jak-przechowywac-kawe-ziarnista-cover.webp'
  },
  {
    source: '008-hand-drawn-editorial-illustration-of-coffee-stored-in-a-clos.png',
    target: 'przechowywanie-kawy-w-szafce.webp'
  },
  {
    source: '009-hand-drawn-editorial-illustration-about-keeping-coffee-fresh.png',
    target: 'swieza-kawa-ziarnista-przechowywanie.webp'
  }
];

for (const image of images) {
  const sourcePath = join(sourceDir, image.source);
  await access(sourcePath);
  await sharp(sourcePath).webp({ quality: 90 }).toFile(join(targetDir, image.target));
  console.log(`Converted AI image ${image.source} -> ${image.target}`);
}
