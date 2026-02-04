import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import Services from '@/components/Services';
import Process from '@/components/Process';
import RoiCalculator from '@/components/RoiCalculator';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
    title: 'Leistungen – Professionelle PV-Reinigung',
    description:
        'Unsere Leistungen: Solarpark-Reinigung, Dachanlagen-Reinigung und Fassadenreinigung mit modernster Drohnentechnologie.',
};

export default function Leistungen() {
    return (
        <PageLayout
            title="Unsere Leistungen"
            subtitle="Von großen Solarparks bis hin zu privaten Dachanlagen – wir bieten maßgeschneiderte Lösungen für jeden Bedarf."
        >
            <Services />
            <Process />
            <RoiCalculator />
            <CTA />
        </PageLayout>
    );
}
