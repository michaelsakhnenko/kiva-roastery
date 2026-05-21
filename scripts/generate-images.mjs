import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const productDir = fileURLToPath(new URL('../public/products/', import.meta.url));
const creditsPath = fileURLToPath(new URL('../public/image-credits.json', import.meta.url));

const coffees = [
  { slug: 'etiopia-guji', country: 'ETIOPIA', name: 'GUJI', process: 'WASHED', roast: 'FILTER', notes: 'BERGAMOTKA / BRZOSKWINIA', label: '#ffd23f', ink: '#21130d' },
  { slug: 'kenia-nyeri', country: 'KENIA', name: 'NYERI', process: 'WASHED', roast: 'FILTER', notes: 'PORZECZKA / GREJPFRUT', label: '#ff5d5d', ink: '#1a1010' },
  { slug: 'kolumbia-huila', country: 'KOLUMBIA', name: 'HUILA', process: 'WASHED', roast: 'FILTER', notes: 'LIMONKA / MIÓD', label: '#c7ef1d', ink: '#192006' },
  { slug: 'brazylia-cerrado', country: 'BRAZYLIA', name: 'CERRADO', process: 'NATURAL', roast: 'ESPRESSO', notes: 'CZEKOLADA / ORZECH', label: '#1f6b42', ink: '#fff7e8' },
  { slug: 'gwatemala-antigua', country: 'GWATEMALA', name: 'ANTIGUA', process: 'WASHED', roast: 'ESPRESSO', notes: 'KAKAO / ŚLIWKA', label: '#8b4dff', ink: '#fff7e8' },
  { slug: 'espresso-blend', country: 'ESPRESSO', name: 'BLEND', process: 'NATURAL + WASHED', roast: 'ESPRESSO', notes: 'WIŚNIA / MELASA', label: '#151515', ink: '#ff4fb8' },
  { slug: 'rwanda-musasa', country: 'RWANDA', name: 'MUSASA', process: 'WASHED', roast: 'OMNIROAST', notes: 'MORELA / CZERWONA HERBATA', label: '#2cb7ff', ink: '#071b2b' },
  { slug: 'peru-cajamarca', country: 'PERU', name: 'CAJAMARCA', process: 'WASHED', roast: 'OMNIROAST', notes: 'POMARAŃCZA / DAKTYL', label: '#ff8a22', ink: '#231006' },
  { slug: 'kolumbia-decaf', country: 'KOLUMBIA', name: 'DECAF', process: 'SUGARCANE', roast: 'OMNIROAST', notes: 'KARMEL / WANILIA', label: '#fff0c9', ink: '#b31367' }
];

function beanPattern(ink) {
  const beans = [
    [608, 716, -8], [690, 742, 22], [774, 706, -16],
    [536, 1052, -14], [648, 1036, 9], [758, 1046, 16]
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
  const processSize = coffee.process.length > 13 ? 21 : 25;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="1200" viewBox="0 0 960 1200">
    <defs>
      <filter id="productShadow" x="-30%" y="-25%" width="160%" height="160%">
        <feDropShadow dx="0" dy="28" stdDeviation="18" flood-color="#000000" flood-opacity="0.28"/>
        <feDropShadow dx="-10" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.08"/>
      </filter>
      <filter id="labelInset" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.16"/>
      </filter>
      <pattern id="paperTexture" width="42" height="42" patternUnits="userSpaceOnUse">
        <path d="M0 11 H42 M0 29 H42" stroke="#c9cac2" stroke-width="1" opacity="0.11"/>
        <circle cx="8" cy="6" r="1.2" fill="#bfc0b8" opacity="0.16"/>
        <circle cx="30" cy="22" r="1" fill="#ffffff" opacity="0.32"/>
        <circle cx="18" cy="36" r="0.9" fill="#bfc0b8" opacity="0.12"/>
      </pattern>
      <linearGradient id="bagFront" x1="0.08" x2="0.92" y1="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="0.28" stop-color="#fbfbf5"/>
        <stop offset="0.66" stop-color="#ecece4"/>
        <stop offset="1" stop-color="#d8d8cf"/>
      </linearGradient>
      <linearGradient id="leftFold" x1="0" x2="1">
        <stop offset="0" stop-color="#babbb2"/>
        <stop offset="0.34" stop-color="#f8f8f2"/>
        <stop offset="1" stop-color="#d6d6cd"/>
      </linearGradient>
      <linearGradient id="rightFold" x1="0" x2="1">
        <stop offset="0" stop-color="#f9f9f4"/>
        <stop offset="0.62" stop-color="#d4d4cb"/>
        <stop offset="1" stop-color="#aeb0a8"/>
      </linearGradient>
      <linearGradient id="labelLight" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.24"/>
        <stop offset="0.42" stop-color="#ffffff" stop-opacity="0.02"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.12"/>
      </linearGradient>
      <linearGradient id="seal" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.92"/>
        <stop offset="0.5" stop-color="#d8d8cf" stop-opacity="0.78"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0.72"/>
      </linearGradient>
      <clipPath id="bagClip">
        <path d="M154 50 C154 22 177 10 206 12 L752 12 C785 12 807 27 807 58 C810 234 826 922 842 1112 C846 1162 809 1190 760 1190 L210 1190 C160 1190 121 1162 126 1112 C142 912 150 234 154 50 Z"/>
      </clipPath>
    </defs>

    <g filter="url(#productShadow)">
      <path d="M154 50 C154 22 177 10 206 12 L752 12 C785 12 807 27 807 58 C810 234 826 922 842 1112 C846 1162 809 1190 760 1190 L210 1190 C160 1190 121 1162 126 1112 C142 912 150 234 154 50 Z" fill="url(#bagFront)"/>
      <path d="M154 66 C142 280 139 827 126 1112 C121 1162 160 1190 210 1190 C176 1136 170 940 174 702 C178 464 172 210 154 66 Z" fill="url(#leftFold)" opacity="0.72"/>
      <path d="M807 66 C820 280 826 827 842 1112 C846 1162 809 1190 760 1190 C793 1136 793 940 787 704 C782 452 792 208 807 66 Z" fill="url(#rightFold)" opacity="0.62"/>
      <path d="M190 22 C322 30 424 20 506 26 C610 34 684 16 774 30 C793 34 804 43 807 58 L154 58 C159 36 174 25 190 22 Z" fill="#f8f8f1" opacity="0.92"/>

      <g clip-path="url(#bagClip)">
        <path d="M154 50 C154 22 177 10 206 12 L752 12 C785 12 807 27 807 58 C810 234 826 922 842 1112 C846 1162 809 1190 760 1190 L210 1190 C160 1190 121 1162 126 1112 C142 912 150 234 154 50 Z" fill="url(#paperTexture)" opacity="0.55"/>
        <path d="M150 178 C276 171 400 174 525 170 C635 166 724 170 816 177" fill="none" stroke="#b8bab2" stroke-width="8" opacity="0.72"/>
        <path d="M162 216 C274 206 414 218 532 210 C648 202 720 209 808 216" fill="none" stroke="#ffffff" stroke-width="8" opacity="0.84"/>
        <path d="M180 246 C288 254 382 242 486 248 C610 255 704 238 792 248" fill="none" stroke="url(#seal)" stroke-width="18" opacity="0.78"/>
        <path d="M210 88 C306 61 394 84 486 74 C604 62 678 60 766 94" fill="none" stroke="#ffffff" stroke-width="20" opacity="0.6"/>
        <path d="M212 92 C318 76 404 100 490 88 C598 74 674 76 760 106" fill="none" stroke="#c8c9c0" stroke-width="7" opacity="0.26"/>
        <path d="M238 330 C324 284 430 320 520 294 C630 262 708 290 768 266" fill="none" stroke="#c9cac2" stroke-width="24" opacity="0.28"/>
        <path d="M204 392 C328 356 432 414 526 382 C646 340 720 376 790 348" fill="none" stroke="#ffffff" stroke-width="18" opacity="0.34"/>
        <path d="M204 508 C320 464 426 516 528 488 C642 456 712 484 780 462" fill="none" stroke="#ffffff" stroke-width="28" opacity="0.32"/>
        <path d="M184 648 C300 618 436 650 540 628 C664 602 732 622 816 610" fill="none" stroke="#c8c9c0" stroke-width="16" opacity="0.22"/>

        <g filter="url(#labelInset)">
          <path d="M142 646 C286 642 404 650 520 644 C638 638 728 644 820 634 L820 1096 C704 1110 580 1098 462 1104 C338 1110 228 1094 140 1102 Z" fill="${coffee.label}"/>
          <path d="M142 646 C286 642 404 650 520 644 C638 638 728 644 820 634 L820 1096 C704 1110 580 1098 462 1104 C338 1110 228 1094 140 1102 Z" fill="url(#labelLight)"/>
        </g>
        <path d="M142 648 C298 646 402 654 520 646 C644 638 734 646 820 636" fill="none" stroke="#ffffff" stroke-width="8" opacity="0.16"/>
        <path d="M152 1088 C290 1098 390 1090 486 1096 C610 1104 710 1092 818 1088" fill="none" stroke="#000000" stroke-width="8" opacity="0.1"/>
        <path d="M520 662 C574 730 628 744 704 710 C760 686 800 714 824 746" fill="none" stroke="${accent}" stroke-width="7" opacity="0.38"/>
        <path d="M520 684 C574 752 628 766 704 732 C760 708 800 736 824 768" fill="none" stroke="${accent}" stroke-width="7" opacity="0.26"/>
        ${beanPattern(accent)}
      </g>

      <path d="M154 50 C154 22 177 10 206 12 L752 12 C785 12 807 27 807 58 C810 234 826 922 842 1112 C846 1162 809 1190 760 1190 L210 1190 C160 1190 121 1162 126 1112 C142 912 150 234 154 50 Z" fill="none" stroke="#c9c9bf" stroke-width="3" opacity="0.42"/>
      <path d="M172 104 C162 378 162 738 142 1090" fill="none" stroke="#ffffff" stroke-width="10" opacity="0.28"/>
      <path d="M794 104 C800 420 812 752 822 1088" fill="none" stroke="#6f7169" stroke-width="8" opacity="0.12"/>

      <text x="198" y="760" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="900" fill="${accent}">KIVA</text>
      <text x="202" y="808" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" fill="${accent}" letter-spacing="2">SPECIALTY COFFEE ROASTERY</text>
      <text x="198" y="900" font-family="Courier New, monospace" font-size="66" font-weight="900" fill="${accent}" letter-spacing="4">${coffee.country}</text>
      <text x="202" y="956" font-family="Courier New, monospace" font-size="36" font-weight="800" fill="${accent}" letter-spacing="4">${coffee.name}</text>
      <text x="202" y="1002" font-family="Courier New, monospace" font-size="${processSize}" font-weight="800" fill="${accent}" letter-spacing="2">${coffee.process} / ${coffee.roast}</text>
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
      title: `${coffee.country} ${coffee.name} KIVA coffee bag mockup`,
      author: 'Generated locally for KIVA university project',
      license: 'Project-owned generated asset',
      source: 'scripts/generate-images.mjs'
    })),
    null,
    2
  )
);
console.log(`Wrote ${creditsPath}`);
