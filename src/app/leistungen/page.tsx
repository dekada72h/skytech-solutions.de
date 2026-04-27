import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Services from '@/components/Services';
import Process from '@/components/Process';
import CTA from '@/components/CTA';
import BlogTeaser from '@/components/BlogTeaser';

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

            {/* Rechner Teaser — replaces inline RoiCalculator */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 text-white">
                <div className="container-width px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
                            Kostenlose Tools
                        </span>
                        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                            Was kostet Sie eine schmutzige Anlage?
                        </h2>
                        <p className="mt-4 text-lg text-primary-100">
                            Vier kostenlose Online-Rechner zeigen Ihnen Ertragsverlust,
                            Reinigungskosten, Amortisation und ROI. Mit PDF-Download.
                        </p>
                        <Link
                            href="/rechner"
                            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-primary-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                        >
                            Rechner öffnen
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <BlogTeaser />

            <CTA />
        </PageLayout>
    );
}
