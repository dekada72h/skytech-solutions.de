/**
 * German postal-code → climate / pollution zone presets.
 * First 2 digits of PLZ map to a region; the region maps to typical
 * environment + sun hours adjustment. Used by calculators to suggest
 * sensible defaults for the local user.
 */

import type { Environment } from './calculators';

export interface PlzPreset {
  region: string;
  state: string;
  defaultEnvironment: Environment;
  /** Solar yield correction factor: 1.0 = DE Süd avg (950 kWh/kWp). */
  yieldFactor: number;
  note: string;
}

// Coarse-grained map: PLZ prefix (first 2 digits) → preset.
// Realistic but not authoritative; intended as a starting point users can override.
const presets: Record<string, PlzPreset> = {
  // Sachsen-Anhalt / Brandenburg / Sachsen — viel Landwirtschaft, Industrie um Leipzig
  '01': { region: 'Dresden / Sachsen', state: 'Sachsen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.97, note: 'Sächsische Bergregion · mittlere Verschmutzung' },
  '02': { region: 'Görlitz / Lausitz', state: 'Sachsen', defaultEnvironment: 'industrie', yieldFactor: 0.96, note: 'Industrielle Belastung · jährliche Reinigung empfohlen' },
  '03': { region: 'Cottbus / Brandenburg-Süd', state: 'Brandenburg', defaultEnvironment: 'industrie', yieldFactor: 0.97, note: 'Lausitzer Braunkohlerevier · hohe Staubbelastung' },
  '04': { region: 'Leipzig', state: 'Sachsen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.97, note: 'Stadtgebiet · moderate Verschmutzung' },
  '06': { region: 'Halle / Sachsen-Anhalt', state: 'Sachsen-Anhalt', defaultEnvironment: 'industrie', yieldFactor: 0.96, note: 'Industriegebiet · regelmäßige Reinigung wichtig' },
  '07': { region: 'Gera / Thüringen', state: 'Thüringen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.96, note: 'Thüringer Becken' },
  '09': { region: 'Chemnitz / Erzgebirge', state: 'Sachsen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.94, note: 'Erzgebirgsraum · niedrigere Sonnenstunden' },

  // Berlin / Brandenburg
  '10': { region: 'Berlin', state: 'Berlin', defaultEnvironment: 'wohngebiet', yieldFactor: 0.97, note: 'Großstadt · Pollen + Verkehr' },
  '12': { region: 'Berlin Süd', state: 'Berlin', defaultEnvironment: 'wohngebiet', yieldFactor: 0.97, note: 'Stadtrandgebiet' },
  '13': { region: 'Berlin Nord', state: 'Berlin', defaultEnvironment: 'wohngebiet', yieldFactor: 0.97, note: 'Stadtrandgebiet' },
  '14': { region: 'Potsdam / Brandenburg', state: 'Brandenburg', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.97, note: 'Ländlicher Raum · agrarische Belastung' },
  '15': { region: 'Frankfurt (Oder)', state: 'Brandenburg', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.97, note: 'Ländlich' },
  '16': { region: 'Eberswalde / Uckermark', state: 'Brandenburg', defaultEnvironment: 'wald', yieldFactor: 0.95, note: 'Waldreich · hohe Pollenbelastung' },
  '17': { region: 'Mecklenburg-Vorpommern Ost', state: 'M-V', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.95, note: 'Küstennähe · Salznebel möglich' },

  // Mecklenburg-Vorpommern + Hamburg
  '18': { region: 'Rostock', state: 'M-V', defaultEnvironment: 'wohngebiet', yieldFactor: 0.95, note: 'Küstenstadt · Salznebel' },
  '19': { region: 'Schwerin', state: 'M-V', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.95, note: 'Ländlich' },
  '20': { region: 'Hamburg', state: 'Hamburg', defaultEnvironment: 'wohngebiet', yieldFactor: 0.93, note: 'Hafenstadt · niedrige Sonnenstunden' },
  '21': { region: 'Lüneburg / Hamburg-Süd', state: 'Niedersachsen', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.93, note: 'Heideregion' },
  '22': { region: 'Hamburg Nord', state: 'Hamburg', defaultEnvironment: 'wohngebiet', yieldFactor: 0.93, note: 'Stadtrand Hamburg' },
  '23': { region: 'Lübeck / Schleswig-Holstein', state: 'S-H', defaultEnvironment: 'wohngebiet', yieldFactor: 0.93, note: 'Ostseeküste' },
  '24': { region: 'Kiel', state: 'S-H', defaultEnvironment: 'wohngebiet', yieldFactor: 0.92, note: 'Küste · niedrige Sonnenstunden' },
  '25': { region: 'Westküste S-H', state: 'S-H', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.91, note: 'Nordsee · Salzbelastung' },
  '26': { region: 'Ostfriesland', state: 'Niedersachsen', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.91, note: 'Küstennah · Salzbelastung' },
  '27': { region: 'Bremerhaven / Cuxhaven', state: 'Niedersachsen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.91, note: 'Nordsee · Salzbelastung' },
  '28': { region: 'Bremen', state: 'Bremen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.92, note: 'Hafenstadt' },
  '29': { region: 'Lüneburger Heide', state: 'Niedersachsen', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.93, note: 'Heideregion · Pollen' },

  // Niedersachsen / NRW Ost
  '30': { region: 'Hannover', state: 'Niedersachsen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.95, note: 'Großstadtregion' },
  '31': { region: 'Hildesheim', state: 'Niedersachsen', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.95, note: 'Börde · sehr fruchtbar, viel Staub' },
  '32': { region: 'Bielefeld / Ostwestfalen', state: 'NRW', defaultEnvironment: 'industrie', yieldFactor: 0.94, note: 'Industriell · verschmutzungsintensiv' },
  '33': { region: 'Paderborn / OWL', state: 'NRW', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.94, note: 'Agrarisch geprägt' },
  '34': { region: 'Kassel / Nordhessen', state: 'Hessen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.95, note: 'Hügelland' },
  '35': { region: 'Marburg / Mittelhessen', state: 'Hessen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.95, note: 'Mittelgebirge' },
  '36': { region: 'Fulda', state: 'Hessen', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.95, note: 'Rhön / agrarisch' },
  '37': { region: 'Göttingen', state: 'Niedersachsen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.95, note: 'Universitätsstadt' },
  '38': { region: 'Braunschweig / Wolfsburg', state: 'Niedersachsen', defaultEnvironment: 'industrie', yieldFactor: 0.95, note: 'Industriestandort VW' },
  '39': { region: 'Magdeburg', state: 'Sachsen-Anhalt', defaultEnvironment: 'industrie', yieldFactor: 0.96, note: 'Magdeburger Börde · hohe Staubbelastung' },

  // NRW
  '40': { region: 'Düsseldorf', state: 'NRW', defaultEnvironment: 'industrie', yieldFactor: 0.96, note: 'Rheinmetropole · industriell' },
  '41': { region: 'Mönchengladbach / Krefeld', state: 'NRW', defaultEnvironment: 'industrie', yieldFactor: 0.96, note: 'Niederrhein industriell' },
  '42': { region: 'Wuppertal / Solingen', state: 'NRW', defaultEnvironment: 'industrie', yieldFactor: 0.94, note: 'Bergisches Land · industriell' },
  '44': { region: 'Dortmund', state: 'NRW', defaultEnvironment: 'industrie', yieldFactor: 0.95, note: 'Ruhrgebiet · Kohlerevier-Erbe' },
  '45': { region: 'Essen / Oberhausen', state: 'NRW', defaultEnvironment: 'industrie', yieldFactor: 0.95, note: 'Ruhrgebiet · industriell' },
  '46': { region: 'Bocholt / Rees', state: 'NRW', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.95, note: 'Niederrhein agrarisch' },
  '47': { region: 'Duisburg', state: 'NRW', defaultEnvironment: 'industrie', yieldFactor: 0.95, note: 'Stahl- und Hafenstadt' },
  '48': { region: 'Münster', state: 'NRW', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.95, note: 'Münsterland agrarisch' },
  '49': { region: 'Osnabrück', state: 'Niedersachsen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.94, note: 'Tecklenburger Land' },

  '50': { region: 'Köln', state: 'NRW', defaultEnvironment: 'wohngebiet', yieldFactor: 0.96, note: 'Großstadt · moderate Verschmutzung' },
  '51': { region: 'Leverkusen / Köln-Süd', state: 'NRW', defaultEnvironment: 'industrie', yieldFactor: 0.96, note: 'Chemieindustrie' },
  '52': { region: 'Aachen', state: 'NRW', defaultEnvironment: 'wohngebiet', yieldFactor: 0.95, note: 'Grenzregion · viel Regen' },
  '53': { region: 'Bonn', state: 'NRW', defaultEnvironment: 'wohngebiet', yieldFactor: 0.96, note: 'Rheinregion' },
  '54': { region: 'Trier / Eifel', state: 'RP', defaultEnvironment: 'wald', yieldFactor: 0.95, note: 'Waldreich' },
  '55': { region: 'Mainz / Rheinhessen', state: 'RP', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.99, note: 'Weinbauregion · sehr sonnig' },
  '56': { region: 'Koblenz', state: 'RP', defaultEnvironment: 'wohngebiet', yieldFactor: 0.97, note: 'Rhein-Mosel-Region' },
  '57': { region: 'Siegen', state: 'NRW', defaultEnvironment: 'wald', yieldFactor: 0.93, note: 'Siegerland · Mittelgebirge' },
  '58': { region: 'Hagen / Sauerland', state: 'NRW', defaultEnvironment: 'wald', yieldFactor: 0.93, note: 'Sauerland · niedrige Sonnenstunden' },
  '59': { region: 'Hamm / Soest', state: 'NRW', defaultEnvironment: 'landwirtschaft', yieldFactor: 0.95, note: 'Soester Börde' },

  // Hessen / RP / Saarland
  '60': { region: 'Frankfurt am Main', state: 'Hessen', defaultEnvironment: 'industrie', yieldFactor: 0.99, note: 'Großstadt · Flughafen-Nähe (Kerosin-Niederschlag)' },
  '61': { region: 'Bad Homburg / Taunus', state: 'Hessen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.99, note: 'Taunusregion' },
  '63': { region: 'Offenbach / Aschaffenburg', state: 'Hessen', defaultEnvironment: 'industrie', yieldFactor: 0.99, note: 'Rhein-Main industriell' },
  '64': { region: 'Darmstadt', state: 'Hessen', defaultEnvironment: 'wohngebiet', yieldFactor: 1.00, note: 'Bergstraße · sehr sonnig' },
  '65': { region: 'Wiesbaden', state: 'Hessen', defaultEnvironment: 'wohngebiet', yieldFactor: 1.00, note: 'Rheingau' },
  '66': { region: 'Saarbrücken', state: 'Saarland', defaultEnvironment: 'industrie', yieldFactor: 0.97, note: 'Saarland industriell' },
  '67': { region: 'Kaiserslautern', state: 'RP', defaultEnvironment: 'wald', yieldFactor: 0.97, note: 'Pfälzer Wald' },
  '68': { region: 'Mannheim / Heidelberg', state: 'BW', defaultEnvironment: 'industrie', yieldFactor: 1.01, note: 'Rhein-Neckar industriell · sehr sonnig' },
  '69': { region: 'Heidelberg / Heilbronn', state: 'BW', defaultEnvironment: 'wohngebiet', yieldFactor: 1.01, note: 'Kraichgau · Wein' },

  // Baden-Württemberg + Rheinland-Pfalz
  '70': { region: 'Stuttgart', state: 'BW', defaultEnvironment: 'wohngebiet', yieldFactor: 1.00, note: 'Großstadt' },
  '71': { region: 'Stuttgart Nord / Ludwigsburg', state: 'BW', defaultEnvironment: 'wohngebiet', yieldFactor: 1.00, note: 'Ballungsraum' },
  '72': { region: 'Tübingen / Reutlingen', state: 'BW', defaultEnvironment: 'wohngebiet', yieldFactor: 1.02, note: 'Schwäbische Alb' },
  '73': { region: 'Göppingen / Schwäbisch Gmünd', state: 'BW', defaultEnvironment: 'industrie', yieldFactor: 1.00, note: 'Mittelständische Industrie' },
  '74': { region: 'Heilbronn', state: 'BW', defaultEnvironment: 'landwirtschaft', yieldFactor: 1.02, note: 'Weinbauregion · sehr sonnig' },
  '75': { region: 'Pforzheim / Calw', state: 'BW', defaultEnvironment: 'wohngebiet', yieldFactor: 0.98, note: 'Nordschwarzwald' },
  '76': { region: 'Karlsruhe', state: 'BW', defaultEnvironment: 'industrie', yieldFactor: 1.02, note: 'Rheinebene · sehr sonnig' },
  '77': { region: 'Offenburg / Schwarzwald', state: 'BW', defaultEnvironment: 'wald', yieldFactor: 1.00, note: 'Schwarzwald + Rheinebene' },
  '78': { region: 'Konstanz / Bodensee', state: 'BW', defaultEnvironment: 'wohngebiet', yieldFactor: 1.04, note: 'Bodenseeregion · sonnenreich' },
  '79': { region: 'Freiburg', state: 'BW', defaultEnvironment: 'wohngebiet', yieldFactor: 1.05, note: 'Sonnenreichste Region Deutschlands' },

  // Bayern
  '80': { region: 'München Mitte', state: 'Bayern', defaultEnvironment: 'wohngebiet', yieldFactor: 1.04, note: 'Großstadt · sehr sonnig' },
  '81': { region: 'München Süd', state: 'Bayern', defaultEnvironment: 'wohngebiet', yieldFactor: 1.04, note: 'Stadtrand München' },
  '82': { region: 'Starnberg / Garmisch', state: 'Bayern', defaultEnvironment: 'wohngebiet', yieldFactor: 1.05, note: 'Voralpen · sonnenreich' },
  '83': { region: 'Rosenheim / Chiemgau', state: 'Bayern', defaultEnvironment: 'landwirtschaft', yieldFactor: 1.05, note: 'Voralpenregion' },
  '84': { region: 'Landshut', state: 'Bayern', defaultEnvironment: 'landwirtschaft', yieldFactor: 1.03, note: 'Niederbayern agrarisch' },
  '85': { region: 'Ingolstadt', state: 'Bayern', defaultEnvironment: 'industrie', yieldFactor: 1.02, note: 'Audi-Standort · industriell' },
  '86': { region: 'Augsburg', state: 'Bayern', defaultEnvironment: 'wohngebiet', yieldFactor: 1.02, note: 'Schwaben · sonnenreich' },
  '87': { region: 'Kempten / Allgäu', state: 'Bayern', defaultEnvironment: 'landwirtschaft', yieldFactor: 1.03, note: 'Allgäu · viel Niederschlag, dann sonnig' },
  '88': { region: 'Friedrichshafen / Oberschwaben', state: 'BW', defaultEnvironment: 'wohngebiet', yieldFactor: 1.04, note: 'Bodenseeregion' },
  '89': { region: 'Ulm / Neu-Ulm', state: 'BW', defaultEnvironment: 'industrie', yieldFactor: 1.02, note: 'Schwäbische Alb / Donau · Heimat von Skytech Solutions' },

  '90': { region: 'Nürnberg', state: 'Bayern', defaultEnvironment: 'industrie', yieldFactor: 1.00, note: 'Großstadt' },
  '91': { region: 'Erlangen / Fürth', state: 'Bayern', defaultEnvironment: 'industrie', yieldFactor: 1.00, note: 'Metropolregion Nürnberg' },
  '92': { region: 'Amberg / Oberpfalz', state: 'Bayern', defaultEnvironment: 'landwirtschaft', yieldFactor: 1.00, note: 'Oberpfalz' },
  '93': { region: 'Regensburg', state: 'Bayern', defaultEnvironment: 'wohngebiet', yieldFactor: 1.02, note: 'Donau · sehr sonnig' },
  '94': { region: 'Passau / Bayerischer Wald', state: 'Bayern', defaultEnvironment: 'wald', yieldFactor: 1.00, note: 'Bayerischer Wald · Pollen' },
  '95': { region: 'Hof / Bayreuth', state: 'Bayern', defaultEnvironment: 'wohngebiet', yieldFactor: 0.97, note: 'Frankenwald · niedrigere Sonnenstunden' },
  '96': { region: 'Bamberg / Coburg', state: 'Bayern', defaultEnvironment: 'wohngebiet', yieldFactor: 0.99, note: 'Oberfranken' },
  '97': { region: 'Würzburg / Schweinfurt', state: 'Bayern', defaultEnvironment: 'landwirtschaft', yieldFactor: 1.00, note: 'Mainfranken · Weinbau, sonnenreich' },
  '98': { region: 'Suhl / Thüringer Wald', state: 'Thüringen', defaultEnvironment: 'wald', yieldFactor: 0.95, note: 'Thüringer Wald' },
  '99': { region: 'Erfurt', state: 'Thüringen', defaultEnvironment: 'wohngebiet', yieldFactor: 0.96, note: 'Thüringer Becken' },
};

export function lookupPlz(plz: string): PlzPreset | null {
  if (!plz || plz.length < 2) return null;
  const prefix = plz.substring(0, 2);
  return presets[prefix] ?? null;
}
