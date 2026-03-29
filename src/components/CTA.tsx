'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon, PhoneIcon } from '@/components/Icons';

export default function CTA() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-6 py-16 text-center shadow-2xl shadow-primary-900/20 sm:px-12 sm:py-20"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bereit, mehr aus Ihrer Solaranlage herauszuholen?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Fordern Sie jetzt Ihr kostenloses und unverbindliches Angebot an.
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
              >
                Kostenloses Angebot anfordern
                <ArrowRightIcon className="ml-2 h-4 w-4" strokeWidth={2} />
              </Link>
              <a
                href="tel:+4915123456789"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <PhoneIcon className="mr-2 h-4 w-4" strokeWidth={2} />
                Jetzt anrufen
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
