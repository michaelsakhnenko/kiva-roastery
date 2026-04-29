import { access, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const productDir = fileURLToPath(new URL('../public/products/', import.meta.url));
const creditsPath = fileURLToPath(new URL('../public/image-credits.json', import.meta.url));

const sources = [
  {
    slug: 'lampa-orbit',
    url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/08.09.2024_Flea_market_Novopodrezkovo_Vintage_Green_Glass_Table_Lamp.jpg?width=1200',
    title: 'Vintage Green Glass Table Lamp',
    author: 'NVO',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons'
  },
  {
    slug: 'lampa-gliniana',
    url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ceramic_lamp_-_Mexico.jpg?width=1200',
    title: 'Ceramic lamp - Mexico',
    author: 'Juan Carlos Fonseca Mata',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons'
  },
  {
    slug: 'lampa-neon-leaf',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Dekala_Arches%E2%84%A2_Smart_Lamp.jpg',
    title: 'Dekala Arches Smart Lamp',
    author: 'LannyWay',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons'
  },
  {
    slug: 'dywan-fala',
    url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Navajo_Yei_Rug_03.jpg?width=1200',
    title: 'Navajo Yei Rug',
    author: 'Wikimedia Commons contributor',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons'
  },
  {
    slug: 'dywan-terra',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Handicrafts_Products_%28Carpets%29_from_Essaouira_%28ancienne_Mogador%29_25.jpg',
    title: 'Handicrafts Products Carpets from Essaouira',
    author: 'Mounir Neddi',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons'
  },
  {
    slug: 'dywan-grid',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Hooked_Rug_MET_121617.jpg',
    title: 'Hooked Rug',
    author: 'Metropolitan Museum of Art',
    license: 'Public domain',
    source: 'Wikimedia Commons'
  },
  {
    slug: 'stolik-plama',
    url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Back_side_table_pine_top_with_mango_wood_legs_side.png?width=1200',
    title: 'Pine top side table with mango wood legs',
    author: 'Wikimedia Commons contributor',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons'
  },
  {
    slug: 'krzeslo-curve',
    url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Side_Chair_(USA),_1901_(CH_18490453).jpg?width=1200',
    title: 'Side Chair, USA, 1901',
    author: 'Cooper Hewitt, Smithsonian Design Museum',
    license: 'Public domain',
    source: 'Wikimedia Commons'
  },
  {
    slug: 'konsola-linea',
    url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/France,_18th_century_-_Console_Table_-_1923.225_-_Cleveland_Museum_of_Art.jpg?width=1200',
    title: 'Console Table, France, 18th century',
    author: 'Cleveland Museum of Art',
    license: 'Public domain',
    source: 'Wikimedia Commons'
  }
];

await mkdir(productDir, { recursive: true });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function download(url, slug) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'KIVO university project image downloader (contact: classroom project)' }
    });

    if (response.ok) return Buffer.from(await response.arrayBuffer());

    if (response.status === 429 && attempt < 4) {
      const delay = attempt * 8000;
      console.log(`Rate limited while downloading ${slug}; waiting ${delay / 1000}s`);
      await wait(delay);
      continue;
    }

    throw new Error(`Failed to download ${slug}: ${response.status} ${response.statusText}`);
  }
}

for (const item of sources) {
  const filePath = join(productDir, `${item.slug}.webp`);
  if (await exists(filePath)) {
    console.log(`Keeping existing ${filePath}`);
    continue;
  }

  const input = await download(item.url, item.slug);
  const output = await sharp(input, { limitInputPixels: false })
    .rotate()
    .resize(960, 720, { fit: 'contain', background: '#f4efe6' })
    .webp({ quality: 86 })
    .toBuffer();

  await writeFile(filePath, output);
  console.log(`Generated ${filePath}`);
  await wait(2500);
}

await writeFile(creditsPath, JSON.stringify(sources, null, 2));
console.log(`Wrote ${creditsPath}`);
