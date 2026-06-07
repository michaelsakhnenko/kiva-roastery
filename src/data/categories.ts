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
            'Do V60, Chemexa, AeroPressu i batch brew. Jasne palenie daje lekkie body, czysty finisz i więcej aromatu w dłuższej ekstrakcji, więc kawa dobrze smakuje bez mleka. To dobry wybór, jeśli chcesz wyraźnie czuć pochodzenie ziarna, proces obróbki i naturalną kwasowość. W filtrze takie kawy pokazują najwięcej niuansów, od cytrusowej świeżości po herbacianą lekkość.'
        },
        {
          heading: 'Smak w filiżance',
          body:
            'Szukaj cytrusów, kwiatów, herbaty i czerwonych owoców. Etiopia Guji jest najbardziej herbaciana, Kenia Nyeri bardziej owocowa, Kolumbia Huila najspokojniejsza. Każda z tych kaw ma czysty profil i dobrze pokazuje różnicę między regionami. Jeśli lubisz kawę lekką, soczystą i przejrzystą, ta kategoria będzie najbardziej naturalnym wyborem.'
        },
        {
          heading: 'Jak wybrać paczkę',
          body:
            'Jeśli lubisz świeżą kwasowość, wybierz Kenię. Jeśli chcesz miększy profil na co dzień, zacznij od Kolumbii. Etiopia będzie najbardziej aromatyczna. Do pierwszego zakupu wybierz profil, który brzmi najbliżej tego, co pijesz najczęściej. Przy zmianie receptury zacznij od średniego mielenia i reguluj smak małymi krokami.'
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
            'Te kawy są palone pod espresso: łatwiejsze do ustawienia, słodsze i bardziej stabilne w ekstrakcji. Działają w espresso i flat white. Mają więcej body niż jasne filtry, dlatego dobrze łączą się z mlekiem i nie znikają w napoju. To kategoria dla osób, które chcą powtarzalnego smaku w domowym ekspresie, ale nadal szukają jakości speciality.'
        },
        {
          heading: 'Profil smakowy',
          body:
            'Brazylia Cerrado daje czekoladę, orzech i karmel. Gwatemala Antigua jest gładsza, z kakao i śliwką. Espresso Blend to najprostszy wybór na co dzień. Wszystkie profile są słodkie, niskie w ostrej kwasowości i wygodne do domowego parzenia. W krótkiej ekstrakcji smak pozostaje pełny, a w mleku kawa zachowuje wyraźny charakter.'
        },
        {
          heading: 'Którą kawę kupić',
          body:
            'Do mleka wybierz Brazylię lub Espresso Blend. Jeśli pijesz krótkie espresso bez dodatków, Gwatemala da więcej owocowej głębi i czystszy finisz. Gdy chcesz jedną bezpieczną paczkę do codziennego ekspresu, blend będzie najprostszym wyborem. Przy pierwszym zamówieniu kieruj się tym, czy częściej pijesz kawę z mlekiem, czy czyste espresso.'
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
            'Omniroast sprawdzi się w przelewie, kawiarce, AeroPressie i domowym espresso. To dobry wybór, kiedy nie chcesz kupować osobnych paczek. Profil jest elastyczny, więc możesz zmieniać metodę parzenia bez poczucia, że kawa pasuje tylko do jednego sprzętu. Jedna paczka może być spokojnym przelewem rano i bardziej intensywną kawą po południu.'
        },
        {
          heading: 'Balans zamiast skrajności',
          body:
            'Profil jest pomiędzy jasnym filtrem a klasycznym espresso. Masz słodycz, kwasowość i body bez ostrego, bardzo jasnego charakteru. Dzięki temu omniroast jest dobry dla osób, które piją kawę różnie w zależności od dnia. W filiżance powinno być czytelnie i słodko, ale bez przesadnego ciężaru.'
        },
        {
          heading: 'Najlepszy wybór',
          body:
            'Rwanda Musasa jest bardziej herbaciana i owocowa. Peru Cajamarca będzie miękkie i czekoladowe. Kolumbia Decaf to opcja bez kofeiny. Jeśli nie wiesz od czego zacząć, wybierz Peru dla spokojnego profilu albo Rwandę dla większej świeżości. Omniroast najlepiej działa wtedy, kiedy chcesz mieć jedną kawę do różnych przepisów.'
        }
      ]
    }
  }
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
