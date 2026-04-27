import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ReactElement } from 'react';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#1f2937',
  },
  header: {
    borderBottom: '2 solid #2563eb',
    paddingBottom: 14,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  brand: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#2563eb' },
  brandSub: { fontSize: 9, color: '#6b7280', marginTop: 2 },
  meta: { fontSize: 9, color: '#6b7280', textAlign: 'right' },
  h1: { fontSize: 22, fontFamily: 'Helvetica-Bold', marginBottom: 4, color: '#111827' },
  subtitle: { fontSize: 12, color: '#6b7280', marginBottom: 24 },
  section: { marginBottom: 18 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#2563eb',
    marginBottom: 8,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottom: '0.5 solid #e5e7eb' },
  label: { color: '#6b7280' },
  value: { fontFamily: 'Helvetica-Bold', color: '#111827' },
  resultBox: {
    backgroundColor: '#eff6ff',
    border: '1 solid #bfdbfe',
    padding: 16,
    marginBottom: 14,
    borderRadius: 4,
  },
  resultLabel: { fontSize: 10, color: '#1e40af', marginBottom: 4 },
  resultValue: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#1e3a8a' },
  resultSub: { fontSize: 9, color: '#3b82f6', marginTop: 2 },
  miniGrid: { flexDirection: 'row', gap: 10 },
  miniBox: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 10,
    border: '0.5 solid #e5e7eb',
    borderRadius: 4,
  },
  miniLabel: { fontSize: 9, color: '#6b7280' },
  miniValue: { fontSize: 14, fontFamily: 'Helvetica-Bold', marginTop: 4, color: '#111827' },
  cta: {
    marginTop: 24,
    padding: 14,
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    borderRadius: 4,
  },
  ctaTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 4 },
  ctaText: { fontSize: 10, color: '#dbeafe' },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'center',
    borderTop: '0.5 solid #e5e7eb',
    paddingTop: 10,
  },
  note: {
    backgroundColor: '#fef3c7',
    border: '0.5 solid #fde68a',
    padding: 8,
    marginTop: 10,
    borderRadius: 4,
    fontSize: 9,
    color: '#78350f',
  },
});

interface BaseDocProps {
  title: string;
  subtitle?: string;
  children: ReactElement | ReactElement[];
}

export function BasePdfDocument({ title, subtitle, children }: BaseDocProps) {
  const today = new Date().toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return (
    <Document
      title={title}
      author="Skytech Solutions"
      subject={title}
      creator="Skytech Solutions PV-Rechner"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Skytech Solutions</Text>
            <Text style={styles.brandSub}>Photovoltaik-Reinigung · Drohnentechnologie</Text>
          </View>
          <View>
            <Text style={styles.meta}>Erstellt am {today}</Text>
            <Text style={styles.meta}>skytech-solutions.de</Text>
          </View>
        </View>

        <Text style={styles.h1}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

        {children}

        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Verbindliches Angebot anfordern</Text>
          <Text style={styles.ctaText}>
            Tel: +49 1521 6991223 · E-Mail: krzysztof@aeropro-inspekcje.pl
          </Text>
          <Text style={styles.ctaText}>
            Kostenlose Vor-Ort-Bewertung in Ulm-Einsingen und Umgebung.
          </Text>
        </View>

        <Text style={styles.footer} fixed>
          Skytech Solutions · Höhenblick 8, 89079 Ulm-Einsingen · skytech-solutions.de
          {'\n'}
          Diese Berechnung basiert auf Branchendurchschnittswerten und ist unverbindlich.
        </Text>
      </Page>
    </Document>
  );
}

export const pdfStyles = styles;
