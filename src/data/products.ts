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
  priceValue: number;
  weight: string;
  isBestseller: boolean;
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
    notes: ['bergamotka', 'brzoskwinia', 'biała herbata'],
    brew: 'V60, Chemex, AeroPress',
    altitude: '1 950-2 150 m n.p.m.',
    price: '59,00 zł',
    priceValue: 59,
    weight: '250 g',
    isBestseller: true,
    title: 'Etiopia Guji kawa jasno palona do filtra | KIVA',
    description:
      'Etiopia Guji od KIVA to jasno palona kawa ziarnista speciality do filtra z nutami bergamotki, brzoskwini i białej herbaty.',
    imageAlt: 'Biała paczka kawy KIVA Etiopia Guji z żółto-pomarańczową etykietą na przezroczystym tle',
    color: 'yellow',
    summary: 'Kwiatowy filtr o herbacianej strukturze, jasnej kwasowości i bardzo czystym finiszu.',
    details: ['Kraj: Etiopia', 'Region: Guji', 'Proces: washed', 'Profil: filter', 'Nuty: bergamotka, brzoskwinia, biała herbata']
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
    price: '64,00 zł',
    priceValue: 64,
    weight: '250 g',
    isBestseller: true,
    title: 'Kenia Nyeri kawa speciality do przelewu | KIVA',
    description:
      'Kenia Nyeri to kawa speciality jasno palona do przelewu: soczysta, porzeczkowa i intensywna, idealna do V60 oraz batch brew.',
    imageAlt: 'Biała paczka kawy KIVA Kenia Nyeri z koralową etykietą na przezroczystym tle',
    color: 'coral',
    summary: 'Soczysty, intensywny filtr dla osób, które lubią mocną owocowość i grejpfrutową kwasowość.',
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
    notes: ['limonka', 'zielone jabłko', 'miód'],
    brew: 'V60, Origami, AeroPress',
    altitude: '1 650-1 900 m n.p.m.',
    price: '57,00 zł',
    priceValue: 57,
    weight: '250 g',
    isBestseller: false,
    title: 'Kolumbia Huila jasno palona kawa ziarnista | KIVA',
    description:
      'Kolumbia Huila KIVA to jasno palona kawa ziarnista speciality z nutami limonki, zielonego jabłka i miodu.',
    imageAlt: 'Biała paczka kawy KIVA Kolumbia Huila z limonkową etykietą na przezroczystym tle',
    color: 'lime',
    summary: 'Czysty, limonkowy filtr z miodową słodyczą i lekką, przejrzystą teksturą.',
    details: ['Kraj: Kolumbia', 'Region: Huila', 'Proces: washed', 'Profil: filter', 'Nuty: limonka, zielone jabłko, miód']
  },
  {
    slug: 'brazylia-cerrado',
    category: 'espresso',
    name: 'Brazylia Cerrado',
    country: 'Brazylia',
    region: 'Cerrado Mineiro',
    process: 'natural',
    roast: 'średnio ciemna',
    notes: ['czekolada', 'orzech laskowy', 'karmel'],
    brew: 'espresso, kawiarka',
    altitude: '1 000-1 200 m n.p.m.',
    price: '49,00 zł',
    priceValue: 49,
    weight: '250 g',
    isBestseller: true,
    title: 'Brazylia Cerrado kawa ziarnista pod espresso | KIVA',
    description:
      'Brazylia Cerrado to kawa pod espresso z nutami czekolady, orzecha laskowego i karmelu, palona przez KIVA Specialty Coffee Roastery.',
    imageAlt: 'Biała paczka kawy KIVA Brazylia Cerrado z zieloną etykietą na przezroczystym tle',
    color: 'green',
    summary: 'Klasyczne, słodkie espresso o czekoladowym profilu i stabilnej ekstrakcji.',
    details: ['Kraj: Brazylia', 'Region: Cerrado Mineiro', 'Proces: natural', 'Profil: espresso', 'Nuty: czekolada, orzech laskowy, karmel']
  },
  {
    slug: 'gwatemala-antigua',
    category: 'espresso',
    name: 'Gwatemala Antigua',
    country: 'Gwatemala',
    region: 'Antigua',
    process: 'washed',
    roast: 'średnio ciemna',
    notes: ['kakao', 'śliwka', 'migdał'],
    brew: 'espresso, cappuccino, moka pot',
    altitude: '1 500-1 700 m n.p.m.',
    price: '54,00 zł',
    priceValue: 54,
    weight: '250 g',
    isBestseller: false,
    title: 'Gwatemala Antigua kawa speciality pod espresso | KIVA',
    description:
      'Gwatemala Antigua KIVA to kawa speciality pod espresso z nutami kakao, śliwki i migdała, dobra także do kaw mlecznych.',
    imageAlt: 'Biała paczka kawy KIVA Gwatemala Antigua z fioletową etykietą na przezroczystym tle',
    color: 'purple',
    summary: 'Gęste espresso z kakao, dojrzałą śliwką i migdałowym finiszem.',
    details: ['Kraj: Gwatemala', 'Region: Antigua', 'Proces: washed', 'Profil: espresso', 'Nuty: kakao, śliwka, migdał']
  },
  {
    slug: 'espresso-blend',
    category: 'espresso',
    name: 'Espresso Blend',
    country: 'Blend',
    region: 'Brazylia + Kolumbia',
    process: 'natural / washed',
    roast: 'espresso',
    notes: ['czekolada deserowa', 'wiśnia', 'melasa'],
    brew: 'espresso, flat white, cappuccino',
    altitude: '1 000-1 800 m n.p.m.',
    price: '52,00 zł',
    priceValue: 52,
    weight: '250 g',
    isBestseller: true,
    title: 'Espresso Blend świeżo palona kawa ziarnista | KIVA',
    description:
      'Espresso Blend od KIVA to świeżo palona kawa ziarnista do espresso i kaw mlecznych, z nutami czekolady deserowej, wiśni i melasy.',
    imageAlt: 'Biała paczka kawy KIVA Espresso Blend z ciemnoczerwoną etykietą i jasnym tekstem na przezroczystym tle',
    color: 'black',
    summary: 'Domowy blend do espresso: słodki, gęsty i łatwy do ustawienia w ekspresie.',
    details: ['Kraj: blend', 'Region: Brazylia + Kolumbia', 'Proces: natural / washed', 'Profil: espresso', 'Nuty: czekolada deserowa, wiśnia, melasa']
  },
  {
    slug: 'rwanda-musasa',
    category: 'omniroast',
    name: 'Rwanda Musasa',
    country: 'Rwanda',
    region: 'Gakenke',
    process: 'washed',
    roast: 'omniroast',
    notes: ['czerwona herbata', 'morela', 'miód lipowy'],
    brew: 'filter, AeroPress, espresso',
    altitude: '1 800-2 000 m n.p.m.',
    price: '58,00 zł',
    priceValue: 58,
    weight: '250 g',
    isBestseller: true,
    title: 'Rwanda Musasa kawa omniroast | KIVA',
    description:
      'Rwanda Musasa to kawa omniroast KIVA do filtra i espresso, z nutami czerwonej herbaty, moreli i miodu lipowego.',
    imageAlt: 'Biała paczka kawy KIVA Rwanda Musasa z niebieską etykietą na przezroczystym tle',
    color: 'blue',
    summary: 'Elastyczna kawa do kilku metod: herbaciana, morelowa i słodka.',
    details: ['Kraj: Rwanda', 'Region: Gakenke', 'Proces: washed', 'Profil: omniroast', 'Nuty: czerwona herbata, morela, miód lipowy']
  },
  {
    slug: 'peru-cajamarca',
    category: 'omniroast',
    name: 'Peru Cajamarca',
    country: 'Peru',
    region: 'Cajamarca',
    process: 'washed',
    roast: 'omniroast',
    notes: ['pomarańcza', 'czekolada mleczna', 'daktyl'],
    brew: 'drip, kawiarka, espresso',
    altitude: '1 600-1 950 m n.p.m.',
    price: '55,00 zł',
    priceValue: 55,
    weight: '250 g',
    isBestseller: false,
    title: 'Peru Cajamarca kawa ziarnista omniroast | KIVA',
    description:
      'Peru Cajamarca KIVA to kawa ziarnista omniroast z nutami pomarańczy, czekolady mlecznej i daktyla.',
    imageAlt: 'Biała paczka kawy KIVA Peru Cajamarca z pomarańczową etykietą na przezroczystym tle',
    color: 'orange',
    summary: 'Komfortowy omniroast: pomarańczowa słodycz, czekolada mleczna i gładkie body.',
    details: ['Kraj: Peru', 'Region: Cajamarca', 'Proces: washed', 'Profil: omniroast', 'Nuty: pomarańcza, czekolada mleczna, daktyl']
  },
  {
    slug: 'kolumbia-decaf',
    category: 'omniroast',
    name: 'Kolumbia Decaf',
    country: 'Kolumbia',
    region: 'Cauca',
    process: 'sugarcane decaf',
    roast: 'omniroast',
    notes: ['karmel', 'wanilia', 'czerwone jabłko'],
    brew: 'filter, espresso, kawiarka',
    altitude: '1 500-1 800 m n.p.m.',
    price: '56,00 zł',
    priceValue: 56,
    weight: '250 g',
    isBestseller: false,
    title: 'Kolumbia Decaf kawa bezkofeinowa speciality | KIVA',
    description:
      'Kolumbia Decaf KIVA to bezkofeinowa kawa speciality w profilu omniroast, z nutami karmelu, wanilii i czerwonego jabłka.',
    imageAlt: 'Biała paczka kawy KIVA Kolumbia Decaf z kremową etykietą na przezroczystym tle',
    color: 'cream',
    summary: 'Bezkofeinowa kawa speciality, która nadal smakuje jak dobra kawa, nie kompromis.',
    details: ['Kraj: Kolumbia', 'Region: Cauca', 'Proces: sugarcane decaf', 'Profil: omniroast', 'Nuty: karmel, wanilia, czerwone jabłko']
  }
];
