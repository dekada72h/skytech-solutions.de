import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'AGB – Skytech Solutions',
  description: 'Allgemeine Geschäftsbedingungen von Skytech Solutions.',
};

export default function AGB() {
  return (
    <LegalLayout title="Allgemeine Gesch&auml;ftsbedingungen (AGB)">
      <p>
        <strong>Stand: Februar 2026</strong>
      </p>

      <h2>&sect; 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Gesch&auml;ftsbedingungen (AGB) gelten f&uuml;r alle
        Vertr&auml;ge zwischen Skytech Solutions, Inhaber Christoph Kik,
        Musterstra&szlig;e 42, 89073 Ulm (nachfolgend &bdquo;Auftragnehmer&ldquo;)
        und dem Kunden (nachfolgend &bdquo;Auftraggeber&ldquo;) &uuml;ber die
        Erbringung von Reinigungs&shy;dienstleistungen f&uuml;r
        Photovoltaikanlagen, Solarparks und Fassaden.
      </p>
      <p>
        Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei
        denn, der Auftragnehmer stimmt ihrer Geltung ausdr&uuml;cklich
        schriftlich zu.
      </p>

      <h2>&sect; 2 Vertragsschluss</h2>
      <p>
        Die Darstellung der Leistungen auf der Website stellt kein bindendes
        Angebot dar. Erst die Best&auml;tigung des Auftrags durch den
        Auftragnehmer begr&uuml;ndet einen verbindlichen Vertrag.
      </p>
      <p>
        Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern
        sie nicht ausdr&uuml;cklich als verbindlich gekennzeichnet sind.
      </p>

      <h2>&sect; 3 Leistungsumfang</h2>
      <p>
        Der Umfang der Leistungen ergibt sich aus dem jeweiligen individuellen
        Angebot bzw. der Auftrags&shy;best&auml;tigung. Der Auftragnehmer
        erbringt folgende Dienstleistungen:
      </p>
      <ul>
        <li>Reinigung von Photovoltaik-Freifl&auml;chenanlagen (Solarparks)</li>
        <li>Reinigung von Dachanlagen (Privat- und Gewerbed&auml;cher)</li>
        <li>Fassadenreinigung</li>
      </ul>
      <p>
        Die Reinigung erfolgt unter Verwendung von demineralisiertem Wasser und
        umweltfreundlichen Reinigungsmitteln. Der Auftragnehmer setzt je nach
        Erfordernis Drohnentechnologie oder manuelle Reinigungsverfahren ein.
      </p>

      <h2>&sect; 4 Preise und Zahlung</h2>
      <p>
        Die Preise ergeben sich aus dem jeweiligen individuellen Angebot. Alle
        Preise verstehen sich zzgl. der gesetzlichen Mehrwertsteuer, sofern nicht
        anders angegeben.
      </p>
      <p>
        Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug
        zu begleichen. Bei Zahlungsverzug ist der Auftragnehmer berechtigt,
        Verzugszinsen in gesetzlicher H&ouml;he zu berechnen.
      </p>

      <h2>&sect; 5 Terminvereinbarung und Durchf&uuml;hrung</h2>
      <p>
        Der Termin f&uuml;r die Reinigung wird individuell vereinbart. Der
        Auftragnehmer beh&auml;lt sich vor, den Termin bei ung&uuml;nstigen
        Witterungs&shy;bedingungen (z.&nbsp;B. Starkregen, Sturm, Frost) zu
        verschieben. Der Auftraggeber wird hier&uuml;ber rechtzeitig informiert.
      </p>
      <p>
        Der Auftraggeber stellt sicher, dass der Zugang zur Anlage am
        vereinbarten Termin gew&auml;hrleistet ist.
      </p>

      <h2>&sect; 6 Haftung</h2>
      <p>
        Der Auftragnehmer haftet f&uuml;r Sch&auml;den nur bei Vorsatz und grober
        Fahrl&auml;ssigkeit sowie bei der Verletzung wesentlicher
        Vertragspflichten. Bei der Verletzung wesentlicher Vertragspflichten ist
        die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
      </p>
      <p>
        Der Auftragnehmer haftet nicht f&uuml;r Sch&auml;den, die auf
        bereits bestehende M&auml;ngel oder Vorsch&auml;digungen der
        Anlage zur&uuml;ckzuf&uuml;hren sind. Bestehende Sch&auml;den
        werden vor Beginn der Arbeiten dokumentiert.
      </p>

      <h2>&sect; 7 Stornierung</h2>
      <p>
        Eine kostenlose Stornierung ist bis 48 Stunden vor dem vereinbarten
        Termin m&ouml;glich. Bei sp&auml;terer Stornierung oder Nichterscheinen
        beh&auml;lt sich der Auftragnehmer vor, eine Ausfallpauschale in
        H&ouml;he von 50% des vereinbarten Preises zu berechnen.
      </p>

      <h2>&sect; 8 Gew&auml;hrleistung</h2>
      <p>
        Der Auftragnehmer gew&auml;hrleistet eine fachgerechte Durchf&uuml;hrung
        der Reinigung. Eventuelle Reklamationen sind innerhalb von 7 Tagen
        nach Durchf&uuml;hrung der Arbeiten schriftlich geltend zu machen.
      </p>

      <h2>&sect; 9 Datenschutz</h2>
      <p>
        Informationen zur Erhebung und Verarbeitung personenbezogener Daten
        finden Sie in unserer{' '}
        <a href="/datenschutz" className="text-primary-600 hover:underline">
          Datenschutzerkl&auml;rung
        </a>
        .
      </p>

      <h2>&sect; 10 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand
        f&uuml;r alle Streitigkeiten aus dem Vertragsverh&auml;ltnis ist Ulm,
        sofern der Auftraggeber Kaufmann ist.
      </p>
      <p>
        Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so
        bleibt die Wirksamkeit der &uuml;brigen Bestimmungen unber&uuml;hrt.
      </p>
    </LegalLayout>
  );
}
