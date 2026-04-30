export const categories = [
  {
    slug: 'filter',
    name: 'Filter / jasno palone',
    title: 'Kawa jasno palona do filtra | KIVO Specialty Coffee Roastery',
    description:
      'Jasno palona kawa ziarnista speciality do V60, Chemex, AeroPress i przelewu. Owocowe profile, czysta kwasowość i lekka struktura.',
    intro:
      'Jasno palone kawy KIVO są stworzone do metod przelewowych. Szukaj tu cytrusów, kwiatów, czerwonych owoców i czystego finiszu.'
  },
  {
    slug: 'espresso',
    name: 'Espresso',
    title: 'Kawa ziarnista pod espresso | KIVO Specialty Coffee Roastery',
    description:
      'Kawy pod espresso z palarni KIVO: słodsze profile, większe body, nuty czekolady, orzechów i dojrzałych owoców.',
    intro:
      'Espresso KIVO to kawy palone pod ciśnienie: słodkie, gęste i stabilne w ekspresie, ale nadal z charakterem speciality.'
  },
  {
    slug: 'omniroast',
    name: 'Omniroast',
    title: 'Kawy omniroast do filtra i espresso | KIVO Specialty Coffee Roastery',
    description:
      'Kawy omniroast KIVO działają zarówno w filtrze, jak i espresso. Dobry wybór dla osób, które parzą jedną kawę na kilka sposobów.',
    intro:
      'Omniroast to elastyczne profile palenia. Jedna paczka sprawdzi się w przelewie, kawiarce, AeroPressie i domowym espresso.'
  }
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
