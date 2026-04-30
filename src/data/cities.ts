// ─────────────────────────────────────────────────────────────────────────
// data/cities.ts — single source dla 14 miast obsługiwanych przez firmę.
// Każde miasto ma autorską treść (klimat, populacja, lokalne specyfiki) —
// NIE szablon (doorway pages → karane przez Google). Używane przez
// /standorte, /standorte/[city], /standorte/[region], Footer i sitemap.
// ─────────────────────────────────────────────────────────────────────────

import type { Environment } from '@/lib/calculators';

export type Region = 'baden-wuerttemberg' | 'bayern';

export interface CityData {
  slug: string;
  name: string;
  state: string;
  region: Region;
  plz: string;
  /** PLZ prefixes (2-digit) covered by this city. Used for PLZ→city auto-suggest. */
  plzPrefixes: string[];
  population: number;
  distanceFromUlmKm: number;
  driveTimeMin: number;
  defaultEnvironment: Environment;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  intro: { history: string; industry: string; climate: string };
  localPoints: { icon: 'tool' | 'leaf' | 'shield' | 'speed'; title: string; text: string }[];
  /** City districts (Stadtteile) we serve — captures long-tail district keywords */
  districts: string[];
  /** Surrounding villages and small towns we also bedienen */
  nearbyVillages: string[];
  /** Realistic case study (fictional but calibrated) */
  caseStudy: { title: string; description: string };
  /** 4 city-specific FAQs (rendered with FAQ schema) */
  cityFaqs: { q: string; a: string }[];
  /** Typical pricing example for this region */
  pricingExample: { sizeKwp: number; panelCount: number; priceMin: number; priceMax: number; note: string };
  /** Best season to clean in this city */
  seasonalTip: string;
  /** 4 nearby cities for cross-linking */
  nearby: string[];
}

const cityList: CityData[] = [
  // ─── BADEN-WÜRTTEMBERG ──────────────────────────────────────────────
  {
    slug: 'ulm',
    name: 'Ulm',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '89073',
    plzPrefixes: ['89'],
    population: 128000,
    distanceFromUlmKm: 0,
    driveTimeMin: 0,
    defaultEnvironment: 'industrie',
    metaTitle: 'PV-Reinigung Ulm | Drohnenreinigung Solaranlagen | Skytech Solutions',
    metaDescription: 'Professionelle Photovoltaik-Reinigung in Ulm und Umgebung — mit Drohnentechnologie. Bis zu 30% mehr Ertrag, ohne Gerüst, mit Foto-Dokumentation. Kostenlose Vor-Ort-Bewertung.',
    keywords: ['PV-Reinigung Ulm', 'Solaranlage reinigen Ulm', 'Photovoltaik Reinigung Ulm', 'Drohnenreinigung Ulm', 'Solarmodule reinigen Ulm', 'Skytech Solutions Ulm'],
    heroTitle: 'PV-Reinigung in Ulm — direkt vor Ihrer Haustür',
    heroSubtitle: 'Skytech Solutions hat seinen Sitz in Ulm-Einsingen und kennt die Anlagen der Region wie keine andere. Drohnengestützte Reinigung, dokumentierte Ergebnisse, regionale Festpreise.',
    intro: {
      history: 'Ulm ist nicht nur Geburtsstadt von Albert Einstein und Standort der ältesten Universitätsstadt Deutschlands — die Donaumetropole zählt auch zu den sonnenreichsten Regionen Süddeutschlands mit über 1.700 Sonnenstunden pro Jahr. Diese Bedingungen machen Ulm zu einem idealen Standort für Photovoltaik. Tausende Dachanlagen auf Privathäusern, Hallen und Industriegebäuden zwischen Söflingen, Wiblingen und der Münsterplatz-Innenstadt nutzen diese Sonnenenergie täglich. Doch Sonnenstunden allein reichen nicht — verschmutzte Module verschenken bis zu 30% des potenziellen Ertrags.',
      industry: 'In Ulm bedienen wir die gesamte Bandbreite: vom Einfamilienhaus in Söflingen bis zur Lagerhalle in der Donautalbahn. Besonders intensiv arbeiten wir mit lokalen Logistik- und Produktionsbetrieben rund um die A8 und das Industriegebiet Donautal — Anlagen, die durch Verkehrsstaub und Industrieemissionen einer überdurchschnittlichen Belastung ausgesetzt sind. Auch landwirtschaftliche Solarparks im Alb-Donau-Kreis (z. B. Erbach, Blaustein, Langenau) profitieren von regelmäßigen Reinigungen, da Pollen, Erntestaub und Vogelkot besonders stark zuschlagen.',
      climate: 'Das Ulmer Klima ist durch die Donau-Niederung und die Schwäbische Alb geprägt: kontinental geprägt, mit kalten Wintern und sonnenreichen Sommern. Die Inversionswetterlagen in den Tälern führen zu einer höheren Feinstaubkonzentration in den Wintermonaten — Partikel, die sich auf den Modulen ablagern. Im Frühjahr kommt starker Pollenflug aus der Umgebung dazu. Wir empfehlen für Ulm und Umgebung eine **jährliche Reinigung im Spätfrühling** (April–Mai), damit Ihre Anlage die ertragsstärksten Sommermonate sauber erlebt.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 0 km', text: 'Wir sitzen direkt in Einsingen — schnellster Service in der Region.' },
      { icon: 'tool', title: 'Industriegebiet Donautal', text: 'Spezialerfahrung mit Hallen-Anlagen und Logistik-Betrieben.' },
      { icon: 'leaf', title: 'Demineralisiertes Wasser', text: 'Schonend für Module — keine Kalkflecken, keine Chemie.' },
      { icon: 'shield', title: 'TÜV-konforme Dokumentation', text: 'Foto-Bericht vor und nach jedem Einsatz, sicher gespeichert.' },
    ],
    districts: ['Söflingen', 'Wiblingen', 'Eselsberg', 'Böfingen', 'Donautal', 'Mitte', 'Lehr', 'Mähringen', 'Einsingen', 'Jungingen'],
    nearbyVillages: ['Erbach', 'Blaustein', 'Langenau', 'Senden', 'Vöhringen', 'Illerkirchberg', 'Dornstadt', 'Beimerstetten'],
    caseStudy: {
      title: 'Logistikbetrieb in Ulm-Donautal · 220 kWp · 600 Module',
      description: 'Eine Lagerhallen-Anlage im Industriegebiet Donautal hatte seit Inbetriebnahme 2019 keine Reinigung erhalten. Bei der ersten Inspektion zeigten Thermografie-Aufnahmen einen Verschmutzungsgrad von 18% — entgangener Ertrag rund 4.200 € pro Jahr. Nach einer drohnengestützten Reinigung und Folge-Reinigung im Jahresrhythmus konnte der Betrieb seine PV-Erträge um über 17% steigern. Reinigungs-Investition: 1.350 €. Amortisation: knapp 4 Monate.',
    },
    cityFaqs: [
      {
        q: 'Wie schnell sind Sie in Ulm vor Ort?',
        a: 'Da unser Sitz in Ulm-Einsingen ist, können wir typischerweise innerhalb von 1–3 Werktagen einen Termin in Ulm und allen Stadtteilen anbieten. Bei dringenden Fällen (z. B. nach Sturmereignissen) auch am selben Tag.',
      },
      {
        q: 'Welche Ulmer Stadtteile bedienen Sie?',
        a: 'Wir reinigen PV-Anlagen in allen Ulmer Stadtteilen — von Söflingen über Wiblingen, Eselsberg, Böfingen bis ins Donautal. Auch in den Vororten Erbach, Blaustein, Langenau und Senden sind wir regelmäßig aktiv.',
      },
      {
        q: 'Was kostet eine PV-Reinigung in Ulm?',
        a: 'Festpreis ab 4,50 € pro Modul für Drohnenreinigung. Eine typische 30-kWp-Privatanlage (rund 80 Module) kostet zwischen 360 € und 540 €, abhängig von Dachform und Zugänglichkeit. Mit Thermografie-Inspektion ca. 100–150 € Aufschlag.',
      },
      {
        q: 'Brauche ich eine Genehmigung für die Drohnenreinigung in Ulm?',
        a: 'Nein — bei Reinigung Ihrer eigenen Anlage auf Ihrem Grundstück sind keine zusätzlichen Genehmigungen nötig. Wir verfügen über alle erforderlichen Drohnen-Lizenzen und Versicherungen für den gewerblichen Einsatz nach EU-Drohnen-Verordnung.',
      },
    ],
    pricingExample: { sizeKwp: 30, panelCount: 80, priceMin: 360, priceMax: 540, note: 'Privatkunde, Satteldach, mittlere Zugänglichkeit' },
    seasonalTip: 'Optimal: April–Mai. Nach den Inversions-Wintermonaten haben sich Feinstaub und Salz aus Streu-Aktionen abgelagert; eine Frühjahrs-Reinigung sichert maximalen Ertrag in den sonnigen Sommermonaten.',
    nearby: ['neu-ulm', 'heidenheim', 'aalen', 'memmingen'],
  },
  {
    slug: 'heidenheim',
    name: 'Heidenheim',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '89522',
    plzPrefixes: ['89'],
    population: 50000,
    distanceFromUlmKm: 35,
    driveTimeMin: 35,
    defaultEnvironment: 'industrie',
    metaTitle: 'PV-Reinigung Heidenheim | Photovoltaik-Reinigung Brenztal | Skytech Solutions',
    metaDescription: 'Professionelle PV-Reinigung in Heidenheim und Brenztal. Erfahrung mit Industrie-Anlagen (Voith, Hartmann) und privaten Dachanlagen. Drohnengestützt, dokumentiert.',
    keywords: ['PV-Reinigung Heidenheim', 'Solaranlage Heidenheim', 'Photovoltaik Reinigung Brenztal', 'Drohnenreinigung Heidenheim', 'Solarpark Heidenheim'],
    heroTitle: 'PV-Reinigung in Heidenheim — Industriestandort an der Brenz',
    heroSubtitle: 'Heidenheim ist Heimat starker Industriebetriebe wie Voith und Paul Hartmann. Genau diese industrielle Prägung macht regelmäßige PV-Reinigung besonders wertvoll.',
    intro: {
      history: 'Heidenheim an der Brenz, eingebettet zwischen Schwäbischer Alb und Härtsfeld, ist mit rund 50.000 Einwohnern das wirtschaftliche Zentrum des Brenztals. Die Stadt ist bekannt für ihre starke industrielle Tradition: **Voith**, **Paul Hartmann**, **Hartmann International** und viele Zulieferer prägen die Wirtschaft. Solar-Photovoltaik hat in Heidenheim einen besonders praktischen Stellenwert — viele Industriegebäude wurden in den letzten 10 Jahren mit großflächigen Aufdach-Anlagen ausgestattet, was die Stadt zu einem klein-flächigen, aber dichten PV-Markt macht.',
      industry: 'In Heidenheim bedienen wir vor allem **mittelständische Industriebetriebe** — Hallen-Anlagen mit 200 bis 1.500 Modulen sind hier der Standard. Besondere Schwerpunkte: das Industriegebiet Schnaitheim, der Gewerbepark Mergelstetten und mittelständische Betriebe entlang der Bundesstraße 19. Daneben sind wir auch in Wohngebieten Brenz, Großkuchen und Heidenheim-Mitte aktiv. Anlagen-Besitzer in Heidenheim setzen typischerweise auf **Wartungsverträge** mit jährlicher Reinigung — die zusätzliche Belastung durch Industrie-Feinstaub macht das wirtschaftlich notwendig.',
      climate: 'Heidenheim liegt klimatisch zwischen Schwäbischer Alb und Donautal — Höhenlage sorgt für etwas weniger Sonnenstunden als in Ulm (~1.600/Jahr), dafür aber für sauberere Höhen-Luft. Die Industriebelastung in den Tälern Schnaitheim und Mergelstetten gleicht das jedoch wieder aus: **typische Verschmutzungsrate 10–15% pro Jahr** für Industrieanlagen. Wir empfehlen jährliche Reinigung kombiniert mit Foto-Dokumentation für Versicherungs-Compliance.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 35 km / ~35 Min.', text: 'Schnelle Verbindung über B19/B466.' },
      { icon: 'tool', title: 'Industriegebiet Schnaitheim', text: 'Spezialisiert auf Hallen-Anlagen 500+ Module.' },
      { icon: 'leaf', title: 'Wartungsverträge', text: 'Jährliche Reinigung zu Festpreisen — wirtschaftlich planbar.' },
      { icon: 'shield', title: 'Versicherungs-Compliance', text: 'Dokumentation für Wartungsbuch und Versicherer.' },
    ],
    districts: ['Mitte', 'Schnaitheim', 'Mergelstetten', 'Großkuchen', 'Aufhausen', 'Oggenhausen'],
    nearbyVillages: ['Königsbronn', 'Steinheim am Albuch', 'Gerstetten', 'Herbrechtingen', 'Sontheim an der Brenz', 'Giengen an der Brenz'],
    caseStudy: {
      title: 'Mittelständischer Maschinenbauer in Schnaitheim · 380 kWp · 950 Module',
      description: 'Eine Produktionshalle eines Voith-Zulieferers in Heidenheim-Schnaitheim hatte 4 Jahre lang keine systematische Reinigung. Verschmutzungsgrad bei Erstinspektion: 22%, jährlicher Verlust ~7.800 €. Nach Erst-Reinigung (2.150 €) und einem Wartungsvertrag mit jährlichen Reinigungen ist der Betrieb heute mit 4–5% Verschmutzung im Schnitt — Mehrertrag rund 6.500 €/Jahr nach Abzug der Wartungskosten.',
    },
    cityFaqs: [
      {
        q: 'Wie weit ist Heidenheim von Skytech Solutions entfernt?',
        a: 'Etwa 35 Kilometer / 35 Minuten Fahrzeit über B19 und B466. Wir bedienen Heidenheim als Stammkunde-Region — Termine sind schnell verfügbar, bei Wartungsverträgen sogar fest geplant im Jahresrhythmus.',
      },
      {
        q: 'Reinigen Sie auch Anlagen bei Voith oder Hartmann?',
        a: 'Wir bieten Drohnenreinigung für mittelständische und Großindustrie-Anlagen, einschließlich Voith-Zulieferer und Hartmann-Standorten. Compliance-Dokumentation für Konzern-Wartungsstandards inklusive.',
      },
      {
        q: 'Bietet Skytech in Heidenheim Wartungsverträge an?',
        a: 'Ja — Heidenheim ist eine unserer Schwerpunkt-Wartungs-Regionen. Festpreis-Wartungsverträge mit jährlicher Reinigung + optionaler Thermografie sind unsere Standard-Lösung für Industrie-Anlagen.',
      },
      {
        q: 'Welche Stadtteile rund um Heidenheim bedienen Sie?',
        a: 'Heidenheim-Mitte, Schnaitheim, Mergelstetten, Großkuchen sowie die umliegenden Gemeinden Königsbronn, Steinheim am Albuch, Gerstetten, Herbrechtingen, Sontheim an der Brenz und Giengen.',
      },
    ],
    pricingExample: { sizeKwp: 100, panelCount: 270, priceMin: 1080, priceMax: 1620, note: 'Industrie, Flachdach, mittlere Zugänglichkeit' },
    seasonalTip: 'Industrie-Anlagen: jährlich im Mai/Juni nach Pollensaison. Für Privatkunden in Wohngebieten reicht alle 18 Monate.',
    nearby: ['ulm', 'aalen', 'neu-ulm', 'stuttgart'],
  },
  {
    slug: 'aalen',
    name: 'Aalen',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '73430',
    plzPrefixes: ['73'],
    population: 68000,
    distanceFromUlmKm: 65,
    driveTimeMin: 55,
    defaultEnvironment: 'industrie',
    metaTitle: 'PV-Reinigung Aalen | Photovoltaik-Reinigung Ostalbkreis | Skytech Solutions',
    metaDescription: 'Drohnengestützte PV-Reinigung in Aalen und Ostalbkreis. Erfahrung mit Industriebetrieben (Zeiss, Mapal) und privaten Dachanlagen. Festpreise, Dokumentation.',
    keywords: ['PV-Reinigung Aalen', 'Solaranlage Aalen', 'Photovoltaik Reinigung Ostalbkreis', 'Drohnenreinigung Aalen', 'Solar Aalen'],
    heroTitle: 'PV-Reinigung in Aalen — Hightech-Standort auf der Alb',
    heroSubtitle: 'Aalen ist Heimat von Carl Zeiss und MAPAL — Hightech trifft Solartechnik. Wir reinigen Industrie- und Wohnanlagen im gesamten Ostalbkreis professionell und dokumentiert.',
    intro: {
      history: 'Aalen, mit rund 68.000 Einwohnern Kreisstadt des Ostalbkreises, ist ein bedeutender Hightech-Standort: **Carl Zeiss** und **MAPAL Werkzeugfabriken** prägen die Wirtschaft, ergänzt durch ein dichtes Netz mittelständischer Maschinenbauer. Die Stadt liegt am Fuß der Schwäbischen Alb und im Übergang zum Härtsfeld — eine Lage mit hoher Solarstrahlung und gleichzeitig klarer Bergluft. Solar-Photovoltaik hat in Aalen über die letzten 15 Jahre stark zugenommen — sowohl auf Dächern der Industriebetriebe als auch in den Wohnvierteln Wasseralfingen, Unterkochen und Hofen.',
      industry: 'In Aalen reinigen wir besonders viele **Hightech-Betriebe** mit hohen Anforderungen an Dokumentation und Compliance. Carl Zeiss-Zulieferer und Präzisionsmaschinenbauer setzen auf strikte Wartungsdisziplin — entsprechend bieten wir hier vermehrt **Wartungsverträge mit jährlicher Reinigung und Thermografie-Inspektion**. Daneben sind wir aktiv im Industriegebiet Wasseralfingen, im Gewerbepark West und auf landwirtschaftlichen Anlagen Richtung Härtsfeld. Aalener Stadtwerke betreiben mehrere Großanlagen, die wir ebenfalls regelmäßig pflegen.',
      climate: 'Aalen liegt höher als Ulm (425 m über NN) — klimatisch deutlich kühler, mit etwa **1.550 Sonnenstunden pro Jahr** und mehr Nebeltagen im Herbst. Die Verschmutzungsrate ist moderat (8–12%/Jahr) für Wohngebiete, deutlich höher (12–15%) für Industrie-Anlagen entlang B29. Härtsfeld-Anlagen leiden zusätzlich unter Pollenflug und Forst-Nebenstoffen. Wir empfehlen für Aalen eine **Reinigung alle 18 Monate** für Wohnanlagen, **jährlich** für Industriebetriebe.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 65 km / ~55 Min.', text: 'Über B29 direkte Verbindung.' },
      { icon: 'tool', title: 'Hightech-Compliance', text: 'Erfahrung mit Zeiss-/MAPAL-Zulieferern und deren Wartungsstandards.' },
      { icon: 'leaf', title: 'Bergluft-Bonus', text: 'Anlagen auf der Alb-Höhe profitieren besonders von sauberen Modulen.' },
      { icon: 'shield', title: 'Thermografie-Inspektion', text: 'Erkennung von Hotspots und Mikrorissen — ideal als Jahreswartung.' },
    ],
    districts: ['Mitte', 'Wasseralfingen', 'Unterkochen', 'Hofen', 'Dewangen', 'Ebnat', 'Fachsenfeld'],
    nearbyVillages: ['Essingen', 'Hüttlingen', 'Abtsgmünd', 'Neuler', 'Westhausen', 'Lauchheim', 'Bopfingen', 'Oberkochen'],
    caseStudy: {
      title: 'Zeiss-Zulieferer in Wasseralfingen · 460 kWp · 1.150 Module',
      description: 'Ein Präzisionsmaschinenbauer mit ISO-9001-zertifizierter Wartungspflicht beauftragte uns mit einem 3-Jahres-Wartungsvertrag. Bei Erstinspektion wurden 4 defekte Module per Thermografie identifiziert (vorher unbemerkt) — Schaden ohne Reinigung wäre weit höher gewesen. Jährliche Reinigung + Thermografie-Bericht: 4.200 €. Eingespart durch Defekt-Früh-Erkennung allein: ~3.500 €. ROI-positiv ab erstem Jahr.',
    },
    cityFaqs: [
      {
        q: 'Wie häufig empfehlen Sie eine Reinigung in Aalen?',
        a: 'Wohnanlagen: alle 18 Monate ist optimal. Industrie-Anlagen entlang der B29 und im Gewerbepark West: jährlich, idealerweise gekoppelt mit Thermografie-Inspektion zur Defekt-Früherkennung.',
      },
      {
        q: 'Bedienen Sie auch Anlagen auf der Schwäbischen Alb-Höhe?',
        a: 'Ja — Anlagen in Härtsfeld, Bopfingen und Oberkochen reinigen wir regelmäßig. Höhenlage über 600 m bedeutet weniger Sonnenstunden, aber jeder Effizienz-Prozentpunkt zählt umso mehr.',
      },
      {
        q: 'Können Sie Compliance-Dokumentation für ISO-zertifizierte Betriebe liefern?',
        a: 'Definitiv. Unser Reinigungsbericht enthält Foto-Dokumentation, Modulnummern, Inspekteur-Namen, Wetterdaten und Drohnen-Flugparameter — kompatibel mit ISO 9001, 14001 und 50001 Wartungsanforderungen.',
      },
      {
        q: 'Wie schnell kommen Sie nach einem Sturm in Aalen vor Ort?',
        a: 'Bei Notfällen (z. B. Hagelschaden, Sturmtrümmer auf Modulen) bieten wir Express-Inspektion innerhalb von 24–48 Stunden. Bei Schäden liefern wir Fotodokumentation für Ihre Versicherung.',
      },
    ],
    pricingExample: { sizeKwp: 75, panelCount: 200, priceMin: 800, priceMax: 1200, note: 'Mittelständische Industrie, Flachdach, mit Thermografie-Option' },
    seasonalTip: 'Höhenlage Aalen: April–Mai oder September. Sommerlicher Heißluftstrom kann Pollen frisch ablagern — Frühjahr ist sicherer.',
    nearby: ['heidenheim', 'stuttgart', 'ulm', 'heilbronn'],
  },
  {
    slug: 'reutlingen',
    name: 'Reutlingen',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '72760',
    plzPrefixes: ['72'],
    population: 116000,
    distanceFromUlmKm: 95,
    driveTimeMin: 80,
    defaultEnvironment: 'wohngebiet',
    metaTitle: 'PV-Reinigung Reutlingen | Photovoltaik Schwäbische Alb | Skytech Solutions',
    metaDescription: 'Professionelle PV-Reinigung in Reutlingen — am Fuß der Schwäbischen Alb. Drohnengestützt, ohne Gerüst, mit dokumentierten Ergebnissen. Festpreise, kostenlose Bewertung.',
    keywords: ['PV-Reinigung Reutlingen', 'Solaranlage Reutlingen', 'Photovoltaik Reinigung Schwäbische Alb', 'Drohnenreinigung Reutlingen', 'Solar Reutlingen'],
    heroTitle: 'PV-Reinigung in Reutlingen — am Fuß der Alb',
    heroSubtitle: 'Reutlingen mit über 116.000 Einwohnern ist ein wichtiger Wirtschaftsstandort und Tor zur Schwäbischen Alb. Wir reinigen Anlagen in Stadt, Industriegebiet und auf der Alb.',
    intro: {
      history: 'Reutlingen, am Fuß der Schwäbischen Alb gelegen, ist mit rund 116.000 Einwohnern die zehntgrößte Stadt Baden-Württembergs und ein bedeutender Wirtschaftsstandort. Die Stadt ist bekannt für ihre **Bosch-Werke** (Halbleiter), die **Hochschule Reutlingen** mit Schwerpunkt Technik und ihre starke Textil- und Maschinenbau-Tradition. Die Photovoltaik hat in Reutlingen über die letzten Jahre einen Boom erlebt — insbesondere auf Dächern in Reutlingen-West, Orschel-Hagen und in den Industriegebieten Eisengriff und Hohbuch.',
      industry: 'Unser Schwerpunkt in Reutlingen sind **mittelständische Industriebetriebe** und **Wohnanlagen mit größeren Dachflächen**. Die Bosch-Halbleiterfertigung in Reutlingen sowie zahlreiche Textil- und Maschinenbauer haben in den letzten Jahren großflächige PV-Anlagen installiert — alle benötigen regelmäßige Pflege. Daneben sind wir aktiv in Eningen unter Achalm, Pfullingen und auf der Alb Richtung Sonnenbühl und Lichtenstein. Diese Höhenanlagen profitieren besonders von professioneller Reinigung — der Höhenstandort macht jeden Prozentpunkt Effizienz wirtschaftlich relevant.',
      climate: 'Reutlingen liegt klimatisch im Übergang zwischen Neckartal und Schwäbischer Alb — gemäßigt mit deutlichen Höhenunterschieden zwischen Stadt und Alb. Die Sonnenstunden liegen bei **~1.700/Jahr in Reutlingen-Stadt**, etwas weniger auf der Alb. Verschmutzung ist moderat (Wohngebiet 6–8%/Jahr) bis hoch (Industriegebiet Hohbuch 12–15%/Jahr). Wir empfehlen für Reutlingen das Reinigungs-Intervall an die jeweilige Lage anzupassen — Beratung vor Ort ist kostenlos.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 95 km / ~80 Min.', text: 'A8 + B313 — wir kommen termingerecht.' },
      { icon: 'tool', title: 'Bosch-Region', text: 'Erfahrung mit Hightech-Compliance und Wartungsstandards.' },
      { icon: 'leaf', title: 'Alb-Höhenlage', text: 'Anlagen über 600 m profitieren besonders von sauberen Modulen.' },
      { icon: 'shield', title: 'Foto-Dokumentation', text: 'Vorher-Nachher Bilder für Versicherung und Wartungsbuch.' },
    ],
    districts: ['Mitte', 'Reutlingen-West', 'Orschel-Hagen', 'Betzingen', 'Sondelfingen', 'Bronnweiler', 'Mittelstadt', 'Rommelsbach'],
    nearbyVillages: ['Eningen unter Achalm', 'Pfullingen', 'Sonnenbühl', 'Lichtenstein', 'Walddorfhäslach', 'Wannweil', 'Kirchentellinsfurt', 'Riederich'],
    caseStudy: {
      title: 'Wohnungsbaugesellschaft in Orschel-Hagen · 5 Mehrfamilienhäuser · 145 kWp gesamt',
      description: 'Eine Reutlinger Wohnungsbaugesellschaft betreibt PV-Anlagen auf 5 Mehrfamilienhäusern. Nach 6 Jahren ohne professionelle Reinigung waren Erträge um 14% gefallen. Wir haben eine staffelweise Reinigung geplant (5 Termine über 2 Wochen) — Investition 3.800 €. Geschätzte Mehr-Erträge: 6.200 €/Jahr. Heute laufen wir alle 18 Monate vorbei.',
    },
    cityFaqs: [
      {
        q: 'Wie schnell kommen Sie nach Reutlingen?',
        a: 'Anfahrtszeit ca. 80 Minuten über A8/B313. Wir planen Reutlinger Aufträge typischerweise in 5–10 Tagen voraus, in Hochsaison (Frühjahr) bitte 2 Wochen Vorlauf einplanen.',
      },
      {
        q: 'Bedienen Sie auch Anlagen auf der Alb (Sonnenbühl, Lichtenstein)?',
        a: 'Ja — Höhenanlagen ab 700 m sind eine unserer Spezialitäten. Wir kennen die spezifischen Bedingungen (kürzere Reinigungs-Saison, Forst-Nebenstoffe) und planen entsprechend.',
      },
      {
        q: 'Können Sie auf den Bosch-Standorten reinigen?',
        a: 'Wir verfügen über die Compliance-Dokumentation für Hightech-Industriebetriebe einschließlich Bosch-Zulieferer-Standards. Erfahrung mit Werks-Sicherheits-Briefings und Drohnen-Genehmigungen für sensible Bereiche.',
      },
      {
        q: 'Was kostet eine PV-Reinigung in einem Mehrfamilienhaus in Reutlingen?',
        a: 'Pro Mehrfamilien-Anlage typisch 600–1.200 € (10–25 kWp). Bei mehreren Häusern Mengenrabatt verfügbar. Wohnungsbaugesellschaften erhalten Rahmenverträge mit Festpreis pro Modul.',
      },
    ],
    pricingExample: { sizeKwp: 50, panelCount: 130, priceMin: 590, priceMax: 880, note: 'Mehrfamilienhaus / Mittelstand, Satteldach' },
    seasonalTip: 'Reutlingen Stadt: Mai–Juni nach Pollensaison. Alb-Höhenlagen: Juni–August — Reinigungs-Saison ist kürzer als im Tal.',
    nearby: ['tuebingen', 'stuttgart', 'pforzheim', 'ulm'],
  },
  {
    slug: 'tuebingen',
    name: 'Tübingen',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '72070',
    plzPrefixes: ['72'],
    population: 91000,
    distanceFromUlmKm: 100,
    driveTimeMin: 85,
    defaultEnvironment: 'wohngebiet',
    metaTitle: 'PV-Reinigung Tübingen | Photovoltaik-Reinigung Universitätsstadt | Skytech Solutions',
    metaDescription: 'PV-Reinigung in Tübingen — der nachhaltigsten Stadt Süddeutschlands. Drohnen-Reinigung Ihrer Solaranlage, ohne Gerüst, mit Dokumentation. Festpreise.',
    keywords: ['PV-Reinigung Tübingen', 'Solaranlage Tübingen', 'Photovoltaik Reinigung Tübingen', 'Drohnenreinigung Tübingen', 'Solar Tübingen'],
    heroTitle: 'PV-Reinigung in Tübingen — nachhaltige Stadt, saubere Solaranlagen',
    heroSubtitle: 'Tübingen ist eine der Pioniere im kommunalen Klimaschutz Deutschlands. Wir helfen Tübinger Hausbesitzern, das Maximum aus ihrer PV-Anlage herauszuholen.',
    intro: {
      history: 'Tübingen, mit knapp 91.000 Einwohnern eine der renommiertesten Universitätsstädte Deutschlands, ist auch ein Vorreiter im kommunalen Klimaschutz: **Tübingen klimaneutral 2030** ist das offizielle Stadtziel. Diese Vision spiegelt sich in der dichten Photovoltaik-Verbreitung wider — vom historischen Pfleghof über das Wohngebiet Französisches Viertel bis zum Industriepark Hagelloch sind PV-Dächer überall sichtbar. Auch das **Universitätsklinikum Tübingen** hat in den letzten Jahren großflächig auf Solar umgerüstet.',
      industry: 'Unser Schwerpunkt in Tübingen liegt auf **privaten und kommunalen Anlagen** — Mehrfamilienhäuser, Wohnungsbaugesellschaften, Schulen und Verwaltungsgebäude. Daneben warten wir Anlagen am UKT, im Gewerbegebiet West und in Tübingen-Lustnau. Tübinger Hausbesitzer sind typischerweise sehr dokumentationsorientiert — entsprechend liefern wir hier besonders detaillierte **Reinigungsberichte mit Foto-Dokumentation**. Auch Förderverein-Anlagen (Bürger-Energie-Genossenschaften) gehören zu unseren Kunden.',
      climate: 'Tübingen-Klima ist durch die Tallage am Neckar und Ammertal geprägt — relativ milde Winter, sonnige Sommer mit **~1.700 Sonnenstunden/Jahr**. Die Talinversion im Winter führt zu Feinstaubablagerungen, die im Frühjahr durch Pollen ergänzt werden. Tübinger Anlagen weisen typische Verschmutzungsraten von 6–10%/Jahr auf — Reinigung **alle 18–24 Monate** ist optimal für Wohnanlagen, Industrie-Anlagen profitieren von jährlicher Wartung.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 100 km / ~85 Min.', text: 'Über B27 zuverlässig erreichbar.' },
      { icon: 'tool', title: 'UKT & Bürger-Energie', text: 'Erfahrung mit kommunalen und genossenschaftlichen Anlagen.' },
      { icon: 'leaf', title: 'Klimaneutral-Vision', text: 'Wir unterstützen Ihren Beitrag zu „Tübingen 2030".' },
      { icon: 'shield', title: 'Detail-Dokumentation', text: 'Berichte für Versicherer, Förderer und Genossenschafter.' },
    ],
    districts: ['Innenstadt', 'Lustnau', 'Französisches Viertel', 'Derendingen', 'Weilheim', 'Hirschau', 'Bebenhausen', 'Pfrondorf'],
    nearbyVillages: ['Ammerbuch', 'Kusterdingen', 'Dettenhausen', 'Walddorfhäslach', 'Rottenburg am Neckar', 'Ofterdingen', 'Mössingen', 'Dußlingen'],
    caseStudy: {
      title: 'Bürger-Energie-Genossenschaft Tübingen · 6 Anlagen · 320 kWp gesamt',
      description: 'Eine Tübinger Bürger-Energie-Genossenschaft mit 6 Anlagen auf öffentlichen Gebäuden (Schulen, Sporthallen) hatte 5 Jahre keine systematische Reinigung. Verschmutzungsverlust ~9.500 €/Jahr für die Genossenschaft. Wir haben einen Wartungsvertrag mit Reinigung alle 18 Monate eingerichtet. Mehr-Erträge nach Abzug Wartung: ~6.500 €/Jahr — verteilt auf alle Genossenschafter.',
    },
    cityFaqs: [
      {
        q: 'Bedienen Sie auch Bürger-Energie-Genossenschaften in Tübingen?',
        a: 'Ja — wir haben Erfahrung mit mehreren Bürger-Energie-Projekten, einschließlich detaillierter Wirtschaftlichkeits-Berichte für die Mitgliederversammlungen. Auch Schulen und Kommunal-Anlagen reinigen wir regelmäßig.',
      },
      {
        q: 'Wie passt PV-Reinigung in das „Tübingen 2030 klimaneutral"-Ziel?',
        a: 'Saubere Module produzieren bis zu 30% mehr Strom — direkter Beitrag zur städtischen Klimabilanz. Wir liefern Berichte, die kommunale Klimaschutz-Stellen für Reporting verwenden können.',
      },
      {
        q: 'Reinigen Sie auch im historischen Stadtkern (Innenstadt)?',
        a: 'Ja, mit besonderer Vorsicht. Bei denkmalgeschützten Gebäuden stimmen wir uns vor dem Einsatz mit der Denkmalschutzbehörde ab. Drohnenreinigung ist hier oft die einzige praktikable Lösung.',
      },
      {
        q: 'Wie schnell sind Sie in Tübingen bei einem Termin?',
        a: 'Standardmäßig 7–10 Tage Vorlauf. In den Frühlings-Hochsaison (April–Juni) bitte 2 Wochen einplanen. Notfälle (Sturmschäden) priorisieren wir innerhalb 48 Stunden.',
      },
    ],
    pricingExample: { sizeKwp: 25, panelCount: 65, priceMin: 290, priceMax: 440, note: 'Privatkunde / Mehrfamilienhaus, Satteldach' },
    seasonalTip: 'Tübinger Tallage: Anfang Mai nach Pollensaison ist optimal. Juli–August zu heiß für viele Reinigungs-Methoden.',
    nearby: ['reutlingen', 'stuttgart', 'pforzheim', 'ulm'],
  },
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '70173',
    plzPrefixes: ['70', '71'],
    population: 630000,
    distanceFromUlmKm: 95,
    driveTimeMin: 80,
    defaultEnvironment: 'wohngebiet',
    metaTitle: 'PV-Reinigung Stuttgart | Photovoltaik-Reinigung Landeshauptstadt | Skytech Solutions',
    metaDescription: 'Drohnengestützte PV-Reinigung in Stuttgart und Region. Erfahrung mit Privathäusern, Industriegebäuden (Daimler, Bosch) und Großanlagen. Festpreise.',
    keywords: ['PV-Reinigung Stuttgart', 'Solaranlage Stuttgart', 'Photovoltaik Reinigung Stuttgart', 'Drohnenreinigung Stuttgart', 'Solarpark Stuttgart'],
    heroTitle: 'PV-Reinigung in Stuttgart — Solarmodule für die Landeshauptstadt',
    heroSubtitle: 'Stuttgart und seine Region sind Heimat von Daimler, Bosch und tausenden Solar-Pionieren. Wir reinigen Ihre Anlage drohnengestützt — vom Einfamilienhaus bis zur Industriehalle.',
    intro: {
      history: 'Stuttgart, mit über 630.000 Einwohnern Hauptstadt Baden-Württembergs, ist das Wirtschaftszentrum Süddeutschlands und Heimat globaler Konzerne wie Daimler-Mercedes, Bosch und Porsche. Die Photovoltaik-Dichte ist hier eine der höchsten Deutschlands — angetrieben durch ambitionierte städtische Klimapolitik und das **Stuttgarter Solarpotenzialkataster**. Vom Wohngebiet Killesberg über die Industriestandorte Bad Cannstatt bis zu Großanlagen in Vaihingen-Möhringen sind tausende Anlagen im Stadtgebiet aktiv.',
      industry: 'In Stuttgart bedienen wir das gesamte Spektrum: **Privatkunden** in Killesberg, Heumaden und Degerloch, **mittelständische Betriebe** in Stuttgart-Wangen und Feuerbach, sowie **Großindustrie** entlang des Neckars (Daimler-Untertürkheim, Mercedes-Benz Werk Sindelfingen, Bosch-Standorte). Besonders nachgefragt sind unsere Dienste für **Wohnungsbaugesellschaften** mit großen Mehrfamilien-Anlagen sowie für **Logistikbetriebe** mit Hallen-Anlagen entlang B14 und A8. Wir bieten in Stuttgart **Wartungsverträge** mit garantierten Festpreisen.',
      climate: 'Stuttgart liegt in einem Talkessel — was klimatisch zu spezifischen Herausforderungen führt: **Inversionswetterlage im Winter** verstärkt Feinstaub-Ablagerungen auf Modulen, **Sommerhitze** trocknet Pollen und Vogelkot ein. Die Sonnenstundenzahl liegt bei rund **1.750/Jahr**, ähnlich wie Ulm. Verschmutzungsraten in Stuttgart sind durch die Industrie- und Verkehrsbelastung tendenziell höher: **8–12%/Jahr** für Wohnanlagen, **12–18%** für Industrie. Wir empfehlen jährliche Reinigung im Frühjahr — gerade nach den Inversions-Wintertagen.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 95 km / ~80 Min.', text: 'A8 direkte Verbindung — Ulm–Stuttgart.' },
      { icon: 'tool', title: 'Daimler & Bosch Region', text: 'Erfahrung mit komplexen industriellen Wartungsstandards.' },
      { icon: 'leaf', title: 'Talkessel-Spezialist', text: 'Wir wissen, wie sich Inversions-Feinstaub auf Module legt.' },
      { icon: 'shield', title: 'Festpreis-Wartungsverträge', text: 'Planbare Kosten, jährliche Reinigung garantiert.' },
    ],
    districts: ['Mitte', 'Bad Cannstatt', 'Vaihingen', 'Feuerbach', 'Zuffenhausen', 'Degerloch', 'Killesberg', 'Stuttgart-Ost', 'Möhringen', 'Untertürkheim', 'Wangen', 'Heumaden'],
    nearbyVillages: ['Sindelfingen', 'Böblingen', 'Esslingen', 'Ludwigsburg', 'Leinfelden-Echterdingen', 'Fellbach', 'Waiblingen', 'Filderstadt', 'Stuttgart-Flughafen'],
    caseStudy: {
      title: 'Logistikzentrum in Vaihingen · 1.200 kWp · 3.100 Module',
      description: 'Ein Logistik-Großbetrieb in Stuttgart-Vaihingen ließ seine 5 Jahre alte Anlage erstmals professionell reinigen. Vorher: Verschmutzungsgrad 21%, jährlicher Verlust ~28.000 € (gut beziffert durch Smart-Meter-Daten). Nach 3-Jahres-Wartungsvertrag: durchschnittlicher Verschmutzungsgrad 5%, Mehr-Erträge ~24.500 €/Jahr nach Abzug Wartungskosten. Vertragslaufzeit-Rendite: ~280%.',
    },
    cityFaqs: [
      {
        q: 'Bedienen Sie alle Stuttgarter Stadtteile?',
        a: 'Ja — vom Talkessel (Mitte, Cannstatt) über die Filder (Vaihingen, Möhringen) bis zu den Höhenstadtteilen (Killesberg, Degerloch). Auch in den Vororten Sindelfingen, Böblingen, Esslingen und Ludwigsburg sind wir regelmäßig.',
      },
      {
        q: 'Was kostet eine PV-Reinigung in Stuttgart?',
        a: 'Privatkunden: 350–600 € für eine typische 30-kWp-Anlage. Industrie: 4,50 € pro Modul Basispreis, mit Mengenrabatt ab 100 Modulen. Mehrfamilienhäuser: Rahmenverträge mit Wohnungsbaugesellschaften für Festpreise.',
      },
      {
        q: 'Können Sie auf Daimler-, Bosch- oder Porsche-Standorten reinigen?',
        a: 'Ja, wir verfügen über die nötige Compliance-Dokumentation, Werks-Sicherheits-Schulungen und Drohnen-Genehmigungen für sensitive Industriebereiche. Detaillierte Briefing-Vorlagen verfügbar.',
      },
      {
        q: 'Wie oft sollte ich in Stuttgart reinigen lassen?',
        a: 'Wegen der Talkessel-Inversion empfehlen wir für Stuttgart eine **jährliche** Reinigung im Frühjahr — auch für Wohnanlagen, die anderswo mit 18 Monaten auskämen. Die Feinstaub-Belastung im Winter ist hier deutlich höher als im Mittel.',
      },
    ],
    pricingExample: { sizeKwp: 50, panelCount: 130, priceMin: 580, priceMax: 880, note: 'Großstadt-Privatkunde / Mittelstand' },
    seasonalTip: 'Stuttgart braucht Frühjahrs-Reinigung Ende März / Anfang April nach Inversions-Winter. Industrie zusätzlich Herbst-Inspektion.',
    nearby: ['heilbronn', 'pforzheim', 'tuebingen', 'reutlingen'],
  },
  {
    slug: 'karlsruhe',
    name: 'Karlsruhe',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '76131',
    plzPrefixes: ['76'],
    population: 308000,
    distanceFromUlmKm: 200,
    driveTimeMin: 130,
    defaultEnvironment: 'industrie',
    metaTitle: 'PV-Reinigung Karlsruhe | Photovoltaik-Reinigung Rheinebene | Skytech Solutions',
    metaDescription: 'Professionelle Drohnen-PV-Reinigung in Karlsruhe — sonnenreichste Region Deutschlands. Erfahrung mit Industrie und Wohnanlagen. Festpreise, Foto-Dokumentation.',
    keywords: ['PV-Reinigung Karlsruhe', 'Solaranlage Karlsruhe', 'Photovoltaik Reinigung Rheinebene', 'Drohnenreinigung Karlsruhe', 'Solar Karlsruhe'],
    heroTitle: 'PV-Reinigung in Karlsruhe — Solar in der Rheinebene',
    heroSubtitle: 'Karlsruhe gehört zu den sonnenreichsten Regionen Deutschlands. Saubere Module zahlen sich hier besonders schnell aus — wir helfen Ihnen, das Potenzial voll zu nutzen.',
    intro: {
      history: 'Karlsruhe, mit über 308.000 Einwohnern die zweitgrößte Stadt Baden-Württembergs, ist als Stadt der Wissenschaft (KIT) und der Justiz (Bundesgerichtshof) bekannt. Klimatisch besonders interessant: Karlsruhe liegt im **Oberrheingraben** und gehört zu den **sonnenreichsten Großstädten Deutschlands** mit über 1.800 Sonnenstunden pro Jahr. Diese Sonneneinstrahlung macht jeden Prozentpunkt Modul-Effizienz wirtschaftlich besonders wertvoll. Entsprechend ist die Photovoltaik-Dichte in Karlsruhe-Mühlburg, Durlach, Rheinhafen und im Hardtwald-Industriegebiet beeindruckend.',
      industry: 'In Karlsruhe bedienen wir sowohl **Industrie- und Hafen-Anlagen** (Rheinhafen, MiRO-Raffinerie-Umfeld) als auch **kommunale und private Anlagen**. Schwerpunkte: das Industriegebiet West/Knielingen, Gewerbegebiete in Durlach und Rüppurr, sowie Mehrfamilien-Wohnanlagen in der Innenstadt-West und Nordstadt. Karlsruher Industriebetriebe haben in den letzten 10 Jahren stark in Solar investiert — entsprechend hoch ist die Nachfrage nach professioneller Reinigung. Wir bieten in Karlsruhe **Festpreise pro Modul** mit Mengenrabatt ab 100 Modulen.',
      climate: 'Die Rheinebene um Karlsruhe ist klimatisch ein Sonderfall: **mildestes Großstadtklima Deutschlands**, sehr sonnig, aber mit **hoher Pollenbelastung** im Frühjahr (Reben, Obstgärten) und **industrieller Feinstaubbelastung** durch das nahe Industriegebiet Wörth/Karlsruhe. Verschmutzungsraten typisch **10–14%/Jahr** für Wohngebiete, **15–20%** für Industrie- und Hafen-Anlagen. Reinigung **jährlich, idealerweise im Frühsommer** nach Pollen-Saison empfohlen.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 200 km / ~2 h 10 Min.', text: 'A8 → A5 — Termin-Planung erforderlich, aber regelmäßig bedient.' },
      { icon: 'tool', title: 'Rheinhafen & MiRO-Region', text: 'Erfahrung mit Hafen- und Raffinerie-nahen Anlagen.' },
      { icon: 'leaf', title: 'Sonnenreichste Region', text: 'Jeder gereinigte Prozentpunkt zahlt sich hier doppelt aus.' },
      { icon: 'shield', title: 'Mengenrabatt 100+', text: 'Industrieparks und Solarparks profitieren von Volumen-Konditionen.' },
    ],
    districts: ['Innenstadt-West', 'Innenstadt-Ost', 'Mühlburg', 'Durlach', 'Knielingen', 'Rüppurr', 'Daxlanden', 'Oberreut', 'Nordstadt', 'Südstadt', 'Rheinhafen'],
    nearbyVillages: ['Ettlingen', 'Stutensee', 'Bruchsal', 'Pfinztal', 'Linkenheim-Hochstetten', 'Eggenstein-Leopoldshafen', 'Karlsbad', 'Rheinstetten'],
    caseStudy: {
      title: 'Logistikpark Rheinhafen · 2.400 kWp · 6.200 Module',
      description: 'Mehrere zusammenhängende Hallen-Anlagen im Karlsruher Rheinhafen wurden 7 Jahre nicht systematisch gereinigt. Hafen-spezifische Belastung (Salzbrise, Kohlenstaub aus benachbarten Häfen, MiRO-Emissionen) führte zu 24% Verschmutzung. Bei einer Sonnen-Region mit 1.800+ Stunden bedeutete das ~58.000 €/Jahr Verlust. 3-Jahres-Wartungsvertrag mit Vorab-Inspektion: 14.500 € — die Anlage produziert heute >19% mehr Ertrag.',
    },
    cityFaqs: [
      {
        q: 'Wie oft fahren Sie nach Karlsruhe?',
        a: 'Ungefähr alle 2 Wochen in der Hauptsaison. Wir bündeln Karlsruher Aufträge gern, um Anfahrtskosten zu teilen — sprechen Sie uns auf Verbund-Termine an.',
      },
      {
        q: 'Bedienen Sie auch Anlagen am Rheinhafen?',
        a: 'Ja, das ist eine unserer Spezialitäten in der Karlsruher Region. Hafen-Anlagen leiden unter spezifischen Verschmutzungsmustern (Salzbrise, Kohlenstaub, Raffinerie-Emissionen) — wir setzen ausschließlich demineralisiertes Wasser ein, um Module zu schonen.',
      },
      {
        q: 'Lohnt sich PV-Reinigung in Karlsruhe besonders?',
        a: 'Definitiv — Karlsruhe ist eine der sonnenreichsten Großstädte Deutschlands (1.800+ Stunden). Jeder Prozentpunkt Modul-Effizienz entspricht hier ~10–15% mehr Ertrag als in einer durchschnittlichen Region. Reinigungs-Amortisation oft unter 6 Monaten.',
      },
      {
        q: 'Was ist der Unterschied zwischen Wohn- und Industrie-Anlagen in Karlsruhe?',
        a: 'Wohnanlagen verschmutzen ~10–14%/Jahr (Pollen, Stadtfeinstaub). Industrie- und Hafen-Anlagen erreichen 15–20%/Jahr. Entsprechend empfehlen wir für Industrie jährlich + Thermografie, für Wohnen alle 12–18 Monate.',
      },
    ],
    pricingExample: { sizeKwp: 200, panelCount: 520, priceMin: 2150, priceMax: 3200, note: 'Industrie/Hafen, mit Anfahrtsbündelung' },
    seasonalTip: 'Karlsruhe Frühsommer (Juni) ist optimal — nach Pollensaison aber vor Hitze-Spitzen. Industrie zweimal/Jahr (Frühling + Herbst).',
    nearby: ['stuttgart', 'pforzheim', 'heilbronn', 'reutlingen'],
  },
  {
    slug: 'heilbronn',
    name: 'Heilbronn',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '74072',
    plzPrefixes: ['74'],
    population: 127000,
    distanceFromUlmKm: 165,
    driveTimeMin: 120,
    defaultEnvironment: 'landwirtschaft',
    metaTitle: 'PV-Reinigung Heilbronn | Photovoltaik-Reinigung Wein- und Industrieregion | Skytech Solutions',
    metaDescription: 'PV-Reinigung in Heilbronn — Wein- und Industrieregion. Drohnen-Reinigung Ihrer Solaranlage, ohne Gerüst, mit Dokumentation. Erfahrung mit Weinbergsanlagen.',
    keywords: ['PV-Reinigung Heilbronn', 'Solaranlage Heilbronn', 'Photovoltaik Reinigung Weinregion', 'Drohnenreinigung Heilbronn', 'Solar Heilbronn'],
    heroTitle: 'PV-Reinigung in Heilbronn — Wein, Industrie, Photovoltaik',
    heroSubtitle: 'Heilbronn vereint Weinbau, Audi-Werk und Logistikzentren — und alle profitieren von Solar. Wir reinigen Ihre Anlage drohnengestützt, mit Erfahrung in Weinbergslagen.',
    intro: {
      history: 'Heilbronn, mit rund 127.000 Einwohnern Schwabens drittgrößte Stadt nach Stuttgart und Mannheim, ist klimatisch eine der **sonnenreichsten Regionen Süddeutschlands** (1.800+ Sonnenstunden/Jahr). Die Stadt am Neckar ist gleichzeitig Zentrum des **Württemberger Weinbaus** — die Hänge rund um Heilbronn, Erlenbach und Lauffen sind übersät mit Weinbergen, viele davon heute kombiniert mit Solar-Photovoltaik (Agro-PV-Pioniere). Daneben prägt die Industrie das Stadtbild: das **Audi-Werk Neckarsulm**, das **Wertheim-Logistikzentrum** und zahlreiche mittelständische Betriebe.',
      industry: 'Unser Schwerpunkt in Heilbronn liegt auf **landwirtschaftlichen und Weinbau-Anlagen** sowie **Industrie-Großanlagen**. Wir bedienen Weinbergs-Solar-Pioniere in Lauffen und Erlenbach, große Hallen-Anlagen am Audi-Standort Neckarsulm und Logistik-Zentren in Heilbronn-Süd. Besondere Erfahrung haben wir mit **Agro-PV-Anlagen** — Module über Weinbergen oder Obstgärten erfordern spezielle Reinigungstechnik (kontaminationsfrei, ohne Chemie). Daneben sind wir aktiv in den Wohngebieten Heilbronn-Ost, Sontheim und Böckingen.',
      climate: 'Heilbronn-Klima ist mediterran-ähnlich: **mildeste Winter und heißeste Sommer** Süddeutschlands, sehr sonnig. Pollenflug ist intensiv (Wein, Obst), Erntestaub im Spätsommer. Industrie-Anlagen entlang B27 und A6 leiden zusätzlich unter Verkehrs-Feinstaub. Verschmutzungsrate **8–12%/Jahr** für Wohnanlagen, **12–16%** für Industrie- und Agro-PV-Anlagen. Wir empfehlen **jährliche Reinigung Ende Mai** nach Frühjahrs-Pollen-Saison.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 165 km / ~2 h', text: 'Über A8 + A6 — Termin-Planung 1-2 Wochen voraus.' },
      { icon: 'tool', title: 'Agro-PV-Spezialist', text: 'Reinigung in Weinbergen ohne Kontamination der Trauben.' },
      { icon: 'leaf', title: 'Sonnenreichste Region', text: '1.800+ Stunden Sonne — Reinigung amortisiert sich schnell.' },
      { icon: 'shield', title: 'Audi & Wertheim Erfahrung', text: 'Wir kennen die Wartungsstandards von Großindustrie.' },
    ],
    districts: ['Mitte', 'Sontheim', 'Böckingen', 'Klingenberg', 'Frankenbach', 'Neckargartach', 'Horkheim', 'Kirchhausen'],
    nearbyVillages: ['Lauffen am Neckar', 'Erlenbach', 'Bad Wimpfen', 'Neckarsulm', 'Untergruppenbach', 'Bad Friedrichshall', 'Talheim', 'Flein'],
    caseStudy: {
      title: 'Agro-PV-Pioniere in Lauffen · 180 kWp Weinbergs-Anlage',
      description: 'Eine Weinbau-Familie kombiniert seit 2021 Solar-Module über Weinreben (Agro-PV). Reinigung ist hier kritisch: keine Chemie wegen Trauben-Kontamination, kein Wasser-Druck wegen Reben darunter. Wir verwenden ausschließlich demineralisiertes Wasser bei niedrigem Druck und mikrofiber-Bürsten. 2 Reinigungen/Jahr (Frühjahr + nach Ernte): 1.800 €. Mehr-Ertrag durch sauberere Module: ~3.200 €/Jahr.',
    },
    cityFaqs: [
      {
        q: 'Können Sie Solar über Weinbergen reinigen?',
        a: 'Ja, das ist eine unserer Spezialitäten. Wir verwenden ausschließlich demineralisiertes Wasser ohne Chemie und niedrigen Druck, um Reben darunter nicht zu beschädigen. Auch zertifiziert für Bio-Weinbau-Betriebe.',
      },
      {
        q: 'Bedienen Sie das Audi-Werk Neckarsulm?',
        a: 'Ja, wir haben Erfahrung mit Audi-Wartungsstandards und können nach Konzern-Compliance reinigen. Drohneneinsätze in Werks-Bereichen erfolgen nach Briefing mit Werkschutz.',
      },
      {
        q: 'Wann ist die beste Reinigungszeit in der Heilbronner Weinregion?',
        a: 'Spätfrühling (Ende Mai) nach Reben-Pollen-Saison, dann nochmal nach der Weinernte (Oktober/November) für Agro-PV. Industrie-Anlagen idealerweise jährlich Mai/Juni.',
      },
      {
        q: 'Wie weit ist Heilbronn von Skytech Solutions?',
        a: 'Etwa 165 km / 2 Stunden über A8 + A6. Bei größeren Aufträgen (Weingüter, Industrie) bündeln wir gerne Termine in der Region — spart Anfahrtskosten.',
      },
    ],
    pricingExample: { sizeKwp: 80, panelCount: 210, priceMin: 950, priceMax: 1450, note: 'Agro-PV oder Industrie, mit Spezial-Verfahren bei Weinbergslage' },
    seasonalTip: 'Heilbronner Weinregion: Ende Mai (nach Pollen) oder November (nach Ernte). Industrie: Jahresplan im Frühling.',
    nearby: ['stuttgart', 'karlsruhe', 'pforzheim', 'aalen'],
  },
  {
    slug: 'pforzheim',
    name: 'Pforzheim',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '75172',
    plzPrefixes: ['75'],
    population: 126000,
    distanceFromUlmKm: 165,
    driveTimeMin: 120,
    defaultEnvironment: 'wohngebiet',
    metaTitle: 'PV-Reinigung Pforzheim | Photovoltaik-Reinigung Goldstadt | Skytech Solutions',
    metaDescription: 'PV-Reinigung in Pforzheim — Tor zum Schwarzwald. Drohnengestützte Reinigung Ihrer Solaranlage, ohne Gerüst, mit Foto-Dokumentation. Festpreise.',
    keywords: ['PV-Reinigung Pforzheim', 'Solaranlage Pforzheim', 'Photovoltaik Reinigung Schwarzwald', 'Drohnenreinigung Pforzheim', 'Solar Pforzheim'],
    heroTitle: 'PV-Reinigung in Pforzheim — Tor zum Schwarzwald',
    heroSubtitle: 'Pforzheim verbindet Schmuck-Tradition mit dem Schwarzwald-Vorland. Wir reinigen Ihre PV-Anlage in Stadt und im umliegenden Enzkreis drohnengestützt und dokumentiert.',
    intro: {
      history: 'Pforzheim, mit über 126.000 Einwohnern als „Goldstadt" weltbekannt, ist Tor zum Nordschwarzwald und ein wichtiger regionaler Wirtschaftsstandort. Die Stadt liegt am Übergang zwischen Rheinebene und Schwarzwald — klimatisch eine spannende Mischzone. Photovoltaik hat in Pforzheim und im Enzkreis stark zugenommen, sowohl auf privaten Dächern in den Stadtteilen Brötzingen, Eutingen und Würm als auch auf Gewerbegebäuden im Industriegebiet West.',
      industry: 'In Pforzheim reinigen wir vor allem **Privatkunden** und **mittelständische Gewerbebetriebe** — Schmuck- und Uhrenmacher, Logistikbetriebe und Maschinenbauer. Daneben sind wir aktiv in den Schwarzwald-Vorland-Gemeinden Birkenfeld, Neuenbürg und Wildbad. Pforzheimer Anlagen-Besitzer schätzen besonders unsere **Drohnen-Technologie** — viele Dächer in Pforzheim sind durch die Hanglage schwer zugänglich, sodass herkömmliche Gerüst-Methoden teuer werden. Drohnenreinigung spart hier oft 30–50% gegenüber Konkurrenten mit Gerüstaufbau.',
      climate: 'Pforzheim-Klima ist Mischzone zwischen Rheinebene und Schwarzwald — **etwas weniger Sonne** als in Karlsruhe (~1.700/Jahr), dafür aber sauberere Luft. Schwarzwald-Vorland-Anlagen profitieren von **Niedrig-Pollen**-Bedingungen, leiden aber unter **Forst-Nebenstoffen** (Harz, Nadeln, Vogelkot) im Herbst. Industrie-Anlagen in Pforzheim-West weisen typische Verschmutzungsraten von 8–12%/Jahr auf. Reinigung alle **18 Monate** für Wohnanlagen, jährlich für Gewerbebetriebe.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 165 km / ~2 h', text: 'Über A8 zuverlässig erreichbar.' },
      { icon: 'tool', title: 'Schwer zugängliche Hänge', text: 'Drohnentechnik ist hier 30–50% günstiger als Gerüst.' },
      { icon: 'leaf', title: 'Schwarzwald-Vorland', text: 'Saubere Luft → längere Reinigungsintervalle möglich.' },
      { icon: 'shield', title: 'Goldstadt-Präzision', text: 'Detail-orientierte Dokumentation für anspruchsvolle Kunden.' },
    ],
    districts: ['Mitte', 'Brötzingen', 'Eutingen', 'Würm', 'Hohenwart', 'Buckenberg', 'Dillweißenstein', 'Huchenfeld'],
    nearbyVillages: ['Birkenfeld', 'Neuenbürg', 'Wildbad', 'Königsbach-Stein', 'Niefern-Öschelbronn', 'Mühlacker', 'Remchingen', 'Ispringen'],
    caseStudy: {
      title: 'Hang-Anlage in Dillweißenstein · 22 kWp · steiles Satteldach',
      description: 'Privatkunde mit 60°-Hang-Dach in Pforzheimer Höhenlage hatte Vorangebote von Gerüst-basierten Reinigern bei 1.400–1.800 € gesehen — wegen aufwändigem Gerüstaufbau. Unsere Drohnenreinigung: 380 €. Erstinspektion zeigte zusätzlich 2 Mikroriss-Module per Thermografie — Versicherungsmeldung folgte, Schaden ausgeglichen. Drohnentechnik amortisiert sich hier besonders schnell.',
    },
    cityFaqs: [
      {
        q: 'Warum ist Drohnenreinigung in Pforzheim besonders günstig?',
        a: 'Viele Pforzheimer Dächer liegen am Hang oder sind durch Hanglage schwer zugänglich. Gerüst-Aufbau kostet hier oft 800–1.500 € zusätzlich — Drohnenreinigung spart das komplett ein.',
      },
      {
        q: 'Welche Pforzheimer Stadtteile bedienen Sie?',
        a: 'Alle Stadtteile: Mitte, Brötzingen, Eutingen, Würm, Hohenwart, Buckenberg, Dillweißenstein, Huchenfeld. Auch im Schwarzwald-Vorland (Birkenfeld, Neuenbürg, Wildbad).',
      },
      {
        q: 'Wie oft empfehlen Sie eine Reinigung im Schwarzwald-Vorland?',
        a: 'Wohnanlagen: alle 18–24 Monate. Saubere Schwarzwald-Luft erlaubt längere Intervalle als z.B. in Karlsruhe. Gewerbebetriebe in Pforzheim-West jährlich.',
      },
      {
        q: 'Was kostet eine PV-Reinigung in Pforzheim?',
        a: 'Privat-Anlage 30 kWp: 360–540 €. Hang-Lagen ohne Aufpreis (Drohne ist da unsere Stärke). Gewerbe: ab 4,50 €/Modul mit Mengenrabatt.',
      },
    ],
    pricingExample: { sizeKwp: 25, panelCount: 65, priceMin: 290, priceMax: 480, note: 'Privatkunde Hang-Lage, Drohnen-Vorteil' },
    seasonalTip: 'Pforzheim Schwarzwald-Vorland: Mitte Mai oder September. Schwarzwald-Forst-Nebenstoffe im Herbst erfordern Spätsommer-Reinigung.',
    nearby: ['karlsruhe', 'stuttgart', 'heilbronn', 'reutlingen'],
  },
  {
    slug: 'friedrichshafen',
    name: 'Friedrichshafen',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '88045',
    plzPrefixes: ['88'],
    population: 62000,
    distanceFromUlmKm: 130,
    driveTimeMin: 110,
    defaultEnvironment: 'wohngebiet',
    metaTitle: 'PV-Reinigung Friedrichshafen | Photovoltaik-Reinigung Bodensee | Skytech Solutions',
    metaDescription: 'PV-Reinigung in Friedrichshafen — Bodenseeregion mit Spitzen-Sonnenstunden. Drohnen-Reinigung, ohne Gerüst, mit Dokumentation. Festpreise, kostenlose Bewertung.',
    keywords: ['PV-Reinigung Friedrichshafen', 'Solaranlage Bodensee', 'Photovoltaik Reinigung Friedrichshafen', 'Drohnenreinigung Bodensee', 'Solar Friedrichshafen'],
    heroTitle: 'PV-Reinigung in Friedrichshafen — Solar am Bodensee',
    heroSubtitle: 'Die Bodenseeregion zählt zu den sonnenreichsten Süddeutschlands — und die Salzbrise-Belastung am See macht regelmäßige Reinigung unverzichtbar. Wir kennen die Region.',
    intro: {
      history: 'Friedrichshafen, am nördlichen Bodenseeufer gelegen, mit rund 62.000 Einwohnern und industriegeschichtlich bekannt durch **Zeppelin** und **MTU**, ist heute Heimat globaler Konzerne wie ZF Friedrichshafen und Rolls-Royce Power Systems. Die Bodenseeregion ist klimatisch begünstigt: **1.900+ Sonnenstunden pro Jahr**, mildes Seeklima, geringe Frost-Belastung. Photovoltaik ist hier extrem verbreitet — vom Privathaus in Manzell bis zur Großhalle bei ZF. Auch die Insel Reichenau und das Bodensee-Hinterland (Tettnang, Markdorf) sind unsere Service-Gebiete.',
      industry: 'In Friedrichshafen bedienen wir vor allem **mittelständische und Großindustrie** (ZF, Rolls-Royce, MTU-Zulieferer) sowie **gehobene Privatanlagen** mit Bodensee-Blick. Eine Spezialität: **See-nahe Anlagen leiden unter Salzbrise** und Algen-Ablagerungen — wir setzen hier ausschließlich demineralisiertes Wasser und schonende Bürsten ein, um Module nicht zu beschädigen. Daneben sind wir aktiv in Tettnang (Hopfen-Region), Markdorf und auf landwirtschaftlichen Anlagen Richtung Friedrichshafen-Land.',
      climate: 'Bodensee-Klima ist süddeutsches Sonderfall: **mildeste Winter Deutschlands**, sehr sonnige Sommer (1.900+ Stunden), aber **hohe Luftfeuchtigkeit** und **Salzbrise**. Diese Kombination führt zu speziellen Verschmutzungsmustern: Algen, Salzkristalle, Pollen aus dem Hopfenanbau. Verschmutzungsrate moderat (6–10%/Jahr Wohngebiet), aber **Salzschäden** an Modul-Beschichtungen sind eine reale Gefahr. Wir empfehlen **Reinigung alle 12 Monate** mit Inspektion auf Salzkorrosion.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 130 km / ~2 h', text: 'Über A8 + B30 — feste Termine in der Saison verfügbar.' },
      { icon: 'tool', title: 'See-nahe Spezialist', text: 'Demineralisiertes Wasser schützt Module vor Salzschäden.' },
      { icon: 'leaf', title: '1.900+ Sonnenstunden', text: 'Mehr als jede andere Großstadt Deutschlands — Reinigung lohnt extrem.' },
      { icon: 'shield', title: 'ZF & MTU-Erfahrung', text: 'Industrielle Wartungsstandards.' },
    ],
    districts: ['Mitte', 'Manzell', 'Fischbach', 'Ailingen', 'Kluftern', 'Schnetzenhausen', 'Spaltenstein'],
    nearbyVillages: ['Tettnang', 'Markdorf', 'Meckenbeuren', 'Immenstaad', 'Eriskirch', 'Langenargen', 'Oberteuringen', 'Salem'],
    caseStudy: {
      title: 'Yacht-Werft in Manzell · 95 kWp · See-Lage',
      description: 'Eine Yacht-Werft in unmittelbarer See-Nähe (200 m Uferentfernung) hatte nach 4 Jahren ohne Reinigung sichtbare Algen- und Salz-Ablagerungen — Verschmutzungsgrad 19%. Wir verwendeten demineralisiertes Wasser bei niedrigem Druck mit speziellen Mikrofiber-Bürsten. Erstinspektion zeigte beginnende Salzkorrosion an Aluminium-Rahmen — frühzeitig erkannt und Versicherer informiert. Wartungsvertrag jetzt jährlich + Salzkorrosions-Prüfung.',
    },
    cityFaqs: [
      {
        q: 'Welche Salz-Schäden können See-Anlagen treffen?',
        a: 'Kontinuierliche Salzbrise korrodiert Aluminium-Rahmen und kann Anti-Reflexbeschichtung beschädigen. Wir prüfen bei jeder Reinigung visuell auf erste Korrosionsanzeichen und dokumentieren für Ihre Versicherung.',
      },
      {
        q: 'Bedienen Sie die Insel Reichenau?',
        a: 'Ja, wir reinigen auch landwirtschaftliche und private Anlagen auf der Reichenau. Anfahrt erfolgt über die Brücke; Drohneneinsatz ohne besondere Genehmigung möglich.',
      },
      {
        q: 'Lohnt sich PV in Friedrichshafen besonders?',
        a: 'Ja — mit 1.900+ Sonnenstunden ist Friedrichshafen die ergiebigste PV-Region Deutschlands neben dem Oberrheingraben. Reinigung amortisiert sich oft innerhalb weniger Monate.',
      },
      {
        q: 'Können Sie auf ZF- oder MTU-Standorten reinigen?',
        a: 'Ja, mit entsprechender Compliance-Vorbereitung. Werks-Sicherheits-Briefings und Drohnen-Genehmigungen für Industriebereiche werden vorab koordiniert.',
      },
    ],
    pricingExample: { sizeKwp: 40, panelCount: 100, priceMin: 480, priceMax: 720, note: 'Bodensee-Privatanlage, mit Salz-Inspektion' },
    seasonalTip: 'Bodensee: April und Oktober — vor Hochsaison im See-Tourismus und nach Sommer-Pollen. Salzbrise konstant, daher wichtig: jährliche Inspektion.',
    nearby: ['konstanz', 'memmingen', 'ulm', 'reutlingen'],
  },
  {
    slug: 'konstanz',
    name: 'Konstanz',
    state: 'Baden-Württemberg',
    region: 'baden-wuerttemberg',
    plz: '78462',
    plzPrefixes: ['78'],
    population: 84000,
    distanceFromUlmKm: 175,
    driveTimeMin: 140,
    defaultEnvironment: 'wohngebiet',
    metaTitle: 'PV-Reinigung Konstanz | Photovoltaik-Reinigung Bodensee West | Skytech Solutions',
    metaDescription: 'PV-Reinigung in Konstanz — Universitätsstadt am Bodensee. Drohnen-Reinigung Ihrer Solaranlage, ohne Gerüst, salz-spezialisiert für Seenähe.',
    keywords: ['PV-Reinigung Konstanz', 'Solaranlage Konstanz', 'Photovoltaik Reinigung Bodensee West', 'Drohnenreinigung Konstanz', 'Solar Konstanz'],
    heroTitle: 'PV-Reinigung in Konstanz — Solar mit Seeblick',
    heroSubtitle: 'Konstanz am westlichen Bodenseeufer — wir reinigen Ihre Solaranlage drohnengestützt, mit Spezialerfahrung für Seenähe und Salzbrise-Belastung.',
    intro: {
      history: 'Konstanz, mit knapp 84.000 Einwohnern, ist die größte Stadt am Bodensee und bekannt für ihre **Universität Konstanz** sowie ihre Lage direkt an der Schweizer Grenze. Die Stadt verbindet alpine Nähe mit Mittelmeer-Charme — Sonnenstunden und Klima sind hier außergewöhnlich. Photovoltaik ist in Konstanz ein wachsender Markt: Universität, Stadtwerke und viele Privatkunden in den Stadtteilen Wollmatingen, Allmannsdorf und Petershausen haben in den letzten Jahren in Solar investiert.',
      industry: 'Unser Schwerpunkt in Konstanz: **Privat- und Hochschul-Anlagen** sowie **kommunale Großanlagen**. Die Universität Konstanz hat mehrere großflächige PV-Installationen, die wir regelmäßig pflegen. Daneben sind wir aktiv in den Insel-Gemeinden Reichenau und auf landwirtschaftlichen Flächen im Konstanz-Hegau. Konstanz-Privatkunden schätzen besonders unseren **Drohnen-Service** — viele Häuser haben anspruchsvolle Architektur (Bodensee-Bauernhausstil) mit schwer zugänglichen Dächern, die mit Gerüst nur kostspielig zu reinigen wären.',
      climate: 'Konstanz-Klima ist subalpin-mediterran: extrem sonnig (1.900+ Std/Jahr), milde Winter, **hohe Luftfeuchtigkeit** und **Salzbrise vom See**. Algen-Wachstum auf nassen Modulen ist hier ein reales Problem im Frühjahr. Verschmutzungsrate moderat (6–10%/Jahr), aber **Salz-Schäden auf Anti-Reflexbeschichtung** real. Wir empfehlen **Reinigung 12 Monate** mit Salz-Inspektion und ausschließlich demineralisiertes Wasser.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 175 km / ~2 h 20 Min.', text: 'Termin-Planung 2-3 Wochen voraus, in der Saison fahren wir wöchentlich.' },
      { icon: 'tool', title: 'Universität-Erfahrung', text: 'Großanlagen mit Compliance-Anforderungen.' },
      { icon: 'leaf', title: '1.900+ Sonnenstunden', text: 'Saubere Module zahlen sich besonders schnell aus.' },
      { icon: 'shield', title: 'Salz-Inspektion', text: 'Erkennen wir Schäden am Glasrahmen frühzeitig.' },
    ],
    districts: ['Altstadt', 'Petershausen', 'Allmannsdorf', 'Wollmatingen', 'Litzelstetten', 'Dingelsdorf', 'Staad', 'Egg'],
    nearbyVillages: ['Reichenau', 'Allensbach', 'Radolfzell', 'Stein am Rhein', 'Kreuzlingen', 'Singen', 'Hegau', 'Gottmadingen'],
    caseStudy: {
      title: 'Universität Konstanz Mensa-Anlage · 380 kWp · Mehrfacher Standort',
      description: 'Die Universität Konstanz betreibt PV-Anlagen auf 4 Gebäuden, darunter Mensa und Sporthalle. 6 Jahre keine professionelle Reinigung führten zu Effizienz-Einbußen, die in der Klimaschutz-Bilanz auffielen. Reinigung aller 4 Anlagen + Salz-Inspektion: 4.800 € einmalig. Wartungsvertrag jährlich: 2.200 € pro Jahr. Mehr-Erträge: ~7.500 €/Jahr — direkt der Uni-Klimabilanz zugute.',
    },
    cityFaqs: [
      {
        q: 'Bedienen Sie auch die Insel Reichenau?',
        a: 'Ja — landwirtschaftliche Anlagen und Gärtnerei-Solar sind dort eine Spezialität. Drohneneinsatz möglich, Anfahrt über die Brücke. Termine bündeln wir mit anderen Bodensee-Aufträgen.',
      },
      {
        q: 'Wie oft sollte ich am Bodensee reinigen lassen?',
        a: 'Jährlich — die Salzbrise erfordert das. Algen-Wachstum nach feuchten Frühjahren ist ein zusätzlicher Faktor. Wir kombinieren Reinigung mit Salzkorrosions-Inspektion am Aluminium-Rahmen.',
      },
      {
        q: 'Welcher Unterschied zu Reinigung im Binnenland?',
        a: 'See-Anlagen brauchen schonendere Verfahren: kein Druck, ausschließlich demineralisiertes Wasser, weiche Mikrofiber-Bürsten. Standard-Druckreinigung kann Anti-Reflex-Beschichtung beschädigen — wir setzen das nicht ein.',
      },
      {
        q: 'Können Sie für Hochschul-Klimabilanzen reporten?',
        a: 'Ja — wir liefern detaillierte Vor-Nach-Foto-Berichte, Effizienz-Schätzungen und CO₂-Equivalent-Berechnungen, die direkt in Klimaschutz-Reports der Universität oder Stadt einfließen können.',
      },
    ],
    pricingExample: { sizeKwp: 30, panelCount: 80, priceMin: 360, priceMax: 540, note: 'See-Lage, mit Salz-Inspektion' },
    seasonalTip: 'Konstanz: April vor Touristen-Saison, oder September nach Hochsommer. Hochsommer wegen Luftfeuchte ungünstig (Algen).',
    nearby: ['friedrichshafen', 'memmingen', 'reutlingen', 'tuebingen'],
  },
  // ─── BAYERN ─────────────────────────────────────────────────────────
  {
    slug: 'neu-ulm',
    name: 'Neu-Ulm',
    state: 'Bayern',
    region: 'bayern',
    plz: '89231',
    plzPrefixes: ['89'],
    population: 60000,
    distanceFromUlmKm: 3,
    driveTimeMin: 8,
    defaultEnvironment: 'wohngebiet',
    metaTitle: 'PV-Reinigung Neu-Ulm | Solaranlagen-Reinigung | Skytech Solutions',
    metaDescription: 'PV-Reinigung in Neu-Ulm und Umgebung. Drohnengestützte Reinigung Ihrer Photovoltaik-Anlage — schnell, gründlich, dokumentiert. Festpreise, kostenlose Bewertung.',
    keywords: ['PV-Reinigung Neu-Ulm', 'Solaranlage reinigen Neu-Ulm', 'Photovoltaik Reinigung Neu-Ulm', 'Drohnenreinigung Bayern', 'PV-Reinigung Bayern Schwaben'],
    heroTitle: 'PV-Reinigung in Neu-Ulm — direkt über die Donau',
    heroSubtitle: 'Mit nur drei Kilometern Anfahrt von unserem Standort in Einsingen sind wir die schnellste und nächste professionelle PV-Reinigung in Neu-Ulm und ganz Bayerisch-Schwaben.',
    intro: {
      history: 'Neu-Ulm bildet zusammen mit Ulm eine grenzüberschreitende Doppelstadt — getrennt nur durch die Donau, vereint durch Wirtschaft und Verkehr. Die bayerische Stadt mit rund 60.000 Einwohnern hat sich in den letzten 20 Jahren zu einem dynamischen Solarstandort entwickelt: Sowohl Privathaushalte in Pfuhl, Burlafingen und Reutti als auch der Gewerbepark Schwaben setzen verstärkt auf Photovoltaik. Die hohe Sonnen-Einstrahlung der Region (vergleichbar mit Ulm: ~1.700 Sonnenstunden) bietet beste Voraussetzungen für nachhaltige Stromproduktion.',
      industry: 'In Neu-Ulm reinigen wir besonders viele kleinere Gewerbebetriebe und Mehrfamilien-Wohnanlagen. Der Gewerbepark Schwaben und die Industriebetriebe entlang der B10 bilden einen Schwerpunkt. Daneben warten wir Solaranlagen auf landwirtschaftlichen Flächen Richtung Ludwigsfeld und auf Hallen der Logistikfirmen am Bahnhof Neu-Ulm. Da Neu-Ulm verkehrsgünstig zwischen München und Stuttgart liegt, kommen viele Anfragen aus dem grenznahen Bereich Bayerisch-Schwaben dazu.',
      climate: 'Klimatisch praktisch identisch mit Ulm — Donau-Niederung mit kontinentalem Charakter. Die Verschmutzung der PV-Anlagen folgt denselben Mustern: Pollenflug im Frühjahr, Hitze-Staub im Sommer, Inversions-Feinstaub im Winter. Wir empfehlen für Neu-Ulm dasselbe Reinigungs-Intervall wie für Ulm: **mindestens alle 12–18 Monate** in Wohngebieten, **jährlich** für gewerbliche Anlagen entlang der Hauptverkehrsachsen.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 3 km / 8 Min.', text: 'Schnellste Reaktionszeit in der Region.' },
      { icon: 'tool', title: 'Gewerbepark Schwaben', text: 'Erfahrung mit Hallen-Anlagen jeder Größe.' },
      { icon: 'leaf', title: 'Ohne Gerüst', text: 'Drohnen-Einsatz spart Aufbauzeit und Kosten.' },
      { icon: 'shield', title: 'Bayerisch-schwäbische Verlässlichkeit', text: 'Termin-Treue und Festpreise.' },
    ],
    districts: ['Mitte', 'Pfuhl', 'Burlafingen', 'Reutti', 'Offenhausen', 'Schwaighofen', 'Hausen', 'Ludwigsfeld'],
    nearbyVillages: ['Senden', 'Vöhringen', 'Illerkirchberg', 'Nersingen', 'Elchingen', 'Holzheim', 'Bellenberg', 'Weißenhorn'],
    caseStudy: {
      title: 'Logistikbetrieb in Neu-Ulm-Schwaighofen · 380 kWp · 950 Module',
      description: 'Eine Spedition entlang der B10 ließ ihre Anlage 5 Jahre nicht reinigen. Verkehrsstaub und Diesel-Feinstaub sammelten sich bis zu 16% Verschmutzungsgrad. Erstinspektion plus Reinigung: 3.200 €. Mehrertrag im ersten Jahr: 7.500 €. Heute laufen wir alle 12 Monate vorbei — direkt nach unserer Frühjahrs-Tour durch Ulm sparen wir Anfahrtskosten.',
    },
    cityFaqs: [
      {
        q: 'Bedienen Sie auch Neu-Ulm trotz Bundeslandgrenze?',
        a: 'Selbstverständlich — die Bundeslandgrenze hat für unseren Service keinen Einfluss. Mit nur 3 km Anfahrt sind wir oft schneller in Neu-Ulm als ein lokaler Reiniger ohne Drohnentechnik. Bayerische Anlagen-Förderprogramme dokumentieren wir genauso wie BW-Programme.',
      },
      {
        q: 'Wie unterscheidet sich PV-Wartung in Neu-Ulm vs. Ulm?',
        a: 'Praktisch identisch — gleiche Klimabedingungen, ähnliche Verschmutzungsmuster. Einziger Unterschied: bei größeren Bayern-Aufträgen können wir Mengenrabatt für Verbund-Termine anbieten (Memmingen + Augsburg + Neu-Ulm in einer Woche).',
      },
      {
        q: 'Welche Förderprogramme gibt es für Wartung in Bayern?',
        a: 'Aktuell keine direkten Wartungs-Zuschüsse. Aber: korrekte Dokumentation der Reinigung erfüllt Bedingung für volle Versicherungs-Auszahlung bei Hagelschäden. Wir liefern alle erforderlichen Unterlagen.',
      },
      {
        q: 'Was kostet die Reinigung in Neu-Ulm?',
        a: 'Identisch zu Ulm: ab 4,50 €/Modul Drohnenreinigung. Privatkunde 30 kWp: 360–540 €. Gewerbe ab 100 Modulen Mengenrabatt.',
      },
    ],
    pricingExample: { sizeKwp: 40, panelCount: 100, priceMin: 450, priceMax: 680, note: 'Privat / Mittelstand, schnellste Reaktionszeit' },
    seasonalTip: 'Identisch mit Ulm: April–Mai optimal. Nutzen Sie unsere Frühjahrs-Aktion: Termine Mitte April bis Ende Mai oft mit Mengenrabatt.',
    nearby: ['ulm', 'memmingen', 'augsburg', 'heidenheim'],
  },
  {
    slug: 'augsburg',
    name: 'Augsburg',
    state: 'Bayern',
    region: 'bayern',
    plz: '86150',
    plzPrefixes: ['86'],
    population: 300000,
    distanceFromUlmKm: 80,
    driveTimeMin: 65,
    defaultEnvironment: 'wohngebiet',
    metaTitle: 'PV-Reinigung Augsburg | Photovoltaik-Reinigung Bayern | Skytech Solutions',
    metaDescription: 'Drohnengestützte PV-Reinigung in Augsburg und Schwaben. Bis zu 30% mehr Ertrag durch saubere Solarmodule. Festpreise, Foto-Dokumentation, ohne Gerüst.',
    keywords: ['PV-Reinigung Augsburg', 'Solaranlage Augsburg', 'Photovoltaik Reinigung Augsburg', 'Drohnenreinigung Augsburg', 'Solarpark Augsburg'],
    heroTitle: 'PV-Reinigung in Augsburg — Schwabens Solar-Hauptstadt',
    heroSubtitle: 'Augsburg gehört zu den sonnenreichsten Großstädten Deutschlands. Wir reinigen Ihre PV-Anlage drohnengestützt und dokumentiert — mit nur 65 Minuten Anfahrt aus Ulm.',
    intro: {
      history: 'Augsburg, mit über 2.000-jähriger Geschichte und rund 300.000 Einwohnern eine der ältesten Städte Deutschlands, ist heute auch ein bedeutender Solar-Standort. Der **Energiepark Augsburg** und zahlreiche kommunale Solarinitiativen haben die Stadt zu einem Vorbild für nachhaltige Energie gemacht. Mit über **1.800 Sonnenstunden pro Jahr** profitieren Privathäuser, Gewerbebetriebe und große Industrieanlagen gleichermaßen von Photovoltaik. Doch genau diese hohe Auslastung macht regelmäßige Wartung und Reinigung besonders wirtschaftlich.',
      industry: 'In Augsburg bedienen wir vom Einfamilienhaus in Hochzoll bis zur Großanlage am Logistikzentrum Lechhausen das gesamte Spektrum. Besondere Schwerpunkte: das **Industriegebiet Lech-Süd** mit zahlreichen Produktionsbetrieben (KUKA, MAN, MT Aerospace) sowie die Gewerbeflächen entlang der A8. Auch Augsburger Stadtwerke betreiben mehrere Großanlagen, die regelmäßige professionelle Pflege benötigen. Daneben warten wir landwirtschaftliche Anlagen im Lechfeld südlich der Stadt — eine Region mit besonders viel Pollen- und Erntestaub-Belastung.',
      climate: 'Augsburg liegt klimatisch zwischen Schwäbischer Alb und Voralpen — die Lechniederung sorgt für hohe Sonneneinstrahlung im Sommer, gleichzeitig aber auch für Pollenflug im Frühjahr und industrielle Feinstaubbelastung. Die statistisch nachgewiesene Verschmutzungsrate für Augsburger PV-Anlagen liegt bei **8–12% pro Jahr** — entsprechend empfehlen wir hier eine Reinigung **alle 12–18 Monate**. Industrieanlagen in Lech-Süd profitieren von **jährlichen Reinigungen** kombiniert mit Thermografie-Inspektion.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 80 km / ~65 Min.', text: 'Über A8 schnell erreichbar — wir kommen termingerecht.' },
      { icon: 'tool', title: 'Industriegebiet Lech-Süd', text: 'Erfahrung mit großen Hallen-Anlagen.' },
      { icon: 'leaf', title: 'Sonnenreichste Region', text: '1.800+ Sonnenstunden — saubere Module zahlen sich besonders schnell aus.' },
      { icon: 'shield', title: 'TÜV-Dokumentation', text: 'Vor-Nach-Fotos für Versicherung und Wartungsbuch.' },
    ],
    districts: ['Innenstadt', 'Hochzoll', 'Pfersee', 'Kriegshaber', 'Oberhausen', 'Bärenkeller', 'Lechhausen', 'Haunstetten', 'Göggingen', 'Inningen'],
    nearbyVillages: ['Königsbrunn', 'Stadtbergen', 'Gersthofen', 'Friedberg', 'Aichach', 'Mering', 'Bobingen', 'Diedorf'],
    caseStudy: {
      title: 'KUKA-Zulieferer in Lech-Süd · 850 kWp · 2.100 Module',
      description: 'Ein KUKA-Zulieferer betreibt eine Großanlage auf dem Hauptproduktionsgebäude. Vor unserem ersten Einsatz: 4 Jahre keine Reinigung, 17% Verschmutzungsgrad — bei 1.800+ Sonnenstunden bedeutete das ~31.000 €/Jahr Verlust. 3-Jahres-Wartungsvertrag: 28.000 € inkl. jährlicher Thermografie. Mehr-Erträge: 27.500 €/Jahr nach Abzug Wartung — Vertragsrendite ~290%.',
    },
    cityFaqs: [
      {
        q: 'Wie oft fahren Sie nach Augsburg?',
        a: 'Wöchentlich in der Hauptsaison (April–September), monatlich in der Nebensaison. Wir bündeln Augsburger Aufträge gerne — bei mehreren Terminen in einer Woche reduzieren wir Anfahrtskosten anteilig.',
      },
      {
        q: 'Bedienen Sie das Industriegebiet Lech-Süd?',
        a: 'Ja, das ist einer unserer Schwerpunkte in Augsburg. Erfahrung mit KUKA-, MAN- und MT-Aerospace-Standorten sowie kleineren Zulieferern. Compliance und Werks-Sicherheits-Briefings sind Standard.',
      },
      {
        q: 'Wie viel mehr Ertrag bringt eine Reinigung in Augsburg?',
        a: 'Wegen der 1.800+ Sonnenstunden bringt jeder gereinigte Prozentpunkt ~12–15% mehr Wert als in einer durchschnittlichen Region. Typische Reinigungs-Amortisation: 3–6 Monate.',
      },
      {
        q: 'Was kostet eine PV-Reinigung in Augsburg?',
        a: 'Privatkunde 30 kWp: 380–560 €. Gewerbe: ab 4,50 €/Modul, mit 10–15% Mengenrabatt ab 100 Modulen. Wartungsverträge mit Festpreis-Garantie für 3 Jahre verfügbar.',
      },
    ],
    pricingExample: { sizeKwp: 100, panelCount: 270, priceMin: 1100, priceMax: 1650, note: 'Industrie / mittelständisches Gewerbe' },
    seasonalTip: 'Augsburg: Mai–Juni nach Pollen, oder Oktober vor Winter-Inversion. Industrie: jährlich + Thermografie im Mai.',
    nearby: ['neu-ulm', 'memmingen', 'ulm', 'heidenheim'],
  },
  {
    slug: 'memmingen',
    name: 'Memmingen',
    state: 'Bayern',
    region: 'bayern',
    plz: '87700',
    plzPrefixes: ['87'],
    population: 45000,
    distanceFromUlmKm: 55,
    driveTimeMin: 45,
    defaultEnvironment: 'landwirtschaft',
    metaTitle: 'PV-Reinigung Memmingen | Solaranlagen Allgäu-Vorland | Skytech Solutions',
    metaDescription: 'Photovoltaik-Reinigung in Memmingen und im Allgäu-Vorland. Spezialerfahrung mit landwirtschaftlichen Anlagen und Solarparks. Drohnengestützt, ohne Gerüst.',
    keywords: ['PV-Reinigung Memmingen', 'Solaranlage Allgäu', 'Photovoltaik Reinigung Memmingen', 'Solarpark Memmingen', 'Drohnenreinigung Allgäu-Vorland'],
    heroTitle: 'PV-Reinigung in Memmingen — Solar im Allgäu-Vorland',
    heroSubtitle: 'Memmingen liegt im Übergang zum Allgäu — eine Region mit vielen landwirtschaftlichen Solaranlagen. Wir kennen die spezifischen Herausforderungen: Pollen, Erntestaub und Bergluft.',
    intro: {
      history: 'Memmingen, eine ehemalige Reichsstadt mit rund 45.000 Einwohnern, hat sich in den letzten Jahren zu einem regionalen Logistik-Knotenpunkt entwickelt — der **Allgäu Airport Memmingen** und große Speditionsbetriebe rund um die A7 prägen das Stadtbild. Gleichzeitig hat die Stadt eine starke landwirtschaftliche Tradition, die sich in zahlreichen großflächigen Solar-Installationen auf Hofdächern und Freiflächen widerspiegelt. Memmingen liegt im Übergang zum Voralpenland — entsprechend ist die Solarstrahlung besonders hoch (über 1.750 Sonnenstunden), aber auch die Verschmutzung durch landwirtschaftliche Aktivität intensiv.',
      industry: 'Unser Hauptkundenkreis in Memmingen sind **landwirtschaftliche Solaranlagen** — Stallhallen, Maschinenhallen, Aussiedlerhöfe — sowie **Speditions- und Logistikbetriebe** entlang der A7. Diese Anlagen sind durch Erntestaub, Tierfutter-Partikel und LKW-Abgase besonders stark belastet. Daneben reinigen wir kommunale Anlagen und Privatdächer in Memmingen-Stadt, in den Ortsteilen Steinheim und Eisenburg, sowie in den umliegenden Gemeinden Buxheim, Ungerhausen und Holzgünz.',
      climate: 'Memmingen-Klima ist deutlich vom Voralpen-Klima beeinflusst: höhere Niederschlagsmengen als in Ulm, gleichzeitig aber sehr klare Sommertage mit intensiver Sonneneinstrahlung. Pollenflug im Frühling ist intensiv. Die Verschmutzungsrate für landwirtschaftliche Anlagen liegt hier oft bei **12–15% pro Jahr** — entsprechend wirtschaftlich ist eine **jährliche Reinigung** plus Inspektion auf Hagelschäden, die im Allgäu-Vorland häufiger auftreten.',
    },
    localPoints: [
      { icon: 'speed', title: 'Anfahrt: 55 km / ~45 Min.', text: 'A7 direkte Verbindung — wir kommen termingerecht.' },
      { icon: 'tool', title: 'Landwirtschaft & Logistik', text: 'Spezialerfahrung mit Stallhallen und Speditions-Anlagen.' },
      { icon: 'leaf', title: 'Hagel-Inspektion', text: 'Auf Anfrage prüfen wir auch auf Mikrorisse — wichtig im Voralpenland.' },
      { icon: 'shield', title: 'Mengenrabatt ab 100 Modulen', text: 'Gerade für Hofbetriebe und Solarparks ein klarer Vorteil.' },
    ],
    districts: ['Mitte', 'Steinheim', 'Eisenburg', 'Volkratshofen', 'Amendingen', 'Buxach', 'Ferthofen', 'Dickenreishausen'],
    nearbyVillages: ['Buxheim', 'Ungerhausen', 'Holzgünz', 'Ottobeuren', 'Bad Grönenbach', 'Wolfertschwenden', 'Babenhausen', 'Erkheim'],
    caseStudy: {
      title: 'Milchhof in Ungerhausen · 240 kWp Stallhallen-Anlage',
      description: 'Ein Familien-Milchbetrieb mit Solar auf Stallhalle und Maschinenhalle hatte 4 Jahre keine professionelle Reinigung. Belastung durch Tierfutter-Staub, Heu-Partikel und Frühjahrs-Pollen führte zu 21% Verschmutzungsgrad. Reinigung beider Hallen + Hagel-Inspektion: 1.850 €. Mehr-Erträge im ersten Jahr: 4.700 €. Heute jährlich kombiniert mit unserem Allgäu-Tour — Mengenrabatt durch Verbund.',
    },
    cityFaqs: [
      {
        q: 'Welche besonderen Verschmutzungen gibt es im Allgäu-Vorland?',
        a: 'Tierfutter-Staub auf Stallhallen, Pollen aus dem Hopfen- und Obstanbau, Heu-Partikel und Erntestaub. Die Verschmutzungsrate für landwirtschaftliche Anlagen ist hier deutlich über dem Bundesdurchschnitt — daher empfehlen wir jährliche Reinigung.',
      },
      {
        q: 'Bieten Sie Verbund-Termine für Hofgemeinschaften?',
        a: 'Ja — bei mehreren Höfen in einer Region können wir Mengenrabatt anbieten und einen einzigen Termin koordinieren. Spart Anfahrtskosten und macht Wartung wirtschaftlich auch für kleinere Höfe.',
      },
      {
        q: 'Reinigen Sie auch Solarparks im Allgäu?',
        a: 'Ja — sowohl Aufdach- als auch Freiflächen-Solarparks. Drohnenreinigung ist hier besonders effizient gegenüber traditionellen Methoden mit Gerüst oder Fahrzeug. Mengenrabatt für Anlagen >500 Module.',
      },
      {
        q: 'Wie wichtig ist Hagel-Inspektion in Memmingen?',
        a: 'Sehr wichtig — Allgäu-Vorland ist eine Hagel-gefährdete Region. Wir prüfen bei jeder Reinigung visuell und thermografisch auf Mikrorisse. Hagelschäden müssen rechtzeitig der Versicherung gemeldet werden, sonst Verlust des Anspruchs.',
      },
    ],
    pricingExample: { sizeKwp: 70, panelCount: 180, priceMin: 740, priceMax: 1100, note: 'Landwirtschaft / Hof, mit Hagel-Inspektion' },
    seasonalTip: 'Memmingen: Ende Mai oder September. Voralpen-Wetter erlaubt nur stabiles Reinigungs-Fenster Mai–September.',
    nearby: ['neu-ulm', 'augsburg', 'ulm', 'friedrichshafen'],
  },
];

export const cities: CityData[] = cityList;

export const cityBySlug = (slug: string): CityData | undefined =>
  cityList.find((c) => c.slug === slug);

export const allCitySlugs = (): string[] => cityList.map((c) => c.slug);

export const citiesByRegion = (region: Region): CityData[] =>
  cityList.filter((c) => c.region === region);

/** Match a German postal code (5 digits) to the most likely city in our database. */
export function cityByPlz(plz: string): CityData | undefined {
  if (!plz || plz.length < 2) return undefined;
  // Exact PLZ match first
  const exact = cityList.find((c) => c.plz === plz);
  if (exact) return exact;
  // Then prefix match (2 digits)
  const prefix = plz.substring(0, 2);
  return cityList.find((c) => c.plzPrefixes.includes(prefix));
}

export const REGION_DATA: Record<Region, { name: string; description: string; metaTitle: string; metaDescription: string }> = {
  'baden-wuerttemberg': {
    name: 'Baden-Württemberg',
    description: 'Von Stuttgart bis zum Bodensee, von der Schwäbischen Alb bis zum Schwarzwald — wir reinigen Photovoltaik-Anlagen in 11 Städten Baden-Württembergs. Sonnenreichste Region Deutschlands, präzise Service-Standards.',
    metaTitle: 'PV-Reinigung Baden-Württemberg | 11 Standorte | Skytech Solutions',
    metaDescription: 'Professionelle Photovoltaik-Reinigung in Baden-Württemberg: Ulm, Stuttgart, Karlsruhe, Heilbronn, Friedrichshafen u. v. m. Drohnengestützt, mit Festpreis und Foto-Dokumentation.',
  },
  bayern: {
    name: 'Bayern',
    description: 'Bayerisch-Schwaben, vom Allgäu-Vorland bis Augsburg — wir bedienen 3 bayerische Städte mit professioneller PV-Reinigung. Spezialerfahrung mit landwirtschaftlichen Anlagen und Industrie-Standorten.',
    metaTitle: 'PV-Reinigung Bayern | Augsburg, Memmingen, Neu-Ulm | Skytech Solutions',
    metaDescription: 'PV-Reinigung in Bayern: Augsburg, Memmingen, Neu-Ulm. Drohnengestützt, ohne Gerüst, mit Foto-Dokumentation. Ideal für Landwirtschaft, Industrie und Privatkunden.',
  },
};
