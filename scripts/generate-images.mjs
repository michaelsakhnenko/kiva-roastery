import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const productDir = join(publicDir, 'products');

const palette = {
  ink: '#161713',
  paper: '#f4efe6',
  cream: '#fffaf0',
  green: '#234b39',
  terracotta: '#f05a28',
  lime: '#d8ff33',
  clay: '#b86a4a',
  tan: '#d8c2a2'
};

function frame(content, background = palette.paper) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="18" stdDeviation="12" flood-color="#161713" flood-opacity="0.22"/>
      </filter>
      <pattern id="grain" width="80" height="80" patternUnits="userSpaceOnUse">
        <circle cx="11" cy="18" r="1.2" fill="#161713" opacity="0.05"/>
        <circle cx="62" cy="33" r="1" fill="#161713" opacity="0.04"/>
        <circle cx="35" cy="69" r="1.4" fill="#161713" opacity="0.035"/>
      </pattern>
    </defs>
    <rect width="960" height="720" fill="${background}"/>
    <rect width="960" height="720" fill="url(#grain)"/>
    <rect x="54" y="54" width="852" height="612" fill="none" stroke="${palette.ink}" stroke-width="8"/>
    ${content}
  </svg>`;
}

const images = {
  'lampa-orbit': frame(`
    <ellipse cx="480" cy="600" rx="250" ry="34" fill="#161713" opacity="0.18"/>
    <g filter="url(#shadow)">
      <rect x="404" y="420" width="152" height="126" rx="18" fill="${palette.ink}"/>
      <path d="M428 418 C428 318 532 318 532 418 Z" fill="${palette.green}" stroke="${palette.ink}" stroke-width="8"/>
      <circle cx="480" cy="278" r="116" fill="${palette.cream}" stroke="${palette.ink}" stroke-width="9"/>
      <circle cx="440" cy="240" r="26" fill="#ffffff" opacity="0.72"/>
    </g>
    <path d="M132 180 L270 180" stroke="${palette.lime}" stroke-width="20" stroke-linecap="round"/>
    <path d="M690 540 L812 450" stroke="${palette.terracotta}" stroke-width="20" stroke-linecap="round"/>
  `, '#eadfcd'),
  'lampa-gliniana': frame(`
    <ellipse cx="488" cy="604" rx="256" ry="34" fill="#161713" opacity="0.16"/>
    <g filter="url(#shadow)">
      <path d="M382 530 C350 430 388 342 450 306 C512 270 594 318 606 406 C618 494 560 550 476 552 C434 553 398 550 382 530 Z" fill="${palette.clay}" stroke="${palette.ink}" stroke-width="8"/>
      <path d="M412 488 C468 464 532 468 584 502" fill="none" stroke="#7e3f2d" stroke-width="9" opacity="0.45"/>
      <path d="M422 426 C480 398 536 410 586 442" fill="none" stroke="#7e3f2d" stroke-width="8" opacity="0.45"/>
      <ellipse cx="492" cy="286" rx="138" ry="82" fill="${palette.cream}" stroke="${palette.ink}" stroke-width="8"/>
      <rect x="426" y="282" width="132" height="104" fill="${palette.cream}" stroke="${palette.ink}" stroke-width="8"/>
    </g>
    <circle cx="746" cy="176" r="52" fill="${palette.lime}" stroke="${palette.ink}" stroke-width="8"/>
  `, '#f0e0d3'),
  'lampa-neon-leaf': frame(`
    <ellipse cx="498" cy="610" rx="220" ry="30" fill="#161713" opacity="0.17"/>
    <g filter="url(#shadow)">
      <rect x="468" y="380" width="46" height="180" fill="${palette.ink}"/>
      <path d="M494 382 C410 318 405 218 498 152 C590 222 588 324 494 382 Z" fill="${palette.green}" stroke="${palette.ink}" stroke-width="8"/>
      <path d="M494 170 C500 238 494 306 494 374" stroke="${palette.lime}" stroke-width="18" stroke-linecap="round"/>
      <ellipse cx="492" cy="566" rx="94" ry="30" fill="${palette.ink}"/>
    </g>
    <rect x="114" y="122" width="160" height="84" fill="${palette.terracotta}" stroke="${palette.ink}" stroke-width="8"/>
  `, '#f2eee2'),
  'dywan-fala': frame(`
    <g filter="url(#shadow)">
      <path d="M178 458 C270 350 350 538 456 420 C552 313 646 425 774 330 L812 520 C662 600 542 548 438 604 C318 670 238 560 144 616 Z" fill="${palette.cream}" stroke="${palette.ink}" stroke-width="8"/>
      <path d="M216 494 C310 396 376 536 472 442 C556 360 636 426 752 362" fill="none" stroke="${palette.terracotta}" stroke-width="18" stroke-linecap="round"/>
      <path d="M244 548 C342 472 408 588 508 506 C594 438 650 494 748 450" fill="none" stroke="${palette.green}" stroke-width="12" stroke-linecap="round"/>
    </g>
    <circle cx="204" cy="164" r="70" fill="${palette.lime}" stroke="${palette.ink}" stroke-width="8"/>
  `, '#e8dac6'),
  'dywan-terra': frame(`
    <g filter="url(#shadow)">
      <path d="M154 286 L786 226 L840 542 L214 606 Z" fill="${palette.terracotta}" stroke="${palette.ink}" stroke-width="8"/>
      <path d="M210 328 L766 276" stroke="#7d392a" stroke-width="14" opacity="0.38"/>
      <path d="M238 394 L786 342" stroke="#fff1dd" stroke-width="13" opacity="0.5"/>
      <path d="M250 462 L804 410" stroke="#7d392a" stroke-width="14" opacity="0.35"/>
      <path d="M280 526 L808 476" stroke="#fff1dd" stroke-width="12" opacity="0.48"/>
    </g>
    <rect x="110" y="118" width="136" height="86" fill="${palette.green}" stroke="${palette.ink}" stroke-width="8"/>
  `, '#eee0cf'),
  'dywan-grid': frame(`
    <g filter="url(#shadow)">
      <path d="M132 236 L812 236 L812 574 L132 574 Z" fill="${palette.cream}" stroke="${palette.ink}" stroke-width="8"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${210 + i * 96} 236 L${156 + i * 106} 574" stroke="${palette.ink}" stroke-width="7" opacity="0.78"/>`).join('')}
      ${Array.from({ length: 4 }, (_, i) => `<path d="M132 ${306 + i * 68} L812 ${306 + i * 68}" stroke="${palette.ink}" stroke-width="7" opacity="0.78"/>`).join('')}
      <circle cx="696" cy="342" r="48" fill="${palette.lime}" stroke="${palette.ink}" stroke-width="7"/>
    </g>
    <path d="M126 154 L286 154" stroke="${palette.terracotta}" stroke-width="18" stroke-linecap="round"/>
  `, '#f3eee2'),
  'stolik-plama': frame(`
    <ellipse cx="486" cy="612" rx="232" ry="34" fill="#161713" opacity="0.17"/>
    <g filter="url(#shadow)">
      <path d="M318 252 C380 180 520 196 618 258 C704 313 634 408 502 412 C372 416 254 348 318 252 Z" fill="${palette.cream}" stroke="${palette.ink}" stroke-width="9"/>
      <path d="M410 410 L360 570" stroke="${palette.ink}" stroke-width="24" stroke-linecap="round"/>
      <path d="M560 410 L614 570" stroke="${palette.ink}" stroke-width="24" stroke-linecap="round"/>
      <path d="M336 572 L438 572" stroke="${palette.ink}" stroke-width="22" stroke-linecap="round"/>
      <path d="M582 572 L686 572" stroke="${palette.ink}" stroke-width="22" stroke-linecap="round"/>
      <circle cx="548" cy="294" r="36" fill="${palette.lime}" stroke="${palette.ink}" stroke-width="7"/>
    </g>
    <rect x="118" y="122" width="120" height="120" fill="${palette.terracotta}" stroke="${palette.ink}" stroke-width="8"/>
  `, '#ece3d6'),
  'krzeslo-curve': frame(`
    <ellipse cx="492" cy="620" rx="248" ry="34" fill="#161713" opacity="0.18"/>
    <g filter="url(#shadow)">
      <path d="M342 188 C342 112 630 112 630 258 L630 374 C630 446 342 446 342 374 Z" fill="${palette.green}" stroke="${palette.ink}" stroke-width="9"/>
      <rect x="338" y="354" width="300" height="88" rx="24" fill="${palette.cream}" stroke="${palette.ink}" stroke-width="9"/>
      <path d="M392 440 L350 590" stroke="${palette.ink}" stroke-width="20" stroke-linecap="round"/>
      <path d="M590 440 L642 590" stroke="${palette.ink}" stroke-width="20" stroke-linecap="round"/>
      <path d="M432 438 L430 592" stroke="${palette.ink}" stroke-width="16" stroke-linecap="round"/>
      <path d="M548 438 L548 592" stroke="${palette.ink}" stroke-width="16" stroke-linecap="round"/>
    </g>
    <circle cx="196" cy="214" r="58" fill="${palette.lime}" stroke="${palette.ink}" stroke-width="8"/>
  `, '#eee5d7'),
  'konsola-linea': frame(`
    <ellipse cx="488" cy="616" rx="272" ry="30" fill="#161713" opacity="0.16"/>
    <g filter="url(#shadow)">
      <rect x="214" y="290" width="548" height="78" rx="8" fill="${palette.cream}" stroke="${palette.ink}" stroke-width="9"/>
      <rect x="238" y="368" width="34" height="210" fill="${palette.ink}"/>
      <rect x="702" y="368" width="34" height="210" fill="${palette.ink}"/>
      <path d="M268 416 L718 416" stroke="${palette.terracotta}" stroke-width="12"/>
      <path d="M312 252 C330 198 392 198 410 252" fill="none" stroke="${palette.green}" stroke-width="16" stroke-linecap="round"/>
      <circle cx="594" cy="246" r="46" fill="${palette.lime}" stroke="${palette.ink}" stroke-width="8"/>
    </g>
    <path d="M130 166 L260 126" stroke="${palette.terracotta}" stroke-width="18" stroke-linecap="round"/>
  `, '#f0e6d7')
};

await mkdir(productDir, { recursive: true });

for (const [slug, svg] of Object.entries(images)) {
  const filePath = join(productDir, `${slug}.webp`);
  const image = await sharp(Buffer.from(svg)).webp({ quality: 88 }).toBuffer();
  await writeFile(filePath, image);
  console.log(`Generated ${filePath}`);
}
