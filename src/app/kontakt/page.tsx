import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
    title: 'Kontakt – Skytech Solutions',
    description:
        'Kontaktieren Sie Skytech Solutions für ein kostenloses Angebot. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
};

export default function Kontakt() {
    return (
        <PageLayout
            title="Kontakt"
            subtitle="Haben Sie Fragen oder möchten Sie ein kostenloses Angebot? Wir freuen uns auf Ihre Anfrage."
        >
            <Contact />
        </PageLayout>
    );
}
