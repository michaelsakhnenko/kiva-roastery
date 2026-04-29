import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const outputDir = fileURLToPath(new URL('../public/', import.meta.url));

const visuals = {
  green: `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#234b39"/><circle cx="220" cy="190" r="86" fill="#f4efe6" stroke="#161713" stroke-width="10"/><rect x="318" y="144" width="190" height="190" fill="#d8ff33" stroke="#161713" stroke-width="10"/><path d="M120 390 C220 300 330 420 520 310" fill="none" stroke="#f05a28" stroke-width="22"/></svg>`,
  lime: `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#d8ff33"/><rect x="70" y="80" width="190" height="300" fill="#161713"/><circle cx="415" cy="190" r="112" fill="#f4efe6" stroke="#161713" stroke-width="10"/><path d="M328 340 L548 340 L480 410 L260 410 Z" fill="#f05a28" stroke="#161713" stroke-width="10"/></svg>`,
  terracotta: `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#f05a28"/><path d="M92 120 C160 55 280 70 310 150 C348 250 245 335 132 302 C52 278 35 178 92 120 Z" fill="#f4efe6" stroke="#161713" stroke-width="10"/><rect x="365" y="90" width="170" height="300" fill="#234b39" stroke="#161713" stroke-width="10"/><circle cx="450" cy="242" r="42" fill="#d8ff33" stroke="#161713" stroke-width="8"/></svg>`,
  cream: `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#f4efe6"/><path d="M68 350 C170 250 240 405 335 292 C410 202 490 230 570 135" fill="none" stroke="#161713" stroke-width="18"/><rect x="96" y="80" width="148" height="112" fill="#d8ff33" stroke="#161713" stroke-width="10"/><circle cx="456" cy="310" r="92" fill="#f05a28" stroke="#161713" stroke-width="10"/></svg>`,
  black: `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#161713"/><rect x="68" y="76" width="210" height="310" fill="#f4efe6" stroke="#d8ff33" stroke-width="10"/><circle cx="438" cy="170" r="100" fill="#f05a28" stroke="#f4efe6" stroke-width="10"/><path d="M330 360 L550 300" stroke="#d8ff33" stroke-width="24" stroke-linecap="round"/></svg>`
};

await mkdir(outputDir, { recursive: true });

for (const [name, svg] of Object.entries(visuals)) {
  const filePath = join(outputDir, `visual-${name}.webp`);
  const image = await sharp(Buffer.from(svg)).webp({ quality: 86 }).toBuffer();
  await writeFile(filePath, image);
  console.log(`Generated ${filePath}`);
}
