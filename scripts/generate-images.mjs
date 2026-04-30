import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const productDir = fileURLToPath(new URL('../public/products/', import.meta.url));
const creditsPath = fileURLToPath(new URL('../public/image-credits.json', import.meta.url));

const coffees = [
  { slug: 'etiopia-guji', country: 'ETIOPIA', name: 'GUJI', process: 'WASHED', roast: 'FILTER', notes: 'BERGAMOTKA / BRZOSKWINIA', label: '#ffd23f', ink: '#21130d' },
  { slug: 'kenia-nyeri', country: 'KENIA', name: 'NYERI', process: 'WASHED', roast: 'FILTER', notes: 'PORZECZKA / GREJPFRUT', label: '#ff5d5d', ink: '#1a1010' },
  { slug: 'kolumbia-huila', country: 'KOLUMBIA', name: 'HUILA', process: 'WASHED', roast: 'FILTER', notes: 'LIMONKA / MIOD', label: '#c7ef1d', ink: '#192006' },
  { slug: 'brazylia-cerrado', country: 'BRAZYLIA', name: 'CERRADO', process: 'NATURAL', roast: 'ESPRESSO', notes: 'CZEKOLADA / ORZECH', label: '#1f6b42', ink: '#fff7e8' },
  { slug: 'gwatemala-antigua', country: 'GWATEMALA', name: 'ANTIGUA', process: 'WASHED', roast: 'ESPRESSO', notes: 'KAKAO / SLIWKA', label: '#8b4dff', ink: '#fff7e8' },
  { slug: 'espresso-blend', country: 'ESPRESSO', name: 'BLEND', process: 'NATURAL + WASHED', roast: 'ESPRESSO', notes: 'WISNIA / MELASA', label: '#151515', ink: '#ff4fb8' },
  { slug: 'rwanda-musasa', country: 'RWANDA', name: 'MUSASA', process: 'WASHED', roast: 'OMNIROAST', notes: 'MORELA / CZERWONA HERBATA', label: '#2cb7ff', ink: '#071b2b' },
  { slug: 'peru-cajamarca', country: 'PERU', name: 'CAJAMARCA', process: 'WASHED', roast: 'OMNIROAST', notes: 'POMARANCZA / DAKTYL', label: '#ff8a22', ink: '#231006' },
  { slug: 'kolumbia-decaf', country: 'KOLUMBIA', name: 'DECAF', process: 'SUGARCANE', roast: 'OMNIROAST', notes: 'KARMEL / WANILIA', label: '#fff0c9', ink: '#b31367' }
];

function beanPattern(ink) {
  const beans = [
    [586, 704, -8], [684, 734, 22], [780, 702, -16],
    [520, 1048, -14], [640, 1032, 9], [760, 1042, 16]
  ];

  return beans.map(([x, y, rotation]) => `
    <g transform="translate(${x} ${y}) rotate(${rotation})">
      <ellipse cx="0" cy="0" rx="20" ry="10" fill="${ink}" opacity="0.88"/>
      <path d="M-5 -7 C3 -3 3 3 -5 7" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.65"/>
    </g>
  `).join('');
}

function bagSvg(coffee) {
  const accent = coffee.ink;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="1200" viewBox="0 0 960 1200">
    <defs>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="24" stdDeviation="20" flood-color="#000000" flood-opacity="0.26"/>
      </filter>
      <linearGradient id="bag" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="0.46" stop-color="#f7f7f2"/>
        <stop offset="1" stop-color="#deded6"/>
      </linearGradient>
      <linearGradient id="crease" x1="0" x2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.7"/>
        <stop offset="0.5" stop-color="#b8b8b0" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0.65"/>
      </linearGradient>
    </defs>

    <g filter="url(#softShadow)">
      <path d="M150 40 C150 18 170 8 194 8 L766 8 C790 8 810 18 810 40 L838 1114 C840 1160 806 1188 760 1188 L200 1188 C154 1188 120 1160 122 1114 Z" fill="url(#bag)"/>
      <path d="M154 206 L808 206" stroke="#cfcfc8" stroke-width="9"/>
      <path d="M174 246 L786 246" stroke="#fefefa" stroke-width="7"/>
      <path d="M196 86 C300 58 392 82 482 72 C604 58 672 58 768 92" fill="none" stroke="url(#crease)" stroke-width="22" opacity="0.65"/>
      <path d="M210 318 C300 280 420 316 508 292 C626 260 708 294 770 270" fill="none" stroke="#d3d3cc" stroke-width="26" opacity="0.35"/>
      <path d="M198 510 C312 462 422 512 522 486 C642 454 706 482 778 460" fill="none" stroke="#ffffff" stroke-width="30" opacity="0.35"/>

      <rect x="140" y="646" width="680" height="450" fill="${coffee.label}"/>
      <path d="M520 662 C574 730 628 744 704 710 C760 686 800 714 824 746" fill="none" stroke="${accent}" stroke-width="7" opacity="0.45"/>
      <path d="M520 684 C574 752 628 766 704 732 C760 708 800 736 824 768" fill="none" stroke="${accent}" stroke-width="7" opacity="0.32"/>
      ${beanPattern(accent)}

      <text x="198" y="760" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="900" fill="${accent}">KIVO</text>
      <text x="202" y="808" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" fill="${accent}" letter-spacing="2">SPECIALTY COFFEE ROASTERY</text>
      <text x="198" y="902" font-family="Courier New, monospace" font-size="70" font-weight="900" fill="${accent}" letter-spacing="5">${coffee.country}</text>
      <text x="202" y="958" font-family="Courier New, monospace" font-size="36" font-weight="800" fill="${accent}" letter-spacing="4">${coffee.name}</text>
      <text x="202" y="1004" font-family="Courier New, monospace" font-size="28" font-weight="800" fill="${accent}" letter-spacing="3">${coffee.process} / ${coffee.roast}</text>
      <text x="202" y="1046" font-family="Courier New, monospace" font-size="24" font-weight="800" fill="${accent}" letter-spacing="2">${coffee.notes}</text>
    </g>
  </svg>`;
}

await mkdir(productDir, { recursive: true });

for (const coffee of coffees) {
  const svg = Buffer.from(bagSvg(coffee));
  const output = await sharp(svg)
    .webp({ quality: 92, alphaQuality: 100 })
    .toBuffer();

  const filePath = join(productDir, `${coffee.slug}.webp`);
  await writeFile(filePath, output);
  console.log(`Generated ${filePath}`);
}

await writeFile(
  creditsPath,
  JSON.stringify(
    coffees.map((coffee) => ({
      slug: coffee.slug,
      title: `${coffee.country} ${coffee.name} KIVO coffee bag mockup`,
      author: 'Generated locally for KIVO university project',
      license: 'Project-owned generated asset',
      source: 'scripts/generate-images.mjs'
    })),
    null,
    2
  )
);
console.log(`Wrote ${creditsPath}`);
