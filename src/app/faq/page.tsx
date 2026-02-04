import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
    title: 'FAQ – Häufig gestellte Fragen',
    description:
        'Antworten auf die häufigsten Fragen zur professionellen Reinigung von Photovoltaikanlagen und Solarparks.',
};

export default function FAQPage() {
    return (
        <PageLayout
            title="Häufig gestellte Fragen"
            subtitle="Hier finden Sie Antworten auf die wichtigsten Fragen rund um unsere Dienstleistungen."
        >
            <FAQ />
            <CTA />
        </PageLayout>
    );
}
