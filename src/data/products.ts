import type { CategorySlug } from './categories';

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  country: string;
  region: string;
  process: string;
  roast: string;
  notes: string[];
  brew: string;
  altitude: string;
  price: string;
  title: string;
  description: string;
  imageAlt: string;
  color: 'lime' | 'coral' | 'yellow' | 'green' | 'purple' | 'blue' | 'orange' | 'black' | 'cream';
  summary: string;
  details: string[];
};

export const products: Product[] = [
  {
    slug: 'etiopia-guji',
    category: 'filter',
    name: 'Etiopia Guji',
    country: 'Etiopia',
    region: 'Guji',
    process: 'washed',
    roast: 'jasno palona',
    notes: ['bergamotka', 'brzoskwinia', 'biala herbata'],
    brew: 'V60, Chemex, AeroPress',
    altitude: '1 950-2 150 m n.p.m.',
    price: '59 zl / 250 g',
    title: 'Etiopia Guji kawa jasno palona do filtra | KIVO',
    description:
      'Etiopia Guji od KIVO to jasno palona kawa ziarnista speciality do filtra z nutami bergamotki, brzoskwini i bialej herbaty.',
    imageAlt: 'Biala paczka kawy KIVO Etiopia Guji z zolto-pomaranczowa etykieta na przezroczystym tle',
    color: 'yellow',
    summary: 'Kwiatowy filtr o herbacianej strukturze, jasnej kwasowosci i bardzo czystym finiszu.',
    details: ['Kraj: Etiopia', 'Region: Guji', 'Proces: washed', 'Profil: filter', 'Nuty: bergamotka, brzoskwinia, biala herbata']
  },
  {
    slug: 'kenia-nyeri',
    category: 'filter',
    name: 'Kenia Nyeri',
    country: 'Kenia',
    region: 'Nyeri',
    process: 'washed',
    roast: 'jasno palona',
    notes: ['czarna porzeczka', 'grejpfrut', 'cukier trzcinowy'],
    brew: 'V60, batch brew, Kalita',
    altitude: '1 700-1 900 m n.p.m.',
    price: '64 zl / 250 g',
    title: 'Kenia Nyeri kawa speciality do przelewu | KIVO',
    description:
      'Kenia Nyeri to kawa speciality jasno palona do przelewu: soczysta, porzeczkowa i intensywna, idealna do V60 oraz batch brew.',
    imageAlt: 'Biala paczka kawy KIVO Kenia Nyeri z koralowa etykieta na przezroczystym tle',
    color: 'coral',
    summary: 'Soczysty, intensywny filtr dla osob, ktore lubia mocna owocowosc i grejpfrutowa kwasowosc.',
    details: ['Kraj: Kenia', 'Region: Nyeri', 'Proces: washed', 'Profil: filter', 'Nuty: czarna porzeczka, grejpfrut, cukier trzcinowy']
  },
  {
    slug: 'kolumbia-huila',
    category: 'filter',
    name: 'Kolumbia Huila',
    country: 'Kolumbia',
    region: 'Huila',
    process: 'washed',
    roast: 'jasno palona',
    notes: ['limonka', 'zielone jablko', 'miod'],
    brew: 'V60, Origami, AeroPress',
    altitude: '1 650-1 900 m n.p.m.',
    price: '57 zl / 250 g',
    title: 'Kolumbia Huila jasno palona kawa ziarnista | KIVO',
    description:
      'Kolumbia Huila KIVO to jasno palona kawa ziarnista speciality z nutami limonki, zielonego jablka i miodu.',
    imageAlt: 'Biala paczka kawy KIVO Kolumbia Huila z limonkowa etykieta na przezroczystym tle',
    color: 'lime',
    summary: 'Czysty, limonkowy filtr z miodowa slodycza i lekka, przejrzysta tekstura.',
    details: ['Kraj: Kolumbia', 'Region: Huila', 'Proces: washed', 'Profil: filter', 'Nuty: limonka, zielone jablko, miod']
  },
  {
    slug: 'brazylia-cerrado',
    category: 'espresso',
    name: 'Brazylia Cerrado',
    country: 'Brazylia',
    region: 'Cerrado Mineiro',
    process: 'natural',
    roast: 'srednio ciemna',
    notes: ['czekolada', 'orzech laskowy', 'karmel'],
    brew: 'espresso, kawiarka',
    altitude: '1 000-1 200 m n.p.m.',
    price: '49 zl / 250 g',
    title: 'Brazylia Cerrado kawa ziarnista pod espresso | KIVO',
    description:
      'Brazylia Cerrado to kawa pod espresso z nutami czekolady, orzecha laskowego i karmelu, palona przez KIVO Specialty Coffee Roastery.',
    imageAlt: 'Biala paczka kawy KIVO Brazylia Cerrado z zielona etykieta na przezroczystym tle',
    color: 'green',
    summary: 'Klasyczne, slodkie espresso o czekoladowym profilu i stabilnej ekstrakcji.',
    details: ['Kraj: Brazylia', 'Region: Cerrado Mineiro', 'Proces: natural', 'Profil: espresso', 'Nuty: czekolada, orzech laskowy, karmel']
  },
  {
    slug: 'gwatemala-antigua',
    category: 'espresso',
    name: 'Gwatemala Antigua',
    country: 'Gwatemala',
    region: 'Antigua',
    process: 'washed',
    roast: 'srednio ciemna',
    notes: ['kakao', 'sliwka', 'migdal'],
    brew: 'espresso, cappuccino, moka pot',
    altitude: '1 500-1 700 m n.p.m.',
    price: '54 zl / 250 g',
    title: 'Gwatemala Antigua kawa speciality pod espresso | KIVO',
    description:
      'Gwatemala Antigua KIVO to kawa speciality pod espresso z nutami kakao, sliwki i migdala, dobra takze do kaw mlecznych.',
    imageAlt: 'Biala paczka kawy KIVO Gwatemala Antigua z fioletowa etykieta na przezroczystym tle',
    color: 'purple',
    summary: 'Geste espresso z kakao, dojrzala sliwka i migdalowym finiszem.',
    details: ['Kraj: Gwatemala', 'Region: Antigua', 'Proces: washed', 'Profil: espresso', 'Nuty: kakao, sliwka, migdal']
  },
  {
    slug: 'espresso-blend',
    category: 'espresso',
    name: 'Espresso Blend',
    country: 'Blend',
    region: 'Brazylia + Kolumbia',
    process: 'natural / washed',
    roast: 'espresso',
    notes: ['czekolada deserowa', 'wisnia', 'melasa'],
    brew: 'espresso, flat white, cappuccino',
    altitude: '1 000-1 800 m n.p.m.',
    price: '52 zl / 250 g',
    title: 'Espresso Blend swiezo palona kawa ziarnista | KIVO',
    description:
      'Espresso Blend od KIVO to swiezo palona kawa ziarnista do espresso i kaw mlecznych, z nutami czekolady deserowej, wisni i melasy.',
    imageAlt: 'Biala paczka kawy KIVO Espresso Blend z czarna i rozowa etykieta na przezroczystym tle',
    color: 'black',
    summary: 'Domowy blend do espresso: slodki, gesty i latwy do ustawienia w ekspresie.',
    details: ['Kraj: blend', 'Region: Brazylia + Kolumbia', 'Proces: natural / washed', 'Profil: espresso', 'Nuty: czekolada deserowa, wisnia, melasa']
  },
  {
    slug: 'rwanda-musasa',
    category: 'omniroast',
    name: 'Rwanda Musasa',
    country: 'Rwanda',
    region: 'Gakenke',
    process: 'washed',
    roast: 'omniroast',
    notes: ['czerwona herbata', 'morela', 'miod lipowy'],
    brew: 'filter, AeroPress, espresso',
    altitude: '1 800-2 000 m n.p.m.',
    price: '58 zl / 250 g',
    title: 'Rwanda Musasa kawa omniroast | KIVO',
    description:
      'Rwanda Musasa to kawa omniroast KIVO do filtra i espresso, z nutami czerwonej herbaty, moreli i miodu lipowego.',
    imageAlt: 'Biala paczka kawy KIVO Rwanda Musasa z niebieska etykieta na przezroczystym tle',
    color: 'blue',
    summary: 'Elastyczna kawa do kilku metod: herbaciana, morelowa i slodka.',
    details: ['Kraj: Rwanda', 'Region: Gakenke', 'Proces: washed', 'Profil: omniroast', 'Nuty: czerwona herbata, morela, miod lipowy']
  },
  {
    slug: 'peru-cajamarca',
    category: 'omniroast',
    name: 'Peru Cajamarca',
    country: 'Peru',
    region: 'Cajamarca',
    process: 'washed',
    roast: 'omniroast',
    notes: ['pomarancza', 'czekolada mleczna', 'daktyl'],
    brew: 'drip, kawiarka, espresso',
    altitude: '1 600-1 950 m n.p.m.',
    price: '55 zl / 250 g',
    title: 'Peru Cajamarca kawa ziarnista omniroast | KIVO',
    description:
      'Peru Cajamarca KIVO to kawa ziarnista omniroast z nutami pomaranczy, czekolady mlecznej i daktyla.',
    imageAlt: 'Biala paczka kawy KIVO Peru Cajamarca z pomaranczowa etykieta na przezroczystym tle',
    color: 'orange',
    summary: 'Komfortowy omniroast: pomaranczowa slodycz, czekolada mleczna i gladkie body.',
    details: ['Kraj: Peru', 'Region: Cajamarca', 'Proces: washed', 'Profil: omniroast', 'Nuty: pomarancza, czekolada mleczna, daktyl']
  },
  {
    slug: 'kolumbia-decaf',
    category: 'omniroast',
    name: 'Kolumbia Decaf',
    country: 'Kolumbia',
    region: 'Cauca',
    process: 'sugarcane decaf',
    roast: 'omniroast',
    notes: ['karmel', 'wanilia', 'czerwone jablko'],
    brew: 'filter, espresso, kawiarka',
    altitude: '1 500-1 800 m n.p.m.',
    price: '56 zl / 250 g',
    title: 'Kolumbia Decaf kawa bezkofeinowa speciality | KIVO',
    description:
      'Kolumbia Decaf KIVO to bezkofeinowa kawa speciality w profilu omniroast, z nutami karmelu, wanilii i czerwonego jablka.',
    imageAlt: 'Biala paczka kawy KIVO Kolumbia Decaf z kremowa etykieta na przezroczystym tle',
    color: 'cream',
    summary: 'Bezkofeinowa kawa speciality, ktora nadal smakuje jak dobra kawa, nie kompromis.',
    details: ['Kraj: Kolumbia', 'Region: Cauca', 'Proces: sugarcane decaf', 'Profil: omniroast', 'Nuty: karmel, wanilia, czerwone jablko']
  }
];
