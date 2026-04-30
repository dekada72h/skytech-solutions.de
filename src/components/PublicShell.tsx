// ─────────────────────────────────────────────────────────────────────────
// PublicShell — najprostszy wrapper z samym Navbar + Footer (bez hero).
// Używany przez podstrony, które same definiują własny hero/banner —
// /standorte, /standorte/[city], /blog/[slug], /rechner.
// ─────────────────────────────────────────────────────────────────────────
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">{children}</div>
      <Footer />
    </div>
  );
}
