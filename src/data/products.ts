import type { CategorySlug } from './categories';

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  price: string;
  title: string;
  description: string;
  imageAlt: string;
  color: 'green' | 'lime' | 'terracotta' | 'cream' | 'black';
  summary: string;
  details: string[];
};

export const products: Product[] = [
  {
    slug: 'lampa-orbit',
    category: 'lampy',
    name: 'Lampa Orbit',
    price: '429 zl',
    title: 'Lampa Orbit: designerska lampa rzezbiarska | KIVO',
    description:
      'Lampa Orbit to designerska lampa rzezbiarska do salonu, ktora laczy matowa kule swiatla z graficzna podstawa.',
    imageAlt: 'Designerska lampa Orbit z kulistym kloszem i graficzna podstawa',
    color: 'green',
    summary: 'Kulista forma, mocna podstawa i swiatlo, ktore wyglada jak element instalacji.',
    details: ['Matowy klosz o miekkim swietle', 'Stabilna metalowa podstawa', 'Idealna na komode, stolik lub niski regaly']
  },
  {
    slug: 'lampa-gliniana',
    category: 'lampy',
    name: 'Lampa Gliniana',
    price: '389 zl',
    title: 'Lampa Gliniana z organiczna faktura | KIVO',
    description:
      'Lampa Gliniana to konceptowa dekoracja do domu z organiczna faktura, idealna do cieplych i artystycznych wnetrz.',
    imageAlt: 'Lampa Gliniana z ceramiczna faktura i cieplym kloszem',
    color: 'terracotta',
    summary: 'Ceramiczny charakter bez przesady: ciepla, nierowna, bardzo domowa.',
    details: ['Faktura inspirowana recznie formowana glina', 'Cieple rozproszone swiatlo', 'Dobry kontrapunkt do prostych mebli']
  },
  {
    slug: 'lampa-neon-leaf',
    category: 'lampy',
    name: 'Lampa Neon Leaf',
    price: '459 zl',
    title: 'Lampa Neon Leaf z limonkowym akcentem | KIVO',
    description:
      'Lampa Neon Leaf dodaje wnetrzu odwazny limonkowy akcent i sprawdza sie jako punkt centralny nowoczesnego salonu.',
    imageAlt: 'Lampa Neon Leaf z limonkowym detalem i organiczna sylwetka',
    color: 'lime',
    summary: 'Odrobina galerii, odrobina klubu, ale w rozmiarze pasujacym do mieszkania.',
    details: ['Limonkowy detal widoczny takze w dzien', 'Smukla sylwetka na male stoliki', 'Najlepiej wyglada obok ciemnej zieleni i drewna']
  },
  {
    slug: 'dywan-fala',
    category: 'dywany',
    name: 'Dywan Fala',
    price: '699 zl',
    title: 'Dywan Fala z miekkim organicznym wzorem | KIVO',
    description:
      'Dywan Fala to nietypowy dywan z organicznym wzorem, ktory ociepla salon i prowadzi wzrok przez cala strefe wypoczynku.',
    imageAlt: 'Nietypowy dywan Fala z organicznym falujacym wzorem',
    color: 'cream',
    summary: 'Miekka linia, ktora uspokaja mocne meble i dodaje rytmu podlodze.',
    details: ['Niski, wygodny splot', 'Falujacy wzor bez agresywnego kontrastu', 'Dobrze laczy sofy, fotele i stolik kawowy']
  },
  {
    slug: 'dywan-terra',
    category: 'dywany',
    name: 'Dywan Terra',
    price: '749 zl',
    title: 'Dywan Terra w kolorach ziemi | KIVO',
    description:
      'Dywan Terra wprowadza do pokoju przygaszona terakote i strukture, ktora buduje cieplo bez efektu rustykalnego.',
    imageAlt: 'Dywan Terra w terakotowych kolorach z widoczna tekstura',
    color: 'terracotta',
    summary: 'Terakota, ale miejska: ciepla powierzchnia do nowoczesnych wnetrz.',
    details: ['Przygaszony kolor ziemi', 'Struktura widoczna pod swiatlo', 'Dobry wybor do jasnych scian i czarnych dodatkow']
  },
  {
    slug: 'dywan-grid',
    category: 'dywany',
    name: 'Dywan Grid',
    price: '799 zl',
    title: 'Dywan Grid z graficznym wzorem | KIVO',
    description:
      'Dywan Grid to graficzny dywan do mieszkania, ktory porzadkuje przestrzen i pasuje do odwaznych dekoracji.',
    imageAlt: 'Dywan Grid z czarnym graficznym wzorem na jasnym tle',
    color: 'black',
    summary: 'Czarna siatka na jasnym tle: prosty sposob na architektoniczny rytm.',
    details: ['Wyrazisty wzor bez wielu kolorow', 'Pasuje do stolikow i lamp o organicznych formach', 'Stabilizuje eklektyczne aranzacje']
  },
  {
    slug: 'stolik-plama',
    category: 'meble-akcentowe',
    name: 'Stolik Plama',
    price: '589 zl',
    title: 'Stolik Plama jako mebel akcentowy | KIVO',
    description:
      'Stolik Plama to mebel akcentowy o nieregularnym blacie, ktory wyglada jak obiekt, ale dziala jak praktyczny stolik pomocniczy.',
    imageAlt: 'Stolik Plama z nieregularnym blatem i czarna podstawa',
    color: 'black',
    summary: 'Nieregularny blat dla tych, ktorzy nie chca kolejnego idealnego prostokata.',
    details: ['Kompaktowy format przy sofie', 'Nieregularna linia blatu', 'Stabilna, kontrastowa podstawa']
  },
  {
    slug: 'krzeslo-curve',
    category: 'meble-akcentowe',
    name: 'Krzeslo Curve',
    price: '899 zl',
    title: 'Krzeslo Curve do artystycznego wnetrza | KIVO',
    description:
      'Krzeslo Curve laczy wygode i mocna sylwetke, dzieki czemu sprawdza sie przy stole, biurku albo jako samodzielny akcent.',
    imageAlt: 'Krzeslo Curve z zaokraglonym oparciem i mocna sylwetka',
    color: 'green',
    summary: 'Krzeslo, ktore nie znika pod stolem. Ma forme, ale zostaje funkcjonalne.',
    details: ['Zaokraglone oparcie', 'Wygodna wysokosc do pracy i jedzenia', 'Ciemna zielen pasujaca do cieplych dodatkow']
  },
  {
    slug: 'konsola-linea',
    category: 'meble-akcentowe',
    name: 'Konsola Linea',
    price: '1 049 zl',
    title: 'Konsola Linea do przedpokoju i salonu | KIVO',
    description:
      'Konsola Linea to smukly mebel akcentowy do przedpokoju lub salonu, zaprojektowany pod lampy, ceramike i codzienne drobiazgi.',
    imageAlt: 'Smukla konsola Linea z graficzna linia i miejscem na dekoracje',
    color: 'cream',
    summary: 'Waska, graficzna i praktyczna. Daje miejsce na obiekty, nie zabiera oddechu.',
    details: ['Smukla forma do waskich przestrzeni', 'Powierzchnia na lampy i ceramike', 'Dobrze dziala jako domowa mini galeria']
  }
];
