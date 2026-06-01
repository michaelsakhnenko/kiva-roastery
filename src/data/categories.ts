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
      label: 'Opis kategorii',
      sections: [
        {
          heading: 'Do jakich metod',
          body:
            'Do V60, Chemexa, AeroPressu i batch brew. Jasne palenie daje lekkie body i czysty finisz, więc kawa dobrze smakuje bez mleka.'
        },
        {
          heading: 'Smak w filiżance',
          body:
            'Szukaj cytrusów, kwiatów, herbaty i czerwonych owoców. Etiopia Guji jest najbardziej herbaciana, Kenia Nyeri bardziej owocowa, Kolumbia Huila najspokojniejsza.'
        },
        {
          heading: 'Jak wybrać paczkę',
          body:
            'Jeśli lubisz świeżą kwasowość, wybierz Kenię. Jeśli chcesz miększy profil na co dzień, zacznij od Kolumbii. Etiopia będzie najbardziej aromatyczna.'
        }
      ]
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
      label: 'Opis kategorii',
      sections: [
        {
          heading: 'Do ekspresu i mleka',
          body:
            'Te kawy są palone pod espresso: łatwiejsze do ustawienia, słodsze i bardziej stabilne w ekstrakcji. Działają w espresso, cappuccino i flat white.'
        },
        {
          heading: 'Profil smakowy',
          body:
            'Brazylia Cerrado daje czekoladę, orzech i karmel. Gwatemala Antigua jest gładsza, z kakao i śliwką. Espresso Blend to najprostszy wybór na co dzień.'
        },
        {
          heading: 'Którą kawę kupić',
          body:
            'Do mleka wybierz Brazylię lub Espresso Blend. Jeśli pijesz krótkie espresso bez dodatków, Gwatemala da więcej owocowej głębi i czystszy finisz.'
        }
      ]
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
      label: 'Opis kategorii',
      sections: [
        {
          heading: 'Jedna kawa, kilka metod',
          body:
            'Omniroast sprawdzi się w przelewie, kawiarce, AeroPressie i domowym espresso. To dobry wybór, kiedy nie chcesz kupować osobnych paczek.'
        },
        {
          heading: 'Balans zamiast skrajności',
          body:
            'Profil jest pomiędzy jasnym filtrem a klasycznym espresso. Masz słodycz, kwasowość i body bez ostrego, bardzo jasnego charakteru.'
        },
        {
          heading: 'Najlepszy wybór',
          body:
            'Rwanda Musasa jest bardziej herbaciana i owocowa. Peru Cajamarca będzie miękkie i czekoladowe. Kolumbia Decaf to opcja bez kofeiny.'
        }
      ]
    }
  }
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
