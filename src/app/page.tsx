import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import BlogTeaser from '@/components/BlogTeaser';
import CTA from '@/components/CTA';
import AnimatedCounter from '@/components/animations/AnimatedCounter';

// Drohne vs. Gerüst — comparison table for SEO + conversion
function DroneVsScaffold() {
  const rows = [
    { label: 'Aufbauzeit', drone: 'Sofort einsatzbereit', scaffold: '1–3 Tage Auf- und Abbau' },
    { label: 'Arbeitshöhe', drone: 'Bis zu 150 m', scaffold: 'Begrenzt durch Statik & Genehmigung' },
    { label: 'Kosten', drone: 'Festpreis pro m² / Modul', scaffold: 'Hohe Logistik- und Mietkosten' },
    { label: 'Wasserverbrauch', drone: 'Bis zu 90 % weniger (RO/DI)', scaffold: 'Hoher Verbrauch, oft Leitungswasser' },
    { label: 'Risiko für Personal', drone: 'Keine Höhenarbeit nötig', scaffold: 'Absturzgefahr, PSAgA-Pflicht' },
    { label: 'Belastung der Module', drone: 'Berührungslos, demineralisiert', scaffold: 'Bürsten, Druck, Kalkrückstände' },
    { label: 'Bodenverdichtung', drone: 'Keine – ideal für Solarparks', scaffold: 'Schwere Geräte schädigen Bewuchs' },
    { label: 'Genehmigungen', drone: 'Drohnen-Flugfreigabe (durch uns)', scaffold: 'Aufstellgenehmigung, ggf. Sperrung' },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Drohne vs. Gerüst
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Warum Drohnenreinigung die bessere Wahl ist
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Klassische Gerüstreinigung ist langsam, teuer und riskant. Mit unserer
            Drohnentechnologie reinigen wir Photovoltaikmodule und Fassaden bis 150 m
            Höhe – in einem Bruchteil der Zeit und ohne Eingriff in den Betrieb.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-0 border-b border-gray-100 bg-gray-50 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-sm">
            <div></div>
            <div className="text-center text-primary-700">Drohnenreinigung</div>
            <div className="text-center">Gerüst &amp; Hebebühne</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 gap-0 px-4 py-4 text-sm sm:px-6 sm:text-base ${
                i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              <div className="font-semibold text-gray-900">{row.label}</div>
              <div className="text-center text-primary-700">
                <span className="inline-flex items-start gap-1.5">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>{row.drone}</span>
                </span>
              </div>
              <div className="text-center text-gray-500">{row.scaffold}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Einsatzgebiete — regions + city links for local SEO
function ServiceAreas() {
  const bw = [
    'ulm',
    'stuttgart',
    'karlsruhe',
    'heilbronn',
    'pforzheim',
    'reutlingen',
    'tuebingen',
    'heidenheim',
    'aalen',
    'friedrichshafen',
    'konstanz',
  ];
  const by = ['neu-ulm', 'augsburg', 'memmingen'];

  const labels: Record<string, string> = {
    ulm: 'Ulm',
    stuttgart: 'Stuttgart',
    karlsruhe: 'Karlsruhe',
    heilbronn: 'Heilbronn',
    pforzheim: 'Pforzheim',
    reutlingen: 'Reutlingen',
    tuebingen: 'Tübingen',
    heidenheim: 'Heidenheim',
    aalen: 'Aalen',
    friedrichshafen: 'Friedrichshafen',
    konstanz: 'Konstanz',
    'neu-ulm': 'Neu-Ulm',
    augsburg: 'Augsburg',
    memmingen: 'Memmingen',
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Einsatzgebiete
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            PV-Reinigung in Baden-Württemberg, Bayern &amp; deutschlandweit
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Unser Hauptstandort liegt in Ulm-Einsingen. Von dort aus reinigen wir
            Solarparks, Dachanlagen und Fassaden in ganz Süddeutschland – für
            Großprojekte sind wir bundesweit unterwegs.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-bold">
                BW
              </div>
              <h3 className="text-xl font-bold text-gray-900">Baden-Württemberg</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Schwerpunktregion mit kurzen Anfahrtswegen und schnellen
              Reaktionszeiten. Häufige Einsätze in Solarparks im Schwäbischen
              Oberland sowie auf Gewerbedächern im Großraum Stuttgart.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {bw.map((slug) => (
                <Link
                  key={slug}
                  href={`/standorte/${slug}`}
                  className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                >
                  PV-Reinigung {labels[slug]}
                </Link>
              ))}
            </div>
            <Link
              href="/standorte/baden-wuerttemberg"
              className="mt-5 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Alle Standorte in BW
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-bold">
                BY
              </div>
              <h3 className="text-xl font-bold text-gray-900">Bayern</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Bayerisch-Schwaben und Allgäu liegen direkt an unserem Standort.
              Ideal für gewerbliche Dachanlagen, Logistikhallen und Freiflächen­anlagen
              entlang der A7/A8.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {by.map((slug) => (
                <Link
                  key={slug}
                  href={`/standorte/${slug}`}
                  className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                >
                  PV-Reinigung {labels[slug]}
                </Link>
              ))}
            </div>
            <Link
              href="/standorte/bayern"
              className="mt-5 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Alle Standorte in Bayern
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500">
          Solarpark außerhalb dieser Regionen?{' '}
          <Link href="/kontakt" className="font-semibold text-primary-600 hover:text-primary-700">
            Sprechen Sie uns an
          </Link>{' '}
          – ab einer bestimmten Modulanzahl reisen wir bundesweit an.
        </p>
      </div>
    </section>
  );
}

// Compact trust/about preview for homepage
function AboutPreview() {
  const highlights: { value: React.ReactNode; label: string }[] = [
    { value: <AnimatedCounter to={30} suffix="%" />, label: 'Mehr Ertrag' },
    { value: <AnimatedCounter to={24} suffix="h" />, label: 'Angebot' },
    { value: <AnimatedCounter to={150} suffix=" m" />, label: 'Arbeitshöhe' },
    { value: <AnimatedCounter to={100} suffix="%" />, label: 'Umweltfreundlich' },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Warum Skytech
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Technologie statt Risiko
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Drohnen statt Gerüst, demineralisiertes Wasser statt Chemie,
              Festpreise statt Überraschungen – so funktioniert moderne
              Photovoltaik- und Fassadenreinigung. Wir arbeiten mit der
              integrierten Plattform <strong>DCS X1 PRO</strong> in Kombination
              mit der industriellen Drohne <strong>DJI Matrice 400</strong>.
            </p>
            <Link
              href="/ueber-uns"
              className="mt-6 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Mehr über uns erfahren
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm"
              >
                <p className="text-2xl font-bold text-primary-600 sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-gray-600 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <AboutPreview />
      <Process />
      <DroneVsScaffold />
      <ServiceAreas />
      <FAQ />
      <BlogTeaser />
      <CTA />
      <Footer />
    </main>
  );
}
