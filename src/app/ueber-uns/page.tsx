import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import WhyUs from '@/components/WhyUs';
import Trust from '@/components/Trust';
import CTA from '@/components/CTA';
import BlogTeaser from '@/components/BlogTeaser';
import Reveal from '@/components/animations/Reveal';
import AnimatedCounter from '@/components/animations/AnimatedCounter';

export const metadata: Metadata = {
  title: 'Über uns – Skytech Solutions | Drohnen-Reinigung aus Ulm-Einsingen',
  description:
    'Skytech Solutions reinigt Photovoltaikanlagen und Fassaden mit der DCS-X1-PRO-Plattform und der DJI Matrice 400. Standort Ulm-Einsingen, Einsatz in Baden-Württemberg, Bayern und deutschlandweit.',
  alternates: { canonical: 'https://skytech-solutions.de/ueber-uns' },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: 'https://skytech-solutions.de/ueber-uns',
  mainEntity: { '@id': 'https://skytech-solutions.de/#localbusiness' },
};

export default function UeberUns() {
  return (
    <PageLayout
      title="Über uns"
      subtitle="Modernste Drohnentechnologie trifft auf jahrelange Erfahrung – wir sind Ihr Partner für professionelle PV- und Fassadenreinigung in ganz Süddeutschland."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Mission */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Unsere Mission
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Sauberkeit ohne Risiko, ohne Gerüst, ohne Überraschungen
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                <p>
                  Wir sind 2021 mit einer klaren Idee angetreten: <strong>Reinigung von
                  Photovoltaikanlagen sollte technisch besser, schneller und sicherer sein</strong>,
                  als es klassische Methoden mit Hubsteiger und Gerüst zulassen. Heute reinigen
                  wir Solarparks, Dachanlagen, Hochhausfassaden und Industriegebäude mit der
                  DCS-X1-PRO-Plattform und der industriellen DJI Matrice 400 — und sparen unseren
                  Kunden bis zu 80 % der Logistik­kosten.
                </p>
                <p>
                  Unser Anspruch ist nicht &bdquo;so billig wie m&ouml;glich&ldquo;. Unser Anspruch ist
                  <strong> nachhaltig sauber, transparent abgerechnet und versicherungs­technisch
                  sauber dokumentiert</strong>. Das bedeutet: demineralisiertes Wasser statt Chemie,
                  Festpreise statt Stundensätze, Foto- und Thermografie-Berichte für jede einzelne
                  Reinigung.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-12">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { v: <AnimatedCounter to={4} suffix="+" />, l: 'Jahre Erfahrung' },
              { v: <AnimatedCounter to={150} suffix=" m" />, l: 'Maximale Arbeitshöhe' },
              { v: <AnimatedCounter to={14} />, l: 'Service-Standorte' },
              { v: <AnimatedCounter to={2000} suffix=" m²/h" />, l: 'Reinigungsleistung' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="rounded-2xl border border-primary-100 bg-white p-5 text-center shadow-sm">
                  <p className="text-2xl font-bold text-primary-600 sm:text-3xl">{s.v}</p>
                  <p className="mt-1 text-xs text-gray-600 sm:text-sm">{s.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Wie es anfing
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Vom Allgäu-Hofbetrieb zur DCS-X1-PRO-Plattform
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                <p>
                  Unser erster Reinigungs­auftrag im Frühjahr 2021 war eine 80-kWp-Aufdach­anlage
                  auf einer Stallhalle bei Memmingen. Der Landwirt hatte ein klassisches Problem:
                  Seine Anlage produzierte nur noch knapp 78 % der Soll­leistung. Mit
                  konventionellen Methoden hätte er ein Gerüst gebraucht — über vier Wochen
                  Aufbau, Mieter­ärger, weil der Stall daneben stand, und ein Preis, der sich
                  nicht in zehn Jahren amortisiert hätte.
                </p>
                <p>
                  Wir haben das Projekt damals mit einer DJI Agras T30 gemacht — ehrlich gesagt,
                  am Limit dessen, was die Technik konnte. Aber es funktionierte. Anlagen­ertrag
                  nach der Reinigung: <strong>+22 % im Folgejahr</strong>. Das war der Moment,
                  in dem wir wussten: Drohnen­reinigung ist nicht eine Spielerei, sondern die
                  Zukunft.
                </p>
                <p>
                  Seitdem haben wir uns systematisch hochgearbeitet. Erst Solarparks in
                  Baden-Württemberg, dann Dachanlagen für Logistik­hallen entlang der A8, später
                  Glas­fassaden für Bürohochhäuser. Heute betreiben wir die DCS-X1-PRO-Plattform
                  in Verbindung mit der industriellen DJI Matrice 400 — und kommen damit auf
                  Arbeitshöhen, die noch vor drei Jahren nur mit Hubschrauber denkbar waren.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Unsere Werte
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Vier Prinzipien, an denen Sie uns messen können
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              {
                title: 'Transparenz vor Auftragsannahme',
                desc:
                  'Festpreis schriftlich, klare Annahmen zur Verschmutzung, keine versteckten Anfahrts- oder Wetter­kosten. Wenn wir nicht passen, sagen wir es Ihnen — auch wenn wir damit den Auftrag verlieren.',
              },
              {
                title: 'Technologie statt Risiko',
                desc:
                  'Kein Personal in großer Höhe, keine Bodenverdichtung bei Solarparks, keine chemischen Zusätze. Drohnentechnologie ist für uns kein Marketing-Begriff, sondern die einzige Methode, die wir aus Überzeugung nutzen.',
              },
              {
                title: 'Dokumentation für die Versicherung',
                desc:
                  'Jede Reinigung wird fotografisch dokumentiert, auf Wunsch mit Thermografie-Scan. Sie bekommen einen digitalen Bericht, den Sie an Ihren Versicherer, Wirtschaftsprüfer oder Investor weitergeben können.',
              },
              {
                title: 'Langfristige Beziehungen',
                desc:
                  '70 % unserer Aufträge kommen von Bestandskunden mit Wartungs­vertrag. Wir setzen auf Vertrauen, faire Mehrjahres-Kalkulationen und garantierte Termine in der Hauptsaison März–Mai.',
              },
            ].map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Standort + Anfahrt */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Standort
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Hauptsitz Ulm-Einsingen
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                Wir sitzen am Höhenblick 8 in 89079 Ulm-Einsingen — direkt an der A7 und A8,
                mit kurzen Anfahrts­wegen nach Stuttgart, München, Augsburg, Friedrichshafen
                und Karlsruhe. Für Kunden in Baden-Württemberg und Bayern bedeutet das in
                der Regel <strong>maximal 2 Stunden Anfahrt</strong>, oft deutlich weniger.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-700 sm:text-lg">
                Für Solarpark-Großprojekte ab 1 MWp sind wir <strong>deutschlandweit</strong>
                {' '}unterwegs — von Schleswig-Holstein bis ins Allgäu. Bei Mehrtages­einsätzen
                organisieren wir Übernachtung und Wasser­logistik vor Ort.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700"
                >
                  Kontakt aufnehmen
                </Link>
                <Link
                  href="/standorte"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300"
                >
                  Alle Standorte ansehen
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-base font-semibold text-gray-900">Anschrift</h3>
                <address className="mt-2 not-italic text-sm leading-relaxed text-gray-700">
                  Skytech Solutions<br />
                  Höhenblick 8<br />
                  89079 Ulm-Einsingen<br />
                  Deutschland
                </address>

                <h3 className="mt-6 text-base font-semibold text-gray-900">Kontakt</h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li>
                    Telefon:{' '}
                    <a href="tel:+4915216991223" className="font-semibold text-primary-700 hover:underline">
                      +49 152 169 91 223
                    </a>
                  </li>
                  <li>
                    E-Mail:{' '}
                    <a href="mailto:krzysztof@aeropro-inspekcje.pl" className="font-semibold text-primary-700 hover:underline">
                      krzysztof@aeropro-inspekcje.pl
                    </a>
                  </li>
                </ul>

                <h3 className="mt-6 text-base font-semibold text-gray-900">Servicezeiten</h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li>Mo–Fr · 08:00–18:00 Uhr</li>
                  <li>Sa · 09:00–14:00 Uhr (Notfall-Bereitschaft)</li>
                  <li>So · geschlossen</li>
                </ul>

                <h3 className="mt-6 text-base font-semibold text-gray-900">Reaktionszeit</h3>
                <p className="mt-2 text-sm text-gray-700">
                  Festpreis­angebot in <strong>≤ 24 Stunden</strong>, Termin­vorschlag in
                  ≤ 48 Stunden, Notfall-Reinigung in der Hauptsaison ab 5 Werktagen.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Versicherung & Genehmigungen */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                  Sicherheit & Recht
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Versicherungen, Genehmigungen, Zertifizierungen
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
                  Drohnen­reinigung ist nicht &bdquo;spielen mit Konsumer-Quadrocoptern&ldquo;. Wir arbeiten
                  unter klar definierten gesetzlichen und versicherungs­technischen Rahmen­bedingungen.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Drohnen-Haftpflicht',
                  desc:
                    'Spezialisierte Drohnen-Haftpflicht­versicherung mit Deckung im einstelligen Millionenbereich. Versicherungs­nachweis auf Anfrage.',
                  badge: 'Pflicht erfüllt',
                },
                {
                  title: 'Betriebs­haftpflicht',
                  desc:
                    'Berufs­haftpflicht für die eigentliche Reinigungs­leistung – inkl. Sach- und Vermögens­schäden an Modulen, Fassaden und Ausstattung.',
                  badge: 'Standard',
                },
                {
                  title: 'EU-Drohnenklasse C2/C3',
                  desc:
                    'Pilot mit gültigem EU-Drohnen­führerschein A2/A3 sowie Betreiber­registrierung beim Luftfahrt­bundesamt.',
                  badge: 'Zertifiziert',
                },
                {
                  title: 'Aufstiegs­genehmigung',
                  desc:
                    'Pro Einsatz holen wir die Genehmigung der zuständigen Landesluftfahrt­behörde ein – inklusive Risiko­analyse (SORA) für Innenstadt-Einsätze.',
                  badge: 'Pro Einsatz',
                },
                {
                  title: 'DSGVO-Konformität',
                  desc:
                    'Alle Foto- und Thermo­grafie-Daten werden DSGVO-konform verarbeitet. Personen­bezogene Daten werden nicht ohne Einwilligung erfasst.',
                  badge: 'Compliance',
                },
                {
                  title: 'Hersteller­konforme Reinigung',
                  desc:
                    'Reinigungs­methoden in Abstimmung mit Empfehlungen führender Modul- und Fassaden­hersteller. Garantie­erhalt schriftlich bestätigt.',
                  badge: 'Konform',
                },
              ].map((c, i) => (
                <Reveal key={c.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-gray-100 bg-gray-50 p-6">
                    <span className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      {c.badge}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-gray-900">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WhyUs (existing component) */}
      <WhyUs />

      {/* Trust stats (existing component) */}
      <Trust />

      {/* Closing statement */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                &bdquo;Wir wollen die Reinigungs&shy;branche genauso &auml;ndern, wie Photovoltaik
                die Stromerzeugung ge&auml;ndert hat: <span className="text-primary-200">technisch
                besser, transparenter, langfristig g&uuml;nstiger</span>.&ldquo;
              </p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary-200">
                — Skytech Solutions, Gründungs-Statement 2021
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogTeaser />
      <CTA />
    </PageLayout>
  );
}
