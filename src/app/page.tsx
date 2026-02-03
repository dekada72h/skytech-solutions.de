import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import RoiCalculator from '@/components/RoiCalculator';
import Trust from '@/components/Trust';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <RoiCalculator />
      <Trust />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
