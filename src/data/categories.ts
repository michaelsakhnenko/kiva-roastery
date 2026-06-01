export const categories = [
  {
    slug: 'filter',
    name: 'Filter / jasno palone',
    title: 'Kawa jasno palona do filtra | KIVA Specialty Coffee Roastery',
    description:
      'Jasno palona kawa ziarnista speciality do V60, Chemex, AeroPress i przelewu. Owocowe profile, czysta kwasowość i lekka struktura.',
    intro:
      'Jasno palone kawy KIVA są stworzone do metod przelewowych. Szukaj tu cytrusów, kwiatów, czerwonych owoców i czystego finiszu.',
    shopDescription: {
      heading: 'Kawa jasno palona do filtra',
      body:
        'Ta kategoria jest dla osób, które parzą kawę w V60, Chemexie, AeroPressie albo batch brew i chcą czystego, lekkiego naparu. Jasne palenie podkreśla kwasowość, aromat owoców, herbaty i kwiatów, dlatego dobrze sprawdza się bez mleka. Wybierz Etiopię Guji, Kenię Nyeri albo Kolumbię Huila, jeśli szukasz kawy z wyraźnym profilem sensorycznym i przejrzystym finiszem.',
      image: {
        src: '/categories/kawa-jasno-palona-do-filtra-kiva.webp',
        alt: 'AI-generated ilustracja KIVA z dripperem, czajnikiem i kawą jasno paloną do filtra'
      }
    }
  },
  {
    slug: 'espresso',
    name: 'Espresso',
    title: 'Kawa ziarnista pod espresso | KIVA Specialty Coffee Roastery',
    description:
      'Kawy pod espresso z palarni KIVA: słodsze profile, większe body, nuty czekolady, orzechów i dojrzałych owoców.',
    intro:
      'Espresso KIVA to kawy palone pod ciśnienie: słodkie, gęste i stabilne w ekspresie, ale nadal z charakterem speciality.',
    shopDescription: {
      heading: 'Kawa ziarnista pod espresso',
      body:
        'Kawy espresso KIVA są palone tak, żeby łatwo ustawić je w ekspresie i uzyskać słodki, pełny napar. To dobry wybór do espresso, cappuccino, flat white i kaw mlecznych, bo profil jest bardziej gęsty i stabilny niż w bardzo jasnych filtrach. Brazylia Cerrado daje klasyczną czekoladowo-orzechową bazę, Gwatemala Antigua wnosi kakao i śliwkę, a Espresso Blend jest najprostszą opcją na codzienne domowe espresso.',
      image: {
        src: '/categories/kawa-ziarnista-pod-espresso-kiva.webp',
        alt: 'AI-generated ilustracja KIVA z filiżanką espresso, paczką kawy ziarnistej i kawowcem'
      }
    }
  },
  {
    slug: 'omniroast',
    name: 'Omniroast',
    title: 'Kawy omniroast do filtra i espresso | KIVA Specialty Coffee Roastery',
    description:
      'Kawy omniroast KIVA działają zarówno w filtrze, jak i espresso. Dobry wybór dla osób, które parzą jedną kawę na kilka sposobów.',
    intro:
      'Omniroast to elastyczne profile palenia. Jedna paczka sprawdzi się w przelewie, kawiarce, AeroPressie i domowym espresso.',
    shopDescription: {
      heading: 'Kawa omniroast do kilku metod',
      body:
        'Omniroast jest dla osób, które nie chcą kupować osobnej kawy do każdej metody parzenia. Ten profil działa w przelewie, kawiarce, AeroPressie i domowym espresso, zachowując balans między słodyczą, kwasowością i body. Rwanda Musasa będzie bardziej herbaciana i owocowa, Peru Cajamarca miękkie i czekoladowe, a Kolumbia Decaf sprawdzi się wtedy, gdy chcesz smak kawy bez kofeiny.',
      image: {
        src: '/categories/kawa-omniroast-do-filtra-i-espresso-kiva.webp',
        alt: 'AI-generated ilustracja KIVA pokazująca kawę omniroast do filtra, AeroPressu i espresso'
      }
    }
  }
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
