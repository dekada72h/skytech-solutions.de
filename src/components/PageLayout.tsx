'use client';

import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-gray-50 via-white to-primary-50 py-16 sm:py-20">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-4 text-lg text-gray-600 sm:text-xl">
                  {subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Page Content */}
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
