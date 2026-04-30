// ─────────────────────────────────────────────────────────────────────────
// data/services.ts — single source of truth dla 3 oferowanych usług.
// Używany przez Services.tsx (karty na stronie głównej + /leistungen),
// /leistungen/[slug]/page.tsx (pełne podstrony) i sitemap.ts.
// Każda usługa ma: hero, intro, technologię DCS, specs, use-cases,
// proces, vorher/nachher, FAQ — wszystko w jednym miejscu.
// ─────────────────────────────────────────────────────────────────────────
export type ServiceSlug =
  | 'solarpark-reinigung'
  | 'dachanlagen-reinigung'
  | 'fassadenreinigung';

export const SERVICE_SLUGS: ServiceSlug[] = [
  'solarpark-reinigung',
  'dachanlagen-reinigung',
  'fassadenreinigung',
];

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceUseCase {
  title: string;
  description: string;
  icon: 'industry' | 'home' | 'office' | 'farm' | 'logistics' | 'glass' | 'energy' | 'maintenance';
}

export interface ServiceData {
  slug: ServiceSlug;
  navLabel: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  intro: string[];
  technologyParagraphs: string[];
  specs: ServiceSpec[];
  useCases: ServiceUseCase[];
  process: { number: string; title: string; description: string }[];
  beforeAfter: { before: string[]; after: string[] };
  benefits: string[];
  faq: ServiceFAQ[];
  badge?: string;
}

// 3-paragrafowy opis technologii DCS X1 PRO + DJI Matrice 400.
// Identyczny dla wszystkich 3 usług — DRY. Używany w sekcji "Technologie".
const dcsBaseTechnology = [
  'Wir basieren auf einer umfassenden Pumpen- und Wasseraufbereitungs­technologie der Firma DCS (Drone Cleaning Solutions), die mit modernster Drohnentechnologie integriert ist. Dank unserer gesammelten Erfahrung wurden die DCS-Lösungen mit den neuesten, auf dem internationalen Markt verfügbaren Technologien im Bereich der Reinigung und Pflege von Photovoltaikmodulen sowie Gebäudefassaden unterschiedlichster Struktur kombiniert.',
  'Die Lösungen, auf denen unsere Tätigkeit basiert, sind sicher, effizient und wirtschaftlich. Sie sind sowohl umweltfreundlich als auch sicher für den Menschen und lassen sich flexibel an unterschiedliche Projekte und Arbeits­bedingungen anpassen. Unsere eingesetzten Systeme wurden speziell für den Einsatz an großen und schwer zugänglichen Objekten entwickelt, bei denen herkömmliche Methoden eine aufwendige Logistik und Arbeiten in großen Höhen erfordern.',
  'Das System DCS X1 PRO ist eine integrierte hydraulische Plattform, die sowohl im mobilen/geländebasierten Einsatz als auch im Anschluss an das städtische Wassernetz genutzt werden kann. Die technische Konfiguration ist kompatibel mit der industriellen Drohne DJI Matrice 400. Durch den Einsatz ultraleichter Schläuche und einer Carbon­konstruktion ist es möglich, eine bisher unerreichte Arbeitshöhe von bis zu 150 m zu erreichen.',
];

export const services: ServiceData[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // SOLARPARK
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'solarpark-reinigung',
    navLabel: 'Solarpark-Reinigung',
    title: 'Solarpark-Reinigung mit Drohnentechnologie',
    subtitle:
      'Großflächige Reinigung von Photovoltaik-Freiflächenanlagen ab 1 MWp – effizient, ohne Bodenverdichtung und mit Foto-Dokumentation.',
    metaTitle: 'Solarpark-Reinigung mit Drohne – bis 150 m, deutschlandweit',
    metaDescription:
      'Professionelle Solarpark-Reinigung mit DCS X1 PRO und DJI Matrice 400. Bis zu 2000 m²/h, demineralisiertes Wasser, keine Bodenverdichtung, deutschlandweit.',
    heroImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&h=900&fit=crop',
    intro: [
      'Verschmutzungen auf großflächigen Photovoltaik-Freiflächenanlagen kosten bares Geld: Bereits eine dünne Staubschicht reduziert den Modulertrag um 5–8 %, Vogelkot, Pollen und landwirtschaftliche Verunreinigungen können zu lokalen Hot-Spots und in Folge zu dauerhaften Schäden an Solarzellen führen.',
      'Skytech Solutions reinigt Solarparks mit der modularen DCS-X1-PRO-Plattform und der industriellen DJI Matrice 400. Wir kommen ohne Hebebühnen, ohne Hubsteiger und ohne Eingriff in den Bewuchs der Trasse aus – ideal für Agri-PV, Konversionsflächen und große Freiflächen ab 1 MWp.',
      'Die Reinigung erfolgt mit aufbereitetem, demineralisiertem Wasser ohne chemische Zusätze. Sie ist herstellerkonform, dokumentiert in Foto- und Thermografie-Berichten und planbar in einem 12-monatigen oder 24-monatigen Wartungs-Abo.',
    ],
    technologyParagraphs: dcsBaseTechnology,
    specs: [
      { label: 'Flächenleistung', value: '1.500–2.000 m²/h Modulfläche' },
      { label: 'Wasserquelle', value: 'Externe Tanks 1.000 l + RO/DI-Aufbereitung' },
      { label: 'Maximale Arbeitshöhe', value: 'bis 150 m über Grund' },
      { label: 'Maximaler Wind', value: 'bis 50 km/h Dauerwind' },
      { label: 'Reinigungsmittel', value: 'Demineralisiertes Wasser, optional milde Tenside' },
      { label: 'Mindestauftragsgröße', value: 'ab ca. 1 MWp Solarparkleistung' },
      { label: 'Dokumentation', value: 'Foto-Bericht + optional Thermografie-Scan' },
      { label: 'Anfahrt', value: 'Deutschlandweit, ab Ulm-Einsingen' },
    ],
    useCases: [
      {
        title: 'Freiflächenanlagen 1–50 MWp',
        description:
          'Ost-/West- und Süd-Tracking-Anlagen, Modulreihen ab 1 m über Grund. Wir reinigen reihenweise mit konstanter Flugbahn und ohne Bodenkontakt.',
        icon: 'energy',
      },
      {
        title: 'Agri-Photovoltaik',
        description:
          'Aufgeständerte Anlagen über Acker- und Grünlandflächen. Keine Bodenverdichtung, keine Schäden an Bewuchs oder Beweidung.',
        icon: 'farm',
      },
      {
        title: 'Konversions- und Halden­flächen',
        description:
          'Schlecht zugängliches Gelände, Altlast­gebiete, Munitionsverdachts­flächen – wir bewegen uns ausschließlich aus der Luft.',
        icon: 'industry',
      },
      {
        title: 'Schwimmende PV (Floating)',
        description:
          'Reinigung schwimmender Anlagen ohne Boote oder Stege – die Drohne arbeitet vom Ufer oder einem Begleitfahrzeug aus.',
        icon: 'energy',
      },
    ],
    process: [
      { number: '01', title: 'Bestandsaufnahme', description: 'Wir prüfen Anlagengröße, Modultyp, Verschmutzungsgrad und Zugänglichkeit – per Drohnen-Voranflug oder anhand Ihrer Drohnenbilder.' },
      { number: '02', title: 'Festpreisangebot', description: 'Innerhalb von 24 Stunden erhalten Sie ein transparentes Angebot inkl. Flugplanung, Wasser­logistik und Dokumentation.' },
      { number: '03', title: 'Reinigung & Doku', description: 'Wir reinigen reihenweise mit der DCS-X1-PRO-Plattform und dokumentieren Vorher/Nachher mit Foto- und optional Thermografie-Bericht.' },
      { number: '04', title: 'Ertragsfreigabe', description: 'Sie erhalten den Bericht digital, inklusive Empfehlung für das nächste Reinigungsintervall.' },
    ],
    beforeAfter: {
      before: ['Sichtbare Staub- und Pollen­schicht auf Modulen', 'Lokale Verschattungen durch Vogelkot und Moos', 'Ertrags­verluste von 8–25 % gegenüber Sollwert', 'Hot-Spot-Risiko bei punktuellen Verschmutzungen'],
      after: ['Komplett gereinigte Modul­oberflächen ohne Schlieren', 'Beseitigung organischer Ablagerungen', 'Wiederherstellung des spezifischen Ertrags', 'Reduziertes Risiko von Modul­degradation'],
    },
    benefits: [
      'Keine Bodenverdichtung – wichtig für Agri-PV und Naturflächen',
      'Keine Personenarbeit in großer Höhe – kein PSAgA-Aufwand',
      'Bis zu 90 % weniger Wasserverbrauch als manuelle Verfahren',
      'Voll digitale Dokumentation für Investoren und Versicherer',
      'Wartungs-Abo mit garantierten Reaktionszeiten',
    ],
    faq: [
      {
        question: 'Ab welcher Anlagengröße lohnt sich die Drohnenreinigung?',
        answer:
          'Ab etwa 1 MWp wird der Drohneneinsatz wirtschaftlich. Für kleinere Freiflächen bieten wir kombinierte Aufträge in derselben Region an.',
      },
      {
        question: 'Wie viele Module schaffen Sie pro Tag?',
        answer:
          'Unter optimalen Bedingungen reinigen wir 15.000–25.000 Module pro Tag mit einem Team. Bei großen Parks setzen wir mehrere Plattformen parallel ein.',
      },
      {
        question: 'Brauchen Sie einen Wasseranschluss vor Ort?',
        answer:
          'Nein. Wir bringen externe Tanks (1.000 l Standard, größere Container für Großprojekte) und eine RO/DI-Aufbereitungsanlage mit. Ein Anschluss ans Netz ist optional und beschleunigt die Logistik.',
      },
      {
        question: 'Können Sie auch Thermografie mit anbieten?',
        answer:
          'Ja. Auf Wunsch fliegen wir vor und nach der Reinigung einen Thermografie-Scan und liefern einen Bericht mit Hot-Spot-Map und Modul-IDs.',
      },
      {
        question: 'Sind Sie versichert?',
        answer:
          'Wir verfügen über eine Drohnen-Haftpflicht­versicherung mit hoher Deckungssumme sowie eine Betriebs­haftpflicht für die Reinigungs­leistung. Versicherungs­nachweise erhalten Sie auf Anfrage.',
      },
    ],
    badge: 'Beliebteste Leistung',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DACHANLAGEN
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'dachanlagen-reinigung',
    navLabel: 'Dachanlagen-Reinigung',
    title: 'Dachanlagen-Reinigung – ohne Gerüst, ohne Risiko',
    subtitle:
      'Schonende Reinigung von Photovoltaik-Dachanlagen auf Privat- und Gewerbedächern. Herstellerkonform, ohne Hebebühne, mit Festpreis.',
    metaTitle: 'Dachanlagen-Reinigung mit Drohne – herstellerkonform & ohne Gerüst',
    metaDescription:
      'PV-Dachanlagen-Reinigung mit Drohne: kein Gerüst, keine Hebebühne, kein Modulbetreten. Demineralisiertes Wasser, Foto-Bericht, Festpreis ab 2–3 €/Modul.',
    heroImage: 'https://images.unsplash.com/photo-1637417494521-78b4d1d33029?w=1600&h=900&fit=crop',
    intro: [
      'Photovoltaik-Dachanlagen sind besonders anfällig für Verschmutzung: Pollen, Blütenstaub, Vogelkot, Industriestaub und Kondenswasser bilden eine Schicht, die den Ertrag oft unbemerkt um 10–20 % reduziert. Eigentümer merken den Verlust meist erst, wenn die Jahresabrechnung erscheint.',
      'Klassische Reinigungs­methoden mit Hebebühne, Gerüst oder Dachbegehung sind teuer, zeitintensiv und stellen ein Risiko für Personal und Module dar. Wir reinigen Ihre Dachanlage stattdessen vollständig vom Boden aus – mit unserer Drohne und der DCS-X1-PRO-Plattform.',
      'Das Verfahren ist herstellerkonform, schonend zur Modulglasoberfläche und für alle gängigen Dachtypen geeignet: Schrägdach, Flachdach, Gewerbehalle, Logistikzentrum, Mehrfamilienhaus und Stallgebäude.',
    ],
    technologyParagraphs: dcsBaseTechnology,
    specs: [
      { label: 'Dachtypen', value: 'Schrägdach, Flachdach, Halle, Stalldach' },
      { label: 'Wasserdruck', value: 'angepasst an Modul, max. 80 bar Service' },
      { label: 'Wasserquelle', value: 'Hausanschluss oder externer Tank' },
      { label: 'Maximale Arbeitshöhe', value: 'bis 150 m über Grund' },
      { label: 'Bürsteneinsatz', value: 'Speziell entwickelte weiche Bürsten, optional' },
      { label: 'Reinigungsmittel', value: 'Demineralisiertes Wasser, ohne Chemie' },
      { label: 'Modulpreis', value: 'ab 2–3 € pro Modul (abhängig von Verschmutzung)' },
      { label: 'Mindestauftrag', value: 'ab ca. 30 Modulen' },
    ],
    useCases: [
      {
        title: 'Privater EFH/MFH',
        description:
          'Reinigung Ihrer Aufdach-Anlage am Wohnhaus – ohne Dachbegehung, ohne Gerüst, ohne Schmutz auf der Fassade.',
        icon: 'home',
      },
      {
        title: 'Gewerbehallen & Logistik',
        description:
          'Trapezblech-Hallen mit großen Aufdach- oder Indach-Anlagen entlang der Autobahnen A7, A8, A81 sind unser tägliches Geschäft.',
        icon: 'logistics',
      },
      {
        title: 'Landwirtschaftliche Dächer',
        description:
          'Stall- und Maschinenhallen-Dächer mit Belastung durch Tierhaltung, Staub und Ammoniak benötigen häufigere Reinigung – wir bringen das passende Verfahren mit.',
        icon: 'farm',
      },
      {
        title: 'Bürogebäude & Industrie',
        description:
          'Reinigung kombiniert mit Glas- oder Fassaden­reinigung möglich, in einer Anfahrt erledigt.',
        icon: 'office',
      },
    ],
    process: [
      { number: '01', title: 'Dachfoto senden', description: 'Schicken Sie uns ein Foto Ihrer Anlage per E-Mail oder WhatsApp – wir bewerten den Verschmutzungs­grad.' },
      { number: '02', title: 'Festpreis in 24 h', description: 'Sie erhalten ein transparentes Festpreis­angebot pro Modul oder pro kWp.' },
      { number: '03', title: 'Termin & Reinigung', description: 'Termin in der Regel innerhalb von 1–2 Wochen, Reinigung dauert je nach Größe 1–4 Stunden.' },
      { number: '04', title: 'Foto-Bericht', description: 'Vorher-/Nachher-Bilder werden Ihnen digital zugestellt.' },
    ],
    beforeAfter: {
      before: ['Pollen- und Staubfilm auf den Modulen', 'Vogelkot, Moos- und Flechtenbildung am Modulrand', '10–20 % Ertragsverlust gegenüber Sollwert', 'Punktuelle Verschattungen durch Bauwerks­schatten + Schmutz'],
      after: ['Optisch wie nach der Installation – streifenfrei', 'Modulrand frei von organischen Belägen', 'Voller spezifischer Ertrag', 'Klares Modulglas, keine Schlieren oder Kalkflecken'],
    },
    benefits: [
      'Keine Dachbegehung – kein Risiko für Sie und Ihre Versicherung',
      'Kein Gerüst, kein Hubsteiger – kein Aufbautag',
      'Schonend für Module – herstellerkonform, ohne mechanischen Druck',
      'Schnell: Reinigung in unter einem Vormittag',
      'Festpreis pro Modul, transparent vorab',
    ],
    faq: [
      {
        question: 'Beschädigt die Drohnenreinigung mein Dach?',
        answer:
          'Nein. Die Drohne hat keinerlei Kontakt mit Modul oder Dach. Das Wasser wird mit angepasstem Druck aufgesprüht und läuft kontrolliert ab.',
      },
      {
        question: 'Erlischt durch die Reinigung meine Modul-Garantie?',
        answer:
          'Nein. Wir verwenden ausschließlich herstellerkonforme Verfahren mit demineralisiertem Wasser ohne chemische Zusätze. Bürsten kommen nur auf ausdrücklichen Wunsch und mit weichem Aufsatz zum Einsatz.',
      },
      {
        question: 'Wie oft sollte eine Dachanlage gereinigt werden?',
        answer:
          'Wir empfehlen eine Reinigung alle 1–2 Jahre. Anlagen in der Nähe von Landwirtschaft, Bäumen oder Autobahnen verschmutzen schneller und brauchen oft jährlichen Service.',
      },
      {
        question: 'Was kostet die Reinigung einer Dachanlage?',
        answer:
          'Ab ca. 2–3 € pro Modul. Für eine durchschnittliche 10-kWp-Anlage liegt der Preis typischerweise zwischen 60 € und 100 €. Das Festpreisangebot erstellen wir Ihnen kostenlos in 24 Stunden.',
      },
      {
        question: 'Kann die Reinigung von der Steuer abgesetzt werden?',
        answer:
          'Bei gewerblicher Nutzung ist die Reinigung als Betriebsausgabe absetzbar. Bei der EEG-Einspeisung von Privatanlagen je nach steuerlicher Einordnung – fragen Sie Ihren Steuerberater.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FASSADEN
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'fassadenreinigung',
    navLabel: 'Fassadenreinigung',
    title: 'Fassadenreinigung mit Drohne – bis 150 m Höhe',
    subtitle:
      'Glas-, Aluminium- und Beton­fassaden­reinigung ohne Hubsteiger – mit RO/DI-Aufbereitung und Festpreis pro m².',
    metaTitle: 'Fassadenreinigung mit Drohne – Glas, Alu, Beton bis 150 m',
    metaDescription:
      'Fassadenreinigung mit DCS X1 PRO bis 150 m Höhe: 1.200–2.000 m²/h Glasfläche, RO/DI-Wasser, ohne Gerüst und ohne Hubsteiger – deutschlandweit.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop',
    intro: [
      'Verschmutzte Glas-, Aluminium- und Beton­fassaden machen ein Gebäude älter aussehen, als es ist – und kosten Eigentümer und Verwaltungen jedes Jahr fünfstellige Beträge an Reinigungs- und Logistik­kosten. Hubsteiger­miete, Gerüstaufbau, Sperrung von Verkehrsflächen und Personenarbeit in großer Höhe verschärfen das Problem.',
      'Mit unserer DCS-X1-PRO-Plattform und der DJI Matrice 400 reinigen wir Fassaden bis zu einer Höhe von 150 m – ohne Hubsteiger, ohne Gerüst, ohne Sperrung. Das System ist besonders bei Glas- und Aluminium­fassaden im Einsatz, bei denen die Kontrolle des Wasserdrucks sowie der Einsatz von demineralisiertem Wasser entscheidend sind, um Streifenbildung und mineralische Rückstände zu vermeiden.',
      'Dank der Integration der RO/DI-Technologie (Umkehrosmose und Deionisierung – zur vollständigen Entfernung von Mineralien und Rückständen) sowie der Wassererwärmung auf bis zu 60 °C ermöglicht die Plattform eine effektive Entfernung sowohl von üblichen atmosphärischen Verschmutzungen, Vogelkot als auch von industriellen Verunreinigungen und fettigen Ablagerungen.',
    ],
    technologyParagraphs: dcsBaseTechnology,
    specs: [
      { label: 'Flächenleistung', value: '1.200–2.000 m²/h bei Glasfassaden' },
      { label: 'Betriebsdruck', value: 'bis zu 155 bar' },
      { label: 'Pufferspeicher', value: '550 l intern + 1.000 l externer Tank' },
      { label: 'Wassertemperatur', value: 'bis 60 °C – fettige Ablagerungen' },
      { label: 'RO/DI-Aufbereitung', value: 'Vollentmineralisiertes Wasser, streifenfrei' },
      { label: 'Maximale Windgeschwindigkeit', value: 'bis 50 km/h Dauerwind' },
      { label: 'Maximale Arbeitshöhe', value: 'bis 150 m' },
      { label: 'Wassertanks', value: '1.000 l, optional 5.000 l Großcontainer' },
    ],
    useCases: [
      {
        title: 'Glasfassaden Hochhaus',
        description:
          'Bürohochhäuser, Hotels, Konzern­zentralen mit großen Glasflächen ab 30 m Höhe – reinigt sich von Außen ohne Außen­dienst-Personal.',
        icon: 'glass',
      },
      {
        title: 'Aluminium-Fassaden',
        description:
          'Vorgehängte hinterlüftete Aluminium­fassaden ohne Risiko der Korrosion durch falsche Reinigungs­chemie.',
        icon: 'office',
      },
      {
        title: 'Industriefassaden & Hallen',
        description:
          'Trapezblech-, Sandwichelement- oder Beton­fassaden von Logistik- und Produktions­hallen, gerne im Paket mit der Dachanlagen­reinigung.',
        icon: 'industry',
      },
      {
        title: 'Schwer zugängliche Bauten',
        description:
          'Brücken, Schornsteine, Mast- und Turmbauten – überall dort, wo Hubsteiger oder Gerüste an die Grenzen kommen.',
        icon: 'maintenance',
      },
    ],
    process: [
      { number: '01', title: 'Begehung & Aufmaß', description: 'Wir prüfen Fassadenfläche, Material, Verschmutzungs­grad und Zufahrt – per Foto, BIM-Daten oder Vor-Ort-Termin.' },
      { number: '02', title: 'Genehmigungen', description: 'Wir kümmern uns um die Drohnen-Aufstiegs­genehmigung und ggf. die Abstimmung mit Verkehrsbehörden.' },
      { number: '03', title: 'Reinigung mit RO/DI', description: 'Reinigung mit aufbereitetem Wasser, je nach Verschmutzung mit Vorwärmung auf bis 60 °C.' },
      { number: '04', title: 'Endabnahme', description: 'Gemeinsame Begehung oder Foto-Dokumentation – mit Vorher-/Nachher-Bildern und schriftlicher Abnahme.' },
    ],
    beforeAfter: {
      before: ['Atmosphärische Schmutzschicht (Staub, Pollen)', 'Vogelkot und Insekten­ablagerungen an Fassadenkante', 'Industrielle Verunreinigungen, Rußpartikel, Salz', 'Fettige Ablagerungen aus Lüftungs­abluft'],
      after: ['Streifenfreie Glasflächen ohne Kalkrückstände', 'Saubere Aluminium- und Blechprofile', 'Reinigung ohne Korrosions­risiko', 'Optik wie bei Neubau'],
    },
    benefits: [
      'Keine Hubsteiger­kosten und keine Verkehrs­sperrung notwendig',
      'Reinigung im laufenden Betrieb – Mieter und Mitarbeiter werden nicht gestört',
      'Kein Personal in Höhe – sicherer und versicherbar',
      'Geeignet für sensible Materialien (eloxiertes Alu, beschichtetes Glas)',
      'Festpreis pro m² – kein Überraschungspreis',
    ],
    faq: [
      {
        question: 'Wie verhindern Sie Streifen und Kalkflecken auf Glas?',
        answer:
          'Wir setzen ausschließlich vollentmineralisiertes Wasser aus unserer mobilen RO/DI-Anlage ein. Das Wasser trocknet rückstandsfrei und hinterlässt streifenfreie Glasflächen – ohne Wischen.',
      },
      {
        question: 'Welche Fassaden sind nicht geeignet?',
        answer:
          'Bei sehr empfindlichen historischen Putz­fassaden oder bei Gebäuden mit beschädigten Fugen prüfen wir vor Ort. In der Regel finden wir eine sichere Methode, gegebenenfalls in Kombination mit traditionellen Verfahren.',
      },
      {
        question: 'Brauchen Sie eine Genehmigung für den Drohnenflug?',
        answer:
          'In den meisten Fällen ja. Wir kümmern uns um die Anmeldung beim Luftfahrtbundesamt bzw. der zuständigen Landesluftfahrtbehörde. Die Genehmigungs­dauer beträgt 1–4 Wochen.',
      },
      {
        question: 'Wie reinigen Sie fettige Ablagerungen aus Lüftungsabluft?',
        answer:
          'Bei fettigen oder klebrigen Verschmutzungen erwärmen wir das Wasser auf bis zu 60 °C. Optional setzen wir biologisch abbaubare Tenside ein.',
      },
      {
        question: 'Wie lange dauert die Reinigung einer 10.000 m² Glasfassade?',
        answer:
          'Bei optimalen Bedingungen ca. 5–8 Arbeitstage mit einer Plattform, schneller wenn wir parallel arbeiten. Genauere Aussagen treffen wir nach der Begehung.',
      },
    ],
  },
];

// Helper — znajdź usługę po slug. Zwraca undefined jeśli nie ma → caller
// woła notFound() z next/navigation żeby wyświetlić stronę 404.
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
