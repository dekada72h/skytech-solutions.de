import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Impressum – Skytech Solutions',
  description: 'Impressum und Angaben gemäß § 5 TMG von Skytech Solutions.',
};

export default function Impressum() {
  return (
    <LegalLayout title="Impressum">
      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p>
        Skytech Solutions<br />
        Inhaber: Christoph Kik<br />
        Musterstra&szlig;e 42<br />
        89073 Ulm<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: +49 151 2345 6789<br />
        E-Mail: info@skytech-services.de
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27a
        Umsatzsteuergesetz:<br />
        DE XXXXXXXXX
      </p>

      <h2>Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RSt</h2>
      <p>
        Christoph Kik<br />
        Musterstra&szlig;e 42<br />
        89073 Ulm
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europ&auml;ische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{' '}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        .
      </p>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungs&shy;verfahren
        vor einer Verbraucher&shy;schlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung f&uuml;r Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs. 1 TMG f&uuml;r
        eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
        verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als
        Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder
        gespeicherte fremde Informationen zu &uuml;berwachen oder nach
        Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit
        hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon
        unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem
        Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei
        Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
        Inhalte umgehend entfernen.
      </p>

      <h2>Haftung f&uuml;r Links</h2>
      <p>
        Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese
        fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die
        Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
        Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
        Zeitpunkt der Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e
        &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der
        Verlinkung nicht erkennbar.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die
        Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der
        Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen
        der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        Downloads und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht
        kommerziellen Gebrauch gestattet.
      </p>
    </LegalLayout>
  );
}
