export const categories = [
  {
    slug: 'filter',
    name: 'Filter / jasno palone',
    title: 'Kawa jasno palona do filtra | KIVO Specialty Coffee Roastery',
    description:
      'Jasno palona kawa ziarnista speciality do V60, Chemex, AeroPress i przelewu. Owocowe profile, czysta kwasowosc i lekka struktura.',
    intro:
      'Jasno palone kawy KIVO sa stworzone do metod przelewowych. Szukaj tu cytrusow, kwiatow, czerwonych owocow i czystego finiszu.'
  },
  {
    slug: 'espresso',
    name: 'Espresso',
    title: 'Kawa ziarnista pod espresso | KIVO Specialty Coffee Roastery',
    description:
      'Kawy pod espresso z palarni KIVO: slodsze profile, wieksze body, nuty czekolady, orzechow i dojrzalych owocow.',
    intro:
      'Espresso KIVO to kawy palone pod cisnienie: slodkie, geste i stabilne w ekspresie, ale nadal z charakterem speciality.'
  },
  {
    slug: 'omniroast',
    name: 'Omniroast',
    title: 'Kawy omniroast do filtra i espresso | KIVO Specialty Coffee Roastery',
    description:
      'Kawy omniroast KIVO dzialaja zarowno w filtrze, jak i espresso. Dobry wybor dla osob, ktore parza jedna kawe na kilka sposobow.',
    intro:
      'Omniroast to elastyczne profile palenia. Jedna paczka sprawdzi sie w przelewie, kawiarce, AeroPressie i domowym espresso.'
  }
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
