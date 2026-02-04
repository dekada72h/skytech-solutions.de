import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import WhyUs from '@/components/WhyUs';
import Trust from '@/components/Trust';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
    title: 'Über uns – Skytech Solutions',
    description:
        'Erfahren Sie mehr über Skytech Solutions: Professionelle PV-Reinigung mit modernster Drohnentechnologie. Ihr Partner für maximalen Solarertrag.',
};

export default function UeberUns() {
    return (
        <PageLayout
            title="Über uns"
            subtitle="Modernste Drohnentechnologie trifft auf jahrelange Erfahrung – wir sind Ihr zuverlässiger Partner für professionelle Solarreinigung."
        >
            <WhyUs />
            <Trust />
            <CTA />
        </PageLayout>
    );
}
