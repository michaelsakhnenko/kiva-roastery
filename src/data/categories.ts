export const categories = [
  {
    slug: 'lampy',
    name: 'Lampy rzezbiarskie',
    title: 'Designerskie lampy rzezbiarskie do salonu | KIVO',
    description:
      'Odkryj designerskie lampy rzezbiarskie KIVO: od organicznych form po neonowe akcenty, ktore buduja nastroj w nowoczesnym mieszkaniu.',
    intro:
      'Lampy rzezbiarskie KIVO sa projektowane jak punkty centralne pokoju. Daja swiatlo, ale przede wszystkim porzadkuja klimat wnetrza.'
  },
  {
    slug: 'dywany',
    name: 'Dywany z tekstura',
    title: 'Nietypowe dywany z tekstura do nowoczesnych wnetrz | KIVO',
    description:
      'Nietypowe dywany KIVO lacza wyraziste wzory, strukture i cieple kolory, dzieki czemu podloga staje sie waznym elementem kompozycji.',
    intro:
      'Dywan nie musi byc neutralnym tlem. W KIVO traktujemy go jak warstwe tekstury, ktora zmienia proporcje i rytm calego pokoju.'
  },
  {
    slug: 'meble-akcentowe',
    name: 'Meble akcentowe',
    title: 'Meble akcentowe: stoliki, krzesla i konsole | KIVO',
    description:
      'Meble akcentowe KIVO to stoliki, krzesla i konsole, ktore dzialaja jak funkcjonalne obiekty designerskie w domu.',
    intro:
      'Meble akcentowe sa male, ale widoczne. Wybieramy formy, ktore dodaja charakteru bez przebudowy calego mieszkania.'
  }
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
